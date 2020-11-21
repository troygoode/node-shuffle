module.exports = function(suit, description, sort){
  this.suit = suit;
  this.description = description;
  this.sort = sort;

  this.toString = function(){
    return this.description + ' of ' + this.suit + 's';
  }

  this.toShortDisplayString = function(){
    var suit = this.suit.substring(0,1);
    var value;
    switch(this.sort){
      case 11:
        value = 'J';
        break;
      case 12:
        value = 'Q';
        break;
      case 13:
        value = 'K';
        break;
      case 14:
        value = 'A';
        break;
      default:
        value = this.sort;
    }
    return value + suit;
  }
};
