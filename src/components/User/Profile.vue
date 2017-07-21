<template>
 <!--  资料卡片 -->
   <div class="wrapper">
      <div class="header">
        <div class="item left" @click="$router.back()">返回</div>
        <div class="item center">
           <!-- 如果是别人 -->
           个人资料
           <!-- 否则 -->
         <!--   我的资料 -->
        </div>
        <div class="item right">
           <!-- 如果是别人 -->
            更多
            <!-- 否则 -->
          <!--   <img src="/static/icon/4/qq_setting_me_qr_code_icon.png"> -->
        </div>
      </div>
      
      <div class="profile">
          <div class="profile_bg"></div>
          <div class="profile_face">
             <img :src="dataList.face" />
             <p class="nickname">{{dataList.nickname}}</p>
             <p class="sign">
               {{dataList.sign}}
              <img src="/static/icon/4/qq_profilecard_signature_more.png">
              </p>
          </div>
          <div class="profile_info">
             <ul>
               <li class="account">
                  {{dataList.name}}({{dataList.qq}})
               </li>
               <li class="information">
                  <span>{{dataList.sex}}</span>
                  <span>{{dataList.age}}岁</span>
                  <span>{{dataList.xingzuo}}</span>
                  <span>{{dataList.place}}</span>
                  <img src="/static/icon/4/qq_profilecard_signature_more.png" class="right">
               </li>
               <li class="profession">{{dataList.favor}}</li>
               <li class="rank">
                  <img src="/static/icon/4/hni.png" class="vip" v-if="dataList.vip==0">
                  <img src="/static/icon/2/hdr.png" class="level" v-for="n in level.crown">
                  <img src="/static/icon/2/hdu.png" class="level" v-for="n in level.sun">
                  <img src="/static/icon/2/hds.png" class="level" v-for="n in level.moon">
                  <img src="/static/icon/2/hdt.png" class="level" v-for="n in level.star">
                  <span>{{dataList.accert}}</span>
                  <img src="/static/icon/4/qq_profilecard_signature_more.png" class="right">
               </li>
               <li class="privilege">
                  TA还未开通任何特权服务
                  <img src="/static/icon/4/qq_profilecard_signature_more.png" class="right">
               </li>
               <li class="qzone">{{dataList.nickname}}的空间
                  <img src="/static/icon/4/qq_profilecard_signature_more.png" class="right">
               </li>
             </ul>
          </div>
      </div>
      <div class="footer">
        <!-- 如果是别人,而且是自己的好友则 -->
         <button class="phone">QQ电话</button>
         <button class="message" @click="sendMessage(dataList.user_id)">发消息</button>
        <!-- 如果是别人,而且不是自己的好友则 -->
         <!-- <button class="add_friend">加好友</button> -->
        <!-- 如果是自己则显示编辑资料 -->
         <!-- <button class="card">个性名片</button>
         <button class="edit">编辑资料</button> -->
      </div>
   </div>
</template>

<script>
import calcLevel from '@/common/js/level'

export default {
  name: 'profile',
  data(){
    return {
       user_id:this.$store.state.login.loginStatus.userId,
       dataList:{
          user_id:2,
          nickname:'马哲涵',
          sign:'马哲涵',
          name:'一花一世界',
          qq:'936842133',
          face:'/static/user/face/4.jpg',
          sex:'女',
          place:'江西',
          age:19,
          xingzuo:'摩羯座',
          favor:'娱乐/艺术/表演',
          vip:0,   // 0为非vip，1为vip，2为svip
          level:50,  // QQ等级
          accert:'慢速中'
       }
    }
  },
  computed:{
    level(){
       return calcLevel(this.dataList.level)
    }
  },
  methods:{
    sendMessage(user_id){
      this.$router.push(`/chat_one/${user_id}`)
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.header{
	  display:flex;
    padding:0 20px;
    height:50px;
    line-height:50px;
    color: white;
    font-size:18px;
    letter-spacing:2px;
    position:absolute;
    background: #1E90FF;
    top:0;
    width:100%;
    z-index:1;
    .item{
    	  flex:1;
        &.left{
            background:url(/static/icon/4/flc.png) no-repeat left center;
            margin-left:-10px;
            padding-left:20px;
            background-size:26px 26px;
            cursor:pointer
        }
        &.center{
            text-align:center
        }
        &.right{
            text-align:right;
            cursor:pointer;
            img{
              width:30px;
              height:30px;
              margin-top:10px;
            }
        }
    }
}
.profile{
  margin-top:50px;
  .profile_bg{
    position:absolute;
    z-index:1;
    width:100%;
    height:28%;
    background:url(/static/user/bg/3.jpg) no-repeat;
    background-size:100%;
  }
  .profile_face{
    position:absolute;
    z-index:2;
    top:28%;
    left:0;
    right:0;
    text-align:center;
    touch-action:none;
    img{
      height:90px;
      width:90px;
      border-radius:50%;
    }
    p.nickname{
      font-size:24px;
    }
    p.sign{
      margin-top:2px;
      color:#666;
      cursor:pointer;
      img{
        width:14px;
        height:14px;
      }
    }
  }
  .profile_info{
    background:#fff;
    position:absolute;
    top:55%;
    width:100%;
    ul{
      display:block;
    }
    li{
      padding-left:12%;
      font-size:1rem;
      min-height:1.6rem;
      line-height:1.6rem;
      margin-bottom:4px;
      overflow:hidden;
      img.right{
        float:right;
        margin:8px 10px 0 0;
        width:16px;
        height:16px;
        cursor:pointer;
      }
    }
    li.account{
      background:url(/static/icon/4/qq_profilecard_item_account.png) no-repeat 4% center;
      background-size:20px;
    }
    li.information{
      background:url(/static/icon/4/qq_profilecard_item_information.png) no-repeat 4%  center;
      background-size:20px;
    }
    li.profession{
      background:url(/static/icon/4/qq_profilecard_item_profession.png) no-repeat 4%  center;
      background-size:20px;
      margin-bottom:10px;
    }
    li.rank{
      background:url(/static/icon/4/qq_profilecard_item_rank.png) no-repeat 4% 88%;
      background-size:20px;   
      border-top:1px solid #eee;
      padding-top:6px;
      img.vip{
        transform:scale(0.6);
        position:relative;
        right:10px;
        top:6px
      }
      img.level{
        position:relative;
        right:16px;
        width:14px;
        height:14px;
      }
      span{
        font-size:14px;
        color:#666
      }
    }
    li.privilege{
      background:url(/static/icon/4/qq_profilecard_item_privilege.png) no-repeat 4% center;
      background-size:20px;
    }
    li.qzone{
      background:url(/static/icon/4/qq_profilecard_item_qzone.png) no-repeat 4% center;
      background-size:20px;
    }
  }
}
.footer{
  position:absolute;
  bottom:0;
  display:flex;
  justify-content:space-around;
  width:100%;
  margin-bottom:10px;
  button{
    width:46%;
    height:40px;
    border:1px solid #eee;
    border-radius:2px;
    font-size:16px;
    cursor:pointer;
    background:#fff;
    letter-spacing:2px;
    &.message{
      background:#78B7FF;
      color:#fff;
    }
    &.edit{
      background:#78B7FF;
      color:#fff;
    }
    &.add_friend{
      width:100%;
      margin:0 10px;
    }
  }
}
</style>