precision mediump float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

uniform int uFunc1;
uniform int uFunc2;
uniform int uFunc3;
uniform int uFunc4;
uniform int uFunc5;
uniform int uFunc6;
uniform int uFunc7;
uniform int uFunc8;
uniform int uFunc9;
uniform int uFunc10;
uniform int uActivatingFuncIndex;
uniform float uActivationAmount;


// Lifted from:https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
float DistanceToLineSegment(vec2 p0, vec2 p1, vec2 p)
{
    float distanceP0 = length(p0 - p);
    float distanceP1 = length(p1 - p);
    
    float l2 =pow(length(p0 - p1), 2.);
    float t = max(0., min(1., dot(p - p0, p1 - p0) / l2));
    vec2 projection = p0 + t * (p1 - p0); 
    float distanceToProjection = length(projection - p);
    
    return min(min(distanceP0, distanceP1), distanceToProjection);
}


float funcy(float x, int func){

    if(func == 1)     {return x+1.;} 
    else if(func == 2){return x*-1.;}
    else if(func == 3){return pow(x,-1.);}
    else if(func == 4){return pow(x,2.);}
    else if(func == 5){return pow(x,3.);}
    else if(func == 6){return pow(x,0.5);}
    else if(func == 7){return sin(x);}
    else if(func == 8){return pow(2.,x);}
    else if(func == 9){return log2(x);}
    else if(func ==10){return sin(x+iTime);}
    else if(func ==11){return abs(x);}
    else if(func ==12){return mod(x,2.);}
    return x;
}

float ddt(float x,int func){

    if(func!=0){
        return funcy(x,func);
    }
    return x;

}

float Function(float x)
{
    float toutput = x;
    
    toutput = funcy(toutput,uFunc1);
    toutput = funcy(toutput,uFunc2);
    toutput = funcy(toutput,uFunc3);
    toutput = funcy(toutput,uFunc4);
    toutput = funcy(toutput,uFunc5);
    toutput = funcy(toutput,uFunc6);
    toutput = funcy(toutput,uFunc7);
    toutput = funcy(toutput,uFunc8);
    toutput = funcy(toutput,uFunc9);
    toutput = funcy(toutput,uFunc10);

    if(uActivatingFuncIndex >= 0 ){
        
        float toutput2 = x;
        //Get the func that isnt activated
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 0 ?  0 : uFunc1);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 1 ?  0 : uFunc2);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 2 ?  0 : uFunc3);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 3 ?  0 : uFunc4);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 4 ?  0 : uFunc5);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 5 ?  0 : uFunc6);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 6 ?  0 : uFunc7);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 7 ?  0 : uFunc8);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 8 ?  0 : uFunc9);
        toutput2 = funcy(toutput2,uActivatingFuncIndex == 9 ? 0 : uFunc10);
        
        float delta = toutput-toutput2;
        toutput = toutput+(delta*(-(1.-uActivationAmount)));
    }

    return toutput;
}

float DistanceToFunction(vec2 p, float xDelta)
{
    float result = 100.;
    
    for (float i = -3.; i < 3.; i += 1.)
    {
        vec2 q = p;
        q.x += xDelta * i;
        
        vec2 p0 = vec2(q.x, Function(q.x));
    	vec2 p1 = vec2(q.x + xDelta, Function(q.x + xDelta));
        result = min(result, DistanceToLineSegment(p0, p1, p));
    }

    return result;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    uv-= vec2(0.5,0.5);
    uv*=5.;

    float distanceToPlot = DistanceToFunction(uv, 1. / iResolution.x)/6.;
    float intensity = smoothstep(0., 1., 1. - distanceToPlot * 1. * iResolution.y);
    intensity = pow(intensity,1./2.2);
    
    vec3 col = vec3(intensity,0,0);

    fragColor = vec4(col,intensity);
}

void main() 
{
    mainImage( gl_FragColor, gl_FragCoord.xy );
}