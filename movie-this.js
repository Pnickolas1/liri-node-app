var inquirer = require('inquirer');
var request = require('request');

module.exports = function() {
	
        inquirer.prompt([{
            name: 'name',
            message: "Movie name:" 
        }]).then(function(answers) {

            request("http://www.omdbapi.com/?t=" + (answers.name || 'mr nobody')+ "&y=&plot=full&r=json&tomatoes=true", function(error, response, body) {
            		 console.log(error);
                if (!error && response.statusCode === 200 ) {
                		var jsonParse = JSON.parse(body);

                    console.log("\n" + '    Movie: ' + jsonParse.Title);
                    console.log("\n")
                    console.log("Released: " + jsonParse.Released);
                    console.log("The movie's rating is: " + jsonParse.imdbRating);
                    console.log("Produced in: " + jsonParse.Country);
                    console.log("Language: " + jsonParse.Language);
                    console.log("Plot: " + jsonParse.Plot);
                    console.log("Actors: " + jsonParse.Actors);
                    console.log("Rotten Tomatoes Rating: " + jsonParse.tomatoRating);
                    console.log("Rotten Tomatoes URL: " + jsonParse.tomatoURL + "\n");
                
                } else if (response.statusCode != 200){
                    console.log('test')
                }
            });
        });
    }