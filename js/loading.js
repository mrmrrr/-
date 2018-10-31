var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WebGL, 'phaser-example');

window.onload = function(){
    game.state.add('boot',bootState);
    game.state.add('game',gameState);
    game.state.start('game');//ПОМЕНЯТЬ НА boot
}
