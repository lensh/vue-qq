<template>
  <!-- 模拟QQ启动页面 -->
  <div class="wrapper">
     <div class="boot"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'boot',
  computed: {
    ...mapGetters(['isLogin'])
  },
  created(){
    //未登陆则切换到欢迎页面,否则进入消息页面
    setTimeout(()=>{
       this.isLogin ? this.$router.push('/message') : this.$router.push('/welcome')  
    },1500)
  }
}
</script>

<style scoped lang="scss" type="text/css">
.boot{
   position:absolute;
   width:100%;
   height:100%;
   background: url(./splash.png) no-repeat center center;
   background-size: contain;
}
</style>
