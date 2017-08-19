<template>
  <!-- 联系人列表 -->
  <div class="wrapper">
    <VAsideMenu></VAsideMenu>
  	<VHeader :currentTab="currentTab"></VHeader>
    <VScroll :data="dataList.friends" :isHeightChange="isHeightChange" 
     component="friend" :tabIndex="tabIndex">
        <VSearch placeholder="搜索"></VSearch>
        <p class="newFriends" @click="$router.push('/friend/new')">新朋友</p>
        <div class="tab">
          <div class="item first" :class="{'blue':tabIndex==1}" 
              @click="changeTab(1)">好友
          </div>
          <div class="item" :class="{'blue':tabIndex==2}" 
              @click="changeTab(2)">群
          </div>
          <div class="item third" :class="{'blue':tabIndex==3}" 
              @click="changeTab(3)">多人聊天
          </div>
          <div class="item" :class="{'blue':tabIndex==4}" 
              @click="changeTab(4)">设备
          </div>
          <div class="item" :class="{'blue':tabIndex==5}" 
              @click="changeTab(5)">通讯录
          </div>
          <div class="item" :class="{'blue':tabIndex==6}" 
              @click="changeTab(6)">公众号
          </div>
        </div>
        <div class="main">
          <!-- 好友 -->
          <div class="friends" v-show="tabIndex==1">
              <ul class="level-1" v-for="(item,index) in dataList.friends">
                 <li class="li-1" @click="toggle(index,1)" 
                    :class="{'click':status.friend[index]==1}">{{item.name}}
                    <span>{{item.online}}/{{item.members.length}}</span>
                 </li>
                 <li class="li-2" v-show="status.friend[index]==1">
                    <ul class="level-2">
                        <li v-for="member in item.members" @click="chatOne(member.id)">  
                            <img :src="status.friend[index]==1?member.face:''" class="user"
                                 :class="{'offline':member.status=='离线'}">
                            <div class="info">
                               <p class="from" :class="{'vip':member.vipurl!=''
                               && member.status!='离线'}"> {{member.name}} </p>
                               <img :src="status.friend[index]==1?member.vipurl:'' " 
                                    v-if="member.vipurl!=''">
                               <p class="message">[{{member.status}}] {{member.sign}}</p>
                            </div>
                        </li>
                    </ul>
                 </li>
              </ul>
          </div>
          
          <!--  群 -->
          <div class="groups" v-show="tabIndex==2">
              <p class="create">创建群</p>
              <ul class="level-1" v-for="(item,index) in dataList.groups">
                  <li class="li-1" @click="toggle(index,2)" 
                      :class="{'click':status.group[index]==1}">{{item.type}}
                      <span>{{item.groups.length}}</span></li>
                  <li class="li-2" v-show="status.group[index]==1">
                    <ul class="level-2">
                      <li v-for="groups in item.groups" @click="chatGroup(groups.id)">  
                          <img :src="status.group[index]==1? groups.url:'' " class="user">
                          <div class="info">{{groups.name}}</div>
                      </li>     
                    </ul>
                 </li>
              </ul>
          </div>

          <!--  多人聊天 -->
          <div class="chats" v-show="tabIndex==3">
              <p class="create">创建多人聊天</p>
              <ul class="level-2">
                  <li v-for="item in chats">  
                      <img src="./icon/search_group.png" class="user">
                      <div class="info">
                         {{item.name}}<span> ({{item.members}})</span>
                      </div>
                  </li>     
              </ul>
          </div>

           <!-- 设备 -->
          <div class="device" v-show="tabIndex==4">
            <ul class="level-2">
                <li>  
                    <img src="./icon/feb.png" class="user">
                    <div class="info">
                        <p> 我的电脑 </p>
                        <p class="intro">[在线] 无需数据线，手机轻松传文件到电脑</p>
                    </div>
                </li>  
                <li>  
                    <img src="./icon/oxy.png" class="user">
                    <div class="info">
                        <p>我的打印机 </p>
                        <p class="intro">将手机或照片发到电脑连接的打印机里</p>
                    </div>
                </li>  
                <li>  
                    <img src="./icon/nrg.png" class="user">
                    <div class="info">
                        <p> 发现新设备 </p>
                        <p class="intro"> 搜索附近的设备，用QQ轻松连接设备。</p>
                    </div>
                </li>  
            </ul>
          </div>

          <!-- 通讯录 -->
          <div class="address-list" v-show="tabIndex==5">
            <ul class="level-2">
                <li v-for="item in addressList">  
                    <img :src="tabIndex==5?item.face:'' " class="user">
                    <div class="info">
                        <p> {{item.name}} </p>
                        <p class="intro">[{{item.status}}]</p>
                    </div>
                </li>  
            </ul>
          </div>

          <!-- 公众号 -->
          <div class="official-account" v-show="tabIndex==6">
            <div v-for="item in officialAccount">
              <p>{{item.start}}</p>
              <ul class="level-2">
                  <li v-for="account in item.accounts">  
                      <img :src="tabIndex==6?account.url:'' " class="user">
                      <div class="info">{{account.name}}</div>
                  </li> 
              </ul>
            </div>
          </div>
        </div>
    </VScroll>
	  <VFooter :currentTab="currentTab"></VFooter>
  </div>
</template>

<script>
import VAsideMenu from '../Common/SideMenu/Sidemenu'
import VHeader from '../Common/Header/Header'
import VFooter from '../Common/Footer/Footer'
import VScroll from '@/base/Scroll/Scroll'
import VSearch from '@/base/Search/Search'
import {mapGetters} from 'vuex'

export default {
  name: 'friend',
  data () {
    return {
      currentTab:2,  //当前页面的索引  
      isHeightChange:false,  //高度是否改变
      //多人聊天,公众号,设备,通讯录暂时不做,就直接使用假数据了
      officialAccount:[
        {
          start:'B',
          accounts:[
            {
              name:'部落冲突',
              url:require('./icon/iei.png')
            }
          ]
        },
        {
          start:'D',
          accounts:[
            {
              name:'地图',
              url:require('./icon/feu.png')
            }
          ]
        },
        {
          start:'Q',
          accounts:[
            {
              name:'QQ红包',
              url:require('./icon/rdz.png')
            },
            {
              name:'QQ购物',
              url:require('./icon/qfw.png')
            },
            {
              name:'QQ Call',
              url:require('./icon/odv.png')
            }
          ]
        },
        {
          start:'T',
          accounts:[
            {
              name:'腾讯课堂',
              url:require('./icon/ewj.png')
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
    ...mapGetters([
      'userId',
      'hasGetFriendList',
      'friendStatus',
      'fenzu',
      'tabIndex'
    ]),
    ...mapGetters({
      'dataList':'friendList'
    }),
    status(){  //通过数据来控制展开和收缩,实现图片懒加载
      return {
        friend:this.friendStatus.friend,
        group:this.friendStatus.group
      }
    }
  },
  created(){
    this.hasGetFriendList==0 && this.$store.dispatch('getFriendList',this.userId)
  },
  components:{
  	VHeader,
  	VFooter,
  	VAsideMenu,
    VScroll,
    VSearch
  },
  methods:{
    changeTab(tabIndex){
      this.$store.commit('TAB_INDEX',tabIndex)
    },
    toggle(index,type){  //通过数据来控制展开和收缩,实现图片懒加载
      this.isHeightChange= this.isHeightChange?false:true  //触发Scroll刷新
      if(type==1){
        this.status.friend[index]=this.status.friend[index]==0?1:0
      }else if(type==2){
        this.status.group[index]=this.status.group[index]==0?1:0
      }
    },
    chatOne(user_id){
      this.$router.push(`/chat_one/${user_id}`)
    },
    chatGroup(group_id){
      this.$router.push(`/chat_group/${group_id}`)
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
     background:#fff url(../../common/icon/fai.png) no-repeat 97% center;
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
          &.third{
            display:none
          }
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
       background:url(./icon/nqj.9.png) no-repeat 3% center;
       background-size:14px 16px;
       span{
         float:right;
         margin-right:4%;
         color:#666;
         font-size:14px
       }
       &.click{
         background:url(./icon/nqi.9.png) no-repeat 3% center;
         background-size:18px 14px;
       }
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
    background:url(./icon/nqf.png) no-repeat 3% center;
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
    bottom:4px;
  }
}
.official-account{
  p{
    background:#FFFDFD;
    margin-left:5%
  }
  div.info{
    padding-top:14px
  }
}
</style>
