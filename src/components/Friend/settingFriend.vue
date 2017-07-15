<template>
 <!--  好友设置（备注,分组） -->
 <div class="wrapper">
    <!-- 第一页 -->
    <div class="first" v-show="currentTab==1">
      <div class="header" @click="actions">
        <div class="item first">取消</div>
        <div class="item center">好友设置</div>
        <div class="item right">完成</div>
      </div>
      
      <div class="main">
        <div class="setting">
          <span class="left">备注</span>
          <span class="middle"><input v-model="dataList.remark" class="text"/></span>
          <img src="/static/icon/4/gyw.png" class="icon" 
           v-show="dataList.remark!=''" @click="clear">
        </div>
        <div class="setting" @click="changeTab">
          <span class="left">分组</span>
          <span class="middle">{{dataList.defaulGroup}}</span>
          <img src="/static/icon/4/nqj.9.png" class="icon">
        </div>
      </div>
    </div>
    
    <!--第二页-->
    <div class="second" v-show="currentTab==2">
      <div class="header" @click="actions">
        <div class="item second">返回</div>
        <div class="item center">移至分组</div>
      </div>
      
      <div class="main">
          <ul @click="changeGroup">
            <li v-for="item in dataList.groups">
               {{item}}
               <img src="/static/icon/4/gzb.png" :class="{'cur':item==dataList.defaulGroup}">
            </li>
          </ul>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'newFriend',
  data(){
    return {
      currentTab:1,
      dataList:{
        remark:'ThreeTree',
        defaulGroup:'晓风残月',
        groups:[
          '晓风残月',
          '梦回阑珊',
          '柳暗花明',
          '江南烟雨'
        ]
      }
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  methods:{
  	actions(e){
  		const target=e.target||e.srcElement
      const className=target.className
  		if(className.match('first')){
        //取消修改备注
        this.$router.push('friendNew')
  		}else if(className.match('right')){
        //完成修改备注
        this.$router.push('friendNew')
  		}else if(className.match('second')){
        this.currentTab=1
      }
      
  	},
    clear(){
      this.dataList.remark=''
    },
    changeTab(){
      this.currentTab=2
    },
    changeGroup(e){
      let target=e.target||e.srcElement
      const className=target.className
      if(className.match('cur')){
        this.currentTab=1
        return;
      }
      while(target.tagName!='LI'){
        target=target.parentNode?target.parentNode:''
      }
      $('li img').hide()
      $(target).find('img').show()
      setTimeout(()=>{
        this.currentTab=1
      },300) 
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
  background:#FFFDFD;
}
.first,.second{
  .header{
    display:flex;
    padding:0 20px;
    height:50px;
    line-height:50px;
    background: #1E90FF;
    color: white;
    font-size:18px;
    letter-spacing:2px;
    position:absolute;
    top:0;
    width:100%;
    z-index:3;
    .item{
        flex:1;
        &.first{
          cursor:pointer;
        }
        &.second{
          cursor:pointer;
          background:url(/static/icon/4/flc.png) no-repeat left center;
          margin-left:-10px;
          padding-left:20px;
          background-size:26px 26px;
        }
        &.center{
            text-align:center
        }
        &.right{
            text-align:right;
            cursor:pointer;
        }
    }
  }
}
.first{
  .main{
    margin-top:100px;
    border-top:1px solid #eee;
    .setting{
        background:#FFF;
        padding:0 20px; 
        height:50px;
        line-height:50px;
        border-bottom:1px solid #eee;
        position:relative;
        span.left{
          width:70px;
        }
        span.middle{
          cursor:pointer;
          margin-left:10px;
          input{
            border:none
          }
        }
        img.icon{
          position:absolute;
          top:50%;
          transform:translateY(-50%) scale(0.6);
          right:10px;    
          cursor:pointer;
        }
    }
  }
}
.second{
  .main{
    margin-top:50px;
    ul{
      width:100%;
      background:#fff;
      li{
        height:60px;
        line-height:60px;
        border-bottom:1px solid #eee;
        padding-left:16px;
        position:relative;
        img{
          position:absolute;
          top:50%;
          transform:translateY(-50%) scale(0.6);
          right:10px;
          display:none;
          &.cur{
            display:block
          }
        }
      }
    }
  }
}
</style>