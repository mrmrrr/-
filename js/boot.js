var count = 0;

var bootState = {
    preload: function(){
        game.load.image('loadingDuck','loadingDuck.PNG');
    },
    create: function(){
        game.stage.backgroundcolor = '#000';
        loadingDuck = game.add.sprite(0,0,'loadingDuck');
        loadingDuck.x = game.world.centerX;
        loadingDuck.y = game.world.centerY;
        loadingDuck.anchor.setTo(0.5,0.5);
        loadingDuck.scale.setTo(.5,.5);
        // loadingDuck.width = loadingDuck.width/2;
        // loadingDuck.height = loadingDuck.height/2;
        text = game.add.text(0,0, '\n1 %',{font:'bold 40px Arial', fill:'#345bcf'});
        floor = new Phaser.Rectangle(loadingDuck.x-(loadingDuck.width/2)-1, loadingDuck.y-(loadingDuck.height/2), loadingDuck.width+1, loadingDuck.height);

        // floor.x = floor.width-(floor.width/2);
        // floor.width = loadingDuck.width;
        // floor.height = loadingDuck.height;
    },

    update: function(){
        count++;
        text.setText("\n" + count + " %");
        if(count===100){
            game.state.start('game');
        }
        floor.x+=2 ;
    },

    render: function(){
        game.debug.geom(floor,'#000');

    }
    
}
