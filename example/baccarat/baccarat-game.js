var shuffle = require('../../lib/index'),
    baccaratHand = require('./baccarat-hand'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    async = require('async'),
    prompt = require('prompt');
var pThirdCard = -1;
var playerThirdCard;

var srand = require('srand');
srand.seed(1000);
var shoe = shuffle.shuffle({random: function(){ return srand.random(); }, numberOfDecks: 8}),
    player, banker;

function Game() {
  EventEmitter.call(this);

  var game = this;
  this.onPlayerInputNeeded;
  this.onEnd;

  var handsPlayed = 0;

  this.begin = function() {
    while(shoe.length >= 14) {
      console.log("-----------------");
      handsPlayed++;
      banker = new baccaratHand();
      player = new baccaratHand();
      shoe.deal(2, [player, banker]);
      displayGameStatus();
      checkNaturals();
      console.log("-----------------");
    }

    console.log("Hands Played : " + handsPlayed);
    game.emit('end');
  };

  function thirdCardDraw() {
    //displayGameStatus();
    var playerScore = player.score();
    var bankerScore = banker.score();

    // When player score is < 6
    if (playerScore < 6 && playerScore >= 0) {
      playerThirdCard = shoe.draw();
      player.push(playerThirdCard);

      // Check banker drawing rules...
      pThirdCard = playerThirdCard.sort;
      if (bankerScore === 3 && pThirdCard != 8 ) {
        console.log("Banker 3 and player third Card is not 8");
        var bankerThirdCard = shoe.draw();
        banker.push(bankerThirdCard);
        checkWinner();
      } else if (bankerScore === 4 && (
          pThirdCard >= 2 && pThirdCard <= 7 )) {
        console.log("Banker 4 and player third card between 2 and 7");
        var bankerThirdCard = shoe.draw();
        banker.push(bankerThirdCard);
        checkWinner();
      } else if (bankerScore === 5 && (
          pThirdCard >= 4 && pThirdCard <= 7 )) {
        console.log("Banker 5 and player third card between 4 and 7");
        var bankerThirdCard = shoe.draw();
        banker.push(bankerThirdCard);
        checkWinner();
      } else if (bankerScore === 6 && (
          pThirdCard >= 6 && pThirdCard <= 7 )) {
        console.log("Banker 6 and player 3rd card between 6 and 7");
        var bankerThirdCard = shoe.draw();
        banker.push(bankerThirdCard);
        checkWinner();
      }
    } else if(bankerScore >= 0 && bankerScore <= 5) {
      var bankerThirdCard = shoe.draw();
      banker.push(bankerThirdCard);
      checkWinner();
    } else if(bankerScore >= 7) {
      checkWinner();
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

  function checkNaturals() {
    var playerScore = player.score();
    var bankerScore = banker.score();

    if (playerScore === 8 && bankerScore < 8) {
      displayGameStatus();
      console.log('P');
    } else if (playerScore === 9 && bankerScore < 9) {
      displayGameStatus();
      console.log('P');
      //game.emit('input', handleInput);
    } else if (bankerScore === 8 && playerScore < 8) {
      displayGameStatus();
      console.log('B');
      //game.emit('input', handleInput);
    } else if (bankerScore === 9 && playerScore < 9) {
      displayGameStatus();
      console.log('B');
      //game.emit('input', handleInput);
    } else if (bankerScore == playerScore === 8) {
      displayGameStatus();
      console.log('T');
      //game.emit('input', handleInput);
    } else if (bankerScore == playerScore === 9) {
      displayGameStatus();
      console.log('T');
      //game.emit('input', handleInput);
    } else {
      thirdCardDraw();
    }
  }

  function displayGameStatus() {
    console.log('\nPlayer: %s (%d)', player.toString(), player.score());
    console.log('Banker: %s (%d)', banker.toString(), banker.score());
    console.log("Deck Size : " + shoe.length);
  }
}

util.inherits(Game, EventEmitter);
module.exports = Game;
