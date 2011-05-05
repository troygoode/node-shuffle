var shuffle = require('../index');
var deck = shuffle.shuffle(); //could pass in a different deck or seed here

var dealer = [], player = [];
deck.deal(2, [dealer, player]);
outputGameStatus(dealer, player);

var input = process.openStdin();
input.setEncoding('utf8');

input.on('data', function(command){
  switch(command.toLowerCase()){
    case 'stay\n':
      console.log('bye bye!')
      break;
    case 'hit\n':
      break;
    //should also handle double-down and split
  }
  outputGameStatus(dealer, player);
});

function outputGameStatus(dealer, player){
  console.log('Dealer: ' + dealer.length);
  console.log('Player: ' + player.length);
  console.log('Stay or hit?');
}