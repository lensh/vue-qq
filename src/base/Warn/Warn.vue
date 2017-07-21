<template>
  <p class="loading" v-show="isShow">{{message}}</p>
</template>

<script>
export default {
  name: 'warn',
  computed:{
    isShow(){
       return this.$store.state.warn.isShow
    },
    message(){
       return this.$store.state.warn.message
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
p.loading{
   position:absolute;
   top:20px;
   left:0;
   right:0;
   margin:0 10px;
   padding:0 20px;
   height:28px;
   text-align:center;
   line-height:28px;
   color:white;
   letter-spacing:1px;
   background:#000;
   opacity:0.6;
   font-size:14px;
   border-radius:2px;
}
</style>
