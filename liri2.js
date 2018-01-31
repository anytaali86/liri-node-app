var keys = require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

var fileSystem = require("fs");


var spotify = new Spotify({
	id: process.env.SPOTIFY_ID,
	secret: process.env.SPOTIFY_SECRET
});

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

inquirer
.prompt([
			{
				 type: "list",
			     name: "command",
			     message: "\n\nWhat would you like to do?",
			     choices: ["movie", "spotify", "tweets", "random"]
			}
	])
.then(function(iData){
	switch(iData.command){
		case "movie": 
				inquirer
						.prompt([
									{
										 type: "input",
									     name: "movie",
									     message: "Enter a movie name: "
									}
							])
						.then(function(inqResp){
							getMovie(inqResp.movie);
						});
					
				break;
		case "spotify": 
				inquirer
						.prompt([
									{
										 type: "input",
									     name: "song",
									     message: "Enter a song name: "
									}
							])
						.then(function(inqResp){
							getSong(inqResp.song);
						});
					
				break;
		case "tweets": 
				getTweets();
				break;
		case "random": 
				getRandom();
				break;
	}
});

// function getSong(songName){
// 	if(isNullOrEmpty(songName)){
// 		songName = "the sign ace of base";
// 	}

// 	spotify.search({ type:"track", query:songName, limit:1 }, function(err, data) {
// 			  if (err) {
// 			    return console.log('Error occurred: ' + err);
// 			  }
// 			  	var message = "no information found for "+songName;
// 			  	if(data.tracks.items[0]!=null){
// 					var artist = data.tracks.items[0].artists[0].name;
// 					var resultSongName = data.tracks.items[0].name;
// 					var album = data.tracks.items[0].album.name;
// 					var previewLink = data.tracks.items[0].artists[0].external_urls.spotify;
// 					message = "Artists: "+artist+"\nSong Name: "+resultSongName+"\nPreview: "+previewLink+"\nAlbum: "+album;
				
// 				}
// 				console.log(message);
// 				message = "Spotify Search '"+songName+"'\n"+message;
// 				logCommand(message);


// 			});
// }

// function getMovie(movieName){
// 	if(isNullOrEmpty(movieName)){
// 		movieName = "Hidden Figures"; 
// 	}

// 	var requestString = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy";
// 	request(requestString
// 				, function(err, response, body) {
// 					  // 200 means success
// 					  if (!err && response.statusCode === 200) {
// 					  	var message = "no information found for "+movieName;
// 					  	if(JSON.parse(body).Response == "True"){
// 						     message = "Title: "+ JSON.parse(body).Title
// 						    			 +"\nYear: "+JSON.parse(body).Year
// 						    			 +"\nIMDB Rating: "+JSON.parse(body).imdbRating
// 									     +"\nRotten Tomatoes: "+getRTRating(JSON.parse(body).Ratings)
// 									     +"\nCountry: "+JSON.parse(body).Country
// 									     +"\nLanguage: "+JSON.parse(body).Language
// 									     +"\nPlot: "+JSON.parse(body).Plot
// 									     +"\nActors: "+JSON.parse(body).Actors;
// 						}
// 						console.log(message);
// 						message = "Movie Search '"+movieName+"'\n"+message;
// 						logCommand(message);
// 					  }
// 					});


// 	}

function getTweets(){
	var params = {count: 20};
	client.get("statuses/user_timeline", params, function(err, tweets, response) {
	  if(err){ 
	  	  console.log(err); 
	  } else {
		  var message = "";
		  for(i=0; i<tweets.length; i++){
		  	message += "-----------------------------\n"+tweets[i].created_at+"\n"+tweets[i].text+"\n\n"
		  }
		  console.log(message);
		  message = "Tweets Display\n"+message;
		  logCommand(message);
	  }
	});
}

// function getRandom(){
// 	fileSystem.readFile("random.txt", "utf8", function(err, data){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			var message = "Do What It Says ---- ";
// 			var dataArray = data.split(",");
// 			switch(dataArray[0]){
// 				case "spotify-this-song" : 
// 					message += dataArray[0]+" "+dataArray[1]+"-----------------------------\n";
// 					logCommand(message);
// 					getSong(dataArray[1]); 
// 					break;
// 				case "movie-this" : 
// 				    message += dataArray[0]+" "+dataArray[1]+"-----------------------------\n";
// 					logCommand(message);
// 					getMovie(dataArray[1]); 
// 					break;
// 				case "my-tweets" : 
// 				    message += dataArray[0]+"-----------------------------\n";
// 					logCommand(message);
// 					getTweets(); 
// 					break;
// 			}
// 		}
// 	});
// }

// function isNullOrEmpty(inputString){
// 	return inputString==null || inputString.trim() == "";
// }

// function getRTRating (ratingsArray){
// 	for(i=0; i<ratingsArray.length; i++){
// 		if(ratingsArray[i].Source == "Rotten Tomatoes"){
// 			return ratingsArray[i].Value;
// 		}
// 	}
// 	return "N/A";
// }

// function logCommand(message){
// 	var date = new Date();
// 	fileSystem.appendFile("log.txt", "\n"+date+" --- \n"+message+"\n\n\n", function(err) {
// 		  if (err) { 
// 		  	console.log(err);  
// 		  }
// 	});
// }
