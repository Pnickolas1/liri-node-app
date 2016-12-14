
var fs = require('fs');

// NPM MODULE FOR GETTING API DATA FROM OMDB
var request = require("request");

var Twitter = require('twitter');
var spotify = require('spotify');

var inquirer = require('inquirer');

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
			count: 15,
			};

if(command === 'my-tweets'){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  		console.log("----- Pnickolas tweets -----")
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log(tweets[i].text);
	  		console.log('\n');
	  	}
	  		console.log("----- END -----");
	  }
	});
}

if(command === 'movie-this'){

	inquirer.prompt([{
				name: 'name',
				message: "Movie name:"
	 		}]).then(function(answers){
	 			
	 			console.log(answers.name);

	 			request("http://www.omdbapi.com/?t=" +  answers.name +"&y=&plot=short&r=json", function(error, response, body) {
	 			
	 			if (!error && response.statusCode === 200) {

	 				console.log('You searched for: ' + JSON.parse(body).Title + "\n");
	 				console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	 			}
	 		});
	});
};
