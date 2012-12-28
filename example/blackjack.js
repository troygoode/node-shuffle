var BlackjackGame = require('./blackjack-game'),
    game = new BlackjackGame(),
    input = process.openStdin();

input.setEncoding('utf8');

game.on('input', function(callback){
  input.once('data', function(command){
    callback(command.substring(0, command.length -1));
  });
});
game.on('end', function(){
  input.destroy();
});
game.begin();
