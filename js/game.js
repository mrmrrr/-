var height= window.innerHeight;
var width = window.innerWidth;
var glass;

var purpleBulletTime = 0;
var purpleBullet;
var purpleBullets;

var greenBullet;
var greenBullets;
var greenBulletTime = 0;

var bmd;
// var Left;
var starTween;

var gameState = {

preload:function(){
    game.load.image('q','img/q.png');
    game.load.image('q2','img/q2.png');

    game.load.image('purpleBullet','img/purpleBullet.png');
    game.load.image('greenBullet','img/greenBullet.png');
    
    game.load.image('greenParticleCircle','img/greenParticleCircle.png');
    game.load.image('purpleParticleCircle','img/purpleParticleCircle.png');
    
    game.load.image('right','img/right.png');
    game.load.image('left','img/left.png');
    
    game.load.image('like','img/like.png');
    game.load.image('sad','img/sad.png');
    game.load.image('tile','img/tile.png');
    
    game.load.image('leftRocket','img/leftRocket.png');
    game.load.image('rightRocket','img/rightRocket.png');
    
    game.load.spritesheet('glass', 'img/glassSprite.png', 1243, 765, 7);
    game.load.spritesheet('arrowLeft','img/arrowLeft.png',334,171,7);
    game.load.spritesheet('arrowRight','img/arrowRight.png',334,171,7);
    game.load.spritesheet('dots','img/dots.png',680,768,40);
    game.load.spritesheet('m','img/m.png',61,768,32);

    game.load.spritesheet('arrow','img/arrow.png',680,768,33);

},

create:function (){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.stage.backgroundColor = '#fb2345';
   
    game.stage.backgroundColor = '#000';
    
    this.gridAnimation(); 


    

    //Г Р А Д И Е Н Т Ы
    q = game.add.sprite(width/2, 0, 'q2');
    q.width=0;
    q.height=height;

    q2 = game.add.sprite(width/2, 0, 'q2');
    q2.width=0;
    q2.height=height;

    q.alpha=0;
    q2.alpha=0;

    qTween = game.add.tween(q);
    q2Tween = game.add.tween(q2);
    //C L O S E   Г Р А Д И Е Н Т Ы
    
    
    // STARS = [];

    // for( k = 0; k < 50; k++ ){

    //     star = game.add.sprite(
    //         game.rnd.integerInRange(0,width/2),
    //         game.rnd.integerInRange(0,height),
    //         'greenParticleCircle'
    //     );
        
    //     STARS.push(star);
        
    //     STARS[k].scale.setTo(game.rnd.realInRange(0,0.6));

    //     tweenA = game.add.tween(STARS[k]).to({width:20,height:20},1000,'Linear',true);
    //     tweenB = game.add.tween(STARS[k]).to({width:0,height:0},1000,'Linear',true);
    //     tweenA.chain(tweenB);
    // }


    //  ЭТО ПОЯВЛЯЕТСЯ КОГДА ВЫИГРАЛ ИЛИ  
    //КОРОЧЕ СОЗДАЕТ В А У ЭФФЕКТ



    //КОНЕЦ В А У ЭФФЕКТА


    //
    tilesprite = game.add.tileSprite(0, 0, width/2, height, 'tile');
    tilesprite.alpha=0;
    // tilesprite.alpha=1;
    tilesprite.position.setTo(0,-300);
    tileTweenL = game.add.tween(tilesprite);

    tilesprite2 = game.add.tileSprite(width/2, 0, width/2, height, 'tile');
    tilesprite2.alpha=0;
    // tilesprite2.alpha=1;

    tilesprite2.position.setTo(width/2,-300);
    tileTweenR = game.add.tween(tilesprite2);



    right = game.add.sprite(0,0,'right');
    right.scale.setTo(0.5);
    right.position.x = (width/2);
    right.position.y =  (height/2)-(right.height/2);
    right.bringToTop();
    
    left = game.add.sprite(0,0,'left');
    left.scale.setTo(0.5);
    left.position.x = (width/2)-right.width;
    left.position.y = (height/2) - (left.height/2) ;
    left.bringToTop();
    
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

    leftKey.onDown.add(this.leftDuck, this);
    rightKey.onDown.add(this.rightDuck, this);
    
    // this.bullets();
    
    leftRocket = game.add.sprite(0, 0, 'leftRocket');
    leftRocket.alpha = 0;

    rightRocket = game.add.sprite(0, 0, 'rightRocket');
    rightRocket.alpha = 0;
    
    //ARROW
    //#region 
    // arrowLeft = game.add.sprite(50,0,'arrowLeft');
    // arrowLeft.y=(height-arrowLeft.height)-50;
    // arrowLeft.animations.add('arrowL');
    // arrowLeft.animations.play('arrowL', 10, true);

    // arrowRight = game.add.sprite(0,0,'arrowRight');
    // arrowRight.x = (width-arrowRight.width)-50;
    // arrowRight.y = (height-arrowRight.height)-50;
    // arrowRight.animations.add('arrowR');
    // arrowRight.animations.play('arrowR', 10, true);
    //#endregion
    
    //Rocket Fire
    //#region
    fire = game.add.emitter(100,100, 50);
    fire.makeParticles('greenParticleCircle');
    fire.setXSpeed(0,1000);

    fire2 = game.add.emitter(100,100, 50);
    fire2.makeParticles('purpleParticleCircle');
    fire2.setXSpeed(-1000,0);
    //#endregion
    // sprite.filters = [ filterbeforeimage ];
},

// grid: function(){
//     col_width = (width/4)/4;
//     row_height = height/8;
//     x_pos=0;
//     y_pos=0;
//     pointS={};
//     for(i=0;i<64;i++){
//         if(pointS.point(i) === undefined){
//             pointS.point(i) = 1;
//         }
//     }
//     console.log(pointS.point20);

//     for(v=0;v<8;v++){
//         for(i=0;i<8;i++){
//             point = game.add.sprite(x_pos+(col_width/2), y_pos+(row_height/2), 'greenBullet').scale.setTo(0.05);
            
//             pointS.point;
            
//             x_pos = x_pos+col_width;
//         }
//         y_pos = y_pos+row_height;
//         x_pos = 0;
//     }
// },

// bullets:function(){
//     purpleBullets = game.add.group();
//     purpleBullets.enableBody = true;
//     purpleBullets.physicsBodyType = Phaser.Physics.ARCADE;
    
//     for (var i = 0; i < 20; i++)
//     {
//         var b = purpleBullets.create(0, 0, 'purpleBullet');
//         b.name = 'purpleBullet' + i;
//         b.exists = false;
//         b.visible = false;
//         b.checkWorldBounds = true;
//         b.events.onOutOfBounds.add(this.resetPurpleBullet, this);
//     }

//     greenBullets = game.add.group();
//     greenBullets.enableBody = true;
//     greenBullets.physicsBodyType = Phaser.Physics.ARCADE;

//     for (var i = 0; i < 20; i++)
//     {
//         var b = greenBullets.create(0, 0, 'greenBullet');
//         b.name = 'purpleBullet' + i;
//         b.exists = false;
//         b.visible = false;
//         b.checkWorldBounds = true;
//         b.events.onOutOfBounds.add(this.resetGreenBullet, this);
//     }
// },

//  Ш А Г    У В Е Л И Ч Е Н И Я
leftDuck: function(){
    if(leftKey.isDown && left.x < width/4 ){
        
        qTween.to({
                alpha:1,
                // x:0+1,
                width:-width/2
            },1000,'Linear',true, 400
        );
        tileTweenL.to({
            x:0,
            y:0
        },1000,'Linear',true);

        left.angle=10;
        left.x -=15;
        
        leftRocket.alpha =1;
        leftRocket.angle=15;
        leftRocket.scale.setTo(0.5);
        leftRocket.position.setTo(left.x, left.y+(left.height/2));
        
        fire.position.setTo(leftRocket.x+leftRocket.width-150, leftRocket.y-(leftRocket.height/2)+50)
        fire.start(true,500,null,10);
        
    }else{
        left.x -=40;
    }
},

rightDuck: function(){
    if(rightKey.isDown && right.x>((width/2)+(width/4))-right.width){
        
        q2Tween.to({
            alpha:1,
            // x:(width/2)+1,
            width:width/2
        },1000,'Linear',true, 400);
        
        tileTweenR.to({
            x:width/2,
            y:0
        },1000,'Linear',true);
        
        right.angle=-10;
        
        right.x +=15;

        rightRocket.alpha =1;
        rightRocket.angle=-10;

        rightRocket.scale.setTo(0.5);
        
        fire2.position.setTo(rightRocket.x-50, rightRocket.y-(rightRocket.height/2))
        fire2.start(true,500,null,10);
    }else{
        right.x +=40;
    }
},
        
update:function(){

    //Т А Й Л Я Т С Я    З В Е З Д Ы
    //#region
    if(leftRocket.alpha == 1){
        tilesprite.tilePosition.x += 10;
        tilesprite.tilePosition.y += 10;

    }else{
        tilesprite.tilePosition.x += 0.5;
    }
    
    if(rightRocket.alpha == 1){
        tilesprite2.tilePosition.x -= 10;
        tilesprite2.tilePosition.y += 10;

    }else{
        tilesprite2.tilePosition.x -= 0.5;
    }
    //#endregion

    
    // filterbeforeimage.update();


    //  Н А    С Т А Р Т Е
    //Чтобы стояли на старте, посередине экрана.
    //Иначе двигаются к центру обратно.
    //#region 
    if(left.x==(width/2)-left.width ){
        left.x = (width/2)-left.width;
    }else{
        left.x+=1;
        leftRocket.position.setTo(left.x, left.y+(left.height/2));
    }

    if(right.x==width/2){
        right.x = width/2;
    }else{
        right.x-=1;
        rightRocket.position.setTo(right.x-(rightRocket.width-right.width), right.y+(right.height/2));
    }
    //#endregion 


    // П О Б Е Д И Т Е Л Ь  Л Е В Ы Й
    if(left.x < 0){
        rightKey.enabled = false;
        leftKey.enabled = false;
        
        tilesprite.kill();
        tilesprite2.kill();


        this.leftWIN();
    } 
    
    // П О Б Е Д И Т Е Л Ь  П Р А В Ы Й
    if((right.x+right.width) > width ){
        rightKey.enabled = false;
        leftKey.enabled = false;
        
        tilesprite.kill();
        tilesprite2.kill();

        this.rightWIN();
    }

    //  Д   Ы   М    ИЗ ПОД КОЛЕС  ****** НЕ СДЕЛАН
    //#region

    if (leftKey.isDown){   
        // this.purpleFireBullet();
    }

    if (rightKey.isDown){   
        // this.greenFireBullet();
    }

    //#endregion
},

leftWIN: function (){
    rightKey.enabled = false;
    leftKey.enabled = false;

    left.x = 0;
    left.alpha = 0;
    leftRocket.alpha = 0;

    game.camera.shake(0.05, 700);

    for(i=0;i<4;i++){
        PpurpleEmitter = game.add.emitter(width/2-300, height/2 , 200);
        game.physics.arcade.enable(PpurpleEmitter);
        PpurpleEmitter.checkWorldBounds = true;
        PpurpleEmitter.outOfBoundsKill = true;
        
        PpurpleEmitter.makeParticles('like');
        PpurpleEmitter.setXSpeed(1000, -1000)
        PpurpleEmitter.setYSpeed(1000, -1000)
        PpurpleEmitter.start(false, 900, 10);
    }

    game.add.text(50, 100, "Ю ВИН", {font:'bold 100px Arial', fill:'#fff'});
    
    //SAD EMITTER
    s = game.add.sprite(game.rnd.integerInRange(width/2, width), 0, 'sad');
    game.physics.arcade.enable(s);
    s.scale.setTo(10);
    s.angle =game.rnd.integerInRange(-40,40);
    s.body.collideWorldBounds = true;
    s.body.bounce.setTo(0.5, 0.8);
    s.body.gravity.y =2000;

    game.add.text(width/2 +50, 100, "Ю ЛУУЗ", {font:'bold 100px Arial', fill:'#fff'});
    
    //GLASS ANIM
    glass = game.add.sprite(width/2,0,'glass');
    glass.scale.setTo(0.5,0.5);
    glass.animations.add('glassCrack');
    glass.animations.play('glassCrack', 10,false);
},
rightWIN : function (){
    rightKey.enabled = false;
    leftKey.enabled = false;

    right.x = 0;
    right.alpha = 0;
    rightRocket.alpha = 0;

        
    game.camera.shake(0.05, 700);

    //L I K E
    for(i=0;i<4;i++){
        PpurpleEmitter = game.add.emitter(width/2+300, height/2 , 200);
        game.physics.arcade.enable(PpurpleEmitter);
        PpurpleEmitter.checkWorldBounds = true;
        PpurpleEmitter.outOfBoundsKill = true;
        
        PpurpleEmitter.makeParticles('like');
        PpurpleEmitter.setXSpeed(1000, -1000)
        PpurpleEmitter.setYSpeed(1000, -1000)
        PpurpleEmitter.start(false, 900, 4);
    }

    game.add.text(width/2 +50, 100, "Ю ВИН", {font:'bold 100px Arial', fill:'#fff'});

    //S A D
    s = game.add.sprite(game.rnd.integerInRange(0, width/2-500), 0, 'sad');
    game.physics.arcade.enable(s);
    s.angle =game.rnd.integerInRange(-40,40);
    s.scale.setTo(10);
    s.body.collideWorldBounds = true;
    s.body.bounce.setTo(0.5, 0.8);
    s.body.gravity.y =2000;

    game.add.text(50, 100, "Ю ЛУУЗ", {font:'bold 100px Arial', fill:'#fff'});

    //GLASS ANIM
    glass = game.add.sprite(0, 0, 'glass');
    glass.scale.setTo(0.5,0.5);
    glass.animations.add('glassCrack');
    glass.animations.play('glassCrack', 10,false);
},

abyss: function (){
    // filterbeforeimage = new Phaser.Filter(game, null, fragmentSrcB);

    // filterbeforeimage.setResolution(800, 800);
    // sprite = game.add.sprite();
    // sprite.width = width;
    // sprite.height = width;
    sprite.filters = [ filterbeforeimage ];
},  

// purpleFireBullet: function (){

//     if (game.time.now > purpleBulletTime)
//     {
//         purpleBullet = purpleBullets.getFirstExists(false);

//         if (purpleBullet)
//         {

//             purpleBullet.reset(width/2, game.rnd.integerInRange(0, height - purpleBullet.height));
//             purpleBullet.body.velocity.x = -1000;
//             purpleBulletTime = game.time.now + 250;
            
//         }
//     }
// },

// greenFireBullet: function (){

//     if (game.time.now > greenBulletTime){

//         greenBullet = greenBullets.getFirstExists(false);
        
//         if (greenBullet){

//             greenBullet.reset(width/2, game.rnd.integerInRange(0, height-greenBullet.height));
//             greenBullet.body.velocity.x = 1000;
//             greenBulletTime = game.time.now + 250;

//         }
//     }
// },
//  Called if the bullet goes out of the screen
resetPurpleBullet: function (purpleBullet) {
    purpleBullet.kill();
},
resetGreenBullet: function (greenBullet){
    greenBullet.kill();
},
render: function(){
    // game.debug.spriteBounds(dotsR);
},

gridAnimation: function() {
    dotsL = game.add.sprite(0, 0, 'dots');
    dotsL.width = width / 2;
    dotsL.height = height;
    dotsL.animations.add('l');
    dotsL.animations.play('l', 20, false);
    // dotsL.frame=73;
    
    dotsR = game.add.sprite(0, 0, 'dots');
    dotsR.width = width / 2;
    dotsR.height = height;
    dotsR.anchor.setTo(0.5, 0.5);
    dotsR.scale.x *= -1;
    dotsR.position.setTo(width / 2 - (dotsR.width / 2), 0 + dotsR.height / 2);
    dotsR.animations.add('r');
    dotsR.animations.play('r', 20, false);
    
    // middle = game.add.sprite(0, 0, 'm');
    // middle.height = height;
    // middle.position.setTo((width / 2) - (middle.width / 2), 0);
    // middle.animations.add('m');
    // middle.animations.play('m', 20, false);

    arrowL = game.add.sprite(0, 0, 'arrow');
    arrowL.width = width/2;
    arrowL.height=height;
    arrowL.animations.add('aL');
    arrowL.alpha=0;

    arrowR = game.add.sprite(0, 0, 'arrow');
    arrowR.width = width/2;
    arrowR.height=height;
    arrowR.anchor.setTo(0.5, 0.5);
    arrowR.scale.x *= -1;
    arrowR.position.setTo(width / 2 - (arrowR.width / 2), 0 + arrowR.height / 2);
    arrowR.animations.add('aR');
    arrowR.alpha=0;

    arrowTimer = game.time.create(false);
    arrowTimer.loop(3000,this.arrowStart,this);
    arrowTimer.start();
},
arrowStart: function(){
    arrowL.alpha=1;
    arrowL.animations.play('aL', 20, false);

    arrowR.alpha=1;
    arrowR.animations.play('aR', 20, false);
    
}
}