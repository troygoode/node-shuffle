var util = require('util');

//TODO: replace with seedable random
function random(){
  return Math.random();
}

//array shuffling algorithm: http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function fisherYates(arr){
  var i = arr.length;
  if(i === 0)
    return false;
  while(--i){
     var j = Math.floor(random() * (i + 1));
     var tempi = arr[i];
     var tempj = arr[j];
     arr[i] = tempj;
     arr[j] = tempi;
  }
}

module.exports = function(cards, seed){
  this.reset = function(){
    this.cards = cards.slice(0);
  }
  this.shuffle = function(){
    fisherYates(this.cards);
  }
  
  this.reset();
  this.shuffle();
  
  this.deal = function(numberOfCards, arrayOfHands){
    for(var i = 0; i < numberOfCards; i++)
      for(var j = 0; j < arrayOfHands.length; j++)
        arrayOfHands[j].push(this.cards.pop());
  };

  this.draw = function(){
    return this.cards.pop();
  };
  
  this.drawFromBottomOfDeck = function(){
    return this.cards.shift();
  }
  
  this.drawRandom = function(){
    var index = Math.floor(random() * this.cards.length);
    var card = this.cards[index];
    this.cards.splice(index, 1);
    return card;
  };
  
  this.putOnTopOfDeck = function(card){
    this.cards.push(card);
  }
  
  this.putOnBottomOfDeck = function(card){
    this.cards.unshift(card);
  }
};