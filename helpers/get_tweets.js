var fs = require('fs'),
  Twit = require('twit'),
  _ = require('lodash'),
  tweetFile = 'tweets.txt',
  encoding = 'utf8';

var T = new Twit(require('../twitconfig'));
var writeTweets = function(){
  var searchParams = {q: "kanye", count: 100, result_type: "mixed"};
  T.get('search/tweets', searchParams, function(err, data) {
    var tweets;
    if (err) throw err;
    if (data.statuses.length === 0) return false;
    tweets = _.chain(data.statuses)
      .map(function(tweet){
        return {
          text: tweet.text,
          user: tweet.user.screen_name
        };
      })
      .uniq(function(tweet){
        return tweet.text;
      })
      .value();
    fs.writeFileSync(tweetFile, JSON.stringify(tweets), { encoding: encoding });
    console.log('Wrote %d tweets', tweets.length);
  });
};

writeTweets();

module.exports = {};
