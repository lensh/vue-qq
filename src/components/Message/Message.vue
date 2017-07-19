<template>
  <!-- 消息 -->
  <div class="wrapper">
    <VAsideMenu></VAsideMenu>
	  <VHeader :currentTab="currentTab"></VHeader>
    <VScroll :data="dataList">
        <ul>
            <li><VSearch placeholder="搜索"></VSearch></li>
            <li class="message" v-for="item in dataList" 
                @click="goChat(item.type,item.id)"
                @touchstart.prevent="touchStart" @touchmove.prevent="touchMove">
                <img :src="item.imgUrl">
                <div class="info">
                   <p class="from">{{item.from_user}}<span>{{item.time}}</span></p>
                   <p class="message">{{item.message}}
                      <span v-if="item.unread!=0">{{item.unread}}</span>
                   </p>
                </div>
            </li>        
        </ul>
    </VScroll>
  	<VFooter :currentTab="currentTab"></VFooter>
  </div>
</template>

<script>
import VAsideMenu from '../Common/SideMenu/Sidemenu'
import VHeader from '../Common/Header/Header'
import VFooter from '../Common/Footer/Footer'
import VSearch from '@/base/Search/Search'
import VScroll from '@/base/Scroll/Scroll'

export default {
  name: 'message',
  data () {
    return {
      currentTab:1
    }
  },
  computed:{
    dataList(){
      return this.$store.state.message.allMessage
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('/login') :''

    //判断是否获取过所有消息,没有才获取,防止重复获取,以减缓数据库的压力,
    //新消息通过socket来获取
    if(this.$store.state.message.hasGetAllMessage==0){
      const user_id=this.$store.state.login.loginStatus.userId
      this.$store.dispatch('getAllMessage',user_id)
    }
  },
  components:{
  	VHeader,
  	VFooter,
  	VAsideMenu,
    VSearch,
    VScroll
  },
  methods:{
    touchStart(e){
      this.startX = this.getTouchXY(e).X
      this.startY = this.getTouchXY(e).Y
    },
    touchMove(e){
      const X = this.getTouchXY(e).X - this.startX
      const Y = this.getTouchXY(e).Y - this.startY
      if ( Math.abs(X) > 3*Math.abs(Y) && X > 50) {
        this.showSidebar()
      }
    },
    getTouchXY(e){
      return {
        X:e.targetTouches[0].pageX,
        Y:e.targetTouches[0].pageY
      }
    },
    showSidebar(e){
      this.$store.commit('SHOW_SIDEBAR',{
        'isShowSideBar':true,
        'isInit':false,
        'isShowMask':true
      })
    },
    goChat(chatType,chatId){           
      const path = chatType =='single' ? `chat_one/${chatId}`:`chat_group/${chatId}`
      this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
#wrapper{
   bottom:2.75rem !important;
   ul{
     cursor:pointer;
     width:100%;
     background:#fff;
   }
   ul li{
     border-bottom:1px solid #eee;
     height:60px;
     line-height:60px;
     padding:4px 10px;
     font-size:0;
     img{
       width:50px;
       height:50px;
       border-radius:50%;
       float:left;
       vertical-align:middle;
     }
     .info{
       font-size:16px;
       line-height:24px;
       display:block;
       position:relative;
       width:100%;
       left:18px;
       p.from{
          span{
            color:#666;
            float:right;
            font-size:13px;
            position:absolute;
            right:30px
          }
       }
       p.message{
          color:#666;
          width:64%;
          font-size:14px;
          overflow:hidden;
          text-overflow:ellipsis; /*当文本溢出时显示省略标记(...)*/
          word-break:keep-all;
          white-space:nowrap;  
          span{
            border-radius:50%;
            width:22px;
            height:22px;
            position:absolute;
            background:red;
            color:white;
            right:30px;
            font-size:12px;
            text-align:center
          }
       }
     }
   }
   ul li:first-child{
      height:42px;
      line-height:42px;
      border:none;
      margin-top:2px
   }
   .search{
      padding:0;
   }
}
</style>
