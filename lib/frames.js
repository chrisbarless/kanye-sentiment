var fs = require('fs');

var frames = [];

module.exports = fs.readFileSync(process.cwd() + '/frames.dat', {
  'encoding': 'utf8'
}).split('|');