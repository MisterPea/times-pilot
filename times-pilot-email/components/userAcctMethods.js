import admin from 'firebase-admin';
import { config } from 'dotenv';

config();
// K_SERVICE exists within GCP
const serviceName = process.env.K_SERVICE;

if ( !serviceName ) {
    const serviceAccount = JSON.parse( process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON );
    admin.initializeApp( {
        credential: admin.credential.cert( serviceAccount ),
        projectId: serviceAccount.project_id
    } );
} else {
    admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();

const usersCollection = db.collection( "users" );

/**
 * Asynchronous Method to get all user information.
 * @param {func} callback - A function to pass output to.
 * @return {Object[]} userData - Array of objects containing
 * - active: {Bool} Account is currently receiving email updates.
 * - selections: {String[]} selections/subscription keywords
 * - email: {String} User's email
 * - displayName: {String} User's display name
 */
export async function getUserInfo() {
    try {
        const users = await usersCollection.get();

        const userData = await Promise.all(
            users.docs.map( async ( user ) => {
                const { active, selections } = user.data();
                const { email, displayName } = await auth.getUser( user.id );
                return { email, displayName, active, selections };
            } )
        );

        return userData;
    } catch ( err ) {
        console.error( err );
    }
}

/**
 * Method to remove duplicate selections - only if active is true.
 * @param {Array.<object>} userInfo Array of Objects derived from getUserInfo()
 * @return {Promise<array>} Returns an array of unique selections
 */
export function getUniqueSelections( userInfo ) {
    const uniqueSel = [...new Set( userInfo.flatMap( ( user ) => user.selections ) )];
    return Promise.resolve( uniqueSel );
}

/**
 * Method to combine/match the articles subscriptions
 * @param {Array<object>} articles Array of objects containing article(s)
 * @param {Array<object>} users Array of objects of user info
 * @return {Promise<object>} Promise for user info and subscriptions
 */
export function packageEmailAndArticles( articles, users ) {
    for ( const user of users ) {
        user['searchArticles'] = [];
        const { selections } = user;
        selections.forEach( ( selection ) => {
            if ( articles.hasOwnProperty( selection ) ) {
                user['searchArticles'].push( { sectionTitle: selection, articles: articles[selection] } );
            };
        } );
        
        // Deduplicate articles in all sections
        user.searchArticles = dedupeSections( user.searchArticles );
        
        // remove article subjects if empty
        const lastIndex = user.searchArticles.length - 1;
        for ( let i = lastIndex; i >= 0; i -= 1 ) {
            if ( user.searchArticles[i].articles.length === 0 ) user.searchArticles.splice( i, 1 );
        }
    }
    return users;
}

// Function to remove duplicates per user—to prevent the same article showing up in different sections
function dedupeSections( searchArticles ) {
    const seen = new Set();

    return searchArticles.map( section => {
        const filteredArticles = section.articles.filter( article => {
            const { web_url, thumbnail } = article;
            if ( seen.has( web_url ) ) return false;
            seen.add( web_url );
            // if thumbnail missing - insert default placeholder
            if ( thumbnail.length === 0 ) article.thumbnail = "https://avatars.githubusercontent.com/u/221409?s=75";
            return true;
        } );
        return { ...section, articles: filteredArticles };
    } );
};
