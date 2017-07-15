precision mediump float;

// 最多绑定8个纹理单元
uniform sampler2D Sampler0;
uniform sampler2D Sampler1;
uniform sampler2D Sampler2;
uniform sampler2D Sampler3;
uniform sampler2D Sampler4;
uniform sampler2D Sampler5;
uniform sampler2D Sampler6;
uniform sampler2D Sampler7;
			
uniform int Filter;
uniform int ImageType;	// 0=yuv,1=yuva,2=rgb,3=rgba

varying vec2 coordinate;

void main()
{
	vec4 rgba;
	
	if(ImageType == 0)
	{
		vec3 yuv;
		vec3 rgb;
		
		yuv.x = texture2D(Sampler0, coordinate).r;
		yuv.y = texture2D(Sampler1, coordinate).r-0.5;
		yuv.z = texture2D(Sampler2, coordinate).r-0.5 ;
    
	    rgb = mat3(      1,       1,      1,
						0, 		-.34414, 1.772,
					1.402, 	-.71414, 0) * yuv;
		rgba = vec4(rgb, 1);
	}
	else if(ImageType == 1)
	{
		highp vec3 yuv;
		highp vec3 rgb;
		
		yuv.x = texture2D(Sampler0, coordinate).r;
		yuv.y = texture2D(Sampler1, coordinate).r-0.5;
		yuv.z = texture2D(Sampler2, coordinate).r-0.5 ;
    
	    rgb = mat3(      1,       1,      1,
						0, 		-.34414, 1.772,
					1.402, 	-.71414, 0) * yuv;
		rgba = vec4(rgb, texture2D(Sampler3, coordinate).r);
	}
	else if(ImageType == 2)
	{
		highp vec3 rgb;
		rgb = texture2D(Sampler0, coordinate).xyz;
		rgba = vec4(rgb, 1);
	}
	else if(ImageType == 3)
	{
		highp vec4 rgba;
		rgba = texture2D(Sampler0, coordinate);
	}

/*
    if(Filter == 1)
    {
        if(rgba.r >= 100.0 / 255.0)
            rgba.r = rgba.g = rgba.b = 1.0;
        else
            rgba.r = rgba.g = rgba.b = 0.0;
    }
    else if(Filter == 2)
    {
        rgba.r = rgba.g = rgba.b = yuv.x;
    }
    else if(Filter == 3)
    {
        rgba.r = 1.0 - rgba.r;
        rgba.g = 1.0 - rgba.g;
        rgba.b = 1.0 - rgba.b;
    }
    */
	
	gl_FragColor = rgba;
}