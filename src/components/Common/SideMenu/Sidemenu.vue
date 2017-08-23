<template>
  <div>
    <div class="sidemenu" @touchstart="touchStart" @touchmove="touchMove"
    :class="{'show':isShowSideBar}">
       <div class="top" :style="style">
          <div class="userinfo">
            <img :src="userinfo.face" class="face">
            <span class="nickname">{{userinfo.nickname}}</span>
            <div class="level">
               <ul>
                 <li v-for="n in userinfo.level.crown">
                    <img src="../../../common/icon/hdr.png" class="level-1">
                 </li>
                 <li v-for="n in userinfo.level.sun">
                    <img src="../../../common/icon/hdu.png" class="level-1">
                 </li>
                 <li v-for="n in userinfo.level.moon">
                    <img src="../../../common/icon/hds.png" class="level-1">
                 </li>
                 <li v-for="n in userinfo.level.star">
                    <img src="../../../common/icon/hdt.png" class="level-1">
                 </li>
               </ul>
            </div>
            <p class="sign">{{userinfo.signature}}</p>
          </div>
       </div>
       <div class="side">
          <ul>
            <li>
               <img src="./qq_setting_svip.png">
               <span>了解会员特权</span>
            </li>
            <li><img src="./qq_setting_qianbao.png">
               <span>QQ钱包</span>
            </li>
            <li><img src="./qq_setting_zhuangban.png">
               <span>个性装扮</span>
            </li>
            <li><img src="./qq_setting_shoucang.png">
               <span>我的收藏</span>
            </li>
            <li><img src="./qq_setting_xiangce.png">
               <span>我的相册</span>
            </li>
            <li>
               <img src="./qq_setting_wenjian.png">
               <span>我的文件</span>
            </li>
          </ul>
       </div>
       <div class="setting">
          <ul>
            <li @click="$router.push('/setting')">
                <img src="./qq_setting_setting.png">
                <span>设置</span>
            </li>
            <li><img src="./qq_setting_me_nightmode_on.png">
                <span>夜间</span>
            </li>
            <li></li>
          </ul>
          <p class="weather">{{city}}<span>{{temperature}}<sup>o</sup></span></p>
       </div>
    </div>
    <div class="mask" v-show="isShowMask" @click="hideSidebar"></div>
  </div>
</template>

<script>
import calcLevel from '@/common/js/level'
import {mapGetters} from 'vuex'
import {get_weather} from '@/api/user'

export default {
  name: 'sidebar',
  data(){
    return {
      city:'南昌',
      temperature:28
    }
  },
  created(){
    //获取天气信息
    const weather = JSON.parse(localStorage.getItem('weather'))
    const oldTime = weather? weather.time:Date.parse(new Date())/1000
  
    //时间差值
    const diff = Date.parse(new Date())/1000 - oldTime
    if(!weather||diff>4*60*60){ //超过四个小时(一般温度变化是4个小时),则重新获取数据
      this.getWeather()  
    }else{  //否则从本地读取数据
      this.city=weather.city
      this.temperature=weather.temperature
    } 
  },
  computed:{
    ...mapGetters([
      'userInfo',
      'isShowSideBar',
      'isShowMask',
    ]),
    userinfo(){
      return{
        nickname:this.userInfo.nick_name,
        signature:this.userInfo.signature,
        face:this.userInfo.face,
        level:calcLevel(this.userInfo.level)
      }
    },
    style(){
      return {
        background:`url(${this.userInfo.profile_bg}) no-repeat`,
        backgroundSize:'100% 100%'
      } 
    }
  },
  methods:{
    hideSidebar(){
      this.$store.commit('SHOW_SIDEBAR',{
        'isShowSideBar':false,
        'isShowMask':false
      })
    },
    touchStart(e){
      this.startX = this.getTouchXY(e).X
      this.startY = this.getTouchXY(e).Y
    },
    touchMove(e){
      const X = this.getTouchXY(e).X - this.startX
      const Y = this.getTouchXY(e).Y - this.startY
      if ( Math.abs(X) > 3*Math.abs(Y) && X <-30) {//限定只能是左滑，最大限度减小倾斜的角度
　　　　 this.hideSidebar()
      }
    },
    getTouchXY(e){
      return {
        X:e.targetTouches[0].pageX,
        Y:e.targetTouches[0].pageY
      }
    },
    async getWeather(){
      const {data} = await get_weather()
      this.city=data.city
      this.temperature=data.temperature

      //持久化到本地
      const weather={
        city:data.city,
        temperature:data.temperature,
        time: Date.parse(new Date())/1000  //当前时间
      }
      localStorage.setItem('weather',JSON.stringify(weather))
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
.sidemenu{
   position:absolute;
   z-index:20;
   background:white;
   width:0;
   overflow:hidden;
   height:100%;
   box-shadow: 0 0 10px gray;
   cursor:pointer;
   transition:width .2s;
   &.show{
    width:80%;
   }
}
.sidemenu .top{
  width:100%;
  height:32%;
  position:relative;
  .userinfo{
     position:absolute;
     top:30%;
     left:6%;
     color:white;
     opacity:1;
     width:100%;
     img.face{
       width:3rem;
       height:3rem;
       border-radius:50%;
       border:3px solid white; 
     }
     span.nickname{
       width:270px;
       font-size:2rem;
       position:absolute;
       left:60px;
       letter-spacing:4px;
       font-weight:lighter;
       overflow:hidden;
     }
     .level{
       clear:both;
       width:300px;
       overflow:hidden;
       margin:10px 0 0 -10px;
       ul{
         li{
           float:left;
           width:18px;
           height:18px;
         }
       }
       img.level-1{
          transform:scale(0.5)
       }
     }
     p.sign{
       width:300px;
       overflow:hidden;
       margin-top:4px;
       font-size:14px;
       letter-spacing:2px;
     }
  }
}

.sidemenu .side{
  font-size:18px;
  ul{
    width:300px;
    overflow:hidden;
    li{
      height:46px;
      line-height:46px;
      padding-left:10px;
      img{
        transform:scale(0.5);
      }
      span{
        position:relative;
        top:-20px;
        left:-8px;
      }
    }
  }
}

.sidemenu .setting{
  width:300px;
  overflow:hidden;
  position:absolute;
  bottom:18px;
  height:60px;
  ul{
    width:100%;
    display:flex;
    margin-top:26px;
  }
  li{
    flex:1; 
    &:first-child{
      margin-left:14px
    }
    img{
      transform:scale(0.5);
      margin-bottom:-18px;
      margin-right:-10px;
    }
  }
  p.weather{
     display:inline;
     position:absolute;
     right:30px;
     bottom:0;
     span{
      color:#1E90FF;
      position:absolute;
      left:-4px;
      bottom:20px;
      font-size:30px;
      sup{
        font-size:1rem
      }
     }
  }
}
.mask{
  position:absolute;
  width:100%;
  height:100%;
  cursor:pointer;
  background:#000;
  opacity:0.3;
  z-index:19; /*z-index一定要比侧边栏的小，且比3个主页面大*/
}
</style>