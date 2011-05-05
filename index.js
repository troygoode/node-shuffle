var util = require('util');
var deck = require('./lib/deck');
var shuffle = module.exports = {};

shuffle.shuffle = function(){
  return new deck();
};