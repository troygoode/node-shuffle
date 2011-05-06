# shuffle

Shuffle is a node.js package for shuffling and dealing decks of cards (or anything else you'd like to shuffle).

## Installation

    $ npm install shuffle

## Quick Start

Using shuffle is simple:

    var shuffle = require('shuffle');
    var deck = shuffle.shuffle();
    var card = deck.draw();

Alternatively you can draw multiple cards at once:

    var hand = deck.draw(5);

You can also use it to deal cards to multiple hands:

    var player1, player2, player3, player4;
    deck.deal(5, [player1, player2, player3, player4]);
    
The above deals a card to player #1 then player #2 then player #3 then player #4 then back again to player #1 until each player has five cards.

If you need to reset and reshuffle the deck, it is as easy as:

    deck.reset(); //sets the deck back to a full 52-card deck, unshuffled
    deck.shuffle();

## More Stuff

You don't have to shuffle standard playing cards. You can shuffle other stuff too:

    var shuffle = require('shuffle');
    var goFish = [{color: 'red', number: 1}, {color: 'blue', number: 2}, ...];
    var deck = shuffle.shuffle({deck: goFish});

You can also supply your own randomizer so that you can - for instance - supply a custom seed:

    var shuffle = require('shuffle');
    var srand = require('srand');
    srand.seed(1000);
    var deck = shuffle.shuffle({random: function(){ return srand.rand(); }});
    
Other deck methods:

    deck.drawFromBottomOfDeck() // 1 card
    deck.drawFromBottomOfDeck(5) / array of 5 cards
    
    deck.drawRandom() // 1 card
    deck.drawRandom(5) // array of 5 cards
    
    deck.putOnTopOfDeck(card)
    deck.putOnTopOfDeck([card, card, card])
    
    deck.putOnBottomOfDeck(card)
    deck.putOnBottomOfDeck([card, card, card])
    
    deck.length() // integer (# of cards left in deck)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Author

[Troy Goode](https://github.com/TroyGoode) ([troygoode@gmail.com](mailto:troygoode@gmail.com))