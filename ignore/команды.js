game.load.image('^','img/^.png');

game.load.spritesheet('speed','img/speed.png', 0, 0,0);


speed = game.add.sprite(0,0,'speed');

speed.animations.add('speed');
speed.animations.play('speed', 0,true);


