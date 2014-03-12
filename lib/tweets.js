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
      if (result.score > 1) goodTweets.push(obj);
      if (result.score < -1) badTweets.push(obj);
    });
  });

  goodTweets = _.shuffle(goodTweets);
  badTweets = _.shuffle(badTweets);

  for (var i = 0, len = Math.max(goodTweets.length, badTweets.length); i < len; i++) {
      if (i < goodTweets.length) {
          frontendData.push(goodTweets[i]);
      }
      if (i < badTweets.length) {
          frontendData.push(badTweets[i]);
      }
  }

  return frontendData;
};

module.exports = function(){
  return buildTweets();
};