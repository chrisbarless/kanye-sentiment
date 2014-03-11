var fs = require('fs');

var frames = [];

module.exports = fs.readFileSync(__dirname + '/../frames.dat', {
  'encoding': 'utf8'
}).split('|');