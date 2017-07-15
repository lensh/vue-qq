//#extension GL_OES_EGL_image_external : require
precision lowp float;
varying vec2 vTextureCoord;
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

void main(){
    vec3 texel = texture2D(sTexture, vTextureCoord).rgb;

    vec2 lookup;
    lookup.y = .5;

    lookup.x = texel.r;
    texel.r = texture2D(sTexture2, lookup).r;

    lookup.x = texel.g;
    texel.g = texture2D(sTexture2, lookup).g;

    lookup.x = texel.b;
    texel.b = texture2D(sTexture2, lookup).b;

    float alpha = getAlpha();
    gl_FragColor = vec4(texel, alpha);
}