module.exports = function(){
  this.deal = function(numberOfCards, arrayOfHands){
    var cards = getCardsInDeck();
    for(var i = 0; i < numberOfCards; i++){
      for(var j = 0; j < arrayOfHands.length; j++){
        var hand = arrayOfHands[j];
        var index = Math.floor(Math.random()*cards.length);
        hand.push(cards[index]);
        cards.splice(index, 1);
      }
    }
  };
};

function playingCard(suit, value, sort){
  return {
    suit: suit,
    value: value,
    sort: sort
  };
}

function getCardsInDeck(){
  return [
    playingCard('Club', 'Two', 2),
    playingCard('Club', 'Three', 3),
    playingCard('Club', 'Four', 4),
    playingCard('Club', 'Five', 5),
    playingCard('Club', 'Six', 6),
    playingCard('Club', 'Seven', 7),
    playingCard('Club', 'Eight', 8),
    playingCard('Club', 'Nine', 9),
    playingCard('Club', 'Ten', 10),
    playingCard('Club', 'Jack', 11),
    playingCard('Club', 'Queen', 12),
    playingCard('Club', 'King', 13),
    playingCard('Club', 'Ace', 14),
    playingCard('Diamond', 'Two', 2),
    playingCard('Diamond', 'Three', 3),
    playingCard('Diamond', 'Four', 4),
    playingCard('Diamond', 'Five', 5),
    playingCard('Diamond', 'Six', 6),
    playingCard('Diamond', 'Seven', 7),
    playingCard('Diamond', 'Eight', 8),
    playingCard('Diamond', 'Nine', 9),
    playingCard('Diamond', 'Ten', 10),
    playingCard('Diamond', 'Jack', 11),
    playingCard('Diamond', 'Queen', 12),
    playingCard('Diamond', 'King', 13),
    playingCard('Diamond', 'Ace', 14),
    playingCard('Heart', 'Two', 2),
    playingCard('Heart', 'Three', 3),
    playingCard('Heart', 'Four', 4),
    playingCard('Heart', 'Five', 5),
    playingCard('Heart', 'Six', 6),
    playingCard('Heart', 'Seven', 7),
    playingCard('Heart', 'Eight', 8),
    playingCard('Heart', 'Nine', 9),
    playingCard('Heart', 'Ten', 10),
    playingCard('Heart', 'Jack', 11),
    playingCard('Heart', 'Queen', 12),
    playingCard('Heart', 'King', 13),
    playingCard('Heart', 'Ace', 14),
    playingCard('Spade', 'Two', 2),
    playingCard('Spade', 'Three', 3),
    playingCard('Spade', 'Four', 4),
    playingCard('Spade', 'Five', 5),
    playingCard('Spade', 'Six', 6),
    playingCard('Spade', 'Seven', 7),
    playingCard('Spade', 'Eight', 8),
    playingCard('Spade', 'Nine', 9),
    playingCard('Spade', 'Ten', 10),
    playingCard('Spade', 'Jack', 11),
    playingCard('Spade', 'Queen', 12),
    playingCard('Spade', 'King', 13),
    playingCard('Spade', 'Ace', 14)
  ];
}