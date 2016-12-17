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
var params = {
    screen_name: 'Pnickolas',
    count: 15,
};
//PUT THE FUNCTIONS INTO AN OBJECT TO ALLOW FOR EXPORT AND EXECUTION LIKE "OBJECT.DO-WHAT-IT-SAYS" from another FILE WITHOUTH HAVING TO WRITE THE CODE AGAIN
var object = {
    "do-what-it-says": function() {
        fs.readFile('./random.txt', "utf-8", (err, data) => {
            if (err) {
                console.log('Error:', +err);
            } else {
                var contents = data.split(",");
                var newCommand = contents[0];
                var randomSong = contents[1];
                console.log(randomSong);
                object[newCommand](randomSong);
            }

        });
    },
    "movie-this": require('./movie-this'),
    "my-tweets": function() {
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
    },
    "spotify-this-song": function() {
        inquirer.prompt([{
            name: 'name',
            message: "Search for song title: "
        }]).then(function(answers) {

            spotify.search({
                type: 'track',
                query: answers.name || "I saw the sign"
            }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    var items = data.tracks.items
                    for (var i = 0; i < items.length; i++) {

                        var item = items[i]
                        var song = item.name
                        console.log(song);

                        var albumName = item.album.name
                        var preview = item.preview_url
                        var artists = item.artists
                        for (var j = 0; j < artists.length; j++) {
                            var artist = artists[j]
                            console.log(artist.name);

                        }
                        console.log("Album Name: " + albumName + "\n")
                        console.log("Preview Title: ", preview)
                    }
                }
            });

        })
    }
}
object[command](songTitle)