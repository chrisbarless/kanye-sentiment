var fs = require('fs'),
  Twit = require('twit'),
  _ = require('lodash'),
  tweetFile = 'tweets.txt',
  encoding = 'utf8';

var oldTweets = fs.readFileSync(tweetFile);
oldTweets = JSON.parse(oldTweets);

var T = new Twit(require('../twitconfig'));

var writeTweets = function(){
  var searchParams = {q: "kanye", count: 100, result_type: "mixed"};
  T.get('search/tweets', searchParams, function(err, data) {
    var newTweets, tweets;
    if (err) throw err;
    if (data.statuses.length === 0) return false;
    newTweets = _.map(data.statuses, function(tweet){
      return {
        text: tweet.text,
        user: tweet.user.screen_name
      };
    });
    tweets = _.uniq(oldTweets.concat(newTweets), function(tweet){
      return tweet.text;
    });
    fs.writeFileSync(tweetFile, JSON.stringify(tweets), { encoding: encoding });
    console.log('Wrote %d tweets', tweets.length);
  });
};

writeTweets();
