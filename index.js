var util = require('util');
var deck = require('./lib/deck');
var playingCardDeck = require('./lib/playingCardDeck');
var shuffle = module.exports = {};

shuffle.playingCards = function(){
  return new playingCardDeck().cards;
}

shuffle.shuffle = function(customDeck, seed){
  if(!customDeck)
    customDeck = this.playingCards();
  return new deck(customDeck, seed);
};