var Twitter = require('twitter');
var spotify = require('spotify');


var keysTokens = require("./keys.js")

// takes the argument and tells the application logic to follow
var command = process.argv[2];

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



if(command === 'twitter'){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log(tweets);
	  }
	});
} else if(command != 'spotify-this-song'){
	spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    		if ( !err ) {
       					console.log(data);
    					}else if (err){
    						console.log('Error occurred: ' + err);
    						return;
    					}
					
});



