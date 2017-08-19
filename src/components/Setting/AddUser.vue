<template>
    <!--  账号管理 -->
	<div class="wrapper">
	 	<VWarn></VWarn>
	    <div class="header">
		    <div class="item"></div>
		    <div class="item center">添加或注册账号</div>
		    <div class="item right" @click="$router.back()">取消</div>
	    </div>
		<div class="addUser">
	    	<form>
	    		<input type="text" class="text" placeholder="QQ号/手机号/邮箱"
	    			v-model="userinfo.user">	
				<input type="password" class="text" placeholder="密码"
					v-model="userinfo.pwd">	
				<input type="button" class="btn" value="登录" @click="login">
	    	</form>
    	    <router-link to="" class="left">忘记密码?</router-link>
      		<router-link to="/register" class="right">新用户注册</router-link>
		</div>
	</div>
</template>

<script>
import {check_login} from '@/api/login'
import VWarn from '@/base/Warn/Warn'

export default {
  name: 'addUser',
  data(){
    return {
    	vuegConfig: {
            forwardAnim: 'fadeInUp',
            duration:0.5
        },
        userinfo:{
	        user:'',
	        pwd:''
      	}
    }
  },
  methods:{
    validate({user,pwd}){
      if(user==''){
        this.$store.dispatch('setShowWarn','输入不能为空')
        return false
      }
      if(pwd==''){
        this.$store.dispatch('setShowWarn','密码不能为空')
        return false
      }
      return true
    },
    async login(){
      //验证数据
      if(!this.validate(this.userinfo)) return

      //显示登录中
      this.$store.dispatch('setShowWarn','登录中....')
      
      //登录
      const res= await check_login(this.userinfo)
      this.callback(res)
    },
    //登陆后的回调
    callback({code,data,message}){ 
      if(code==1){
        this.$store.commit('ADD_USER',data)
        this.$router.back()
      }else{
        this.$store.dispatch('setShowWarn',message)
      }
    }
  },
  components:{
    VWarn
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
	background:#EEEFEF;
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
	      	&.left{
		      background:url(./icon/flc.png) no-repeat left center;
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
		    }
	    }
    }
}
.addUser{
	margin-top:70px;
	form{
	  input{
	    font-family:'Microsoft Yahei';
	    &.text{
	    	width: 100%;
       		padding-left:10px;
	    }
	    &.btn{
	 		width:96%;
	  	  	margin:14px auto; 
	  	  	background:#1E90FF;
	  	  	line-height:36px;
	  	  	color:white;
	  	  	border-radius:2px;
	    }
	  }
	}
	a{
		color:#1E90FF;
		&.left{
			margin-left:10px
		}
		&.right{
			margin-right:10px;
		}
	}
}
</style>