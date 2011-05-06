var shuffle = require('../index'),
    hand = require('./blackjack-hand');

var dealerHasStayed = false,
    playerHasStayed = false;

var dealer = new hand(),
    player = new hand();

var deck = shuffle.shuffle();
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
        playerHasStayed = true;
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
  var dealerScore = dealer.score();
  var playerScore = player.score();
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
  var dealerScore = dealer.score();
  var playerScore = player.score();
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
    dealer.toString(!playerHasStayed),
    dealer.highestValue(),
    dealer.lowestValue());
  console.log('Player: %s cards (Total-High: %d, Total-Low: %d)\n',
    player.toString(),
    player.highestValue(),
    player.lowestValue());
}