<template>
  <div>
    <div class="sidemenu" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove"
    :class="{'show':isShowSideBar,'hide':!isShowSideBar&&!isInit}">
       <div class="top" :style="style">
          <div class="userinfo">
            <img :src="userinfo.face" class="face">
            <span class="nickname">{{userinfo.nickname}}</span>
            <div class="level">
               <ul>
                 <li v-for="n in userinfo.level.crown">
                    <img src="/static/icon/2/hdr.png" class="level-1">
                 </li>
                 <li v-for="n in userinfo.level.sun">
                    <img src="/static/icon/2/hdu.png" class="level-1">
                 </li>
                 <li v-for="n in userinfo.level.moon">
                    <img src="/static/icon/2/hds.png" class="level-1">
                 </li>
                 <li v-for="n in userinfo.level.star">
                    <img src="/static/icon/2/hdt.png" class="level-1">
                 </li>
               </ul>
            </div>
            <p class="sign">{{userinfo.signature}}</p>
          </div>
       </div>
       <div class="side">
          <ul>
            <li>
               <img src="/static/icon/4/qq_setting_svip.png">
               <span>了解会员特权</span>
            </li>
            <li><img src="/static/icon/4/qq_setting_qianbao.png">
               <span>QQ钱包</span>
            </li>
            <li><img src="/static/icon/4/qq_setting_zhuangban.png">
               <span>个性装扮</span>
            </li>
            <li><img src="/static/icon/4/qq_setting_shoucang.png">
               <span>我的收藏</span>
            </li>
            <li><img src="/static/icon/4/qq_setting_xiangce.png">
               <span>我的相册</span>
            </li>
            <li>
               <img src="/static/icon/4/qq_setting_wenjian.png">
               <span>我的文件</span>
            </li>
          </ul>
       </div>
       <div class="setting">
          <ul>
            <li @click="$router.push('setting')">
                <img src="/static/icon/4/qq_setting_setting.png">
                <span>设置</span>
            </li>
            <li><img src="/static/icon/4/qq_setting_me_nightmode_on.png">
                <span>夜间</span>
            </li>
            <li></li>
          </ul>
          <p class="weather">南昌<span>25<sup>o</sup></span></p>
       </div>
    </div>
    <div class="mask" v-show="isShowMask" @click="hideSidebar"></div>
  </div>
</template>

<script>
import calcLevel from '@/common/js/level'
import {mapGetters} from 'vuex'

export default {
  name: 'sidebar',
  computed:{
    ...mapGetters([
      'userInfo',
      'isShowSideBar',
      'isInit',
      'isShowMask'
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
        'isInit':false,
        'isShowMask':false
      })
      //下面的一定不能省
      setTimeout(()=>{
        this.$store.commit('SET_INIT',{'isInit':true})
      },600)
    },
    touchStart(e){
      this.startX = this.getTouchXY(e).X
      this.startY = this.getTouchXY(e).Y
    },
    touchMove(e){
      const X = this.getTouchXY(e).X - this.startX
      const Y = this.getTouchXY(e).Y - this.startY
      if ( Math.abs(X) > 3*Math.abs(Y) && X <-30) {
         //限定只能是左滑，最大限度减小倾斜的角度
　　　　 this.hideSidebar();
      }
    },
    getTouchXY(e){
      return {
        X:e.targetTouches[0].pageX,
        Y:e.targetTouches[0].pageY
      }
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
   &.show{
   	 width:80%;
   	 animation:showMySidebar .4s;
   }
   &.hide{
   	 width:0;
     animation:hideMySidebar .4s;
   }
   @keyframes showMySidebar{
      from{
        width:0
      }
      to{
        width:80%
      }
    }
   @keyframes hideMySidebar{
      from{
        width:80%
      }
      to{
        width:0
      }
    }
}
.sidemenu .top{
  width:100%;
  height:36%;
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