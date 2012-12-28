# shuffle

Shuffle is a node.js package for shuffling and dealing decks of cards (or anything else you'd like to shuffle).

[![build status](https://secure.travis-ci.org/TroyGoode/node-shuffle.png)](http://travis-ci.org/TroyGoode/node-shuffle)

## Installation (via [npm](https://npmjs.org/package/shuffle))

```bash
$ npm install shuffle
```

## Quick Start

Using shuffle is simple:

```javascript
var Shuffle = require('shuffle');
var deck = Shuffle.shuffle();
var card = deck.draw();
```

Alternatively you can draw multiple cards at once:

```javascript
var hand = deck.draw(5);
```

You can also use it to deal cards to multiple hands:

```javascript
var player1, player2, player3, player4;
deck.deal(5, [player1, player2, player3, player4]);
```

The above deals a card to player #1 then player #2 then player #3 then player #4 then back again to player #1 until each player has five cards.

If you need to reset and reshuffle the deck, it is as easy as:

```javascript
deck.reset(); //sets the deck back to a full 52-card deck, unshuffled
deck.shuffle();
```

## More Stuff

You don't have to shuffle standard playing cards. You can shuffle other stuff too:

```javascript
var Shuffle = require('shuffle');
var goFish = [{color: 'red', number: 1}, {color: 'blue', number: 2}, ...];
var deck = Shuffle.shuffle({deck: goFish});
```

You can also supply your own randomizer so that you can supply a custom seed:

```javascript
var Shuffle = require('shuffle');
var srand = require('srand'); //https://github.com/isaacs/node-srand (npm install srand)
srand.seed(1000);
var deck = Shuffle.shuffle({random: function(){ return srand.random(); }});
```

Other deck methods:

```javascript
deck.drawFromBottomOfDeck() // 1 card
deck.drawFromBottomOfDeck(5) // array of 5 cards

deck.drawRandom() // 1 card
deck.drawRandom(5) // array of 5 cards

deck.putOnTopOfDeck(card)
deck.putOnTopOfDeck([card, card, card])

deck.putOnBottomOfDeck(card)
deck.putOnBottomOfDeck([card, card, card])

deck.length // integer (# of cards left in deck)
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Troy Goode](https://github.com/TroyGoode) ([troygoode@gmail.com](mailto:troygoode@gmail.com))
