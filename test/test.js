var expect = require('chai').expect;
var converter = require('../index');
var request = require("request");

// describe('Array', function(){
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       expect.equal(-1, [1, 2, 3].indexOf(4));
//     });
//   });
// });

describe('color code converter', function() {
  describe('RGB to HEX converter', function() {
    it('covers the basic colors', function () {
      var redHex = converter.rgbToHex(255, 0, 0);
      var greenHex = converter.rgbToHex(0, 255, 0);
      var blueHex = converter.rgbToHex(0, 0, 255);

      expect(redHex).to.equal('ff0000');
      expect(greenHex).to.equal('00ff00');
      expect(blueHex).to.equal('0000ff');
    });
  });
  describe('HEX to RGB converter', function() {
    it('covers the basic colors', function () {
      var red   = converter.hexToRgb("ff0000");
      var green = converter.hexToRgb("00ff00");
      var blue  = converter.hexToRgb("0000ff");

      expect(red).to.deep.equal([255, 0, 0]);
      expect(green).to.deep.equal([0, 255, 0]);
      expect(blue).to.deep.equal([0, 0, 255]);
    });
  });
});

describe('Color code coverter API', function() {
  describe('RGB to HEX API', function() {
    var url = "http://localhost:3000/rgbToHex?red=255&green=255&blue=255";
    it('returns status 200', function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('returns the color in HEX', function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal('ffffff');
        done();
      });
    });
  });
  describe('HEX to RGB API', function() {
    var url = "http://localhost:3000/hexToRgb?hex=00ff00";
    it('returns status 200', function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('returns the color in RGB', function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal('[0,255,0]');
        done();
      });
    })
  });
});
