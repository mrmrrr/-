var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WebGL, 'phaser-example');

window.onload = function(){
    game.state.add('boot', bootState);
    //бут нормально переделать чтобы загружалось
    //нормальная анимация загрк\зки не плавная
    //с рывками и тд
    
    game.state.add('game', gameState);
    game.state.start('game');//ПОМЕНЯТЬ НА boot
}
