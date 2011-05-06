var util = require('util');

module.exports = function(cards, seed){
  //TODO: shuffle cards
  
  //TODO: don't randomly pick cards, pick in order
  this.deal = function(numberOfCards, arrayOfHands){
    for(var i = 0; i < numberOfCards; i++){
      for(var j = 0; j < arrayOfHands.length; j++){
        var hand = arrayOfHands[j];
        var index = Math.floor(Math.random()*cards.length);
        hand.push(cards[index]);
        cards.splice(index, 1);
      }
    }
  };

  //TODO: don't randomly pick cards, pick first card  
  this.draw = function(){
    var index = Math.floor(Math.random()*cards.length);
    var card = cards[index];
    cards.splice(index, 1);
    return card;
  };
};