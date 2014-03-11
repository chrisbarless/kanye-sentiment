var fs = require('fs'),
  Twit = require('twit'),
  _ = require('lodash'),
  sentiment = require('sentiment'),
  tweetFile = 'tweets.txt',
  encoding = 'utf8',
  goodTweets = [],
  badTweets = [],
  frontendData = [];

var readTweets = function(){
  return fs.readFileSync(tweetFile, { encoding: encoding }).split('|SPLIT|');
};

readTweets().forEach(function(tweet){
  sentiment(tweet, function(err, result){
    if (err) throw err;
    var obj = {
      text: tweet,
      positive: result.positive,
      negative: result.negative,
      score: result.score
    };
    if (result.score > 1) goodTweets.push(obj);
    if (result.score < -1) badTweets.push(obj);
  });
});

for (var i = 0, len = Math.max(goodTweets.length, badTweets.length); i < len; i++) {
    if (i < goodTweets.length) {
        frontendData.push(goodTweets[i]);
    }
    if (i < badTweets.length) {
        frontendData.push(badTweets[i]);
    }
}

module.exports = frontendData;