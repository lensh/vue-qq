//#extension GL_OES_EGL_image_external : require
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D sTexture;
const mediump vec3 W = vec3(0.2125, 0.7154, 0.0721);

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
    lowp vec4 textureColor = texture2D(sTexture, vTextureCoord);
    float luminance = dot(textureColor.rgb, W);

    float alpha = getAlpha();
    gl_FragColor = vec4(vec3(luminance), alpha);
}