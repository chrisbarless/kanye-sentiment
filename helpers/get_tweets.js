var fs = require('fs'),
  Twit = require('twit'),
  _ = require('lodash'),
  tweetFile = 'tweets.txt',
  encoding = 'utf8';

var T = new Twit(require('../twitconfig'));
var writeTweets = function(){
  var searchParams = {q: "kanye", count: 100, result_type: "recent"};
  T.get('search/tweets', searchParams, function(err, data) {
    var tweets;
    if (err) throw err;
    if (data.statuses.length === 0) return false;
    tweets = _.pluck(data.statuses, 'text').join('|SPLIT|');
    fs.writeFileSync(tweetFile, tweets, { encoding: encoding });
    console.log('Wrote %d tweets', tweets.length);
  });
};

writeTweets();

module.exports = {};
