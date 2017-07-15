<template>
 <!--  好友申请 -->
 <div class="wrapper">
    <div class="header">
      <div class="item left" @click="$router.back()">返回</div>
      <div class="item center">好友申请</div>
      <div class="item"></div>
    </div>
    <div class="apply">
      <ul> 
        <li @click="$router.push('profile')">  
          <img :src="dataList.face" class="user">
          <div class="info">
             <p class="name">{{dataList.name}}</p>
             <p class="message">
                <span class="sex">{{dataList.sex}}</span><span>{{dataList.age}}岁</span><span>{{dataList.place}}</span>
             </p>
             <img src="/static/icon/4/nqj.9.png" class="icon">
          </div>
        </li>
      </ul>
      <div class="other">
         <span class="left">附加消息</span>
         <span class="middle">{{dataList.message}}</span>
         <button class="btn">回复</button>
      </div>
      <div class="other">
         <span class="left">来源</span>
         <span class="middle">{{dataList.from}}</span>
      </div>
      <div class="actions" @click="actions">
         <button class="reject" v-if="dataList.status==1">拒绝</button>
         <button class="agree" v-if="dataList.status==1">同意</button>
         <p v-if="dataList.status==2">已同意该申请</p>
         <p v-if="dataList.status==3">已拒绝该申请</p>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'friendAdd',
  data(){
    return {
      apply_id:'',
      dataList:{
        face:'/static/user/face/4.jpg',
        name:'ThreeTree',
        sex:'男',
        place:'深圳',
        age:'19',
        message:'大哥,想请教一个问题',
        from:'QQ群-JS讨论群',
        status:1   //1为还未处理,2为已同意,3为已拒绝
      }
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  created(){
  	this.apply_id=this.$route.query.apply_id
  },
  methods:{
    actions(e){
      const target=e.target||e.srcElement
      const className=target.className
      if(className.match('reject')){
        //拒绝
        this.$router.push('friendNew')
      }else if(className.match('agree')){
        //同意
        this.$router.push('friendSetting')
      }
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
      background:url(/static/icon/4/flc.png) no-repeat left center;
      margin-left:-10px;
      padding-left:20px;
      background-size:26px 26px;
      cursor:pointer
    }
    .item.center{
      text-align:center
    }
}
#wrapper{
  background:#FFFDFD;
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
    cursor:pointer
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