require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input1 = process.argv[2];
var input2 = process.argv[3];

function myTweets() {
  var params = { screen_name: "nodejs" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(tweets[0].text);
      console.log(tweets[0].created_at);
    }
  });
}

function spotifySong() {
  spotify.search({ type: "track", query: input2 }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Name: " + input2);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].album.external_urls);
  });
}
function movieThis() {
  let url =
    "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy";
  console.log(url);
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("The name of the movie is: " + JSON.parse(body).Title);
      console.log("The movie came out in: " + JSON.parse(body).Year);
      console.log(
        "The movie is rated: " + JSON.parse(body).imdbRating + " by imdb"
      );
      console.log("The movie was produced in: " + JSON.parse(body).Country);
      console.log("The movie's language is: " + JSON.parse(body).Language);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);
    }
  });
}

if (input1 == "myTweets") {
  myTweets();
} else if (input1 == "spotifySong") {
  spotifySong();
} else if (input1 == "movieThis") {
  movieThis();
} else {
  console.log("input needed");
}
