var fs = require('fs');
var path = require('path');

var printf = require('printf');
var getBase64Image = require('./datauri').getBase64Image;

var STATIC_SPINNER_HTML = path.join(__dirname, 'browser-static/spinner.html');
var domID = '_GCSplash';
var style = {
  '-webkit-transition': 'opacity 1s',
  'position': 'absolute',
  'top': '0px',
  'left': '0px',
  'width': '100%',
  'height': '100%',
  'z-index': '1',
  'background-size': 'cover'
};

exports.getSplashHTML = function (opts, splashImage) {
  var html = printf('<div id="%(id)s" style="%(style)s; background:#000 url(\'' + getBase64Image(splashImage) + '\') no-repeat;">', {
    id: '_GCSplash',
    style: Object.keys(style).map(function (key) { return key + ':' + style[key] + ';'; })
  });

  if (opts) {
    html += fs.readFileSync(STATIC_SPINNER_HTML, 'utf8')
        .replace(/\[\[x\]\]/g, opts.x)
        .replace(/\[\[y\]\]/g, opts.y)
        .replace(/\[\[width\]\]/g, opts.width.value + opts.width.unit)
        .replace(/\[\[height\]\]/g, opts.height.value + opts.height.unit)
        .replace(/\[\[offsetX\]\]/g, -opts.width.value / 2 + opts.width.unit)
        .replace(/\[\[offsetY\]\]/g, -opts.height.value / 2 + opts.height.unit)
        .replace(/\[\[color0\]\]/g, opts.color0)
        .replace(/\[\[color1\]\]/g, opts.color1);
  }

  html += '</div>';
  return html;
};
