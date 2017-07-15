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
   top:0;
   width:100%;
   height:30px;
   line-height:30px;
   background:grey;
   color:white;
   text-align:center;
}
</style>
