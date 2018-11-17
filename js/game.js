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
    // game.load.spritesheet('m','img/m.png',61,768,32);

    game.load.spritesheet('proval','img/proval.png',664,648,49);
    game.load.spritesheet('arrow','img/arrow.png',680,768,34);
    game.load.spritesheet('speed','img/speed.png', 680,768,39);


},

create:function (){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.stage.backgroundColor = '#fb2345';
   
    game.stage.backgroundColor = '#000';
    

  

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
    
    speed = game.add.sprite(0,0,'speed');
    speed.animations.add('speed');

    speedR = game.add.sprite(0,0,'speed');
    speedR.animations.add('speedR');
    speedR.anchor.setTo(.5,.5);
    speedR.scale.x *= -1;
    speedR.position.setTo(width+(speedR.width/2),speedR.height/2);
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
    xposL = left.x;
    xposR = right.x;
    
    rect1 = game.add.group(); /* 🎀 */
    rect2 = game.add.group(); /* 💜 */
    rect3 = game.add.group(); /* 🎀 */
    rect4 = game.add.group(); /* 💜 */
    rect5 = game.add.group();
    rect6 = game.add.group(); /* 💜 */
    rect7 = game.add.group(); /* 🎀 */
    rect8 = game.add.group(); /* 💜 */
    rect9 = game.add.group(); /* 🎀 */
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
    rect21 = game.add.group(); /* 🎀 */
    
    points_pink = game.add.group();
    points_purple = game.add.group();
    pointSR = game.add.group();
   
    this.grid();

},

//  Ш А Г    У В Е Л И Ч Е Н И Я и появляется РАКЕТА и чтото с тайлами
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

        speed.animations.play('speed', 20,true);
        
        fire.position.setTo(leftRocket.x+leftRocket.width-150, leftRocket.y-(leftRocket.height/2)+50)
        fire.start(true,500,null,10);

        
        
    }else{
        left.x -=43;
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
        
        speedR.animations.play('speedR', 20,true);

        fire2.position.setTo(rightRocket.x-50, rightRocket.y-(rightRocket.height/2))
        fire2.start(true,500,null,10);
    }else{
        right.x +=43;
    }
},

grid: function(){
    // розовые points_pink
    col_width = (width/2)/20;
    row_height = (height)/20;
    x_pos=0;
    y_pos=0;

    for(v=0;v<20;v++){
        for(i=0;i<20;i++){
            points_pink.create(x_pos+(col_width/2), y_pos+(row_height/2), 'greenBullet').scale.setTo(0.03);
            x_pos = x_pos+col_width;
        }
        y_pos = y_pos+row_height;
        x_pos = 0;
    }

    //фиолетовые    points_purple
    col_width2 = (width/2)/20;
    row_height2 = (height)/20;
    x_pos2=col_width/2;
    y_pos2=row_height/2;
    for(v=0;v<19;v++){
        for(i=0;i<19;i++){
            points_purple.create(x_pos2+(col_width2/2), y_pos2+(row_height2/2),'purpleBullet').scale.setTo(0.03);
            x_pos2 = x_pos2+col_width2;
        }
        y_pos2 = y_pos2+row_height2;
        x_pos2 = col_width/2;
    }


    //***************************************
    // 🎀 1 ректангл
    // Левая часть ректангла
    // верхняя сторона
    for(i=0;i<20;i++){
        rect1.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=0;i<400;i=i+20){
        // i= i+8;
        rect1.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //нижняя сторона
    for(i=380;i<400;i++){
        rect1.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // Правая часть ректангла
    // x_pos_Right=width/2;
    // y_pos=0;
    // for(v=0;v<8;v++){
    //     for(i=0;i<8;i++){
    //         pointSR.create(x_pos_Right+(col_width/2), y_pos+(row_height/2), 'purpleBullet').scale.setTo(0.05);
    //         x_pos_Right = x_pos_Right+col_width;
    //     }
    //     y_pos = y_pos+row_height;
    //     x_pos_Right = width/2;
    // }
    // //верхняя сторона
    // for(i=0;i<8;i++){
    //     rect1.add(pointSR.children[i]);
    //     pointSR.addAt(game.add.sprite(0,0),i);
    // }
    // //боковая сторона
    // for(i=7;i<64;i=i+8){
    //     // i= i+8;
    //     rect1.add(pointSR.children[i]);
    //     points_purple.addAt(game.add.sprite(0,0),i);
    // }
    // //нижняя сторона
    // for(i=56;i<64;i++){
    //     rect1.add(points_purple.children[i]);
    //     points_purple.addAt(game.add.sprite(0,0),i);
    // }
    // //движение к центру и рандом по времени
    // for(i=0;i<rect1.length;i++){
    //     pointTween = game.add.tween(rect1.children[i]).to({
    //         x:width/2,
    //         y:height/2,
    //         width:5,
    //         height:5
    //     },game.rnd.integerInRange(2000,3000),
    //     Phaser.Easing.Exponential.InOut,true);

    //     pointTween2 = game.add.tween(rect2.children[i]).to({
    //         x:width/2,
    //         y:height/2,
    //         width:5,
    //         height:5
    //     },game.rnd.integerInRange(2000,3000),
    //     Phaser.Easing.Exponential.InOut,true);
    // }
    rect1.alpha=0;


    // 💜 2 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=0;i<19;i++){
        rect2.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=0;i<360;i=i+19){
        rect2.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    //нижняя сторона
    for(i=343;i<361;i++){
        rect2.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect2.alpha=0;


    // 🎀 3 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=21;i<40;i++){
        rect3.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=21;i<362;i=i+20){
        rect3.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=361;i<380;i++){
        rect3.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect3.alpha=0;

    
    // 💜 4 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=20;i<38;i++){
        rect4.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=39;i<325;i=i+19){
        rect4.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=325;i<342;i++){
        rect4.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect4.alpha=0;



    // 🎀 5 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=42;i<60;i++){
        rect5.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=62;i<343;i=i+20){
        rect5.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=343;i<360;i++){
        rect5.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect5.alpha=0;



    // 💜 6 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=40;i<59;i++){
        rect6.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=40;i<307;i=i+19){
        rect6.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=306;i<325;i++){
        rect6.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect6.alpha=0;



    // 🎀 7 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=63;i<80;i++){
        rect7.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=83;i<324;i=i+20){
        rect7.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=324;i<340;i++){
        rect7.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect7.alpha=0;


    // 💜 8 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=60;i<79;i++){
        rect8.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=60;i<307;i=i+19){
        rect8.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=288;i<307;i++){
        rect8.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect8.alpha=0;


    // 🎀 9 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=84;i<100;i++){
        rect9.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=104;i<305;i=i+20){
        rect9.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=305;i<320;i++){
        rect9.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect9.alpha=0;


    // 💜 10 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=80;i<99;i++){
        rect10.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=80;i<289;i=i+19){
        rect10.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=270;i<289;i++){
        rect10.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect10.alpha=0;


    // 🎀 11 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=105;i<120;i++){
        rect11.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=125;i<286;i=i+20){
        rect11.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=286;i<300;i++){
        rect11.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect11.alpha=0;


    // 💜 12 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=100;i<114;i++){
        rect12.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=119;i<253;i=i+19){
        rect12.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=253;i<266;i++){
        rect12.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect12.alpha=0;


    // 🎀 13 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=126;i<140;i++){
        rect13.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=146;i<267;i=i+20){
        rect13.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=267;i<280;i++){
        rect13.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect13.alpha=0;


    // 💜 14 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=120;i<133;i++){
        rect14.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=139;i<235;i=i+19){
        rect14.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=235;i<247;i++){
        rect14.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect14.alpha=0;

    
    // 🎀 15 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=147;i<160;i++){
        rect15.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=167;i<248;i=i+20){
        rect15.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=248;i<260;i++){
        rect15.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect15.alpha=0;


    // 💜 16 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=140;i<159;i++){
        rect16.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=159;i<236;i=i+19){
        rect16.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=216;i<228;i++){
        rect16.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect16.alpha=0;


    // 🎀 17 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=168;i<180;i++){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    //боковая сторона
    for(i=188;i<229;i=i+20){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=229;i<240;i++){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect17.alpha=0;


    // 💜 18 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=160;i<171;i++){
        rect18.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // боковая сторона
    for(i=179;i<199;i=i+19){
        rect18.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // нижняя сторона
    for(i=199;i<209;i++){
        rect18.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    rect18.alpha=0;



    // 🎀 19 ректангл 
    // Левая часть ректангла
    // верхняя сторона
    for(i=189;i<200;i++){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    for(i=209;i<220;i++){
        rect17.add(points_pink.children[i]);
        points_pink.addAt(game.add.sprite(0,0),i);
    }
    rect19.alpha=0;


    // 💜 20 ректангл  
    // Левая часть ректангла
    // верхняя сторона
    for(i=180;i<190;i++){
        rect20.add(points_purple.children[i]);
        points_purple.addAt(game.add.sprite(0,0),i);
    }
    // rect20.alpha=0;
    for(i=0;i<rect20.length;i++){
        game.add.tween(rect20.children[i]).from({
            x:0
        },1000+(100*i),'Linear',true);
    }
},
        
update:function(){


    if(left.x<width/4){
    // rect20.alpha=1;
        
        game.add.tween(rect20).to({
            x:0,
            y:0
        },3000,'Linear',true);
    }

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


    //Б Э К Г Р А У Н Д  становится   Б Е Л Ы Й
    if(leftRocket.alpha == 1 && rightRocket.alpha == 1){
        game.stage.backgroundColor = '#fff';
    }
    
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
    //Отключает анимацию стрелки
    if(xposL>left.x || xposR<right.x){
        
    }

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

    // game.add.text(width/2 +50, 100, "Ю ЛУУЗ", {font:'bold 100px Arial', fill:'#fff'});
    
    proval = game.add.sprite(0,0,'proval');
    proval.alpha=0.01;
    // proval.scale.setTo(1.3,1.3);
    proval.position.setTo(width/2-100,height-proval.height);
    proval.animations.add('p');
    
    provalTimer = game.time.create(false);
    provalTimer.loop(1500,function(){
        proval.alpha=1;
        proval.animations.play('p', 20, true);
    },this);
    provalTimer.start();
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


render: function(){
    // game.debug.spriteBounds(dotsR);
},

// gridAnimation: function() {
//     dotsL = game.add.sprite(0, 0, 'dots');
//     dotsL.width = width / 2;
//     dotsL.height = height;
//     dotsL.animations.add('l');
//     dotsL.animations.play('l', 20, false);
//     // dotsL.frame=73;
    
//     dotsR = game.add.sprite(0, 0, 'dots');
//     dotsR.width = width / 2;
//     dotsR.height = height;
//     dotsR.anchor.setTo(0.5, 0.5);
//     dotsR.scale.x *= -1;
//     dotsR.position.setTo(width / 2 - (dotsR.width / 2), 0 + dotsR.height / 2);
//     dotsR.animations.add('r');
//     dotsR.animations.play('r', 20, false);
    
//     // middle = game.add.sprite(0, 0, 'm');
//     // middle.height = height;
//     // middle.position.setTo((width / 2) - (middle.width / 2), 0);
//     // middle.animations.add('m');
//     // middle.animations.play('m', 20, false);

//     arrowL = game.add.sprite(0, 0, 'arrow');
//     arrowL.width = width/2;
//     arrowL.height=height;
//     arrowL.animations.add('aL');
//     arrowL.alpha=0;

//     arrowR = game.add.sprite(0, 0, 'arrow');
//     arrowR.width = width/2;
//     arrowR.height=height;
//     arrowR.anchor.setTo(0.5, 0.5);
//     arrowR.scale.x *= -1;
//     arrowR.position.setTo(width / 2 - (arrowR.width / 2), 0 + arrowR.height / 2);
//     arrowR.animations.add('aR');
//     arrowR.alpha=0;

//     arrowTimer = game.time.create(false);
//     arrowTimer.loop(1000,this.arrowStart,this);
//     arrowTimer.start();
// },

// arrowStart: function(){
//     arrowL.alpha=1;
//     arrowL.animations.play('aL', 20, false, true);
    
//     arrowR.alpha=1;
//     arrowR.animations.play('aR', 20, false,true);
//     arrowInsideTimer = game.time.create(false);
//     arrowInsideTimer.loop(1000,function(){
//         arrowL.animations.add('LL',[25,26,27,28,29,30,31,32,33,34],30);
//         arrowL.animations.play('LL',true);

//         arrowR.animations.add('LL',[25,26,27,28,29,30,31,32,33,34],30);
//         arrowR.animations.play('LL',true);
//     },this);
//     arrowInsideTimer.start();
// }
}




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
// resetPurpleBullet: function (purpleBullet) {
//     purpleBullet.kill();
// },
// resetGreenBullet: function (greenBullet){
//     greenBullet.kill();
// },
