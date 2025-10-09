import { config } from 'dotenv';

config();

import { getUserInfo, getUniqueSelections, packageEmailAndArticles } from './components/userAcctMethods.js';
import { getArticles } from './components/nyTimesAPI.js';

let userData = [];

/**
 * Topmost level of the call chain.
 * This kicks off methods that pull selections from the
 * database, which are then passed into the api:
 * - getUserInfo -> getUserCallback -> uniqueSelections ->
 * - callGetArticleSelections -> rateLimitedCaller ->
 * - getSelectionFromAPI -> getSelectionFromAPIcallback ->
 * - packageEmailAndArticles -> removeDuplicates -> email
 */
async function userInfo() {
    const userData = await getUserInfo();
    const uniqueSelections = await getUniqueSelections( userData );
    const articleData = await getArticles( uniqueSelections );
    const packagedUserArticles = packageEmailAndArticles( articleData, userData );
    console.log( JSON.stringify( packagedUserArticles, undefined, 2 ) );
}

userInfo();
