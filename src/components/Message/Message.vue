<template>
  <!-- 消息 -->
  <div class="wrapper">
    <VAsideMenu></VAsideMenu>
	  <VHeader :currentTab="currentTab"></VHeader>
    <VScroll :data="dataList" component="message">
        <ul>
          <li><VSearch placeholder="搜索"></VSearch></li>
          <li class="message" v-for="item in dataList" @click="goChat(item.type,item.id)"
              @touchstart="touchStart" @touchmove="touchMove">
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
import {mapGetters} from 'vuex'

export default {
  name: 'message',
  data () {
    return {
      currentTab:1
    }
  },
  computed:{
    ...mapGetters({
      'userId':'userId',
      'dataList':'allMessage'
    })
  },
  created(){
    //获取消息
    this.$store.dispatch('getAllMessage',this.userId)

    //新消息通过socket来获取
    this.updateBySocket()
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
        'isShowMask':true
      })
    },
    goChat(chatType,chatId){           
      const path = chatType =='single' ? `/chat_one/${chatId}`:`/chat_group/${chatId}`
      this.$router.push(path)
    },
    //通过socket来更新消息
    updateBySocket(){
      socket.removeAllListeners() //一定要先移除原来的事件，否则会生成重复的监听器

      socket.on('receivePrivateMessage',(data)=>{
          this.$store.commit('UPDATE_MESSAGE',{
            from_user:data.from_user_beizhu,
            id:data.from_user,
            imgUrl:data.from_user_face,
            message:data.message,
            time:data.time,
            type:'single',
            isEnterChat:false  //是否进入了聊天页面，进入了的话那么该条消息的unread就是0
          })
      })
      socket.on('receiveGroupMessage',(data)=>{
          //如果不包含自己，则直接丢弃这个socket消息
          if(!data.group_member.includes(this.userId-0))  return

          this.$store.commit('UPDATE_MESSAGE',{
            from_user:data.group_name,
            id:data.group_id,
            imgUrl:data.group_avator,
            message:`${data.from_user_nick_name}:${data.message}`,
            time:data.time,
            type:'group',
            isEnterChat:false
          })
      })
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
          overflow:hidden;  /*内容超出后隐藏*/
          text-overflow:ellipsis; /*当文本溢出时显示省略标记(...)*/
          white-space:nowrap;  /*文本不换行*/
          word-break:keep-all;
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
