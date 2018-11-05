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
    game.load.image('back','img/back.png');

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
},

create:function (){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#fb2345';
   
    // game.stage.backgroundColor = '#000';
    
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

    STARS = [];
    x=0;
    for( k = 0; k < 50; k++ ){

        star = game.add.sprite(
            game.rnd.integerInRange(0,width/2),
            game.rnd.integerInRange(0,height),
            'greenParticleCircle'
        );

        // star.name='star'+k;
        STARS.push(star);
        
        STARS[k].scale.setTo(game.rnd.realInRange(0,0.6));
        
        starTween = game.add.tween(STARS[k]);
        x++;
        
    }
   


    //  ЭТО ПОЯВЛЯЕТСЯ КОГДА ВЫИГРАЛ ИЛИ  
    //КОРОЧЕ СОЗДАЕТ В А У ЭФФЕКТ

    //#region
// fragmentSrcB = [
    
//             "#ifdef GL_ES",
//             "precision mediump float;",
//             "#endif",

//             "uniform vec2 resolution;",
//             "uniform float time;",

//             "#define num 60.0",


//             "float random(vec2 p){",
//             "	return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453+time*4.0);",	
//             "}",


//             "void main() {",
//             "    	vec2 p = ( gl_FragCoord.xy / (resolution.xy) );",
//             "	//- vec2(0.5, 0.5);",
//             "	//vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y) - vec2(.5 , .5);",
            
//             "    	float top, bottom, linewidth;",
//             "	float offSet = 0.5;",
//             "	float span = 0.01;",
//             "	linewidth = 0.01;",
            
//             "   	top = fract(time);",
//             "	bottom = fract(time) + linewidth;",
            
//             "	vec4 border = vec4(0.0, 0.0, 0.0, 1.0);",
            
//             "	for(float i = 1.0; i < num; i++){",
//             "		top += i * span;" ,
//             "		top = fract(top);",
//             "		bottom += i *span;",
//             "		bottom = fract(bottom);",
//             "		if(p.y > top && p.y < bottom){",
//             "		border = vec4(abs(1.0 * sin(time)), 0.0, 0.0, 1.0);",
//             "		}",
//             "	}",
            
//             " 	float c = random(p);",
//             "	vec3 col = mix(vec3(c, c, c), border.xyz, 0.6);",
//             "	//float r = mix(c, border.x, 0.6);",
//             "	//vec4 col= vec4(mix(vec3(p, p, p), border.xyz), 1.0);",
//             "    	gl_FragColor = vec4(col, 1.0);",
            
//             "	/*",
//             "	if(p.y < -0.5){",
//             "		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
//             "	}",
//             "	*/",
            
//             "}"
//     ];
    //#endregion

    //#region
// fragmentSrcB = [
// "#ifdef GL_ES",
// "precision mediump float;",
// "#endif",
// "#extension GL_OES_standard_derivatives : enable",
// "uniform float time;",
// "uniform vec2 mouse;",
// "uniform vec2 resolution;",
// "mat2 m =mat2(0.8,0.6, -0.6, 0.8);",
// "float rand(vec2 n) { ",
// "	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);",
// "}",
// "float noise(vec2 n) {",
// "	const vec2 d = vec2(0.0, 1.0);",
// "  	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));",
// "	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);",
// "}",
// "float fbm(vec2 p){",
// "	float f=.0;",
// "	f+= .5000*noise(p); p*= m*2.02;",
// "	f+= .2500*noise(p); p*= m*2.03;",
// "	f+= .1250*noise(p); p*= m*2.01;",
// "	f+= .0625*noise(p); p*= m*2.04;",
// "	f/= 0.9375;",
// "	return f;",
// "}",
// "float sdTorus( vec3 p, vec2 t )",
// "{",
// "  vec2 q = vec2(length(p.xz)-t.x,p.y);",
// "  return length(q)-t.y;",
// "}",
// "float opTwist( vec3 p )",
// "{",
// "    float c = cos(2.0*p.y);",
// "    float s = sin(2.0*p.y);",
// "    mat2  m = mat2(c,-s,s,c);",
// "    vec3  q = vec3(m*p.xz,p.y);",
// "    return sdTorus(q,vec2(0.2,.4));",
// "}",
// "float map(vec3 p){",
// "	vec3 q=1.- (atan((p))); ",
// "	q.xz -= smoothstep(.5,.2,fbm(p.xz*6.));",
// "	float d=0.;",
// "	for(int i=0;i<1;i++){",
// "		d+=cos(opTwist(q));",
// "	}",
// "	return d;",
// "}",
// "float trace(vec3 o, vec3 r){",
// "	float t=0.0;",
// "	for(int i=0;i<1;i++){",
// "		vec3 p= o +r*t;",
// "	       float flicker = tan( mod(time*.3,.45) / sin(time*1.2) );",
// "		float d=atan(map(p));",
// "		t-= d*flicker;",
// "	}",
// "	return t;",
// "}",
// "void main( void ) {",
// "	vec2 uv = ( gl_FragCoord.xy / resolution.xy );",
// "	uv =uv *2. -1.;",
// "	vec3 r=normalize(vec3(uv,1.));",
// "	float the =time*0.1;",
// "	r.xz *= mat2(cos(the),-sin(the),cos(the),sin(the));",
// "	vec3 ro= vec3(0.,0.,time);",
// "	float t= trace(ro,r);",
// "	float fog=1. /(1.+t*t*0.1);",
// "	gl_FragColor = vec4(fog*0.7,fog*0.1,fog,fog);",
// "}"
// ]    
    //#endregion

    //#region

    // fragmentSrcB=[  
    //     '#ifdef GL_ES',
    //     'precision mediump float;',
    //     '#endif',
    //     '',
    //     'uniform float time;',
    //     'uniform vec2 mouse;',
    //     'uniform vec2 resolution;',
    //     '',
    //     'void main(void)',
    //     '{',
    //     '	vec2 uPos = (gl_FragCoord.xy / resolution.xy); ',
    //     '	',
    //     '	uPos.x -= 1.5000;',
    //     '	uPos.y -= 0.15;',
    //     '	',
    //     '	vec3 color = vec3(0.0);',
    //     '	float vertColor = 123.21;',
    //     '	',
    //     '	float t = time * (0.9);',
    //     '	',
    //     '	float intensity = 3.0;',
    //     '	',
    //     '	for (float i = 0.0; i < 50.0; i++)',
    //     '	{	',
    //     '		float j = i / 30.3;		',
    //     '		',
    //     '		uPos.y += sin((uPos.x + j) * (intensity + 1.0) + t + intensity / 5.0) * 0.01;',
    //     '		float fTempY = abs(1.0 / (uPos.y + j) / 190.0);',
    //     '		',
    //     '		color += vec3(fTempY * (15.0 - intensity) / 10.0, fTempY * intensity / 10.0, pow(fTempY, 0.99) * 1.9);',
    //     '		',
    //     '		//uPos.x += sin((uPos.y + j) * (intensity + 1.0) + t + 5.0 / intensity) * 0.01;',
    //     '		float fTempX = abs(1.0 / (uPos.x + j) / 390.0);',
    //     '		',
    //     '		//color += vec3(fTempX * (15.0 - intensity) / 10.0, fTempX * intensity / 10.0, pow(fTempX, 0.99) * 1.9);',
    //     '	}',
    //     '	vec4 color_final = vec4(color, 2.0);',
    //     '	',
    //     '	gl_FragColor = color_final;',
    //     '}'
    // ];

    //#endregion

    //#region
        // fragmentSrcB = [
        //     "#ifdef GL_ES",
        //     "precision mediump float;",
        //     "#endif",
        //     "#extension GL_OES_standard_derivatives : enable",
        //     "uniform float time;",
        //     "uniform vec2 mouse;",
        //     "uniform vec2 resolution;",
        //     "mat2 m =mat2(0.8,0.6, -0.6, 0.8);",
        //     "float rand(vec2 n) { ",
        //     "	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);",
        //     "}",
        //     "float noise(vec2 n) {",
        //     "	const vec2 d = vec2(0.0, 1.0);",
        //     "  	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));",
        //     "	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);",
        //     "}",
        //     "float fbm(vec2 p){",
        //     "	float f=.0;",
        //     "	f+= .5000*noise(p); p*= m*2.02;",
        //     "	f+= .2500*noise(p); p*= m*2.03;",
        //     "	f+= .1250*noise(p); p*= m*2.01;",
        //     "	f+= .0625*noise(p); p*= m*2.04;",
        //     "	f/= 0.9375;",
        //     "	return f;",
        //     "}",
        //     "float sdTorus( vec3 p, vec2 t )",
        //     "{",
        //     "  vec2 q = vec2(length(p.xz)-t.x,p.y);",
        //     "  return length(q)-t.y;",
        //     "}",
        //     "float opTwist( vec3 p )",
        //     "{",
        //     "    float c = cos(2.0*p.y);",
        //     "    float s = sin(2.0*p.y);",
        //     "    mat2  m = mat2(c,-s,s,c);",
        //     "    vec3  q = vec3(m*p.xz,p.y);",
        //     "    return sdTorus(q,vec2(0.2,.4));",
        //     "}",
        //     "float map(vec3 p){",
        //     "	vec3 q=1.- (atan((p))); ",
        //     "	q.xz -= smoothstep(.5,.2,fbm(p.xz*6.));",
        //     "	float d=0.;",
        //     "	for(int i=0;i<1;i++){",
        //     "		d+=cos(opTwist(q));",
        //     "	}",
        //     "	return d;",
        //     "}",
        //     "float trace(vec3 o, vec3 r){",
        //     "	float t=0.0;",
        //     "	for(int i=0;i<5;i++){",
        //     "		vec3 p= o +r*t;",
        //     "	       float flicker = tan( mod(time*.3,.45) / sin(time*1.2) );",
        //     "		float d=atan(map(p));",
        //     "		t-= d*flicker;",
        //     "	}",
        //     "	return t;",
        //     "}",
        //     "void main( void ) {",
        //     "	vec2 uv = ( gl_FragCoord.xy / resolution.xy );",
        //     "	uv =uv *2. -1.;",
        //     "	vec3 r=normalize(vec3(uv,1.));",
        //     "	float the =time*0.1;",
        //     "	r.xz *= mat2(cos(the),-sin(the),cos(the),sin(the));",
        //     "	vec3 ro= vec3(0.,0.,time);",
        //     "	float t= trace(ro,r);",
        //     "	float fog=1. /(1.+t*t*0.1);",
        //     "	gl_FragColor = vec4(fog*0.7,fog*0.1,fog,fog);",
        //     "}"
        // ];
    //#endregion

    
    // filterbeforeimage = new Phaser.Filter(game, null, fragmentSrcB);

    // filterbeforeimage.setResolution(800, 800);
    // sprite = game.add.sprite();
    // sprite.width = width;
    // sprite.height = height;


    //Встаивть где нужен абис
    // this.abyss();
    // filterbeforeimage.update();

    //КОНЕЦ В А У ЭФФЕКТА



    tilesprite = game.add.tileSprite(0, 0, width/2, height, 'tile');
    tilesprite.alpha=0;
    tilesprite2 = game.add.tileSprite(width/2, 0, width/2, height, 'tile');
    tilesprite2.alpha=0;

   

    right = game.add.sprite(0,0,'right');
    right.anchor.setTo(0,0);

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
    
    this.bullets();
    

    leftRocket = game.add.sprite(0, 0, 'leftRocket');
    leftRocket.alpha = 0;

    rightRocket = game.add.sprite(0, 0, 'rightRocket');
    rightRocket.alpha = 0;

    arrowLeft = game.add.sprite(50,0,'arrowLeft');
    arrowLeft.y=(height-arrowLeft.height)-50;
    arrowLeft.animations.add('arrowL');
    arrowLeft.animations.play('arrowL', 10, true);

    arrowRight = game.add.sprite(0,0,'arrowRight');
    arrowRight.x = (width-arrowRight.width)-50;
    arrowRight.y = (height-arrowRight.height)-50;
    arrowRight.animations.add('arrowR');
    arrowRight.animations.play('arrowR', 10, true);

    fire = game.add.emitter(100,100, 50);
    fire.makeParticles('greenParticleCircle');
    fire.setXSpeed(0,1000);

    fire2 = game.add.emitter(100,100, 50);
    fire2.makeParticles('purpleParticleCircle');
    fire2.setXSpeed(-1000,0);
    // sprite.filters = [ filterbeforeimage ];
},


bullets:function(){
    purpleBullets = game.add.group();
    purpleBullets.enableBody = true;
    purpleBullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    for (var i = 0; i < 20; i++)
    {
        var b = purpleBullets.create(0, 0, 'purpleBullet');
        b.name = 'purpleBullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(this.resetPurpleBullet, this);
    }

    greenBullets = game.add.group();
    greenBullets.enableBody = true;
    greenBullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++)
    {
        var b = greenBullets.create(0, 0, 'greenBullet');
        b.name = 'purpleBullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(this.resetGreenBullet, this);
    }
},

//  Ш А Г    У В Е Л И Ч Е Н И Я


leftDuck: function(){
    if(leftKey.isDown && left.x < width/4 ){
        qTween.to({
                alpha:1,
                // x:0+1,
                width:-width/2
            },1000,'Linear',true, 400
        );

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
    if(x==4)
    starTween.to({
        x:1000
    },500,'Linear');   
        
   
  
//Тайлятся звезды
    if(leftRocket.alpha == 1){
        tilesprite.alpha=1;
        tilesprite.tilePosition.x += 10;
        
    }
    if(rightRocket.alpha == 1){
        tilesprite2.alpha=1;
        tilesprite2.tilePosition.x -= 10;
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

    if (leftKey.isDown){   
        this.purpleFireBullet();
    }

    if (rightKey.isDown){   
        this.greenFireBullet();
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

purpleFireBullet: function (){

    if (game.time.now > purpleBulletTime)
    {
        purpleBullet = purpleBullets.getFirstExists(false);

        if (purpleBullet)
        {

            purpleBullet.reset(width/2, game.rnd.integerInRange(0, height - purpleBullet.height));
            purpleBullet.body.velocity.x = -1000;
            purpleBulletTime = game.time.now + 250;
            
        }
    }
},

greenFireBullet: function (){

    if (game.time.now > greenBulletTime){

        greenBullet = greenBullets.getFirstExists(false);
        
        if (greenBullet){

            greenBullet.reset(width/2, game.rnd.integerInRange(0, height-greenBullet.height));
            greenBullet.body.velocity.x = 1000;
            greenBulletTime = game.time.now + 250;

        }
    }
},
//  Called if the bullet goes out of the screen
resetPurpleBullet: function (purpleBullet) {
    purpleBullet.kill();
},
resetGreenBullet: function (greenBullet){
    greenBullet.kill();
},
// render: function(){
//     game.debug.spriteBounds(left);
//     game.debug.spriteBounds(leftRocket);
//     game.debug.spriteBounds(right);
//     game.debug.spriteBounds(rightRocket);
// }

}