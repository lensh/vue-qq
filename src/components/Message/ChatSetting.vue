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
        <li @click="$router.push(`/profile/${dataList.other_user_id}`)">  
          <img :src="dataList.face" class="user">
          <div class="info">
             <p class="name">{{dataList.beizhu}}</p>
             <p class="message">
                <span class="sex">{{dataList.sex}}</span><span>{{dataList.age}}岁</span><span>{{dataList.place}}</span>
             </p>
             <img src="./icon/nqj.9.png" class="icon">
          </div>
        </li>
      </ul>
      <div class="setting">
      	  <div class="item">聊天记录<span class="manyou">漫游7天</span></div>
      	  <div class="item">聊天文件</div>
      	  <div class="item">聊天背景</div>
      	  <div class="item switch">特别关心
            <SwitchBtn :isOpen="isSpecial" @open="special"></SwitchBtn>
          </div>
      	  <div class="item switch">屏蔽此人
            <SwitchBtn :isOpen="isPingbi" @open="pingbi"></SwitchBtn>
          </div>
      </div>
      <p class="addquick">添加桌面快捷方式</p>
      <div class="footer">
      	  <button class="btn" @click="deleteFriend">删除好友</button>
      </div>
	  </div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import SwitchBtn from '@/base/SwitchBtn/SwitchBtn'
import * as api from '@/api/chat'
import {delete_friend} from '@/api/friend'

export default {
  name: 'chatSetting',
  data(){
    return {
      isSpecial:'',
      isPingbi:'',
      other_user_id:'',
      dataList:{}
    }
  },
  computed:{
    ...mapGetters([
      'userId',
      'userInfo'
    ])
  },
  mounted(){
    this.other_user_id=this.$route.params.user_id
    this.getUserInfo(this.userId,this.other_user_id)
  },
  components:{
    SwitchBtn
  },
  methods:{
    async getUserInfo(userId, otherUserId){
        const {data}=await api.get_userinfo(userId, otherUserId)
        this.dataList=data
        this.isPingbi=this.dataList.is_pingbi
        this.isSpecial=this.dataList.special
    },
    //屏蔽对方
    async pingbi(){
      const status=this.isPingbi==0?1:0
      const {code}= await api.update_pingbi(this.userId,this.other_user_id,status)
      if(code==1){
        this.isPingbi=!this.isPingbi
      }
    },
    //特别关心
    async special(){
      const status=this.isSpecial==0?1:0
      const {code}= await api.update_special(this.userId,this.other_user_id,status)
      if(code==1){
        this.isSpecial=!this.isSpecial
        this.$store.commit('UPDATE_FRIEND_LIST')
      }
    },
    //删除好友
    async deleteFriend(){
      alert('为了最佳的体验效果,不允许删除')
      return
      const {code}= await delete_friend(this.userId,this.other_user_id)
      code==1 && this.$router.push('/message')
    }
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
  	background:url(./icon/nqj.9.png) no-repeat 98% center;
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
   	letter-spacing:2px;
   	cursor:pointer;
    font:16px 'Microsoft Yahei' !important;
   }
}
</style>