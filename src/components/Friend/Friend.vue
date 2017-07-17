<template>
  <!-- 联系人列表 -->
  <div class="wrapper">
    <VAsideMenu></VAsideMenu>
  	<VHeader :currentTab="currentPage"></VHeader>
    <VScroll :data="dataList.friends" :isHeightChange="isHeightChange">
        <VSearch placeholder="搜索"></VSearch>
        <p class="newFriends" @click="$router.push('friendNew')">新朋友</p>
        <div class="tab" @click="changeTab">
           <div class="item first" :class="{'blue':currentTab==1}">好友</div>
           <div class="item" :class="{'blue':currentTab==2}">群</div>
           <div class="item" :class="{'blue':currentTab==3}">多人聊天</div>
           <div class="item" :class="{'blue':currentTab==4}">设备</div>
           <div class="item" :class="{'blue':currentTab==5}">通讯录</div>
           <div class="item" :class="{'blue':currentTab==6}">公众号</div>
        </div>
        <div class="main">
          <!-- 好友 -->
          <div class="friends" @click="toggle" v-show="currentTab==1">
              <ul class="level-1" v-for="item in dataList.friends">
                 <li class="li-1">{{item.name}}
                    <span>{{item.online}}/{{item.members.length}}</span>
                 </li>
                 <li class="li-2">
                   <ul class="level-2" @dblclick="chatOne" @tap="chatOne">
                      <li v-for="member in item.members" :data-id="member.id">  
                          <img src="" :data-src="member.face" class="user"
                          :class="{'offline':member.status=='离线'}">
                          <div class="info">
                             <p class="from" :class="{'vip':member.vipurl!=''
                             && member.status!='离线'}"> {{member.name}} </p>
                             <img src="" :data-src="member.vipurl" v-if="member.vipurl!=''">
                             <p class="message">[{{member.status}}] {{member.sign}}</p>
                          </div>
                      </li>
                   </ul>
                 </li>
              </ul>
          </div>
          
          <!--  群 -->
          <div class="groups" @click="toggle" v-show="currentTab==2">
              <p class="create">创建群</p>
              <ul class="level-1" v-for="item in dataList.groups">
                 <li class="li-1">{{item.type}}<span>{{item.groups.length}}</span></li>
                 <li class="li-2">
                   <ul class="level-2" @dblclick="chatGroup" @tap="chatGroup">
                      <li v-for="groups in item.groups" :data-id="groups.id">  
                          <img src="" :data-src="groups.url" class="user">
                          <div class="info">{{groups.name}}</div>
                      </li>     
                   </ul>
                 </li>
              </ul>
          </div>

          <!--  多人聊天 -->
          <div class="chats" v-show="currentTab==3">
              <p class="create">创建多人聊天</p>
              <ul class="level-2">
                  <li v-for="item in chats">  
                      <img src="" data-src="/static/icon/4/qq_addfriend_search_group.png" class="user">
                      <div class="info">
                         {{item.name}}<span> ({{item.members}})</span>
                      </div>
                  </li>     
              </ul>
          </div>

           <!-- 设备 -->
          <div class="device" v-show="currentTab==4">
            <ul class="level-2">
                <li>  
                    <img src="" data-src="/static/icon/4/feb.png" class="user">
                    <div class="info">
                        <p> 我的电脑 </p>
                        <p class="intro">[在线] 无需数据线，手机轻松传文件到电脑</p>
                    </div>
                </li>  
                <li>  
                    <img src="" data-src="/static/icon/4/oxy.png" class="user">
                    <div class="info">
                        <p>我的打印机 </p>
                        <p class="intro">将手机或照片发到电脑连接的打印机里</p>
                    </div>
                </li>  
                <li>  
                    <img src="" data-src="/static/icon/4/nrg.png" class="user">
                    <div class="info">
                        <p> 发现新设备 </p>
                        <p class="intro"> 搜索附近的设备，用QQ轻松连接设备。</p>
                    </div>
                </li>  
            </ul>
          </div>

          <!-- 通讯录 -->
          <div class="address-list" v-show="currentTab==5">
            <ul class="level-2">
                <li v-for="item in addressList">  
                    <img src="" :data-src="item.face" class="user">
                    <div class="info">
                        <p> {{item.name}} </p>
                        <p class="intro">[{{item.status}}]</p>
                    </div>
                </li>  
            </ul>
          </div>

          <!-- 公众号 -->
          <div class="official-account" v-show="currentTab==6">
            <div v-for="item in officialAccount">
              <p>{{item.start}}</p>
              <ul class="level-2">
                  <li v-for="account in item.accounts">  
                      <img src="" :data-src="account.url" class="user">
                      <div class="info">{{account.name}}</div>
                  </li> 
              </ul>
            </div>
          </div>
        </div>
    </VScroll>
	  <VFooter :currentTab="currentPage"></VFooter>
  </div>
</template>

<script>
import VAsideMenu from '../Common/SideMenu/Sidemenu'
import VHeader from '../Common/Header/Header'
import VFooter from '../Common/Footer/Footer'
import VScroll from '@/base/Scroll/Scroll'
import VSearch from '@/base/Search/Search'

export default {
  name: 'friend',
  data () {
    return {
      currentPage:2,
      currentTab:1,
      isHeightChange:false,
      //多人聊天,公众号,设备,通讯录暂时不做,就直接使用假数据了
      officialAccount:[
        {
          start:'B',
          accounts:[
            {
              name:'部落冲突',
              url:'/static/icon/4/iei.png'
            }
          ]
        },
        {
          start:'D',
          accounts:[
            {
              name:'地图',
              url:'/static/icon/4/feu.png'
            }
          ]
        },
        {
          start:'Q',
          accounts:[
            {
              name:'QQ红包',
              url:'/static/icon/4/rdz.png'
            },
            {
              name:'QQ购物',
              url:'/static/icon/4/qfw.png'
            },
            {
              name:'QQ Call',
              url:'/static/icon/4/odv.png'
            }
          ]
        },
        {
          start:'T',
          accounts:[
            {
              name:'腾讯课堂',
              url:'/static/icon/4/ewj.png'
            }
          ]
        },
      ],
      chats:[
        {
          name:'Java课题设计',
          members:4
        },
        {
          name:'寝室长集会',
          members:20
        }
      ],
      addressList:[
        {
          face:'/static/user/face/7.jpg',
          name:'程文宇',
          status:'手机在线'
        },
        {
          face:'/static/user/face/8.jpg',
          name:'楚乔',
          status:'手机在线'
        },
        {
          face:'/static/user/face/10.jpg',
          name:'许易',
          status:'Wifi在线'
        }
      ]
    }
  },
  computed:{
    dataList(){
      return this.$store.state.friend.friendList
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  created(){
    this.getFriendList()
  },
  components:{
  	VHeader,
  	VFooter,
  	VAsideMenu,
    VScroll,
    VSearch
  },
  methods:{
    changeTab(e){
       let target=$(e.target).get(0)
       const tabIndex=$(target).index()+1
       this.currentTab=tabIndex
       let $img   //注意,$img不能在下面的花括号里声明，块级作用域的问题
       if(tabIndex==3){
          $img=$('.chats').find('img.user')
       }else if(tabIndex==4){
          $img=$('.device').find('img.user')
       }else if(tabIndex==5){
          $img=$('.address-list').find('img.user')
       }else if(tabIndex==6){
          $img=$('.official-account').find('img.user')
       }
       $img && $img.each(function(){
          $(this).attr('src',$(this).attr('data-src'))
       })
    },
    //展开和收缩
    toggle(e){
       this.isHeightChange= this.isHeightChange?false:true  //触发Scroll刷新
       let target=$(e.target).get(0)
       if(target.className.match('li-1')){
          if($(target).hasClass('click')){
             $(target).removeClass('click').next().hide()
          }
          else{
            $(target).addClass('click').next().show()
            const $img=$(target).next().find('img')
            $img && $img.each(function(){
              $(this).attr('src',$(this).attr('data-src'))
            })
          }
       }
    },
    chatOne(e){
      if(this.getTarget(e)){
        const id=$(this.getTarget(e)).attr('data-id')
        this.$router.push(`chatOne/${id}`)
      }
    },
    chatGroup(e){
      if(this.getTarget(e)){
        const id=$(this.getTarget(e)).attr('data-id')
        this.$router.push(`chatGroup/${id}`)
      }  
    },
    getTarget(e){
      let target=$(e.target).get(0)
      while(target.tagName!='LI'){
        target=target.parentNode?target.parentNode:''
      }
      return target
    },
    getFriendList(){
      if(this.$store.state.friend.hasGetFriendList==0){
        const user_id=this.$store.state.login.loginStatus.userId
        this.$store.dispatch('getFriendList',user_id)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
/*主页面*/
#wrapper{
   cursor:pointer;
   bottom:50px !important;
   .newFriends,.tab{
     border-top:1px solid #eee;
     border-bottom:1px solid #eee;
     height:40px;
     line-height:40px;
     padding:0 20px;
   }
   .newFriends{
     background:#fff url(/static/icon/4/fai.png) no-repeat 97% center;
     background-size:14px 18px
   }
   .tab{
     background:#fff;
     display:flex;
     color:#666;
     margin-top:10px;
     overflow:hidden;
     font-size:16px;
     .item{
        margin-left:7%;
        letter-spacing:1px;
        &.first{
          margin-left:0
        }
        &.blue{
          border-bottom:3px solid #7DB1F8;
          color:#7DB1F8
        }
     }
     @media screen and (max-width: 769px) and (min-width: 532px) {
       .item{
          margin-left:6%
       }
     }
     @media screen and (max-width: 531px) {
       .item{
          margin-left:5%
       }
     }
   }
}
/*好友,群,多人聊天,设备*/
.friends , .groups, .chats , .device , .address-list,.official-account{
   background:#fff;
   ul.level-1{
     width:100%;
     li.li-1{
       padding-left:8%;
       height:36px;
       line-height:36px;
       background:url(/static/icon/4/nqj.9.png) no-repeat 3% center;
       background-size:14px 16px;
       span{
         float:right;
         margin-right:4%;
         color:#666;
         font-size:14px
       }
       &.click{
         background:url(/static/icon/4/nqi.9.png) no-repeat 3% center;
         background-size:18px 14px;
       }
     }
     li.li-2{
       display:none;
     }
   }

   ul.level-2{
     width:100%;
     li{
        border-bottom:1px solid #eee;
        padding:0 10px;
        overflow:hidden;
        img.user{
          width:40px;
          height:40px;
          border-radius:50%;
          float:left;
          margin-left:2%;
          margin-top:5px;
          &.offline{
            opacity:0.5
          }
        }
        .info{
          font-size:16px;
          width:100%;
          margin-left:7%;
          height:50px;
          padding-left:30px;
          p{
            height:26px;
            line-height:26px;
            &.from{
              letter-spacing:1px;
              float:left;
            }
            &.vip{
              color:red
            }
            &.message{
              clear:both;
              color:#666;
              font-size:14px;
              position:relative;
              bottom:24px
            }   
          }
          img{
            transform:scale(0.5);
            float:left
          }
        }     
     }
   }
}
/*群,多人聊天单独样式*/
.groups,.chats{
  p.create{
    border-bottom:1px solid #eee;
    height:40px;
    line-height:40px;
    padding-left:8%;
    background:url(/static/icon/4/nqf.png) no-repeat 3% center;
    background-size:16px 16px;
  }
  .info{
     height:40px;
     line-height:40px;
     span{
       color:#666;
       font-size:12px;
     }
  }
}
.device,.address-list{
  .info p.intro{
    color:#666;
    font-size:14px;
    position:relative;
    bottom:4px
  }
}
.official-account{
  p{
    background:#FFFDFD;
    margin-left:5%
  }
}
</style>
