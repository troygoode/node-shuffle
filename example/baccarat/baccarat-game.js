var shuffle = require('../../lib/index'),
    baccaratHand = require('./baccarat-hand'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');
var pThirdCard = -1;
var playerThirdCard;

var shoe = shuffle.shuffle({numberOfDecks: 8}),
    player, banker;

function Game() {
  EventEmitter.call(this);

  var game = this;
  this.onPlayerInputNeeded;
  this.onEnd;

  var handsPlayed = 0;

  //this.begin = function() {
  //  while(shoe.length >= 14) {
  //    console.log("-----------------");
  //    handsPlayed++;
  //    banker = new baccaratHand();
  //    player = new baccaratHand();
  //    shoe.deal(2, [player, banker]);
  //    displayGameStatus();
  //    checkNaturals();
  //    console.log("-----------------");
  //  }
  //
  //  console.log("Hands Played : " + handsPlayed);
  //  game.emit('end');
  //};

  this.begin = function() {
    var handleInput = function(command) {
      if(command.toLocaleLowerCase() === 'n') {
        console.log("Hands Played : " + handsPlayed);
        game.emit('end');
      } else {
        playHand();
        console.log("Deal? (y)");
        game.emit('input', handleInput);
      }
    };

    console.log("========================================");
    console.log("Starting New Shoe.");
    var burnCard = shoe.draw();
    var burnCardValue = 0;

    if(burnCard.description.toLowerCase() === 'ace')
      burnCardValue = 1;
    else if(burnCard.sort >= 10)
      burnCardValue = 10;
    else
      burnCardValue = burnCard.sort;

    console.log("Burn Card : " + burnCard.toShortDisplayString() + ". Burning " + (burnCardValue + 1) + " for " + burnCardValue);
    for(var i = 1 ; i <= burnCardValue ; i++)
      shoe.draw();
    console.log("Shoe length : " + shoe.length);
    console.log("========================================");

    console.log("Deal? (y)");
    game.emit('input', handleInput);
  };

  function playHand() {
    console.log("-----------------");
    handsPlayed++;
    banker = new baccaratHand();
    player = new baccaratHand();
    shoe.deal(2, [player, banker]);
    displayGameStatus();
    checkNaturals();
    console.log("-----------------");
  }

  function checkNaturals() {
    var playerScore = player.score();
    var bankerScore = banker.score();

    if (playerScore === 8 && bankerScore < 8) {
      console.log('P');
      return;
    } else if (playerScore === 9 && bankerScore < 9) {
      console.log('P');
      return;
    } else if (bankerScore === 8 && playerScore < 8) {
      console.log('B');
      return;
    } else if (bankerScore === 9 && playerScore < 9) {
      console.log('B');
      return;
    } else if (bankerScore === 8 && playerScore === 8) {
      console.log('T');
      return;
    } else if (bankerScore === 9 && playerScore === 9) {
      console.log('T');
      return;
    } else {
      thirdCardDraw();
    }
  }

  function thirdCardDraw() {
    var playerScore = player.score();
    var bankerScore = banker.score();

    // When player score is < 6
    if (playerScore < 6 && playerScore >= 0) {
      console.log("Drawing third card for player");
      playerThirdCard = shoe.draw();
      player.push(playerThirdCard);

      // Check banker drawing rules if third card between 0 and 9...
      pThirdCard = playerThirdCard.sort;
      if(pThirdCard >= 0 && pThirdCard <= 9) {
        if (bankerScore === 3 && pThirdCard != 8 ) {
          console.log("Banker 3 and player third Card is not 8");
          var bankerThirdCard = shoe.draw();
          banker.push(bankerThirdCard);
          return checkWinner();
        } else if (bankerScore === 4 && (
            pThirdCard >= 2 && pThirdCard <= 7 )) {
          console.log("Banker 4 and player third card between 2 and 7");
          var bankerThirdCard = shoe.draw();
          banker.push(bankerThirdCard);
          return checkWinner();
        } else if (bankerScore === 5 && (
            pThirdCard >= 4 && pThirdCard <= 7 )) {
          console.log("Banker 5 and player third card between 4 and 7");
          var bankerThirdCard = shoe.draw();
          banker.push(bankerThirdCard);
          return checkWinner();
        } else if (bankerScore === 6 && (
            pThirdCard >= 6 && pThirdCard <= 7 )) {
          console.log("Banker 6 and player 3rd card between 6 and 7");
          var bankerThirdCard = shoe.draw();
          banker.push(bankerThirdCard);
          return checkWinner();
        }
      }
    }

    if(bankerScore >= 0 && bankerScore <= 5) {
      console.log("bankerscore between 0 and 5");
      var bankerThirdCard = shoe.draw();
      banker.push(bankerThirdCard);
      return checkWinner();
    } else {
      // None of the condition satisfied
      console.log("None of the conditions satisfied.");
      return checkWinner();
    }
  }

  function checkWinner() {
    var playerScore = player.score();
    var bankerScore = banker.score();
    if (playerScore > bankerScore) {
      displayGameStatus();
      console.log('P');
      //game.emit('input', handleInput);
    } else if (bankerScore > playerScore) {
      displayGameStatus();
      console.log('B');
      //game.emit('input', handleInput);
    } else {
      displayGameStatus();
      console.log('T');
      //game.emit('input', handleInput);
    }
  }

  function displayGameStatus() {
    console.log('Player: %s (%d)', player.toString(), player.score());
    console.log('Banker: %s (%d)', banker.toString(), banker.score());
    console.log("Deck Size : " + shoe.length);
  }
}

util.inherits(Game, EventEmitter);
module.exports = Game;
