/**
 * Adapted from:
 * Jscii - Image to ASCII converter
 * http://enotionz.github.com/jscii/
 * Author: Dominick Pham (@enotionz | http://dph.am)
 */

var Canvas = require('canvas'),
    fs = require('fs');

var canvas, ctx,
    frames = [],
    dim = {
      width: 472,
      height: 360
    },
    chars = ['@', '#', '$', '=', '*', '!', ';', ':', '~', '-', ',', '.', '&nbsp;', '&nbsp;'],
    charLen = chars.length - 1;

    dim.width = Math.floor(dim.width / 2);
    dim.height = Math.floor(dim.height / 2);

function newCanvas(){
  canvas = new Canvas(dim.width, dim.height);
  ctx = canvas.getContext('2d');
}

function getChar(val) {
  return chars[parseInt(val * charLen, 10)];
}

function getAsciiString(){
  var width = Math.floor(dim.width),
      height = Math.floor(dim.height),
      len = width * height,
      d = ctx.getImageData(0, 0, width, height).data,
      str = '';

  // helper function to retrieve rgb value from pixel data
  var getRGB = function(i) {
    return [d[i = i * 4], d[i + 1], d[i + 2]];
  };

  for (var i = 0; i < len; i++) {
    if (i % width === 0 && i !== 0){
      str += '<br>';
    }
    var rgb = getRGB(i);
    var val = Math.max(rgb[0], rgb[1], rgb[2]) / 255;
    str += getChar(val);
  }
  return str;
}

newCanvas();

for (var i = 9; i <= 58; i++) {
  img = new Canvas.Image;
  img.src = fs.readFileSync(__dirname + '/../source_images/input_' + i + '.gif');
  ctx.drawImage(img, 0, 0, dim.width, dim.height);
  frames.push(getAsciiString());
  newCanvas();
};

fs.writeFileSync(__dirname + '/../frames.txt', frames.join('|'), {
  'encoding': 'utf8'
});

module.exports = frames;