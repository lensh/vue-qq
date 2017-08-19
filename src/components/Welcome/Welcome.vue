<template>
  <div class="wrapper">
    <div class="welcome">
      <div class="actions">
          <router-link to="/login" class="grey">登录</router-link>
          <router-link to="/register" class="blue">新用户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'welcome',
  computed: {
    ...mapGetters(['isLogin'])
  },
  created(){
    //如果已经登陆了，则进入消息页面
    this.isLogin && this.$router.push('/message')
  }
}
</script>

<style scoped lang="scss" type="text/css">
.wrapper{
  background:#fff !important;
}
.welcome{
  position:absolute;
  width:100%;
  height:100%;
  background: url(./splash.png) no-repeat center center;
  background-size: contain;
  .actions{
    position: relative;
    top: 86%;
    margin: 0 10px;
    display: flex;
    a{
      flex:1;
      margin:6px;
      line-height: 32px; 
      color: white;
      border-radius: 2px;
      letter-spacing: 2px;
      &.blue{
        background: #9cf
      }
      &.grey{
        background: #ccc;
      }
    }
  }
}
</style>
