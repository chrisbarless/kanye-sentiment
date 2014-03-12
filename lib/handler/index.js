var debug = require('debug')('handler'),
		getTweets = require('../tweets');

// Usually expects "db" as an injected dependency to manipulate the models
module.exports = function (db) {
	debug('setting up handlers...');
	return {
		renderIndex: function (req, res) {
			res.render('index', {
        tweets: getTweets(),
        frames: require('../frames')
      });
		}
	};
};