<template>
 <!--  添加 -->
 <div class="wrapper">
    <div class="header">
      <div class="item left" @click="$router.back()">联系人</div>
      <div class="item center">添加</div>
      <div class="item"></div>
    </div>
    <div class="tab">
      <div class="item" :class="{'cur':curTab==1}" @click="changeTab(1)">找人</div>
      <div class="item" :class="{'cur':curTab==2}" @click="changeTab(2)">找群</div>
      <div class="item" :class="{'cur':curTab==3}" @click="changeTab(3)">找公众号</div>
    </div>
    <div class="searchbox">
      <input type="text" class="text" readonly placeholder="QQ号/手机号/群/公众号"
        @click="$router.push('/friend/add/search')">
    </div> 

    <!--  找人 -->
    <div class="people" v-show="curTab==1">
        <div class="item">
          <img src="./icon/conversation_options_addmember.png" class="left">
          <span>添加手机联系人</span>
          <img src="./icon/nqj.9.png" class="right">
        </div>
        <div class="item">
          <img src="./icon/conversation_options_qr.png" class="left">
          <span>扫一扫添加好友</span>
          <img src="./icon/nqj.9.png" class="right">
        </div>
        <div class="item">
          <img src="./icon/conversation_options_multichat.png" class="left">
          <span>面对面发起多人聊天</span>
          <img src="./icon/nqj.9.png" class="right">
        </div>
        <div class="item">
          <img src="./icon/qb_group_menu_search_group.png" class="left">
          <span>按条件查找陌生人</span>
          <img src="./icon/nqj.9.png" class="right">
        </div>
        <div class="item">
          <img src="./icon/oui.png" class="left">
          <span>查看附近的人</span>
          <img src="./icon/nqj.9.png" class="right">
        </div>
    </div>
    
    <!--  找公众号 -->
    <div class="offical" v-show="curTab==3">
        <p class="title">精品推荐</p>
          <ul>
              <li>  
                  <img :src="curTab==3?'./icon/qol.png':''" class="user">
                  <div class="info">
                     <p class="name"> QQ音乐 </p>
                     <p class="intro">家事国事天下事,事事关心</p>
                  </div>
              </li>
              <li>
                  <img :src="curTab==3?'./icon/phb.png':''" class="user">
                  <div class="info">
                     <p class="name">QQ团队</p>
                     <p class="intro">QQ团队所有成员感谢您一路相伴</p>
                  </div>
              </li>
              <li>
                  <img :src="curTab==3?'./icon/rfc.png':''" class="user">
                  <div class="info">
                     <p class="name">好友动态</p>
                     <p class="intro">好友动态为你每日推送QQ空间好友未读动态请求</p>
                  </div>
              </li>
          </ul>
    </div>
 </div>
</template>

<script>
export default {
  name: 'friendAdd',
  data(){
    return {
      curTab:1
    }
  },
  methods:{
    changeTab(curTab){
      this.curTab=curTab
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
  background:#FFFDFD;
}
.header{
	  display:flex;
    padding:0 20px;
    height:50px;
    line-height:50px;
    background: #1E90FF;
    color: white;
    font-size:18px;
    letter-spacing:2px;
    position:absolute;
    top:0;
    width:100%;
    z-index:3;
    .item{
      flex:1;
    }
    .item.left{
      background:url(./icon/flc.png) no-repeat left center;
      margin-left:-10px;
      padding-left:20px;
      background-size:26px 26px;
      cursor:pointer
    }
    .item.center{
      text-align:center
    }
}
.tab{
  margin-top:50px;
  border-bottom:1px solid #eee;
  background:#fff;
  height:40px;
  line-height:40px;
  display:flex;
  .item{
    flex:1;
    cursor:pointer;
    text-align:center;
  }
  .item.cur{
    border-bottom:4px solid #9cf;
  }
}
.searchbox{
  margin-top:14px;
  background:#fff;
  border-top:1px solid #eee;
  border-bottom:1px solid #eee;
  font-size:12px;
  input{
    cursor:pointer;
    border:none;
    padding-left:10%;
    background:url(./icon/okh.png) no-repeat 6% center;
    background-size:16px;
    font-family:'Microsoft Yahei'
  }
}
.people{
  background:#fff;
  margin-top:30px;
  .item{
    border-top:1px solid #eee;
    height:50px;
    line-height:50px;
    cursor:pointer;
    img.left{
      transform:scale(0.7);
      margin-left:3%
    }
    span{
      margin-left:14px
    }
    img.right{
      float:right;
      margin-right:2%;
      margin-top:10px;
      transform:scale(0.7);
    }    
  }
  .item:last-child{
     border-bottom:1px solid #eee
  }
}
.offical{
  margin-top:4px;
  p.title{
    color:#666;
    margin-left:2%;
    font-size:14px;
    line-height:30px
  }
}
.offical ul{
   width:100%;
   li{
      border-bottom:1px solid #eee;
      height:50px;
      line-height:50px;
      padding:0 10px;
      cursor:pointer;
      img.user{
        width:40px;
        height:40px;
        border-radius:50%;
        float:left;
        margin-left:2%;
        margin-top:5px
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
        }
        p.name{
           letter-spacing:1px;
           float:left;
        }
        p.intro{
          clear:both;
          color:#666;
          font-size:14px;
          position:relative;
          bottom:24px
        }   
      }     
    }
    li:first-child{
       border-top:1px solid #eee;
    }
}
</style>