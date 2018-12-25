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
var starTween;

var arrow;

var rocketTriger = true;
var rocketTrigerR = true;
var naklonTriger = true;
var naklonTrigerR = true;
var backL = true;
var backR = true;


var ChangeGameL = false;
var ChangeGameR = false;
var pad1;
var gameState = {

preload:function(){
    game.load.image('q','img/q.png');
    game.load.image('q2','img/q2.png');



    game.load.image('purpleBullet','img/purpleBullet.png');
    // game.load.image('greenBullet','img/greenBullet.png');
    game.load.image('whiteBullet','img/whiteBullet.png');
    game.load.image('backBullet','img/backBullet.png');
    game.load.image('defaultBullet','img/defaultBullet.png');
    
    game.load.image('greenParticleCircle','img/greenParticleCircle.png');
    game.load.image('purpleParticleCircle','img/purpleParticleCircle.png');
    
    
    game.load.image('like','img/like.png');
    game.load.image('sad','img/sad.png');
    game.load.image('tile','img/tile.png');
    game.load.image('white','img/white.png');
    game.load.image('white2','img/white.png');


    game.load.spritesheet('left','img/left.png', 329, 498, 26);
    game.load.spritesheet('right','img/right.png', 329, 498, 29);

    game.load.spritesheet('win','img/win.png',640,480,41);



    // game.load.spritesheet('engineAnimL','img/rocketAnimL.png', 460, 228, 4);
    // game.load.spritesheet('engineAnimR','img/rocketAnimR.png');
    
    game.load.spritesheet('glass', 'img/glassSprite.png', 1243, 765, 7);
    game.load.spritesheet('arrowLeft','img/arrowLeft.png', 334, 171, 7);
    game.load.spritesheet('arrowRight','img/arrowRight.png', 334, 171, 7);
    game.load.spritesheet('dots','img/dots.png', 680, 768, 40);

    game.load.spritesheet('proval','img/proval.png', 640, 480, 43);
    game.load.spritesheet('arrow','img/arrow.png', 680, 768, 34);
    game.load.spritesheet('speed','img/speed.png', 680, 768, 39);
},

create:function (){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000';
    
 
    rectR = game.add.sprite(width/2,0,'white');
    rectR.alpha=0;
    rectR.width=width/2;
    rectR.height=height;

    rectL = game.add.sprite(0,0,'white2');
    rectL.alpha=0;
    rectL.width=width/2;
    rectL.height=height;  


    //#region Г Р А Д И Е Н Т Ы
    q = game.add.sprite(width/2, 0, 'q');
    q.width=0;
    q.height=height;

    q2 = game.add.sprite(width/2, 0, 'q2');
    q2.width=0;
    q2.height=height;

    points_back = game.add.group();

    // q.alpha=0;
    // q2.alpha=0;

    // qTween = game.add.tween(q);
    // q2Tween = game.add.tween(q2);
    
    //C L O S E   Г Р А Д И Е Н Т Ы
    //  ЭТО ПОЯВЛЯЕТСЯ КОГДА ВЫИГРАЛ ИЛИ  
    //КОРОЧЕ СОЗДАЕТ В А У ЭФФЕКТ
    //КОНЕЦ В А У ЭФФЕКТА
    //#endregion

    //#region Тайлы ЗВЕЗДЫ

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
    //#endregion
    
    
    right = game.add.sprite(0,0,'right');
    right.animations.add('main',[9],20,false);
    right.animations.add('naklon',[8,7,6,5,4],20,false);
    right.animations.add('rotate',[3,2,1,0,19,18,17,16,15,14,13,12,11,10,29,28,27,26,25,24],20,false);
    right.animations.play('main');
    right.scale.setTo(0.7);
    right.position.x = (width/2);
    right.position.y =  (height/2)-(right.height/2) + 80;
    right.bringToTop();

    left = game.add.sprite(0,0,'left');
    left.animations.add('main',[0],20,false);
    left.animations.add('naklon',[1,2,3,4,5],20,false);
    left.animations.add('rotate',[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],20,false);
    left.animations.play('main');
    left.scale.setTo(0.7);
    left.position.x = (width/2)-left.width;
    left.position.y = (height/2) - (left.height/2) + 80;
    left.bringToTop();
    
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

    leftKey.onDown.add(this.leftDuck, this);
    rightKey.onDown.add(this.rightDuck, this);
    

    //#region SPEED
    // speed = game.add.sprite(0,0,'speed');
    // speed.animations.add('speed');

    // speedR = game.add.sprite(0,0,'speed');
    // speedR.animations.add('speedR');
    // speedR.anchor.setTo(.5,.5);
    // speedR.scale.x *= -1;
    // speedR.position.setTo(width+(speedR.width/2),speedR.height/2);
    //#endregion
    
    
    //A R R O W     B L U E 
    //#region 
    // arrow = game.add.sprite(0,0,'arrow');
    // arrow.alpha = 0;
    // arrow.animations.add('arrowPlay');
    // arrowTimer = game.time.create(false);
    // arrowTimer.loop(2700,function(){
    //     arrow.alpha=1;
    //     arrow.animations.play('arrowPlay', 30, true);
    // },this);
    //#endregion
    
    //Rocket Fire
    //#region
    fire = game.add.emitter(100, 100, 50);
    fire.makeParticles('greenParticleCircle');
    fire.setXSpeed(0, 1000);

    fire2 = game.add.emitter(100, 100, 50);
    fire2.makeParticles('purpleParticleCircle');
    fire2.setXSpeed(-1000, 0);
    //#endregion
    
        
    //#region Группы точек
    rect1  = game.add.group(); /* 🎀 */
    rect2  = game.add.group(); /* 💜 */
    rect3  = game.add.group(); /* 🎀 */
    rect4  = game.add.group(); /* 💜 */
    rect5  = game.add.group(); /* 🎀 */
    rect6  = game.add.group(); /* 💜 */
    rect7  = game.add.group(); /* 🎀 */
    rect8  = game.add.group(); /* 💜 */
    rect9  = game.add.group(); /* 🎀 */
    rect10 = game.add.group(); /* 💜 */
    rect11 = game.add.group(); /* 🎀 */
    rect12 = game.add.group(); /* 💜 */
    rect13 = game.add.group(); /* 🎀 */
    rect14 = game.add.group(); /* 💜 */
    rect15 = game.add.group(); /* 🎀 */
    rect16 = game.add.group(); /* 💜 */
    rect17 = game.add.group(); /* 🎀 */
    rect18 = game.add.group(); /* 💜 */
    rect19 = game.add.group(); /* 🎀 */
    rect20 = game.add.group(); /* 💜 */
    
    move = game.add.group();

    points_pink = game.add.group();
    points_purple = game.add.group();
    points_pink_right = game.add.group();
    points_purple_right = game.add.group();
    pointSR = game.add.group();
    
    points_FromCenterLeft = game.add.group();
    points_FromCenterRight = game.add.group();

    //#endregion

    // arrowTimer.start();
    this.grid();
    
    // game.add.tween(q).to({width:width/2,x:0},1000,'Linear',true).loop();
    // game.add.tween(q2).to({width:width/2},1000,'Linear',true).loop();

    game.input.gamepad.start();

    pad1 = game.input.gamepad.pad1;
    pad1.addCallbacks(this, {onConnect: this.addButtons});
},

// АНИМАЦИЯ В КАКУЮ СТОРОНУ НАЖИМАТЬ


//  Ш А Г    У В Е Л И Ч Е Н И Я и появляется РАКЕТА
leftDuck: function(){
    if(left.x < width/4 ){
        if(naklonTriger){
            left.animations.stop('main');
            left.animations.play('naklon',false,false);   
            naklonTriger = false;
        }
        left.x -= (((width/2)/100)*3);
        console.log(left.x);
        
        // speed.animations.play('speed', 20, true);
        
        fire.position.setTo(left.x*0.7, (left.y+left.height/2 +70)*0.7)
        fire.start(true, 500, null, 10);
        
        //Анимация включения двигателя
        // rocketAnimL.position.setTo(left.x,left.y+(left.height/2));
        // rocketAnimL.scale.setTo(0.5);
        // rocketAnimL.alpha=1;
        // rocketAnimL.animations.play('rocketPink', 20, false,true);
    } else{
        left.x -= ((width/2/100)*4);
    }
},

rightDuck: function(){
    if( right.x > ((width/2 + width/4)-right.width) ){
        if(naklonTrigerR){
            right.animations.stop('main');
            right.animations.play('naklon',false,false);   
            naklonTrigerR = false;
        }

        right.x += ((width/2)/100)*3;

        // speedR.animations.play('speedR', 20, true);

        fire2.position.setTo(right.x-70, (right.y+(right.height/2 +70))*0.7 )
        fire2.start(true, 500, null, 10);

        //Анимация включения двигателя
        //тоже самое только для правого переделать
    }
     else{
        right.x +=((width/2/100)*4);
    }
},
//вызывается если нажимается на клавишу
leftDuckChange: function(){
    //25
    // fire.position.setTo( (left.x*0.7),(left.y+left.height/2 +70)*0.7);
    
    left.x += (((width/2)/100)*5);
    
    if(left.x+left.width  > width/2-width/3 ){

        fire.start(true, 500, null, 10);
        
        fire.position.setTo( ((left.x-left.width )*0.7)+50 ,(left.y+left.height/2 +70)*0.7);

        left.x+=(((width/2)/100)*0.9);

        // 🌟 🌟 🌟 П О Б Е Д И Т Е Л Ь           П Р А В Ы Й
        if( (left.x + left.width) > width/2 ){
            this.leftWIN();
        }
    }
},
rightDuckChange: function(){
    // 25
    // fire2.position.setTo( (right.x/0.7)-right.width,(right.y+right.height/2 +70)*0.7);
   
    right.x -= (((width/2)/100)*5);

    if(right.x  < (width/2-width/3) + width/2 + right.width){
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', right.x);
        
        fire2.start(true, 500, null, 10);
        // fire2.position.setTo( (right.x/0.7)-right.width,(right.y+right.height/2 +70)*0.7);
        
        right.x-=(((width/2)/100)*0.9);

        // 🌟 🌟 🌟 П О Б Е Д И Т Е Л Ь       Л Е В Ы Й
        if(right.x < width/2){
            this.rightWIN();
        }
    }
},

addButtons: function(){
    leftBtn = pad1.getButton(Phaser.Gamepad.BUTTON_14);
    rightBtn = pad1.getButton(Phaser.Gamepad.BUTTON_15);

    leftBtn.onDown.add(function(){
        console.log('trueDOWN');
    },this);

    leftBtn.onUp.add(function(){
        console.log('trueUP');
    },this);

},

update: function(){
    //  Н А    С Т А Р Т Е      И     Т Р И Г Е Р
    //Чтобы стояли на старте, посередине экрана.
    //Иначе двигаются к центру обратно.
   
    if (pad1.isDown(Phaser.Gamepad.BUTTON_15))
    {
     console.log('DA');

    }
    if (pad1.isDown(Phaser.Gamepad.BUTTON_14))
    {
        console.log('net');

    }
   
    if( left.x < width/10-100 ) {
        // fire.position.setTo(left.x*0.7,(left.y+left.height/2 +70)*0.7);

        ChangeGameL = true;

        left.animations.stop('naklon');
        
        leftKey.onDown.add(this.leftDuckChange, this);

        if(rocketTriger){
            // fire.position.setTo(left.x/0.7,(left.y+left.height/2));

            left.animations.play('rotate');
            rocketTriger = false;
            this.pointsToCenterLEFT();
            this.pointsFromCenterLEFT();

            fire.setXSpeed(0, -1000);
        }
    }

    if( right.x > (width/2 + (width/2-width/10))-right.width +100 ){
        // fire2.position.setTo( (right.x+right.width)*0.7,(right.y+right.height/2 +70)*0.7);
        
        ChangeGameR = true;
        
        right.animations.stop('naklon');

        rightKey.onDown.add(this.rightDuckChange, this);

        if(rocketTrigerR){
            fire2.position.setTo( (right.x+right.width)*0.7-70,(right.y+right.height/2 +70)*0.7);
            fire2.setXSpeed(0, 1000);

            right.animations.play('rotate');
            rocketTrigerR = false;

            this.pointsToCenterRIGHT();
            this.pointsFromCenterRIGHT();
        }
    }


    if(left.x==(width/2)-left.width){
        left.x = (width/2)-left.width;
    }   else {
            left.x+=(((width/2)/100)*0.2);
    }

    if(ChangeGameL){
        left.x -=(((width/2)/100)*0.5);
    }

    if(right.x==width/2){
        right.x = width/2;
    }   else {
            right.x-=(((width/2)/100)*0.2);
    }

    if(ChangeGameR){
        right.x += (((width/2)/100)*0.5);
    }

    // Б Э К Г Р А У Н Д  становится   Б Е Л Ы Й
    
    

  //#region   //Т А Й Л Я Т С Я    З В Е З Д Ы
    
    
    // if(leftRocket.alpha == 1){
    //     tilesprite.tilePosition.x += 10;
    //     tilesprite.tilePosition.y += 10;
    // }else{
    //     tilesprite.tilePosition.x += 0.5;
    // }
    
    // if(rightRocket.alpha == 1){
    //     tilesprite2.tilePosition.x -= 10;
    //     tilesprite2.tilePosition.y += 10;

    // }else{
    //     tilesprite2.tilePosition.x -= 0.5;
    // }
//#endregion
    
    
     
    //#region  //  Д   Ы   М    ИЗ ПОД КОЛЕС  ****** НЕ СДЕЛАН
    //Отключает анимацию стрелки
    // if(xposL>left.x || xposR<right.x){
        
    // }

    // if (leftKey.isDown){   
    //     // this.purpleFireBullet();
    // }

    // if (rightKey.isDown){   
    //     // this.greenFireBullet();
    // }

    //#endregion

},

leftWIN: function (){
    game.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
    game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);

    left.x = 0;
    left.alpha = 0;
    right.alpha = 0;

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
    
    //SAD EMITTER
    s = game.add.sprite(game.rnd.integerInRange(width/2, width), 0, 'sad');
    game.physics.arcade.enable(s);
    s.scale.setTo(10);
    s.angle =game.rnd.integerInRange(-40,40);
    s.body.collideWorldBounds = true;
    s.body.bounce.setTo(0.5, 0.8);
    s.body.gravity.y =2000;

    // П Р О В А Л    РАЗНОЦВЕТНЫЙ
    proval = game.add.sprite(0,0,'proval');
    proval.alpha=0;
    proval.anchor.setTo(0.5,0);

    proval.scale.setTo(1.3,1.3);
    proval.position.setTo(width/2+width/4,height-proval.height);
    proval.animations.add('p');
    
    
    provalTimer = game.time.create(false);
    provalTimer.loop(500,function(){
        proval.alpha=1;
        proval.animations.play('p', 20, true);
    },this);
    provalTimer.start();

    //GLASS ANIM
    glass = game.add.sprite(width/2,0,'glass');
    glass.scale.setTo(0.5,0.5);
    glass.animations.add('glassCrack');
    glass.animations.play('glassCrack', 10,false);
    
    //WIN 
    win=game.add.sprite(0,0,'win');
    win.anchor.setTo(0.5,0.5);
    win.scale.setTo(1.5);
    win.animations.add('playwin');
    win.position.setTo(width/4,height/2);
    win.animations.play('playwin',20,true);
},
rightWIN : function (){
    game.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
    game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);

    right.x = 0;
    right.alpha = 0;
    // rightRocket.alpha = 0;

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


    //S A D
    s = game.add.sprite(game.rnd.integerInRange(0, width/2-500), 0, 'sad');
    game.physics.arcade.enable(s);
    s.angle =game.rnd.integerInRange(-40,40);
    s.scale.setTo(10);
    s.body.collideWorldBounds = true;
    s.body.bounce.setTo(0.5, 0.8);
    s.body.gravity.y =2000;

    // П Р О В А Л    РАЗНОЦВЕТНЫЙ
    proval = game.add.sprite(0,0,'proval');
    proval.alpha=0;
    proval.scale.setTo(1.3,1.3);
    proval.anchor.setTo(0.5,0);
    proval.position.setTo(width/2-width/4,height-proval.height);
    proval.animations.add('p');
    
    
    provalTimer = game.time.create(false);
    provalTimer.loop(500,function(){
        proval.alpha=1;
        proval.animations.play('p', 20, true);
    },this);
    provalTimer.start();

    //GLASS ANIM
    glass = game.add.sprite(0, 0, 'glass');
    glass.scale.setTo(0.5,0.5);
    glass.animations.add('glassCrack');
    glass.animations.play('glassCrack', 10,false);

    //WIN 
    win=game.add.sprite(0,0,'win');
    win.anchor.setTo(0.5,0.5);
    win.scale.setTo(1.5);
    win.animations.add('playwin');
    win.position.setTo(width/2+width/4,height/2);
    win.animations.play('playwin',20,true);
},

grid: function(){
    
    //#region Back POINTS
    col_width_back = (width/2)/20;
    row_height_back = (height)/20;
    x_pos_back = 0;
    y_pos_back = 0;

    for(v=0;v<20;v++){
        for(i=0;i<20;i++){
            points_back.create(x_pos_back+(col_width_back/2), y_pos_back+(row_height_back/2), 'backBullet').scale.setTo(0.02);
            x_pos_back = x_pos_back+col_width_back;
        }
        y_pos_back = y_pos_back+row_height_back;
        x_pos_back = 0;
    }
    col_width2_back = (width/2)/20;
    row_height2_back = (height)/20;
    x_pos2_back = col_width_back/2;
    y_pos2_back = row_height_back/2;
    for(v=0;v<19;v++){
        for(i=0;i<19;i++){
            points_back.create(x_pos2_back+(col_width2_back/2), y_pos2_back+(row_height2_back/2),'backBullet').scale.setTo(0.02);
            x_pos2_back = x_pos2_back+col_width2_back;
        }
        y_pos2_back = y_pos2_back+row_height2_back;
        x_pos2_back = col_width_back/2;
    }

    //Правые
    col_width_back = (width/2)/20;
    row_height_back = (height)/20;
    x_pos_back = width/2;
    y_pos_back = 0;
    for(v=0;v<20;v++){
        for(i=0;i<20;i++){
            points_back.create(x_pos_back+(col_width_back/2), y_pos_back+(row_height_back/2), 'backBullet').scale.setTo(0.02);
            x_pos_back = x_pos_back+col_width_back;
        }
        y_pos_back = y_pos_back+row_height_back;
        x_pos_back = width/2;
    }

    col_width2_back = (width/2)/20;
    row_height2_back = (height)/20;
    x_pos2_back = (width/2)+(col_width2_back/2);
    y_pos2_back = row_height_back/2;
    for(v=0;v<19;v++){
        for(i=0;i<19;i++){
            points_back.create(x_pos2_back+(col_width2_back/2), y_pos2_back+(row_height2_back/2),'backBullet').scale.setTo(0.02);
            x_pos2_back = x_pos2_back+col_width2_back;
        }
        y_pos2_back = y_pos2_back+row_height2_back;
        x_pos2_back = (width/2)+(col_width2_back/2);
    }

    for(i=0;i<points_back.length;i++){
        points_back.children[i].alpha=0;
    }
    //#endregion
    
    
    //#region POINTS GROUPs
//Left
    col_width = (width/2)/20;
    row_height = (height)/20;
    x_pos=0;
    y_pos=0;
    for(v=0;v<20;v++){
        for(i=0;i<20;i++){
            points_pink.create(x_pos+(col_width/2), y_pos+(row_height/2), 'whiteBullet').scale.setTo(0.03);
            x_pos = x_pos+col_width;
        }
        y_pos = y_pos+row_height;
        x_pos = 0;
    }

    col_width2 = (width/2)/20;
    row_height2 = (height)/20;
    x_pos2=col_width/2;
    y_pos2=row_height/2;
    
    for(v=0;v<19;v++){
        for(i=0;i<19;i++){
            points_purple.create(x_pos2+(col_width2/2), y_pos2+(row_height2/2),'whiteBullet').scale.setTo(0.03);
            x_pos2 = x_pos2+col_width2;
        }
        y_pos2 = y_pos2+row_height2;
        x_pos2 = col_width/2;
    }

//Right
    col_width_right = (width/2)/20;
    row_height_right = (height)/20;
    x_pos_right = width/2;
    y_pos_right = 0;
    for(v=0;v<20;v++){
        for(i=0;i<20;i++){
            points_pink_right.create(x_pos_right+(col_width_right/2), y_pos_right+(row_height_right/2), 'whiteBullet').scale.setTo(0.03);
            x_pos_right = x_pos_right+col_width_right;
        }
        y_pos_right = y_pos_right+row_height_right;
        x_pos_right = width/2;
    }

    col_width2_right = (width/2)/20;
    row_height2_right = (height)/20;
    x_pos2_right = (width/2)+(col_width2_right/2);
    y_pos2_right = row_height_right/2;
    for(v=0;v<19;v++){
        for(i=0;i<19;i++){
            points_purple_right.create(x_pos2_right+(col_width2_right/2), y_pos2_right+(row_height2_right/2),'whiteBullet').scale.setTo(0.03);
            x_pos2_right = x_pos2_right+col_width2_right;
        }
        y_pos2_right = y_pos2_right+row_height2_right;
        x_pos2_right = (width/2)+(col_width2_right/2);
    }



    //***************************************
    // 🎀 1 ректангл
    // Левая часть ректангла
    // верхняя сторона
    for(i=0;i<20;i++){
        rect1.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=0;i<20;i++){
        rect1.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=0;i<400;i=i+20){
        rect1.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=39;i<400;i=i+20){
        rect1.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //нижняя сторона
    for(i=380;i<400;i++){
        rect1.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=380;i<400;i++){
        rect1.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 💜 2 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=0;i<19;i++){
        rect2.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=0;i<19;i++){
        rect2.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=0;i<360;i=i+19){
        rect2.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=37;i<359;i=i+19){
        rect2.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    //нижняя сторона
    for(i=343;i<361;i++){
        rect2.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=342;i<361;i++){
        rect2.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    
    


    // 🎀 3 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=21;i<40;i++){
        rect3.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=20;i<39;i++){
        rect3.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=21;i<362;i=i+20){
        rect3.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=58;i<379;i=i+20){
        rect3.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=361;i<380;i++){
        rect3.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=360;i<379;i++){
        rect3.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }

    
    // 💜 4 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=20;i<38;i++){
        rect4.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=19;i<37;i++){
        rect4.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=39;i<325;i=i+19){
        rect4.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=55;i<341;i=i+19){
        rect4.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=325;i<342;i++){
        rect4.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=323;i<340;i++){
        rect4.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 🎀 5 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=42;i<60;i++){
        rect5.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=40;i<58;i++){
        rect5.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=62;i<343;i=i+20){
        rect5.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=77;i<358;i=i+20){
        rect5.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=343;i<360;i++){
        rect5.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=340;i<358;i++){
        rect5.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }



    // 💜 6 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=40;i<59;i++){
        rect6.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=38;i<55;i++){
        rect6.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=40;i<307;i=i+19){
        rect6.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=73;i<320;i=i+19){
        rect6.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=306;i<325;i++){
        rect6.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=304;i<321;i++){
        rect6.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
   


    // 🎀 7 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=63;i<80;i++){
        rect7.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=60;i<77;i++){
        rect7.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=83;i<323;i=i+20){
        rect7.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=96;i<336;i=i+20){
        rect7.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=323;i<340;i++){
        rect7.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=320;i<337;i++){
        rect7.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 💜 8 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=60;i<79;i++){
        rect8.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=57;i<73;i++){
        rect8.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=60;i<307;i=i+19){
        rect8.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=91;i<300;i=i+19){
        rect8.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=288;i<307;i++){
        rect8.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=285;i<301;i++){
        rect8.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 🎀 9 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=84;i<100;i++){
        rect9.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=80;i<96;i++){
        rect9.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=104;i<305;i=i+20){
        rect9.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=115;i<295;i=i+20){
        rect9.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=305;i<320;i++){
        rect9.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=300;i<316;i++){
        rect9.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 💜 10 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=80;i<99;i++){
        rect10.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=76;i<91;i++){
        rect10.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=80;i<289;i=i+19){
        rect10.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=109;i<280;i=i+19){
        rect10.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=270;i<289;i++){
        rect10.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=266;i<281;i++){
        rect10.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 🎀 11 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=105;i<120;i++){
        rect11.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=100;i<115;i++){
        rect11.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=125;i<286;i=i+20){
        rect11.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=134;i<294;i=i+20){
        rect11.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=286;i<300;i++){
        rect11.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=280;i<295;i++){
        rect11.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 💜 12 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=100;i<114;i++){
        rect12.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=95;i<109;i++){
        rect12.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=119;i<253;i=i+19){
        rect12.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=127;i<260;i=i+19){
        rect12.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=253;i<266;i++){
        rect12.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=247;i<261;i++){
        rect12.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 🎀 13 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=126;i<140;i++){
        rect13.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=120;i<134;i++){
        rect13.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=146;i<267;i=i+20){
        rect13.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=153;i<273;i=i+20){
        rect13.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=267;i<280;i++){
        rect13.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=260;i<274;i++){
        rect13.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 💜 14 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=120;i<133;i++){
        rect14.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=114;i<127;i++){
        rect14.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=139;i<235;i=i+19){
        rect14.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=145;i<240;i=i+19){
        rect14.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=235;i<247;i++){
        rect14.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=228;i<241;i++){
        rect14.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    
    
    // 🎀 15 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=147;i<160;i++){
        rect15.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=140;i<153;i++){
        rect15.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=167;i<248;i=i+20){
        rect15.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=172;i<252;i=i+20){
        rect15.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=248;i<260;i++){
        rect15.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=240;i<253;i++){
        rect15.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 💜 16 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=140;i<159;i++){
        rect16.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=133;i<145;i++){
        rect16.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=159;i<236;i=i+19){
        rect16.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=163;i<220;i=i+19){
        rect16.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=216;i<228;i++){
        rect16.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=209;i<221;i++){
        rect16.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    

    // 🎀 17 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=168;i<180;i++){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=160;i<172;i++){
        rect17.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=188;i<229;i=i+20){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=191;i<231;i=i+20){
        rect17.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=229;i<240;i++){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=220;i<232;i++){
        rect17.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
  

    // 💜 18 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=160;i<171;i++){
        rect18.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=152;i<163;i++){
        rect18.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=179;i<199;i=i+19){
        rect18.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=181;i<200;i=i+19){
        rect18.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=199;i<209;i++){
        rect18.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=190;i<201;i++){
        rect18.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    


    // 🎀 19 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=189;i<200;i++){
        rect19.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=180;i<191;i++){
        rect19.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }
    for(i=209;i<220;i++){
        rect19.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=200;i<211;i++){
        rect19.add(points_pink_right.children[i]);
        points_pink_right.addAt(game.add.sprite(0,0),i);
    }

    // 💜 20 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=180;i<190;i++){
        rect20.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    for(i=171;i<181;i++){
        rect20.add(points_purple_right.children[i]);
        points_purple_right.addAt(game.add.sprite(0,0),i);
    }
    
    points_purple.alpha=0;
    points_pink.alpha=0;
    points_pink_right.alpha=0;
    points_purple_right.alpha=0;

//#endregion
    
    rect1.alpha=0;
    rect2.alpha=0;
    rect3.alpha=0;
    rect4.alpha=0;
    rect5.alpha=0;
    rect6.alpha=0;
    rect7.alpha=0;
    rect8.alpha=0;
    rect9.alpha=0;
    rect10.alpha=0;
    rect11.alpha=0;
    rect12.alpha=0;
    rect13.alpha=0;
    rect14.alpha=0;
    rect15.alpha=0;
    rect16.alpha=0;
    rect17.alpha=0;
    rect18.alpha=0;
    rect19.alpha=0;
    rect20.alpha=0;

    this.rectAnim();
},

//Анимация частиц из центра
pointsFromCenterLEFT: function(){
    for(i=0;i<200;i++){
        points_FromCenterLeft.create(game.rnd.integerInRange(0,width/2),game.rnd.integerInRange(0,height), 'defaultBullet').scale.setTo(
            game.rnd.realInRange(0.01,0.05)
        );
        game.add.tween(points_FromCenterLeft.children[i]).from({
            x:width/2,
            y:height/2,
            width:0,
            height:0
        },game.rnd.integerInRange(700,1500),Phaser.Easing.Quadratic.In,true).loop();
    }
},
pointsFromCenterRIGHT: function(){
    for(i=0;i<200;i++){
        points_FromCenterRight.create(game.rnd.integerInRange(width/2,width),game.rnd.integerInRange(0,height), 'defaultBullet').scale.setTo(
            game.rnd.realInRange(0.01,0.05)
        );
        game.add.tween(points_FromCenterRight.children[i]).from({
            x:width/2,
            y:height/2,
            width:0,
            height:0
        },game.rnd.integerInRange(700,1500),Phaser.Easing.Quadratic.In,true).loop();
    }
},

pointsToCenterLEFT: function(){
    for(i=0;i<move.length;i++){
        for(k=0;k<move.children[i].length;k++){
            if(move.children[i].children[k].x<width/2){
                game.add.tween(move.children[i].children[k]).to({
                    x:width/2,
                    y:height/2,
                    width:0,
                    height:0  
                }, game.rnd.integerInRange(1000,3000), Phaser.Easing.Quadratic.In, true);
            }
        }
    }
},
pointsToCenterRIGHT: function(){
    for(i=0;i<move.length;i++){
        for(k=0;k<move.children[i].length;k++){
            if(move.children[i].children[k].x>width/2){
                game.add.tween(move.children[i].children[k]).to({
                    x:width/2,
                    y:height/2,
                    width:0,
                    height:0  
                }, game.rnd.integerInRange(1000,3000), Phaser.Easing.Quadratic.In, true);
            }
        }
    }
},

//Начальная анимация ректанглов
rectAnim: function(){
    revealTime = 10;
    fadeTime = 500;
    ease = Phaser.Easing.Linear.In;

    //#region
    //К краям анимация
    // game.add.tween(rect20).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //     game.add.tween(rect20).to({alpha:0},fadeTime,ease,true);
    //     game.add.tween(rect19).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //         game.add.tween(rect19).to({alpha:0},fadeTime,ease,true);
    //         game.add.tween(rect18).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //             game.add.tween(rect18).to({alpha:0},fadeTime,ease,true);
    //             game.add.tween(rect17).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                 game.add.tween(rect17).to({alpha:0},fadeTime,ease,true)
    //                 game.add.tween(rect16).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                     game.add.tween(rect16).to({alpha:0},fadeTime,ease,true);
    //                     game.add.tween(rect15).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                         game.add.tween(rect15).to({alpha:0},fadeTime,ease,true);
    //                         game.add.tween(rect14).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                             game.add.tween(rect14).to({alpha:0},fadeTime,ease,true);
    //                             game.add.tween(rect13).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                 game.add.tween(rect13).to({alpha:0},fadeTime,ease,true);
    //                                 game.add.tween(rect12).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                     game.add.tween(rect12).to({alpha:0},fadeTime,ease,true);
    //                                     game.add.tween(rect11).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                         game.add.tween(rect11).to({alpha:0},fadeTime,ease,true);
    //                                         game.add.tween(rect10).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                             game.add.tween(rect10).to({alpha:0},fadeTime,ease,true);
    //                                             game.add.tween(rect9).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                 game.add.tween(rect9).to({alpha:0},fadeTime,ease,true);
    //                                                 game.add.tween(rect8).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                     game.add.tween(rect8).to({alpha:0},fadeTime,ease,true);
    //                                                     game.add.tween(rect7).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                         game.add.tween(rect7).to({alpha:0},fadeTime,ease,true);
    //                                                         game.add.tween(rect6).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                             game.add.tween(rect6).to({alpha:0},fadeTime,ease,true);
    //                                                             game.add.tween(rect5).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                 game.add.tween(rect5).to({alpha:0},fadeTime,ease,true);
    //                                                                 game.add.tween(rect4).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                     game.add.tween(rect4).to({alpha:0},fadeTime,ease,true);
    //                                                                     game.add.tween(rect3).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                         game.add.tween(rect3).to({alpha:0},fadeTime,ease,true);
    //                                                                         game.add.tween(rect2).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                             game.add.tween(rect2).to({alpha:0},fadeTime,ease,true);
    //                                                                             game.add.tween(rect1).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                                 game.add.tween(rect1).to({alpha:0},fadeTime,ease,true).onComplete.add(toCenter);
    //                                                                             })
    //                                                                         })
    //                                                                     })
    //                                                                 })
    //                                                             })
    //                                                         })
    //                                                     })
    //                                                 })
    //                                             })
    //                                         })
    //                                     })
    //                                 })
    //                             })
    //                         })
    //                     })
    //                 })
    //             });
    //         });
    //     });
    // });

    //В центр анимация
    // function toCenter(){
    //     game.add.tween(rect1).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //         game.add.tween(rect2).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //             game.add.tween(rect3).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                 game.add.tween(rect4).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                     game.add.tween(rect5).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                         game.add.tween(rect6).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                             game.add.tween(rect7).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                 game.add.tween(rect8).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                     game.add.tween(rect9).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                         game.add.tween(rect10).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                             game.add.tween(rect11).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                 game.add.tween(rect12).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                     game.add.tween(rect13).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                         game.add.tween(rect14).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                             game.add.tween(rect15).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                 game.add.tween(rect16).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                     game.add.tween(rect17).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                         game.add.tween(rect18).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                             game.add.tween(rect19).to({alpha:1},revealTime,ease,true).onComplete.add(function(){
    //                                                                                 game.add.tween(rect20).to({alpha:1},revealTime,ease,true);
    //                                                                             })
    //                                                                         })
    //                                                                     })
    //                                                                 })
    //                                                             })
    //                                                         })
    //                                                     })
    //                                                 })
    //                                             })
    //                                         })
    //                                     })
    //                                 })
    //                             })
    //                         })
    //                     })
    //                 });
    //             });
    //         });
    //     });
    // }
    //#endregion
    
    rect1.alpha=1;
    rect2.alpha=1;
    rect3.alpha=1;
    rect4.alpha=1;
    rect5.alpha=1;
    rect6.alpha=1;
    rect7.alpha=1;
    rect8.alpha=1;
    rect9.alpha=1;
    rect10.alpha=1;
    rect11.alpha=1;
    rect12.alpha=1;
    rect13.alpha=1;
    rect14.alpha=1;
    rect15.alpha=1;
    rect16.alpha=1;
    rect17.alpha=1;
    rect18.alpha=1;
    rect19.alpha=1;
    rect20.alpha=1;

    move.add(rect1);
    move.add(rect2);
    move.add(rect3);
    move.add(rect4);
    move.add(rect5);
    move.add(rect6);
    move.add(rect7);
    move.add(rect8);
    move.add(rect9);
    move.add(rect10);
    move.add(rect11);
    move.add(rect12);
    move.add(rect13);
    move.add(rect14);
    move.add(rect15);
    move.add(rect16);
    move.add(rect17);
    move.add(rect18);
    move.add(rect19);
    move.add(rect20);

    for(i=0;i<move.length;i++){
        for(k=0;k<move.children[i].length;k++){
            game.add.tween(move.children[i].children[k]).from({
                x:width/2,
                y:height/2,
                width:0,
                height:0  
            }, game.rnd.integerInRange(1000,5000),Phaser.Easing.Circular.Out, true);

            // if(move.children[i].children[k].x==width/2 && move.children[i].children[k].y==height/2){
            //     move.children[i].children[k].kill();
            // }
        }
    }
},


render: function(){
    // game.debug.spriteBounds(right);
},

//  Н Е   И С П О Л Ь З У Е Т С Я
movePoints: function(){
    for(i=0;i<move.length;i++){
        for(k=0;k<move.children[i].length;k++){
            game.add.tween(move.children[i].children[k]).to({
                x:width/2,
                y:height/2,
                width:0,
                height:0  
            }, game.rnd.integerInRange(1000,5000), ease, true);

            if(move.children[i].children[k].x==width/2 && move.children[i].children[k].y==height/2){
                move.children[i].children[k].kill();
            }
        }
    }
},

gridDefault: function(){
    //#region POINTS GROUPs
   
    // L e f t      points_pinkDef
    // три вертикальные 
    // col_widthDef = (width/2)/20;
    // row_heightDef= (height)/20;
    // x_posDef=0;
    // y_posDef=0;

    // for(v=0;v<20;v++){
    //     for(i=0;i<3;i++){
    //         points_pinkDef.create(x_posDef+(col_widthDef/2), y_posDef+(row_heightDef/2), 'defaultBullet').scale.setTo(0.03);
    //         x_posDef = x_posDef+col_widthDef;
    //     }
    //     y_posDef = y_posDef+row_heightDef;
    //     x_posDef = 0;
    // }
    
    
    // //три горизонтальные    
    // col_widthDef2 = (width/2)/20;
    // row_heightDef2 = (height)/20;
    // x_posDef2=points_pinkDef.children[2].x + col_widthDef2/2;
    // y_posDef2=0;

    // for(v=0;v<3;v++){
    //     for(i=0;i<17;i++){
    //         points_pinkDef.create(x_posDef2+(col_widthDef2/2), y_posDef2+(row_heightDef2/2),'defaultBullet').scale.setTo(0.03);
    //         x_posDef2 = x_posDef2+col_widthDef2;
    //     }
    //     y_posDef2 = y_posDef2+row_heightDef2;
    //     x_posDef2 = points_pinkDef.children[2].x + col_widthDef2/2;
    // }

    // //три с низу    
    // col_widthDef2 = (width/2)/20;
    // row_heightDef2 = (height)/20;
    // x_posNIZ=points_pinkDef.children[53].x + col_widthDef2/2;
    // y_posNIZ=points_pinkDef.children[53].y;

    // for(v=0;v<3;v++){
    //     for(i=0;i<17;i++){
    //         points_pinkDef.create(x_posNIZ+(col_widthDef2/2), y_posNIZ,'defaultBullet').scale.setTo(0.03);
    //         x_posNIZ = x_posNIZ+col_widthDef2;
    //     }
    //     y_posNIZ = y_posNIZ+row_heightDef2;
    //     x_posNIZ = points_pinkDef.children[53].x+ col_widthDef2/2 ;
    // }

    // // R i g h t        points_purpleDef
    // // три вертикальные 
    // col_widthDef = (width/2)/20;
    // row_heightDef= (height)/20;
    // x_posDef=0;
    // y_posDef=0;

    // for(v=0;v<20;v++){
    //     for(i=0;i<3;i++){
    //         points_purpleDef.create(x_posDef+(col_widthDef/2), y_posDef+(row_heightDef/2), 'defaultBullet').scale.setTo(0.03);
    //         x_posDef = x_posDef+col_widthDef;
    //     }
    //     y_posDef = y_posDef+row_heightDef;
    //     x_posDef = 0;
    // }
    
    
    // //три горизонтальные    
    // col_widthDef2 = (width/2)/20;
    // row_heightDef2 = (height)/20;
    // x_posDef2=points_purpleDef.children[2].x + col_widthDef2/2;
    // y_posDef2=0;

    // for(v=0;v<3;v++){
    //     for(i=0;i<17;i++){
    //         points_purpleDef.create(x_posDef2+(col_widthDef2/2), y_posDef2+(row_heightDef2/2),'defaultBullet').scale.setTo(0.03);
    //         x_posDef2 = x_posDef2+col_widthDef2;
    //     }
    //     y_posDef2 = y_posDef2+row_heightDef2;
    //     x_posDef2 = points_purpleDef.children[2].x + col_widthDef2/2;
    // }

    // //три с низу    
    // col_widthDef2 = (width/2)/20;
    // row_heightDef2 = (height)/20;
    // x_posNIZ=points_purpleDef.children[53].x + col_widthDef2/2;
    // y_posNIZ=points_purpleDef.children[53].y;

    // for(v=0;v<3;v++){
    //     for(i=0;i<17;i++){
    //         points_purpleDef.create(x_posNIZ+(col_widthDef2/2), y_posNIZ,'defaultBullet').scale.setTo(0.03);
    //         x_posNIZ = x_posNIZ+col_widthDef2;
    //     }
    //     y_posNIZ = y_posNIZ+row_heightDef2;
    //     x_posNIZ = points_purpleDef.children[53].x+ col_widthDef2/2 ;
    // }
   
    //#endregion
}
}