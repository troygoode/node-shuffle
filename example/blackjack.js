var util = require('util');
var shuffle = require('../index');
var deck = shuffle.shuffle(); //could pass in a different deck or seed here
var dealerHasStayed = false;

var dealer = [], player = [];
deck.deal(2, [dealer, player]);
outputGameStatus(dealer, player);

if(!isGameOver()){
  console.log('Stay or hit?');

  var input = process.openStdin();
  input.setEncoding('utf8');
  input.on('data', function(command){
    switch(command.toLowerCase()){
      case 'stay\n':
        input.destroy();
        conductDealersTurns();
        break;
      case 'hit\n':
        var card = deck.draw();
        player.push(card);
        outputGameStatus(dealer, player);
        if(isGameOver())
          input.destroy();
        else
          console.log('Stay or hit?');
        break;
      //TODO: handle double-down and split
      default:
        console.log('Unknown command.');
        break;
    }
  });
}

function conductDealersTurns(){
  while(!dealerHasStayed){
    conductDealersTurn();
    outputGameStatus(dealer, player);
    if(isGameOver())
      break;
  }
}

function conductDealersTurn(){
  var dealerScore = findOptimalValueOfHand(dealer);
  var playerScore = findOptimalValueOfHand(player);
  if(dealerScore >= 16 && dealerScore >= playerScore){
    console.log('\nDealer stays.');
    dealerHasStayed = true;
  }else{
    console.log('\nDealer hits.');
    var card = deck.draw();
    dealer.push(card);
  }
}

function isGameOver(){
  var dealerScore = findOptimalValueOfHand(dealer);
  var playerScore = findOptimalValueOfHand(player);
  if(dealerScore == 21){
    console.log('Dealer has 21, YOU LOSE.\n');
    return true;
  } else if(playerScore > 21){
    console.log('You have busted, YOU LOSE.\n');
    return true;
  } else if(dealerScore > 21){
    console.log('Dealer has busted, YOU WIN!\n');
    return true;
  } else if(dealerHasStayed){
    if(dealerScore >= playerScore)
      console.log('YOU LOSE.\n');
    else
      console.log('YOU WIN!\n');
  }
  return false;
}

function outputGameStatus(dealer, player){
  console.log('\nDealer: %s cards (Total-High: %d, Total-Low: %d)',
    formatHandForDisplay(dealer),
    findHighestValueOfHand(dealer),
    findLowestValueOfHand(dealer));
  console.log('Player: %s cards (Total-High: %d, Total-Low: %d)\n',
    formatHandForDisplay(player),
    findHighestValueOfHand(player),
    findLowestValueOfHand(player));
}

function formatHandForDisplay(hand){
  var ret = [];
  for(var i = 0; i < hand.length; i++)
    ret.push(formatCardForDisplay(hand[i]));
  return ret.join(',');
}

function formatCardForDisplay(card){
  var suit = card.suit.substring(0,1);
  var value;
  switch(card.sort){
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
      value = card.sort;
  }
  return value + suit;
}

function findOptimalValueOfHand(hand){
  //TODO: optimal hand isn't always highest hand...
  return findHighestValueOfHand(hand);
}

function findHighestValueOfHand(hand){
  var ret = 0;
  for(var i = 0; i < hand.length; i++){
    var card = hand[i];
    if(card.value.toLowerCase() == 'ace')
      ret += 11;
    else if(card.sort > 10)
      ret += 10;
    else
      ret += card.sort;
  }
  return ret;
}

function findLowestValueOfHand(hand){
  var ret = 0;
  for(var i = 0; i < hand.length; i++){
    var card = hand[i];
    if(card.value.toLowerCase() == 'ace')
      ret += 1;
    else if(card.sort > 10)
      ret += 10;
    else
      ret += card.sort;
  }
  return ret;
}