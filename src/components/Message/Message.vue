<template>
  <!-- 消息 -->
  <div class="wrapper">
    <VAsideMenu></VAsideMenu>
	  <VHeader :currentTab="currentTab"></VHeader>
    <VScroll :data="dataList">
        <ul @touchstart="touchStart" @touchmove="touchMove" @dblclick="chat"
         @tap="chat">
            <li><VSearch placeholder="搜索"></VSearch></li>
            <li class="message" v-for="item in dataList" :data-type='item.type' 
            :data-id="item.id">
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

let startX,startY,moveEndX,moveEndY,X,Y,target
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
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  created(){
    this.getAllMessage()
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
      e.preventDefault()
      startX = e.targetTouches[0].pageX
      startY = e.targetTouches[0].pageY
      target=e.target||e.srcElement
      while(target.tagName!='UL'){
        target=target.parentNode?target.parentNode:''
      }
    },
    touchMove(e){
      e.preventDefault()
      moveEndX = e.targetTouches[0].pageX
      moveEndY = e.targetTouches[0].pageY
      X = moveEndX - startX
      Y = moveEndY - startY
      if ( Math.abs(X) > 3*Math.abs(Y) && X > 50 && target &&target.tagName=='UL') {
        this.showSidebar();
      }
    },
    showSidebar(e){
      this.$store.commit('SHOW_SIDEBAR',{
        'isShowSideBar':true,
        'isInit':false,
        'isShowMask':true
      })
    },
    chat(e){      
      if($('#wrapper').attr('isMove')==1)  return
        
      let target=$(e.target).get(0)
      while(target.tagName!='LI'){
        target=target.parentNode?target.parentNode:''
      }
      if(!target) return

      const type=$(target).attr('data-type')
      const id=$(target).attr('data-id')
      const path= type=='single' ? 'ChatOne':'ChatGroup'
      this.$router.push({
          path:path,
          query:{
            id:id
          }
      })
    },
    getAllMessage(){
      //判断是否获取过所有消息,没有才获取,防止重复获取,以减缓数据库的压力,
      //新消息通过socket来获取
      if(this.$store.state.message.hasGetAllMessage==0){
        const user_id=this.$store.state.login.loginStatus.userId
        this.$store.dispatch('getAllMessage',user_id)
      }
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
          font-size:14px;
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
