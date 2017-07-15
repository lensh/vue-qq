precision lowp float;
varying vec2 vTextureCoord;
uniform sampler2D sTexture;

uniform float percent;//百分比
uniform float drawPart;//画左边1.0；画右边2.0
uniform float direction;//切分方向，X轴1.0， Y轴2.0
//side:左1，右2
//part:左1，右2
//part-side:0, 1, -1 只有为0的地方才需要处理
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

    float alpha = getAlpha();
    gl_FragColor = vec4(texel, alpha);
}