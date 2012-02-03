var util = require('util');
var deck = require('./deck');
var playingCardDeck = require('./playingCardDeck');
var shuffle = module.exports = {};
var defaultOptions = {
  deck: new playingCardDeck().cards,
  random: function(){ return Math.random(); }
};

shuffle.playingCards = function(){
  return new playingCardDeck().cards;
}

shuffle.shuffle = function(options){
  if(!options)
    options = defaultOptions;

  if(!options.deck)
    options.deck = defaultOptions.deck;
  if(!options.random)
    options.random = defaultOptions.random;

  return new deck(options.deck, options.random);
};
