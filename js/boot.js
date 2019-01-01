var count = 0;

var bootState = {
    // preload: function(){
    //     game.load.spritesheet('loader','img/loader.png',400,400,40);
    
    //     game.load.image('purpleBullet','img/purpleBullet.png');
    //     game.load.image('whiteBullet','img/whiteBullet.png');
    //     game.load.image('backBullet','img/backBullet.png');
    //     game.load.image('defaultBullet','img/defaultBullet.png');
        
    //     game.load.image('greenParticleCircle','img/greenParticleCircle.png');
    //     game.load.image('purpleParticleCircle','img/purpleParticleCircle.png');
        
        
    //     game.load.image('like','img/like.png');
    //     game.load.image('sad','img/sad.png');
    //     game.load.image('tile','img/tile.png');
    //     game.load.image('white','img/white.png');
    //     game.load.image('white2','img/white.png');
    
    
    //     game.load.spritesheet('left','img/left.png', 329, 498, 26);
    //     game.load.spritesheet('right','img/right.png', 329, 498, 29);
    
    //     game.load.spritesheet('win','img/win.png',640,480,41);
        
    //     game.load.spritesheet('glass', 'img/glassSprite.png', 1243, 765, 7);
    //     game.load.spritesheet('dots','img/dots.png', 680, 768, 40);
    
    //     game.load.spritesheet('proval','img/proval.png', 640, 480, 43);
        
    //     game.load.spritesheet('arrow','img/arrow.png', 840,577,38);
    //     game.load.spritesheet('arrowL','img/arrow.png', 840,577,38);
    //     game.load.spritesheet('arrowCL','img/arrow.png', 840,577,38);
    //     game.load.spritesheet('arrowCR','img/arrow.png', 840,577,38);
    //     game.load.spritesheet('speed','img/speed.png', 680, 768, 39);
    // },

    create: function(){
        game.stage.backgroundcolor = '#000';
        loader = game.add.sprite(0,0,'loader');
        loader.x = game.world.centerX;
        loader.y = game.world.centerY;
        loader.anchor.setTo(0.5);
        loader.scale.setTo(0.5);
        loader.animations.add('playLoader');
        loader.animations.play('playLoader', 23, true,false);
    },

    update: function(){
        count++;
        // text.setText("\n" + count + " %");
        if(count===100){
            game.state.start('game');
        }
    }
}
