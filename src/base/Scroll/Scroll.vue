<template>
  <!-- 滚动条组件 -->
  <div id="wrapper">
    <div id="scroller">
       <slot>要滚动的内容写在slot里</slot>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll' 

export default {
  name: 'scroll',
  props:{
    isScrollToBottom:{   //是否要滚动到底部
      type:Boolean,
      default:false
    },
    data:{   // 数据列表,如果数据改变了,则自动刷新
      type:Array,
      default:null
    },
    isHeightChange:{ //scroller的高度是否改变了,改变了也自动刷新(这种情况适用于无法通
      //过data的改变来自动刷新的情况)
      type:Boolean,
      default:false
    }
  },
  mounted (){
    //初始化滚动条
    setTimeout(()=>{
    	this.initScroll()
    },200)
  },
  methods:{
    initScroll(){
      this.scroll = new IScroll('#wrapper',{
        scrollbars: true,
        fadeScrollbars:true
      })
      this.scrollToBottom()
    },
    refresh(){
      //这里必须要有个延时，因为重绘页面需要时间
      setTimeout(()=>{ 
        this.scroll && this.scroll.refresh()
        this.isScrollToBottom && this.scrollToBottom(1000)
      }, 0)
    },
    scrollToBottom(time=0){
      this.scroll.scrollTo(0,this.scroll.maxScrollY,time)
    }
  },
  watch:{
    data(){  //当data数据改变了,则自动刷新
	    this.refresh()
    },
    isHeightChange(){  //当scroller的高度改变了,也自动刷新
      this.refresh()
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
#wrapper {
  position:absolute;
  z-index:1;
  overflow:hidden;
  top:50px;
  bottom:0;
  left:0;
  right:0;
  touch-action:none !important;
  background:#FFFDFD;
  #scroller{
    z-index:1;
    -webkit-touch-callout:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    width:100%;
    padding:0;
  }
}
</style>
