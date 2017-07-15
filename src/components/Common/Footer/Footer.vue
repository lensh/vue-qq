<template>
<!--  主页面底部 -->
  <div class="footer">
      <div class="item" @click="change(1)">
        <img :src="currentTab==1 ? '/static/icon/3/message_selected.png':
            '/static/icon/3/message.png' ">
        <span :class="{'blue':currentTab==1}">消息</span>
      </div>
      <div class="item" @click="change(2)">
        <img :src="currentTab==2 ? '/static/icon/3/person_selected.png':
           '/static/icon/3/person.png' ">
        <span :class="{'blue':currentTab==2}">联系人</span>
      </div>
      <div class="item" @click="change(3)">
        <img :src="currentTab==3 ? '/static/icon/3/social_selected.png':
           '/static/icon/3/social.png' ">
        <span :class="{'blue':currentTab==3}">动态</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  props:['currentTab'],
  methods:{
    change(currentTab){
      if(currentTab==1){
        this.$router.push('/message')
      }else if(currentTab==2){
        this.$router.push('/friend')
      }else{
        this.$router.push('/social')
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
    	}
      span.blue{
        color:#9cf
      }
    }
    a{
      color:#666
    }
}
</style>