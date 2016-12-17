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
    "movie-this": function() {
        inquirer.prompt([{
            name: 'name',
            message: "Movie name:"
        }]).then(function(answers) {

            request("http://www.omdbapi.com/?t=" + answers.name + "&y=&plot=full&r=json&tomatoes=true", function(error, response, body) {

                if (!error && response.statusCode === 200) {

                    console.log("\n" + '    Movie: ' + JSON.parse(body).Title);
                    console.log("\n")
                    console.log("Released: " + JSON.parse(body).Released);
                    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                    console.log("Produced in: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n");
                }
            });
        });
    },
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
                query: answers.name
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