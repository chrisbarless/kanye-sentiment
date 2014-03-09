var fs = require('fs'),
    Twit = require('twit'),
    _ = require('lodash'),
    sentiment = require('sentiment'),
    tweetFile = 'tweets.txt',
    encoding = 'utf8',
    frontendExport = [];


var T = new Twit(require('../twitconfig'));
var writeTweets = function(){
    var searchParams = {q: "kanye", count: 100, result_type: "recent"};
    T.get('search/tweets', searchParams, function(err, data) {
        var tweets;
        if (err) throw err;
        if (data.statuses.length === 0) return false;
        tweets = _.pluck(data.statuses, 'text').join('\n');
        fs.writeFileSync(tweetFile, tweets, { encoding: encoding });
    });
};
var readTweets = function(){
    return fs.readFileSync(tweetFile, { encoding: encoding }).split('\n');
};

readTweets().forEach(function(tweet){
    sentiment(tweet, function(err, result){
        if (err) throw err;
        if (result.score !== 0){
            frontendExport.push({
                text: tweet,
                score: result.score
            });
        }
    });
});

module.exports = frontendExport;
