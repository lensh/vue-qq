<template>
 <!--  好友申请 -->
 <div class="wrapper">
    <div class="header">
      <div class="item left" @click="$router.push('/friend/new')">返回</div>
      <div class="item center">好友申请</div>
      <div class="item"></div>
    </div>
    <div class="apply">
      <ul> 
        <li @click="$router.push(`${dataList.user_id}/profile`)">  
          <img :src="dataList.face" class="user">
          <div class="info">
             <p class="name">{{dataList.nick_name}}</p>
             <p class="message">
                <span class="sex">{{dataList.sex}}</span><span>{{dataList.age}}岁</span><span>{{dataList.place}}</span>
             </p>
             <img src="./icon/nqj.9.png" class="icon">
          </div>
        </li>
      </ul>
      <div class="other">
         <span class="left">附加消息</span>
         <span class="middle">{{dataList.apply_message}}</span>
         <button class="btn">回复</button>
      </div>
      <div class="other">
         <span class="left">来源</span>
         <span class="middle">{{dataList.source}}</span>
      </div>
      <div class="actions">
         <button class="reject" @click="reject(apply_id)" 
          v-if="dataList.status==1">拒绝</button>
         <button class="agree" @click="agree(apply_id)"
          v-if="dataList.status==1">同意</button>
         <p v-if="dataList.status==2">已同意该申请</p>
         <p v-if="dataList.status==3">已拒绝该申请</p>
      </div>
    </div>
 </div>
</template>

<script>
import {get_apply_detail,resolve_friend_apply} from '@/api/friend'

export default {
  name: 'friendApply',
  data(){
    return {
      apply_id:6,
      dataList:{}
    }
  },
  created(){
  	this.apply_id=this.$route.params.id
    this.getApplyDetail(this.apply_id)
  },
  methods:{
    async agree(apply_id){
      //修改数据库状态为同意
      const {code} = await resolve_friend_apply(1,apply_id)
      if(code==1){
        //commit state，把指定项修改
        this.$store.dispatch('updateNewFriends',{
          applyId:apply_id,
          status:2
        })
        this.$router.push(`/friend/setting/${apply_id}`)
      }
    },
    async reject(apply_id){
      //修改数据库状态为拒绝
      const {code} = await resolve_friend_apply(0,apply_id)
      if(code==1){
        //commit state，把指定项修改
        this.$store.dispatch('updateNewFriends',{
          applyId:apply_id,
          status:3
        })
        this.$router.push('/friend/new')
      }
    },
    async getApplyDetail(apply_id){
      const {data} = await get_apply_detail(apply_id)
      this.dataList=data
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
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
    }
    .item.left{
      background:url(./icon/flc.png) no-repeat left center;
      margin-left:-10px;
      padding-left:20px;
      background-size:26px 26px;
      cursor:pointer
    }
    .item.center{
      text-align:center
    }
}
.apply{
  margin-top:70px;
  background:white;
}
.apply  ul{
   width:100%;
   li{   
      border-top:1px solid #eee;
      border-bottom:1px solid #eee;
      height:64px;
      line-height:64px;
      padding:0 10px;  
      cursor:pointer;
      img.user{
          width:44px;
          height:44px;
          border-radius:50%;
          float:left;
          margin-left:2%;
          margin-top:10px 
      }
      .info{
          font-size:16px;
          width:100%;
          margin-left:7%;
          height:68px;
          padding-left:30px;
          position:relative;
          p{
            &.name{
              letter-spacing:1px;
              height:32px;
              line-height:32px;
              font-size:18px;
              position:relative;
              top:4px;
            }
            &.message{
              color:#666;
              height:32px;
              line-height:32px;
              font-size:14px;
              position:relative;
              top:-4px;
            }
            span{
              margin-left:10px;
              &.sex{
                margin-left:0
              }
            }
          }
          img.icon{
            position:absolute;
            top:50%;
            transform:translateY(-50%) scale(0.6);
            right:30px;    
          }
      }
    }
}
.apply .other{
  padding:0 10px; 
  height:50px;
  line-height:50px;
  border-bottom:1px solid #eee;
  span.left{
    color:#666;
    width:70px;
  }
  span.middle{
    margin-left:10px
  }
  button{
    float:right;
    width:50px;
    height:30px;
    background:#fff;
    border:1px solid #eee;
    margin-top:10px;
    cursor:pointer;
    font-family: 'Microsoft Yahei' !important;
  }
}
.apply .actions{
  margin:20px auto;
  width:94%;
  p{
    text-align:center;
    color:#666
  }
  button{
    width:48%;
    height:40px;
    border:1px solid #eee;
    border-radius:2px;
    font-size:16px;
    cursor:pointer;
    &.reject{
      background:#fff;
      float:left;
    }
    &.agree{
      float:right;
      background:#78B7FF;
      color:#fff;
    }
  }
}
</style>