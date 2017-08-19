<template>
 <!--  主页面头部 -->
  <div class="header">
     <div class="face" @click="showSidebar" :style="style"></div>
     <div>{{title}}</div>
     <div class="cursor" :class="{'add':currentTab==1}" @click="addFriend">{{action}}</div>
  </div>
</template>

<script>
export default {
  name: 'head',
  props:['currentTab'],
  data(){
    return{
      'style':{
        'background':`url(${this.$store.state.userInfo.face}) 
          no-repeat center center`,
        'backgroundSize':'40px'
      } 
    }
  },
  computed:{
    title(){
       return this.currentTab==1?'消息':this.currentTab==2?'联系人':'动态'
    },
    action(){
       return this.currentTab==1?'+':this.currentTab==2?'添加':'更多'
    }
  },
  methods:{
    addFriend(){
      if(this.currentTab==2){
        this.$router.push('/friend/add')
      }
    },
    showSidebar(){
      this.$store.commit('SHOW_SIDEBAR',{
        'isShowSideBar':true,
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