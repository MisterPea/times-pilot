const axios = require("axios");
const apiKey = process.env.NYT_API_KEY;
const uri = (q, key) =>
  `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&sort=relevance&${currentDate()}&api-key=${key}`;

const currentDate = () => {
  const dateObject = new Date();
  const year = dateObject.getUTCFullYear();
  const month = ("0" + (dateObject.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getUTCDate()).slice(-2);
  return `begin_date=${year}${month}${day}&end_date=${year}${month}${day}`;
};

// Helper function to delay execution for a given number of milliseconds
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Method that returns up to 10 articles with text and links
 * @param {String} searchTerm Term which derived from facet keywords
 * @param {function} callback callback function receives array of object(s):
 * - headline: Headline
 * - web_url: URL of the article
 * - abstract: Article summary
 * - thumbnail: URL of the thumbnail image
 */
async function getSelectionFromAPI(searchTerm, callback, retries = 3, retryDelay = 3000) {
  const articles = { searchTerm, articles: [] };
  try {
    const response = await axios({
      method: 'get',
      url: encodeURI(uri(searchTerm, apiKey)),
      headers: { Accept: "application/json" }
    });
    const result = response.data.response.docs;
    if (result.length > 0) {
      for (let i = 0; i < result.length; i += 1) {
        const tempArticle = {};
        tempArticle.headline = result[i].headline.main;
        tempArticle.web_url = result[i].web_url;
        tempArticle.abstract = result[i].abstract;
        for (const images of result[i].multimedia) {
          if (images.subtype === "thumbnail" && images.height === 75) {
            tempArticle.thumbnail = `https://www.nytimes.com/${images.url}`;
          }
        }
        articles.articles.push(tempArticle);
      }
      callback(articles);
    }
  } catch (err) {
    console.error(`Error thrown from getSelectionFromAPI: ${err}:${err.response && err.response.data ? err.response.data : 'No additional error information'}`);
    if (err.response && err.response.status === 429) {
      if (retries > 0) {
        console.log(`Retrying after ${retryDelay}ms`);
        await delay(retryDelay);
        return getSelectionFromAPI(searchTerm, callback, retries - 1, retryDelay * 2);
      } else {
        console.error('Max retries reached');
      }
    } else {
      console.error(err);
    }
  }
}

module.exports = { getSelectionFromAPI };
