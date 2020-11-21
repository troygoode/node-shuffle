var should = require('should')
  , shuffle = require('../lib');

var rnd = function(){ return .25; }; // de-randomizing

describe('shuffle', function(){
  it('draw() works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var card = deck.draw();
    should.not.exist(card.length);
    card.toShortDisplayString().should.equal('2D');
    deck.length.should.equal(51);
  });

  it('draw(2) works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var cards = deck.draw(2);
    should.exist(cards.length);
    cards.length.should.equal(2);
    cards[0].toShortDisplayString().should.equal('2D');
    cards[1].toShortDisplayString().should.equal('AC');
    deck.length.should.equal(50);
  });

  it('drawRandom() works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var card = deck.drawRandom();
    should.not.exist(card.length);
    card.toShortDisplayString().should.equal('3D');
    deck.length.should.equal(51);
  });

  it('drawRandom(2) works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var cards = deck.drawRandom(2);
    should.exist(cards.length);
    cards.length.should.equal(2);
    cards[0].toShortDisplayString().should.equal('3D');
    cards[1].toShortDisplayString().should.equal('AS');
    deck.length.should.equal(50);
  });

  it('deal(5) works', function () {
    var deck = shuffle.shuffle({ random: rnd });
    deck.length.should.equal(52);

    var player1 = [], player2 = [];
    deck.deal(5, [player1, player2]);

    deck.length.should.equal(42);
    player1.length.should.equal(5);
    player2.length.should.equal(5);
  });

  it('reset works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var card = deck.draw();
    card.toShortDisplayString().should.equal('2D');
    deck.length.should.equal(51);

    deck.reset();
    card = deck.draw();
    card.toShortDisplayString().should.equal('AS');
    deck.length.should.equal(51);
  });

  it('issue #3', function () {
    var deck = shuffle.shuffle({ random: rnd });
    deck.length.should.equal(52);
    var card = deck.drawFromBottomOfDeck(1);
    deck.length.should.equal(51);
  });

  it('issue #5', function () {
    var deck = shuffle.shuffle({ random: rnd });
    deck.length.should.equal(52);

    var error;
    var player1, player2;
    try {
      deck.deal(5, [player1, player2]);
    } catch (e) {
      error = e;
    }

    should.exist(error);
    should.exist(error.message);
    error.message.should.equal('Deck#deal | Undefined Hand');
  });
});
