<template>
<!--  主页面底部 -->
  <div class="footer">
      <div class="item" @click="$router.push('/message')">
        <img :src="currentTab==1 ? iconUrl.message_selected:iconUrl.message">
        <span :class="{'blue':currentTab==1}">消息</span>
      </div>
      <div class="item" @click="$router.push('/friend')">
        <img :src="currentTab==2 ? iconUrl.person_selected:iconUrl.person">
        <span :class="{'blue':currentTab==2}">联系人</span>
      </div>
      <div class="item" @click="$router.push('/social')">
        <img :src="currentTab==3 ? iconUrl.social_selected:iconUrl.social">
        <span :class="{'blue':currentTab==3}">动态</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  props:['currentTab'],
  data(){
    return {
      iconUrl:{
        message_selected:require('./message_selected.png'),
        message:require('./message.png'),
        person_selected:require('./person_selected.png'),
        person:require('./person.png'),
        social_selected:require('./social_selected.png'),
        social:require('./social.png')
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.footer{
	  position:absolute;
    bottom:0;
    width:100%;
    z-index:3;
	  display:flex;
	  flex-direction:row;
	  justify-content:space-between;
    height:50px;
    color: #666;
    background: white;
    border-top:1px solid #eee;
    .item{
    	margin:0 auto;
      text-align:center;
      cursor:pointer;
    	img{
    		transform:scale(0.3);
    		display:block;
    		position:relative;
    		bottom:26px
    	}
    	span{
    		position:relative;
    		bottom:60px;
			  font-size:10px;
        &.blue{
          color:#9cf
        }
    	}
    }
    a{
      color:#666
    }
}
</style>