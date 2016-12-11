var Twitter = require('twitter');

var keysTokens = require("./keys.js")

var client = new Twitter({
  consumer_key: keysTokens.twitterKeys.consumer_key,
  consumer_secret: keysTokens.twitterKeys.consumer_secret,
  access_token_key: keysTokens.twitterKeys.access_token_key,
  access_token_secret: keysTokens.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'Pnickolas'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

