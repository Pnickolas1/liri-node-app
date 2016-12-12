
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');

// LINK TO KEYS AND TOKENS PAGE FOR TWITTER API ACCESS
var keysTokens = require("./keys.js")

// takes the argument and tells the application logic to follow
var command = process.argv[2];
var songTitle = process.argv[3];

// twitter api keys & tokens
var client = new Twitter({
  consumer_key: keysTokens.twitterKeys.consumer_key,
  consumer_secret: keysTokens.twitterKeys.consumer_secret,
  access_token_key: keysTokens.twitterKeys.access_token_key,
  access_token_secret: keysTokens.twitterKeys.access_token_secret
});
 



// THESE ARE PARAMETERS BEING PASSED INTO THE TWITTER SEARCH
var params = {screen_name: 'Pnickolas',
			count: 1};

if(command === 'my-tweets'){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log(tweets)
	  	console.log(response)
	  }
	});
} else if(command === 'spotify-this-song'){
	console.log('spotify')					
};



