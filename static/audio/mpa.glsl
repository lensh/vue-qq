precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D sTexture;
uniform lowp float brightness;

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
    vec4 textureColor = texture2D(sTexture, vTextureCoord);

    gl_FragColor = vec4((textureColor.rgb + vec3(brightness)), textureColor.w);
}