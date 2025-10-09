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
        user.searchArticles.filter( Boolean );
    }
    return users;
    // const articleSearch = ( term ) => {
    //     return articles.find( ( article ) => article.searchTerm === term ) || null;
    // };

    // for ( const user of users ) {
    //     const userArticles = user.selections.map( ( select ) => {
    //         return articleSearch( select );
    //     } );
    //     const articleObjects = userArticles.flatMap( ( entry ) => (
    //         entry != null && entry != undefined ? entry : [] ) );

    //     if ( articleObjects.length > 1 ) {
    //         user.searchArticles = removeDuplicateArticles( articleObjects );
    //     } else {
    //         user.searchArticles = articleObjects;
    //     }
    // }
    // return users;
}

/**
 * Simple method to look at web_urls, only passes unique ones through.
 * The information passed in (articleObjects) is for one user at a time.
 * @param {Array<object>} articleObjects Array of arrays of objects
 * @return {Array<object>} Returns an array of arrays of objects
 */
function removeDuplicateArticles( articles ) {
    const tempArray = [];
    // const seenLinks = [];
    // for ( let i = articleObjects.length - 1; i >= 0; i-- ) {
    //     const { searchTerm, articles } = articleObjects[i];
    //     tempArray[i] = { searchTerm: searchTerm, articles: [] };

    //     let articleIndex = 0;
    //     const articleLength = articles.length;
    //     while ( articleIndex < articleLength ) {
    //         const currentArticle = articles[articleIndex];
    //         if ( !seenLinks.includes( currentArticle.web_url ) ) {
    //             seenLinks.push( currentArticle.web_url );
    //             const { headline, abstract, web_url, thumbnail } = currentArticle;
    //             const newThumbnail = !thumbnail ? "https://avatars.githubusercontent.com/u/221409?s=75" : thumbnail;
    //             tempArray[i].articles.push( {
    //                 headline,
    //                 abstract,
    //                 web_url,
    //                 thumbnail: newThumbnail
    //             } );
    //         }
    //         // Look for empty article arrays. Remove them, if not empty, advance index
    //         if ( tempArray[i].articles.length === 0 ) {
    //             console.log( "length 0", tempArray[i].searchTerm );
    //             tempArray.splice( i, 1 );
    //         }
    //         articleIndex++;
    //     }
    // }
    return tempArray;
}
