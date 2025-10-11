import { config } from 'dotenv';
config();

import { getUserInfo, getUniqueSelections, packageEmailAndArticles } from './components/userAcctMethods.js';
import { getArticles } from './components/nyTimesAPI.js';
import { renderEmailHtml } from './components/email.js';

/**
 * Topmost level of the call chain.
 * This kicks off methods that pull selections from the
 * database, which are then passed into the api:
 */
export async function userInfo() {
    console.time('EMAIL ARTICLES TIME')
    console.info( 'Getting User Data' )
    const userData = await getUserInfo();

    console.info( 'Finding Unique News Sections' );
    console.timeLog('EMAIL ARTICLES TIME')
    const uniqueSelections = await getUniqueSelections( userData );

    console.info( 'Getting Article Data From Unique Selections' );
    console.timeLog('EMAIL ARTICLES TIME')
    const articleData = await getArticles( uniqueSelections );

    console.info( 'Pairing Users and Article' );
    console.timeLog('EMAIL ARTICLES TIME')
    const packagedUserArticles = await packageEmailAndArticles( articleData, userData );

    console.info( 'Sending Emails' );
    console.timeEnd('EMAIL ARTICLES TIME')
    renderEmailHtml( packagedUserArticles );
}

