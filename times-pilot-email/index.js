require("dotenv").config();

const { getSelectionFromAPI } = require("./components/nyTimesAPI");
const { composeEmail } = require("./components/sendgridMethods");
const {
  getUserInfo,
  getUniqueSelections,
  packageEmailAndArticles,
} = require("./components/userAcctMethods");

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
exports.userInfo = () => {
  const getUserCallback = (data) => {
    userData = data; // Splitting user data (email etc.) and subscriptions.

    getUniqueSelections(data)
      .then((selectionsArray) => {
        callGetArticleSelections(selectionsArray);
      })
      .catch((err) => {
        console.error(`Failure in userInfo:${err}`);
      });
  };
  getUserInfo(getUserCallback);
};

/**
 * Called by the resolution of getUniqueSelections Promise, which
 * is inside userInfo(). The selections array is then processed at
 * a rate limit of 5 calls per minute (12 sec. between calls).
 * @param {Array<string>} selectionsArray An array of unique search strings.
 */
function callGetArticleSelections(selectionsArray) {
  let i = 0;
  const callbackArticles = [];
  const interval = setInterval(rateLimitedCaller, 12001);

  const getSelectionFromAPIcallback = (data) => {
    callbackArticles.push(data);
  };

  /**
   * Makes calls to the api at selected intervals.
   * Called from interval timer.
   * When the articles are finished being received, they're sent
   * to be matched at packageEmailAndArticles.
   */
  function rateLimitedCaller() {
    if (i === selectionsArray.length) {
      clearInterval(interval);
      packageEmailAndArticles(callbackArticles, userData).then((users) => {
        sendEmails(users);
      });
    } else {
      getSelectionFromAPI(selectionsArray[i], getSelectionFromAPIcallback);
      i++;
    }
  }
}

/**
 * Method to trigger the sending of emails.
 * @param {Array<object>} users Array of user info objects.
 * Each object is composed of:
 * - active {boolean} Is the account holder currently subscribed to emails.
 * - selections {Array<string>} Arrays of user's subscriptions.
 * - displayName {string} User's display name.
 * - email {string} User's email.
 * - searchArticles {Array<object>} Articles based on user's subs.
 */
function sendEmails(users) {
  for (const user of users) {
    if (user.active && user.searchArticles.length != 0) {
      composeEmail(user);
    }
  }
}
