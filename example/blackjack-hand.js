module.exports = function(cards){
  if(cards)
    this.cards = cards;
  else
    this.cards = [];

  this.push = function(card){
    this.cards.push(card);
  }

  this.toString = function(hideFirstCard){
    var ret = [];
    for(var i = 0; i < this.cards.length; i++)
      if(hideFirstCard && i === 0)
        ret.push('??');
      else
        ret.push(this.cards[i].toShortDisplayString());
    return ret.join(',');
  }
  
  this.score = function(){
    //TODO: optimal hand isn't always highest hand...
    return this.highestValue();
  }
  
  this.highestValue = function(){
    var ret = 0;
    for(var i = 0; i < this.cards.length; i++){
      var card = this.cards[i];
      if(card.description.toLowerCase() === 'ace')
        ret += 11;
      else if(card.sort > 10)
        ret += 10;
      else
        ret += card.sort;
    }
    return ret;
  }

  this.lowestValue = function(){
    var ret = 0;
    for(var i = 0; i < this.cards.length; i++){
      var card = this.cards[i];
      if(card.description.toLowerCase() === 'ace')
        ret += 1;
      else if(card.sort > 10)
        ret += 10;
      else
        ret += card.sort;
    }
    return ret;
  }
};