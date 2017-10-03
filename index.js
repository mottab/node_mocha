var express = require('express')
var app = express()

app.set('port', 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


app.get('/', function (req, res) {
  res.send('Hello World')
})

function _pad(hex) {
  return (hex.length === 1 ? "0" + hex : hex);
}

var rgbToHex = function(red, green, blue) {

  var redHex   = red.toString(16);
  var greenHex = green.toString(16);
  var blueHex  = blue.toString(16);

  return _pad(redHex) + _pad(greenHex) + _pad(blueHex);

};

var hexToRgb = function(hex) {
  console.log(hex);
  var red   = parseInt(hex.substring(0, 2), 16);
  var green = parseInt(hex.substring(2, 4), 16);
  var blue  = parseInt(hex.substring(4, 6), 16);
  return [red, green, blue];

};

app.get('/rgbToHex', function(req, res) {
  var red   = parseInt(req.query.red, 10);
  var green = parseInt(req.query.green, 10);
  var blue  = parseInt(req.query.blue, 10);

  var hex = rgbToHex(red, green, blue);
  res.send(hex);
});

app.get('/hexToRgb', function(req, res) {
  var hex = req.query.hex;
  var rgb = hexToRgb(hex);
  res.send(JSON.stringify(rgb));
});

module.exports = {
  hexToRgb : hexToRgb,
  rgbToHex : rgbToHex
};

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    var host = server.address().address;
    console.log('magic happens at port ' + port + ', with host ' + host);
});
