<template>
  <!-- 登陆 -->
  <div class="wrapper">
    <VWarn></VWarn>
    <div class="login">
      <div class="top">
          <img src="/static/icon/3/rqk.png"><span>QQ</span>
      </div>
      <div class="form">
          <input type="text" v-model="userinfo.user" class="text" 
          placeholder="QQ号/手机号/邮箱"><br/>
          <input type="password" v-model="userinfo.pwd" class="text" 
          placeholder="密码"><br/>
          <input type="button" @click="login" class="btn" value="登录">
          <router-link to="/forget" class="left">忘记密码?</router-link>
          <router-link to="/register" class="right">新用户注册</router-link>
      </div>
      <div class="footer">
          <p>登录即代表已阅读并同意<span>服务条款</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {check_login} from '@/api/login'
import VWarn from '@/base/Warn/Warn'

export default {
  name: 'login',
  data(){
    return {
      userinfo:{
        user:'',
        pwd:''
      }
    }
  },
  beforeCreate (){
    //如果已经登陆了，则进入消息页面
    this.$store.state.login.loginStatus.isLogin ? this.$router.push('/message') :''
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
        this.$store.commit('SET_LOGIN',data)
        this.$router.push('message')
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

<style scoped lang="scss" type="text/css">
.wrapper{
  background:#fff;
  .footer{
    color: #666;
    text-align: center;
    position: absolute;
    bottom: 80px;
    width: 100%;
    span{
      color: #1E90FF;
      cursor: pointer;
    }
  }

  .login{
    .top {
      margin: 20% 0 0 8%;
      font-size:26px;
      span{
        margin-left: 20px;
        position: relative;
        bottom: 5px;
        color: #666
      }
    }

    .form{
      margin: 10% 8% 0 8%;
      input.text{
        width: 100%;
        font-family:'Microsoft Yahei'
      }
      a{
        margin-top: 20px;
        color: #1E90FF;
      }
      input.btn{
        width: 100%;
        line-height: 32px;
        background: #1E90FF;
        color: white;
        margin-top:50px;
        font-family:'Microsoft Yahei'
      }
      ::-webkit-input-placeholder,::-moz-placeholder,::-moz-placeholder,
      ::-ms-input-placeholder { color: #333;} 
    }
  }
}
</style>
