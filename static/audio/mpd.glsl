precision lowp float;

varying highp vec2 vTextureCoord;
uniform sampler2D sTexture;
uniform sampler2D sTexture2;

uniform float percent;
uniform float drawPart;
uniform float direction;
float getAlpha(){
    float side;
    if(direction < 2.0){
        side = step(percent, vTextureCoord.x) + 1.0;
    }else{
        side = step(percent, vTextureCoord.y) + 1.0;
    }
    side = abs(drawPart-side);
    return step(side, 0.5);
}

void main()
{
    vec3 texel = texture2D(sTexture, vTextureCoord).rgb;
    texel.r = texture2D(sTexture2, vec2(texel.r, .16666)).r;
    texel.g = texture2D(sTexture2, vec2(texel.g, .5)).g;
    texel.b = texture2D(sTexture2, vec2(texel.b, .83333)).b;

    gl_FragColor = vec4(texel, getAlpha());
}