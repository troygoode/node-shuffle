var blackjackGame = require('./blackjack-game');
var game = new blackjackGame();

var input = process.openStdin();
input.setEncoding('utf8');

game.onPlayerInputNeeded = function(next){
  input.once('data', function(command){
    next(command.substring(0, command.length -1));
  });
};
game.onEnd = function(){
  input.destroy();
}
game.begin();