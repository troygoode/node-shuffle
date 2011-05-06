var util = require('util');

module.exports = function(cards, random){
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

  this.draw = function(num){
    if(!num || num <= 1)
      return this.cards.pop();
    
    var ret = [];
    for(var i = 0; i < num; i++)
      ret.push(this.cards.pop());
    return ret;
  };
  
  this.drawFromBottomOfDeck = function(num){
    if(!num || num <= 1)
      return this.cards.shift();
    
    var ret = [];
    for(var i = 0; i < num; i++)
      ret.push(this.cards.shift());
    return ret;
  }
  
  this.drawRandom = function(num){
    var index = Math.floor(random() * this.cards.length);
    var card = this.cards[index];
    this.cards.splice(index, 1);
    return card;
  };
  
  this.putOnTopOfDeck = function(cards){
    if(!cards instanceof Array)
      this.cards.push(cards);
    else
      for(var i = 0; i < cards.length; i++)
        this.cards.push(cards[i]);
  }
  
  this.putOnBottomOfDeck = function(cards){
    if(!cards instanceof Array)
      this.cards.unshift(cards);
    else
      for(var i = 0; i < cards.length; i++)
        this.cards.unshift(cards[i]);
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
};