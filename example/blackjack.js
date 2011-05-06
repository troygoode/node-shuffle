var blackjackGame = require('./blackjack-game');
var game = new blackjackGame();

var input = process.openStdin();
input.setEncoding('utf8');

game.onPlayerInputNeeded = function(callback){
  input.once('data', function(command){
    callback(command.substring(0, command.length -1));
  });
};
game.onEnd = function(){
  input.destroy();
}
game.begin();