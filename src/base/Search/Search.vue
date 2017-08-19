<template>
   <!-- 搜索框 -->
   <div class="search">
      <p><img src="./okh.png">  {{placeholder}}</p>
   </div> 
</template>

<script>
export default {
  name: 'search',
  props: ['placeholder']
}
</script>

<style lang="scss" type="text/css" scoped>
.search{
  margin:0 auto;
  width:99%;
  cursor:pointer;
  padding:6px 10px;
  p{
     height:30px;
     line-height:30px;
     border-radius:2px;
     font-size:14px;
     color:#666;
     background:#F7F6F6;
     text-align:center; 
     img{
       width:14px;
       height:14px;
       vertical-align:middle
     }
  }
}
</style>
