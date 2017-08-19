<template>
 <!--  好友设置（备注,分组） -->
 <div class="wrapper">
    <!-- 第一页 -->
    <div class="first" v-show="currentTab==1">
      <div class="header">
        <div class="item first" @click="cancle">取消</div>
        <div class="item center">好友设置</div>
        <div class="item right" @click="complete">完成</div>
      </div>
      
      <div class="main">
        <div class="setting">
          <span class="left">备注</span>
          <span class="middle"><input v-model="dataList.beizhu" class="text"/></span>
          <img src="./icon/gyw.png"class="icon" v-show="dataList.beizhu!=''" @click="clear">
        </div>
        <div class="setting" @click="changeTab">
          <span class="left">分组</span>
          <span class="middle">{{dataList.defaulGroup}}</span>
          <img src="./icon/nqj.9.png" class="icon">
        </div>
      </div>
    </div>
    
    <!--第二页-->
    <div class="second" v-show="currentTab==2">
      <div class="header">
        <div class="item second" @click="back">返回</div>
        <div class="item center">移至分组</div>
      </div>
      
      <div class="main">
          <ul>
            <li v-for="item in dataList.groups" @click="changeGroup(item.zu_name)">
               {{item.zu_name}}
               <img src="./icon/gzb.png" v-show="item.zu_name==dataList.defaulGroup">
            </li>
          </ul>
      </div>
    </div>
 </div>
</template>

<script>
import {get_fenzu,add_friend} from '@/api/friend'

export default {
  name: 'settingFriend',
  data(){
    return {
      currentTab:1,
      applyId:'',
      dataList:{
        userId:'',   //用户自己的id
        applyUserId:'',  //添加方用户id
        beizhu:'',  //添加方用户昵称
        defaulGroup:'',  //用户的默认分组
        groups:[]  //用户所有的分组
      },
      initZuName:'',  //初始分组名称,点击取消时会用到
      initBeizhu:''  //初始备注名称,点击取消时会用到
    }
  },
  created(){
    this.applyId=this.$route.params.apply_id
    this.getFenzu(this.applyId)
  }, 
  methods:{
    clear(){
      this.dataList.beizhu=''
    },
    //返回
    back(){
      this.currentTab=1
    },
    changeTab(){
      this.currentTab=2
    },
    //改变分组
    changeGroup(zu_name){
      this.dataList.defaulGroup=zu_name
      setTimeout(()=>{
        this.currentTab=1
      },400) 
    },
    //得到分组情况
    async getFenzu(applyId){
      const {data} = await get_fenzu(applyId)
      this.dataList=data
      this.initBeizhu=data.beizhu
      this.initZuName=data.defaulGroup
    },
    //取消修改备注
    async cancle(){
      //把新成员添加到默认分组里，好友表新增两条记录,且设置好备注为默认昵称
      const data={
        applyId:this.applyId,
        userId:this.dataList.userId,
        applyUserId:this.dataList.applyUserId,
        beizhu:this.initBeizhu,  
        zuName:this.initZuName
      }
      const {code} = await add_friend(data)
      code==1 && this.$router.push('/friend/new')
    },
    //完成修改备注
    async complete(){
      //把新成员添加到新的分组里，好友表新增两条记录,且设置好备注为新的备注
      const data={
        applyId:this.applyId,
        userId:this.dataList.userId,
        applyUserId:this.dataList.applyUserId,
        beizhu:this.dataList.beizhu,  
        zuName:this.dataList.defaulGroup
      }
      const {code} = await add_friend(data)
      code==1 && this.$router.push('/friend/new')
    }
  }
}
</script>

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
          background:url(./icon/flc.png) no-repeat left center;
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
        }
      }
    }
  }
}
</style>