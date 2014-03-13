var fs = require('fs');

var frames = [];

module.exports = fs.readFileSync(process.cwd() + '/frames.txt', {
  'encoding': 'utf8'
}).split('|');