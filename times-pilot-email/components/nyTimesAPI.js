import axios from "axios";
const apiKey = process.env.NYT_API_KEY;

// Helper function to delay execution for a given number of milliseconds
function delay( ms ) {
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

/**
 * Method that returns up to 10 articles with text and links
 * @param {String[]} topics Term which derived from facet keywords
 * - headline: Headline
 * - web_url: URL of the article
 * - abstract: Article summary
 * - thumbnail: URL of the thumbnail image
 */
export async function getArticles( topics ) {
  const articleData = {};
  const today = new Date().toISOString().split( 'T' )[0];
  const fq = `firstPublished:["${today}T00:00:00Z" TO "${today}T23:59:59Z"]`;
  const uri = ( q, key ) => `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent( `"${q}"` )}&fq=${encodeURIComponent( fq )}&sort=newest&api-key=${key}`;
  const urlsAndTopics = topics.map( ( topic ) => ( { url: uri( topic, apiKey ), topic: topic, retry: 0 } ) );

  while ( urlsAndTopics.length > 0 ) {

    // We pop off a url if it's successful we pop the next else we re-queue it
    const { url, topic, retry } = urlsAndTopics.pop();

    // API call
    const { success, data } = await getSelectionFromAPI( url );
    if ( success ) {
      articleData[topic] = flattenArticles( data || [] );
    } else if ( retry < 4 ) {
      urlsAndTopics.push( { url, topic, retry: retry + 1 } );
    } else {
      // if 5 errors stop trying
      console.warn( 'ERROR with:', url, '--', 'TOPIC:', topic );
    }

    // Timeout between calls
    await delay( 13000 );
  }
  return articleData;
}

function flattenArticles( data ) {
  const articles = [];
  for ( let i = 0; i < data.length; i += 1 ) {
    const tempArticle = {};
    tempArticle.headline = data[i].headline.main;
    tempArticle.web_url = data[i].web_url;
    tempArticle.abstract = data[i].abstract;
    tempArticle.thumbnail = data[i].multimedia.thumbnail.url;
    articles.push( tempArticle );
  }
  return articles;
}

async function getSelectionFromAPI( url ) {
  try {
    const response = await axios( {
      method: 'get',
      url: url,
      headers: { Accept: "application/json" }
    } );

    return { success: true, data: response.data.response.docs };
  }

  catch ( err ) {
    return { success: false, data: undefined };
  }
}


