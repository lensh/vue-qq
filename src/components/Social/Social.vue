<template>
  <!-- 动态 -->
  <div class="wrapper">
      <VAsideMenu></VAsideMenu>
      <VHeader :currentTab="currentTab"></VHeader>
      <VSearch placeholder="大家都在搜:楚乔传"></VSearch>
      <div class="flex">
          <div class="item">
              <img src="./igs.png"><span>好友动态</span>
          </div>
          <div class="item">
              <img src="./eqc.png"><span>附近</span>
          </div>
          <div class="item">
              <img src="./iei.png"><span>兴趣部落</span>
          </div>
      </div>

      <div class="activity">
          <div class="item">
            <img src="./nhz.png" class="left">
            <span>游戏</span>
            <img src="./nqj.9.png" class="right">
          </div>
      </div>
      <VFooter :currentTab="currentTab"></VFooter>
  </div>
</template>

<script>
import VAsideMenu from '../Common/SideMenu/Sidemenu'
import VHeader from '../Common/Header/Header'
import VFooter from '../Common/Footer/Footer'
import VSearch from '@/base/Search/Search'

export default {
  name: 'social',
  data () {
    return {
      currentTab:3
    }
  },
  components:{
    VHeader,
    VFooter,
    VAsideMenu,
    VSearch
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
  background:#FFFDFD !important;
}
.search{
   margin-top: 50px;
}
.flex{
  display:flex;
  background:#fff;
  height:90px;
  .item{
    flex:1;
    text-align:center;
    margin-top:-10px;
    cursor:pointer;
    img{
      transform:scale(0.6);
    }
    span{
      display:block;
      margin-top:-20px;
      font-size:14px
    }
  }
}
.activity{
  background:#fff;
  margin-top:20px;
  .item{
    border-bottom:1px solid #eee;
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
}
</style>
