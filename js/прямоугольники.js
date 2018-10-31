var width = window.innerWidth;
var height= window.innerHeight;
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
var G;

var Left;

// var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example');

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
        // game.load.image('image','1.jpg');
        game.load.image('koleso','utkaKoleso.png');
        game.load.image('koleso2','koleso2.png');
    },

    create:function (){

        //хороший цвет
        game.stage.backgroundColor = '#fb2345';
        // game.stage.backgroundColor = '#000';


        koleso = game.add.sprite(width/2,game.world.centerY,'koleso');
        koleso.scale.setTo(0.5);

        koleso2 = game.add.sprite((width/2)-koleso.width,game.world.centerY,'koleso2');
        // koleso2.scale.setTo(-1,1);
        koleso2.scale.setTo(0.5);


        //  ЭТО ПОЯВЛЯЕТСЯ КОГДА ВЫИГРАЛ ИЛИ  
        //КОРОЧЕ СОЗДАЕТ В А У ЭФФЕКТ

//         fragmentSrcB = [
//             // "#ifdef GL_ES",
//             // "precision mediump float;",
//             // "#endif",

//             // "uniform vec2 resolution;",
//             // "uniform float time;",

//             // "#define num 60.0",


//             // "float random(vec2 p){",
//             // "	return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453+time*4.0);",	
//             // "}",


//             // "void main() {",
//             // "    	vec2 p = ( gl_FragCoord.xy / (resolution.xy) );",
//             // "	//- vec2(0.5, 0.5);",
//             // "	//vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y) - vec2(.5 , .5);",
                
//             // "    	float top, bottom, linewidth;",
//             // "	float offSet = 0.5;",
//             // "	float span = 0.01;",
//             // "	linewidth = 0.01;",
                
//             // "   	top = fract(time);",
//             // "	bottom = fract(time) + linewidth;",
                
//             // "	vec4 border = vec4(0.0, 0.0, 0.0, 1.0);",
                
//             // "	for(float i = 1.0; i < num; i++){",
//             // "		top += i * span;" ,
//             // "		top = fract(top);",
//             // "		bottom += i *span;",
//             // "		bottom = fract(bottom);",
//             // "		if(p.y > top && p.y < bottom){",
//             // "		border = vec4(abs(1.0 * sin(time)), 0.0, 0.0, 1.0);",
//             // "		}",
//             // "	}",
                
//             // " 	float c = random(p);",
//             // "	vec3 col = mix(vec3(c, c, c), border.xyz, 0.6);",
//             // "	//float r = mix(c, border.x, 0.6);",
//             // "	//vec4 col= vec4(mix(vec3(p, p, p), border.xyz), 1.0);",
//             // "    	gl_FragColor = vec4(col, 1.0);",
                
//             // "	/*",
//             // "	if(p.y < -0.5){",
//             // "		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
//             // "	}",
//             // "	*/",
                
//             // "}"

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
// "	for(int i=0;i<23;i++){",
// "		d+=cos(opTwist(q));",
// "	}",
// "	return d;",
// "}",
// "float trace(vec3 o, vec3 r){",
// "	float t=0.0;",
// "	for(int i=0;i<32;i++){",
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
//         ];

        // filterbeforeimage = new Phaser.Filter(game, null, fragmentSrcB);

        // filterbeforeimage.setResolution(800, 800);
        // sprite = game.add.sprite();
        // sprite.width = width;
        // sprite.height = width;
        // sprite.filters = [ filterbeforeimage ];

        // image = game.add.sprite(0,0,'image');
        // textTimer = game.time.create(false);
        // textTimer.loop(3000, this.rules, this);
//КОНЕЦ В А У ЭФФЕКТА

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

        text3 = game.add.text(0,0, 'КТО БЫСТРЕЕ',{font:'bold 100px Arial', fill:'#fff'});
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
                    },800,'Linear',true);
                    textTween3.onComplete.add(function(){
                        text3.alpha = 0;
                    })
                }
            );   
        });

        





        green = game.add.sprite(width/2,0,'green');
        green.width = 0;
        green.height = height*3;
        
        // filter = game.add.filter('Pixelate',800,600);
        
        purple = game.add.sprite(width/2,0,'purple');
        purple.width = -0;
        purple.height = height*3;
       

        white = game.add.sprite(0,0,'white');
        
        white.scale.setTo(0.65,0.65);
        white.x=(width-white.width)/2;
        white.y=(height-white.height)/2;
        white.alpha=0;
        
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        


        rightKey.onDown.add(this.koleso, this);
        leftKey.onDown.add(this.koleso2, this);
        

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
        G = game.make.group();

        glitch = game.add.sprite(0, 0, 'glitch');
        G.add(glitch);
        glitch.scale.setTo(3,3);
        glitch.x=(width-glitch.width)/2;
        glitch.y=(height-glitch.height)/2;
        // glitch.width = white.width;
        // glitch.height= white.height;
        glitch.animations.add('gglitch');
        glitch.alpha = 0;
        
        // image.filters = [filter];

    },

    //  Ш А Г    У В Е Л И Ч Е Н И Я

    greenW:function(){
        green.width+=50;
    },
    purpleW:function(){
        purple.width-=50;
    },

    koleso: function(){
        koleso.x +=10;
    },
    koleso2: function(){
        koleso2.x-=10;
    },
          
    update:function(){

        // filterbeforeimage.update();

        // if(green.width>200){
        //     game.add.tween(filter).to( { sizeX: 10, sizeY: 10 }, 5000, "Linear", true);
        //     // image.angle=45;

        // }


//ПРЯМОУГОЛЬНИКИ(
if( purple.width < -((width/2)-1) ){
    purple.width = -(width/2);
    rightKey.enabled = false;
    game.add.text(0, 0, "ты выиграл");


    // П О Б Е Д И Т Е Л Ь  П У Р П У Р Н Ы Й
    // КАКИЕТО КОМАНДЫ


    PpurpleEmitter = game.add.emitter(width/2-300, height/2 , 20);


    G.add(PpurpleEmitter);

    PpurpleEmitter.makeParticles('greenParticleCircle');
    // purpleEmitter.rotation = 1;
    // purpleEmitter.x = width/2;
    // purpleEmitter.setRotation(0, 0);
    PpurpleEmitter.setXSpeed(1000, -1000)
    PpurpleEmitter.setYSpeed(1000, -1000)

    PpurpleEmitter.start(false, 1500, 250,10,);


    glitch.bringToTop();
    glitch.alpha = 1;
    white.alpha = 0;
    glitch.animations.play('gglitch', 20, true);
} else{
    purple.width +=1;
}



        if( purple.width < -((width/2)-1) ){
            purple.width = -(width/2);
            rightKey.enabled = false;
            game.add.text(0, 0, "ты выиграл");


            // П О Б Е Д И Т Е Л Ь  П У Р П У Р Н Ы Й
            // КАКИЕТО КОМАНДЫ


            PpurpleEmitter = game.add.emitter(width/2-300, height/2 , 20);


            G.add(PpurpleEmitter);

            PpurpleEmitter.makeParticles('greenParticleCircle');
            // purpleEmitter.rotation = 1;
            // purpleEmitter.x = width/2;
            // purpleEmitter.setRotation(0, 0);
            PpurpleEmitter.setXSpeed(1000, -1000)
            PpurpleEmitter.setYSpeed(1000, -1000)

            PpurpleEmitter.start(false, 1500, 250,10,);
            
            
            glitch.bringToTop();
            glitch.alpha = 1;
            white.alpha = 0;
            glitch.animations.play('gglitch', 20, true);
        } else{
            purple.width +=1;
        }
        
        // ЗАПУСКАЕТ АНИМАЦИЮ БИТОГО СТЕКЛА
        //
        // if(green.width> 400){
        //     glass = game.add.sprite(0,0,'glass');
        //     glass.scale.setTo(0.5,0.5);
        //     glass.animations.add('glassCrack');
        //     glass.animations.play('glassCrack', 3,true);
        // }

        if(green.width > (width/2)-1 ){
            green.width=width/2;
            leftKey.enabled = false;
            game.add.text(width/2, 0, "ты выиграл");


            // П О Б Е Д И Т Е Л Ь  З Е Л Е Н Ы Й
            // КАКИЕТО КОМАНДЫ


            GpurpleEmitter = game.add.emitter(width/2+300, height/2 , 20);
            G.add(GpurpleEmitter);
            GpurpleEmitter.makeParticles('purpleParticleCircle');
            // purpleEmitter.rotation = 1;
            // purpleEmitter.x = width/2;
            // purpleEmitter.setRotation(0, 0);
            GpurpleEmitter.setXSpeed(1000, -1000);
            GpurpleEmitter.setYSpeed(1000, -1000);
            GpurpleEmitter.start(false, 1500, 250,10,);


            //З А П У С К    GLITCH
            // video.play(true);
            glitch.bringToTop();
            glitch.alpha = 1;
            white.alpha = 0;

            
            glitch.animations.play('gglitch', 20, true);
            

            // glass = game.add.sprite(0,0,'glass');
            // glass.scale.setTo(0.5,0.5);
            // glass.x = width/2;
            // glass.animations.add('glassCrack');
            // glass.animations.play('glassCrack', 20,true);


        } else{
            green.width -=1;
        }


        if(green.width<1){
            green.width=0;
        }
        if(purple.width>-1){
            purple.width=0;
        }

        
        if (leftKey.isDown){   
            this.purpleFireBullet();
        }
        if (rightKey.isDown){   
            this.greenFireBullet();
        }
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
            
            if(purple.width < -((width/2)-200)){

                purpleEmitter = game.add.emitter(width/2, purpleBullet.y , 200);
                purpleEmitter.makeParticles('purpleParticleCircle');
                // purpleEmitter.rotation = 1;
                // purpleEmitter.x = width/2;
                // purpleEmitter.setRotation(0, 0);
                purpleEmitter.start(false, 2000, 250,10,);
                // emitter.angle=90;
                //СЮДА ЕЩЕ ПАРТИКЛЫ ДОБАВИТЬ

            }
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

            if(green.width > ((width/2)-200)){

                greenEmitter = game.add.emitter(width/2, greenBullet.y , 200);
                greenEmitter.makeParticles('greenParticleCircle');
                greenEmitter.start(false, 2000, 250,10,);
                // emitter.angle=90;
                //СЮДА ЕЩЕ ПАРТИКЛЫ ДОБАВИТЬ
            }
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