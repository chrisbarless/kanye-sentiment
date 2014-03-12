var fs = require('fs'),
  Twit = require('twit'),
  _ = require('lodash'),
  sentiment = require('sentiment');

var readTweets = function(){
  var tweetFile = 'tweets.txt', tweets;
  tweets = fs.readFileSync(tweetFile, { encoding: 'utf8' });
  return JSON.parse(tweets);
};

var buildTweets = function(){
  var goodTweets = [],
      badTweets = [],
      frontendData = [];

  readTweets().forEach(function(tweet){
    sentiment(tweet.text, function(err, result){
      if (err) throw err;
      var obj = {
        text: tweet.text,
        user: tweet.user,
        positive: result.positive,
        negative: result.negative,
        score: result.score
      };
      frontendData.push(obj);
    });
  });

  return _.shuffle(frontendData);
};

module.exports = function(){
  return buildTweets();
};