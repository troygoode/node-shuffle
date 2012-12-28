var should = require('should')
  , shuffle = require('../lib');

var rnd = function(){ return .25; }; // de-randomizing

describe('shuffle', function(){
  it('draw() works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var card = deck.draw();
    card.toShortDisplayString().should.equal('2D');
    deck.length.should.equal(51);
  });

  it('draw(2) works', function(){
    var deck = shuffle.shuffle({ random: rnd });
    var cards = deck.draw(2);
    cards[0].toShortDisplayString().should.equal('2D');
    cards[1].toShortDisplayString().should.equal('AC');
    deck.length.should.equal(50);
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
});
