precision mediump float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 st = fragCoord.xy / iResolution.xy;
    fragColor = vec4(st, 0.0, 1.0);
}

void main() 
{
    mainImage( gl_FragColor, gl_FragCoord.xy );
}