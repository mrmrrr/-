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