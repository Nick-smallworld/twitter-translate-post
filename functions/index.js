// loading packages

const functions = require("firebase-functions");
const cors = require('cors')({ origin: '*' });
const got = require('got');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

// loading environemnt variables

const consumer_key = functions.config().env.consumer_key;
const consumer_secret = functions.config().env.consumer_secret;
const deepl_key = functions.config().env.deepl_key;

// define Twitter' endpoint URLs

const endpointURL = `https://api.twitter.com/2/tweets`;

// generate oauth header

const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});


// define the translation function
// using "Deep L" API
// catching the request data, get text, and translate via Deep L

exports.translate = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const uri = "https://api-free.deepl.com/v2/translate?auth_key=" +  deepl_key;
    const options = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      form: {
        "text": request.query.text,
        "target_lang": request.query.lang
      }
    };

    got.post(uri, options).then(res => {
      const result = JSON.parse(res.body)
      console.log(result.translations[0].text);
      response.send(result.translations[0].text);
    });
  });
});


// define the Twitter-post function
// using part of the functions from "Manage-Tweets"
// https://github.com/twitterdev/Twitter-API-v2-sample-code/tree/main/Manage-Tweets


exports.postTweet = functions.https.onRequest((request, response) => {
  cors(request, response, () => {

    const data = {
      "text": request.body.tweettext
    };
  
    const token = {
      key: request.body.access_token,
      secret: request.body.secret
    };
    
    const authHeader = oauth.toHeader(oauth.authorize({
      url: endpointURL,
      method: 'POST'
    }, token));
    
    got.post(endpointURL, {
      json: data,
      responseType: 'json',
      headers: {
        'Authorization': authHeader["Authorization"],
        'user-agent': "twitter-translate-post",
        'Content-Type': "application/json",
        'accept': "*/*"
      }
    }).then(res => {
      response.send(res.body);
    }).catch(err => {
      response.send(err);
    });
  });
});
