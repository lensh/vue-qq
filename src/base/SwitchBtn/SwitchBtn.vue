<template>
   <!-- 开关切换按钮 -->
   <div class="switch" @click="switchBtn">
	    <div id="div1" :class="{'close1':!isOpen,'open1':isOpen}">
	        <div id="div2" :class="{'close2':!isOpen,'open2':isOpen}"></div>
	    </div>
   </div>
</template>

<script>
export default {
  name: 'SwitchBtn',
  props:['isOpen'],
  methods:{
  	switchBtn(){
  		this.$emit('open')
  	}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.switch{
	transform:scale(0.3);
	cursor:pointer;
	position:absolute;
	#div1{
	    width: 170px;
	    height: 100px;
	    border-radius: 50px;
	    position: relative;
	}
	#div2{
	    width: 96px;
	    height: 96px;
	    border-radius: 48px;
	    position: absolute;
	    background: white;
	    box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
	}
	.open1{
	    background: rgba(0,184,0,0.8);
	}
	.open2{
	    top: 2px;
	    right: 1px;
	}
	.close1{
	    background: rgba(255,255,255,0.4);
	    border:3px solid rgba(0,0,0,0.15);
	    border-left: transparent;
	}
	.close2{
	    left: 0px;
	    top: 0px;
	    border:2px solid rgba(0,0,0,0.1);
	}
}
</style>