<template>
 <!--  主页面头部 -->
  <div class="header">
     <div class="face" @click="showSidebar"></div>
     <div>{{title}}</div>
     <div class="cursor" :class="{'add':currentTab==1}" @click="go">{{action}}</div>
  </div>
</template>

<script>
export default {
  name: 'head',
  props:['currentTab'],
  computed:{
    title(){
       return this.currentTab==1?'消息':this.currentTab==2?'联系人':'动态'
    },
    action(){
       return this.currentTab==1?'+':this.currentTab==2?'添加':'更多'
    }
  },
  methods:{
    go(){
      if(this.currentTab==2){
        this.$router.push('friendAdd')
      }
    },
    showSidebar(){
      this.$store.commit('SHOW_SIDEBAR',{
        'isShowSideBar':true,
        'isInit':false,
        'isShowMask':true
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.header{
	  display:flex;
	  flex-direction:row;
	  justify-content:space-between;
    padding:0 20px;
    line-height:50px;
    background: #1E90FF;
    color: white;
    font-size:18px;
    letter-spacing:2px;
    position:absolute;
    top:0;
    width:100%;
    z-index:3;
    .face{
    	width:40px;
    	height:40px;
    	border-radius:50%;
    	margin:auto 0;
    	background:url(/static/user/face/0.jpg) no-repeat center center;
    	background-size:40px;
      cursor:pointer
    }
    .add{
        font-size:1.8em;
    }
    .cursor{
      cursor:pointer;
    }
}

</style>