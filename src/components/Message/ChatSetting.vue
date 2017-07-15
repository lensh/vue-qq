<template>
  <!--  聊天设置 -->
	<div class="wrapper">
	  <div class="header">
	    <div class="item left" @click="$router.back()">返回</div>
	    <div class="item center">聊天设置</div>
	    <div class="item"></div>
	  </div>
	  <div class="chatSetting">
      <ul> 
        <li @click="$router.push('profile')">  
          <img :src="dataList.face" class="user">
          <div class="info">
             <p class="name">{{dataList.name}}</p>
             <p class="message">
                <span class="sex">{{dataList.sex}}</span><span>{{dataList.age}}岁</span><span>{{dataList.place}}</span>
             </p>
             <img src="/static/icon/4/nqj.9.png" class="icon">
          </div>
        </li>
      </ul>
      <div class="setting">
      	  <div class="item">聊天记录<span class="manyou">漫游7天</span></div>
      	  <div class="item">聊天文件</div>
      	  <div class="item">聊天背景</div>
      	  <div class="item">特别关心<span class="qiyong">未启用</span></div>
      	  <div class="item switch">屏蔽此人<SwitchBtn></SwitchBtn></div>
      </div>
      <p class="addquick">添加桌面快捷方式</p>
      <div class="footer">
      	  <button class="btn">删除好友</button>
      </div>
	  </div>
	</div>
</template>

<script>
import SwitchBtn from '@/base/SwitchBtn/SwitchBtn'

export default {
  name: 'chatSetting',
  data(){
    return {
      dataList:{
         name:'马哲涵',
         face:'/static/user/face/4.jpg',
         sex:'女',
         age:'21',
         place:'广东深圳'
      }
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  components:{
    SwitchBtn
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
	background:#FFFDFD
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
      background:url(/static/icon/4/flc.png) no-repeat left center;
      margin-left:-10px;
      padding-left:20px;
      background-size:26px 26px;
      cursor:pointer
    }
    .item.center{
      text-align:center
    }
}
.chatSetting{
  margin-top:70px;
}
.chatSetting  ul{
   background:white;
   width:100%;
   li{   
      cursor:pointer;
      border-top:1px solid #eee;
      border-bottom:1px solid #eee;
      height:80px;
      line-height:80px;
      padding:0 10px;  
      img.user{
          width:60px;
          height:60px;
          border-radius:50%;
          float:left;
          margin-left:2%;
          margin-top:10px 
      }
      .info{
          font-size:16px;
          width:100%;
          margin-left:12%;
          height:80px;
          padding-left:30px;
          position:relative;
          p{
            &.name{
              letter-spacing:1px;
              height:32px;
              line-height:32px;
              font-size:18px;
              position:relative;
              top:4px;
            }
            &.message{
              color:#666;
              height:32px;
              line-height:32px;
              font-size:14px;
              position:relative;
              top:-4px;
            }
            span{
              margin-left:10px;
              &.sex{
                margin-left:0
              }
            }
          }
          img.icon{
            position:absolute;
            top:50%;
            transform:translateY(-50%) scale(0.6);
            right:40px;    
          }
      }
    }
}

.chatSetting .setting{
  background:white;
  margin-top:20px;
  border-top:1px solid #eee;
  .item{
  	border-bottom:1px solid #eee;
  	height:50px;
  	line-height:50px;
  	padding-left:10px;
  	background:url(/static/icon/4/nqj.9.png) no-repeat 98% center;
  	background-size:14px;
  	span{
  		float:right;
  		margin-right:26px;
  		font-size:14px;
  		&.manyou{
  		  color:#9cf
  		}
  		&.qiyong{
  		  color:#666
  		}
  	}
    &.switch{
      background:none;
      position:relative;
      .switch{
        right:-50px;
        top:-24px
      }
    }
  }
}
p.addquick{
	margin-top:20px;
	background:#fff;
  height:50px;
	line-height:50px;
	padding-left:10px;
	color:#1E90FF;
	border-top:1px solid #eee;
	border-bottom:1px solid #eee;
}
.footer{
   position:absolute;
   bottom:30px;
   width:95%;
   left:0;
   right:0;
   margin:0 auto;
   button{
    width:100%;
   	height:40px;
   	background:#F64059;
   	color:#fff;
   	font-size:16px;
   	letter-spacing:2px;
   	cursor:pointer
   }
}
</style>