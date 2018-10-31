var height= window.innerHeight;
var width = window.innerWidth;
var glass;

var purpleBulletTime = 0;
var purpleBullet;
var purpleBullets;

var greenBullet;
var greenBullets;
var greenBulletTime = 0;

var video;
var bmd;
var glitch;
var Left;

var gameState = {
    preload:function(){
        game.load.image('green','green.png');
        game.load.image('purple','purple.png');
        game.load.image('white','white.png');
        game.load.image('purpleBullet','purpleBullet.png');
        game.load.image('greenBullet','greenBullet.png');
        game.load.image('greenParticleCircle','greenParticleCircle.png');
        game.load.image('purpleParticleCircle','purpleParticleCircle.png');
        // game.load.video('glitch','glitch.mp4');
        // game.load.image('whiteMask', 'whiteMask.png');
        game.load.spritesheet('glitch', 'glitch.png', 500, 280, 16);
        game.load.spritesheet('glass', 'glassSprite.png', 1243, 765, 7);

        // game.load.script('filter','https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Pixelate.js');

        game.load.image('right','utkaKoleso.png');
        game.load.image('left','koleso2.png');
        game.load.image('like','like.png');
        game.load.image('sad','sad.png');
        game.load.image('tile','tile.png');
    },



    create:function (){

        game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.stage.backgroundColor = '#fb2345';
        game.stage.backgroundColor = '#000';

    
    
    
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
        // // G.add(sprite);
        // // sprite.bringToTop();
        // sprite.width = width;
        // sprite.height = height;


        //Встаивть где нужен абис
        // this.abyss();
        // filterbeforeimage.update();

//КОНЕЦ В А У ЭФФЕКТА
        
        // tilesprite = game.add.tileSprite(0, 0, width/2, height, 'tile');
        // tilesprite2 = game.add.tileSprite(width/2, 0, width/2, height, 'tile');

        duckGroup = game.add.group();

        right = game.add.sprite(0,0,'right');
        right.scale.setTo(0.5);
        duckGroup.add(right);
        right.position.x = (width/2);
        right.position.y =  (height/2)-(right.height/2);
        
        left = game.add.sprite(0,0,'left');
        duckGroup.add(left);
        left.scale.setTo(0.5);
        left.position.x = (width/2)-right.width;
        left.position.y = (height/2) - (left.width/2) ;
        left.bringToTop();
       
        this.textTimer();
       

        white = game.add.sprite(0,0,'white');
        white.scale.setTo(0.65,0.65);
        white.x=(width-white.width)/2;
        white.y=(height-white.height)/2;
        // white.alpha=0;
        
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

        leftKey.onDown.add(this.leftDuck, this);
        rightKey.onDown.add(this.rightDuck, this);
        
        this.bullets();
        
        G = game.make.group();
        // glitch = game.add.sprite(0, 0, 'glitch');
        // G.add(glitch);
        // glitch.scale.setTo(3,3);
        // glitch.x=(width-glitch.width)/2;
        // glitch.y=(height-glitch.height)/2;
        // glitch.animations.add('gglitch');
        // glitch.alpha = 0;

        // sprite.filters = [ filterbeforeimage ];
        blackHole = game.add.graphics(0, 0);
        blackHole.beginFill(0x000000, 1);
        blackHole.drawCircle(0, 0, 10);

        blackHole.position.setTo(width/2+(blackHole.width/2),height/2);

        
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

    textTimer: function(){
        textTimer = game.time.create(false);
        textTimer.loop(1000, this.rules, this);
        text1 = game.add.text(game.world.centerX,game.world.centerY, 'НАЖИМАЙ ВЛЕВО',{font:'bold 100px Arial', fill:'#fff'});
        text1W = text1.width;
        text1H = text1.height;
        text1.anchor.setTo(.5,.5);
        text1.width = 1;
        text1.height = 1;

        text2 = game.add.text(0,0, 'ИЛИ ВПРАВО',{font:'bold 100px Arial', fill:'#fff'});
        text2.alpha=0;
        text2.position.setTo(game.world.centerX, game.world.centerY)
        text2W = text2.width;
        text2H = text2.height;
        text2.width = 1;
        text2.height = 1;
        text2.anchor.setTo(.5,.5);

        text3 = game.add.text(0,0, 'ВЫВЕЗИ УТКУ ПОКА НЕ ЗАТЯНУЛО',{font:'bold 100px Arial', fill:'#fff'});
        text3.alpha=0;
        text3.position.setTo(game.world.centerX, game.world.centerY)
        text3W = text3.width;
        text3H = text3.height;
        text3.width = 1;
        text3.height = 1;
        text3.anchor.setTo(.5,.5);

        textTween1 = game.add.tween(text1);
        textTween2 = game.add.tween(text2);
        textTween3 = game.add.tween(text3);

        textTween1.to({
            width: text1W,
            height: text1H
        },800,'Linear',true, 400);

        textTween1.onComplete.add( function(){
            text1.alpha = 0;
            text2.alpha = 1;
            textTween2.to({
                width: text2W,
                height: text2H
            },800,'Linear',true);

            textTween2.onComplete.add(
                function(){
                    text2.alpha = 0;
                    text3.alpha = 1;
                    textTween3.to({
                        width: text3W,
                        height: text3H
                    },1000,'Linear',true);
                    textTween3.onComplete.add(function(){
                        text3.alpha = 0;
                    })
                }
            );   
        });
    },




    //  Ш А Г    У В Е Л И Ч Е Н И Я
    
    leftDuck: function(){
        left.x -=15;
        blackHole.width -=15;
        blackHole.height -=15;

    },
    rightDuck: function(){
        right.x +=15    ;
        blackHole.width -=15;
        blackHole.height -=15;
    },
   
          
    update:function(){
        // tilesprite.tilePosition.x -= 10;
        // tilesprite2.tilePosition.x += 10;
        
        // filterbeforeimage.update();


        if(left.x>(width/2)-left.width){
            left.x = (width/2)-left.width;
        }else{
            left.x+=1;
        }

        if(right.x<width/2){
            right.x = width/2;
        }else{
            right.x-=1;
            blackHole.width +=3;
            blackHole.height +=3;
        }

        if( left.x < 0){
            left.x = 0;
            rightKey.enabled = false;
            leftKey.enabled = false;

            game.add.text(0, 0, "ты выиграл");

            // П О Б Е Д И Т Е Л Ь  Л Е В Ы Й
            // КАКИЕТО КОМАНДЫ

            game.camera.shake(0.05, 700);
            
        //LIKE EMITTER
            PpurpleEmitter = game.add.emitter(width/2-300, height/2 , 200);
            game.physics.arcade.enable(PpurpleEmitter);
            PpurpleEmitter.checkWorldBounds = true;
            PpurpleEmitter.outOfBoundsKill = true;
            
            PpurpleEmitter.makeParticles('like');
            PpurpleEmitter.setXSpeed(1000, -1000)
            PpurpleEmitter.setYSpeed(1000, -1000)
            PpurpleEmitter.start(false, 1500, 4);
            
            // glitch.bringToTop();
            // glitch.alpha = 1;
            // white.alpha = 0;
            // glitch.animations.play('gglitch', 20, true);

        //SAD EMITTER

            sads = game.add.physicsGroup();
            // sads.enableBody = true;

        //GLASS ANIM
            glass = game.add.sprite(width/2,0,'glass');
            glass.scale.setTo(0.5,0.5);
            glass.animations.add('glassCrack');
            glass.animations.play('glassCrack', 10,false);

            // var filter = game.add.filter('Pixelate', width, height);
	        // glass.filters = [filter];
            // Phaser.Filter.Pixelate.sizeX = 100;
            // Phaser.Filter.Pixelate.sizeY = 100;
            // glass.filter.sizeX = 10;
            // glass.sizeX = 20;
            // glass.sizeY = 10;

            for (var i = 0; i < 1; i++)
            {
                // game.rnd.integerInRange(0,height/2)
                var s = sads.create(game.rnd.integerInRange(width/2,width), 0, 'sad');
                s.scale.setTo(5);
                s.name = 'sad' + s;
                s.body.collideWorldBounds = true;
                s.body.bounce.setTo(0.5,0.8  );
                // s.body.velocity.y = 10;
                s.body.gravity.y =2000;
                game.physics.arcade.collide(sads);
            }
        } 
        
        
        // ЗАПУСКАЕТ АНИМАЦИЮ БИТОГО СТЕКЛА
     

        if((right.x+right.width) > width ){
            right.x=width-right.width;
            leftKey.enabled = false;
            game.add.text(width/2, 0, "ты выиграл");
            
            // П О Б Е Д И Т Е Л Ь  П Р А В Ы Й
            // КАКИЕТО КОМАНДЫ
            game.camera.shake(0.5, 2000);

            // GpurpleEmitter = game.add.emitter(width/2+300, height/2 , 100);
            // game.physics.arcade.enable(GpurpleEmitter);
            // GpurpleEmitter.checkWorldBounds = true;
            // GpurpleEmitter.outOfBoundsKill = true;
            
            // GpurpleEmitter.makeParticles('like');
            // GpurpleEmitter.setXSpeed(1000, -1000);
            // GpurpleEmitter.setYSpeed(1000, -1000);
            // GpurpleEmitter.start(false, 1500, 20);


            //З А П У С К    GLITCH

            // video.play(true);
            // glitch.bringToTop();
            // glitch.alpha = 1;
            // white.alpha = 0;
            // glitch.animations.play('gglitch', 20, true);
            
            // glass = game.add.sprite(0,0,'glass');
            // glass.scale.setTo(0.5,0.5);
            // glass.x = width/2;
            // glass.animations.add('glassCrack');
            // glass.animations.play('glassCrack', 20,true);


        }

       if (leftKey.isDown){   
            // this.purpleFireBullet();

            // fire = game.add.emitter(left.x+left.width-50,left.y+100,2);
            // duckGroup.add(fire);
            // left.bringToTop();

            // fire.makeParticles('purpleParticleCircle');
            // fire.start(false, 1, 2,1);

        }

        if (rightKey.isDown){   
            // this.greenFireBullet();

            // fire1 = game.add.emitter(right.x+50,right.y+100,200);
            // duckGroup.add(fire1);
            // right.bringToTop();

            // fire1.makeParticles('purpleParticleCircle');
            // fire1.start(false, 100, 250,10);

        }
    },

    abyss:function(){
        // filterbeforeimage = new Phaser.Filter(game, null, fragmentSrcB);

        // filterbeforeimage.setResolution(800, 800);
        // sprite = game.add.sprite();
        // sprite.width = width;
        // sprite.height = width;
        sprite.filters = [ filterbeforeimage ];
    },  

    purpleFireBullet:function () {

        if (game.time.now > purpleBulletTime)
        {
            purpleBullet = purpleBullets.getFirstExists(false);

            if (purpleBullet)
            {
                purpleBullet.reset(width/2, game.rnd.integerInRange(0, height - purpleBullet.height));
                purpleBullet.body.velocity.x = -3000;
                purpleBulletTime = game.time.now + 250;
            }
            
            // if(left.x < (width/2)/2){

            //     purpleEmitter = game.add.emitter(width/2, purpleBullet.y , 200);
            //     purpleEmitter.makeParticles('purpleParticleCircle');
            //     // purpleEmitter.rotation = 1;
            //     // purpleEmitter.x = width/2;
            //     // purpleEmitter.setRotation(0, 0);
            //     purpleEmitter.start(false, 2000, 250,10);
            //     // emitter.angle=90;
            //     //СЮДА ЕЩЕ ПАРТИКЛЫ ДОБАВИТЬ

            // }
        }

    },
    
    greenFireBullet:function () {

        if (game.time.now > greenBulletTime){

            greenBullet = greenBullets.getFirstExists(false);
            
            if (greenBullet){

                greenBullet.reset(width/2, game.rnd.integerInRange(0, height-greenBullet.height));
                greenBullet.body.velocity.x = 3000;
                greenBulletTime = game.time.now + 250;

            }

            // if(right.x > ((width/2)+((width/2)/2))){

            //     greenEmitter = game.add.emitter(width/2, greenBullet.y , 200);
            //     greenEmitter.makeParticles('greenParticleCircle');
            //     greenEmitter.start(false, 2000, 250,10);
            //     // emitter.angle=90;
            //     //СЮДА ЕЩЕ ПАРТИКЛЫ ДОБАВИТЬ
            // }
        }
    },
    //  Called if the bullet goes out of the screen
    resetPurpleBullet:function (purpleBullet) {

        purpleBullet.kill();

    },
    resetGreenBullet:function (greenBullet) {

        greenBullet.kill();

    }
}