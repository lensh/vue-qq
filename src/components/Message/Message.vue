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
                   <p class="from">{{item.from}}<span>{{item.time}}</span></p>
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
      currentTab:1,
      dataList:[
        {
           type:'group',
           id:'1',
           from:'牛客网IT笔试面试讨论群9',
           time:'22:26',
           message:'勇者:有没有谁会nodejs',
           imgUrl:'/static/user/face/1.jpg',
           unread:'5'
        },
        {
           type:'group',
           id:'2',
           from:'ThinkPHP技术交流中心',
           time:'22:06',
           message:'所在地-工匠:我装了啊',
           imgUrl:'/static/user/face/2.jpg',
           unread:'1'
        },
        {
           type:'group',
           id:'3',
           from:'江师14级网工二班',
           time:'19:30',
           message:'熊白鸽:男生的材料我现在看不到,你们走心...',
           imgUrl:'/static/user/face/3.jpg',
           unread:'1'
        },
        {
           type:'group',
           id:'4',
           from:'英语四六级自动查询',
           time:'14:58',
           message:'冷眸least:你看一下绝对能看出来',
           imgUrl:'/static/user/face/4.jpg',
           unread:'1'
        },
        {
           type:'single',
           id:'5',
           from:'王勇平',
           time:'昨天',
           message:'点了外卖',
           imgUrl:'/static/user/face/6.jpg',
           unread:'0'
        },
        {
           type:'single',
           id:'6',
           from:'简相杰',
           time:'星期五',
           message:'技术栈会多一些',
           imgUrl:'/static/user/face/7.jpg',
           unread:'0'
        },
        {
           type:'group',
           id:'7',
           from:'心理电影周日8-9W7306',
           time:'星期五',
           message:'91 周楠:填问卷的人最帅',
           imgUrl:'/static/user/face/8.jpg',
           unread:'0'
        },
        {
           type:'single',
           id:'8',
           from:'魏瑞',
           time:'星期五',
           message:'我到教室了',
           imgUrl:'/static/user/face/9.jpg',
           unread:'1'
        },
        {
           type:'single',
           id:'10',
           from:'郭雅杰',
           time:'星期二',
           message:'好的啊',
           imgUrl:'/static/user/face/11.jpg',
           unread:'0'
        }
      ]
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
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
