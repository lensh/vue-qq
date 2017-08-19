<template>
  <!-- 登陆 -->
  <div class="wrapper">
    <VWarn></VWarn>
    <div class="login">
      <div class="top">
          <img src="./rqk.png"><span>QQ</span>
      </div>
      <div class="form">
          <input type="text" v-model="userinfo.user" class="text" 
          placeholder="QQ号/手机号/邮箱" ref="user"><br/>
          <input type="password" v-model="userinfo.pwd" class="text" 
          placeholder="密码"><br/>
          <input type="button" @click="login" class="btn" value="登录">
          <router-link to="" class="left">忘记密码?</router-link>
          <router-link to="/register" class="right">新用户注册</router-link>
      </div>
      <div class="footer">
          <p>登录即代表已阅读并同意<span>服务条款</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters(['isLogin'])
  },
  created(){
    //如果已经登陆了，则进入消息页面
    this.isLogin && this.$router.push('/message')
  },
  mounted(){
    this.$refs.user.focus()
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
        socket.emit('login',data.loginStatus.userId) 
        this.$store.commit('SET_LOGIN',data)
        this.$store.commit('ADD_USER',data)
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
    margin-top:150px;
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
      input{
        font-family:'Microsoft Yahei';
        width: 100%;
        &.btn{
          line-height: 32px;
          background: #1E90FF;
          color: white;
          margin-top:50px;
        }
      }
      a{
        margin-top: 20px;
        color: #1E90FF;
      }
      ::-webkit-input-placeholder,::-moz-placeholder,::-moz-placeholder,
      ::-ms-input-placeholder { color: #333;} 
    }
  }
}
</style>
