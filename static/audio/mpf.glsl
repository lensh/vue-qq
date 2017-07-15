precision lowp float;
varying vec2 vTextureCoord;
uniform sampler2D sTexture;
uniform sampler2D sTexture2;
uniform float imageWidthFactor;
uniform float imageHeightFactor;
uniform float pixel;

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

vec3 pixelation(){
      vec2 uv  = vTextureCoord.xy;
      float dx = pixel * imageWidthFactor;
      float dy = pixel * imageHeightFactor;
      vec2 coord = vec2(dx * floor(uv.x / dx), dy * floor(uv.y / dy));
      vec3 tc = texture2D(sTexture, coord).xyz;
      return tc;
}

void main() {
    vec4 pathColor = texture2D(sTexture2, vTextureCoord);
    vec3 pixelRgb = pixelation();
    vec3 commonRgb = texture2D(sTexture, vTextureCoord).xyz;

    gl_FragColor = vec4(mix(commonRgb, pixelRgb, step(0.01, pathColor.a)), getAlpha());
}

