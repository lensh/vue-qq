<template>
 <!--  新朋友 -->
   <div class="wrapper">
      <div class="header">
        <div class="item left" @click="$router.push('friend')">联系人</div>
        <div class="item center">新朋友</div>
        <div class="item right" @click="$router.push('friendAdd')">添加</div>
      </div>
      
      <VScroll :data="dataList">
        <div class="notify">
            <p class="title">好友通知</p>
            <ul @dblclick="toApply" @tap="toApply">
                <li v-for="item in dataList" :data-apply-id="item.apply_id" >  
                    <img :src="item.face" class="user">
                    <div class="info">
                       <template v-if="item.status!=4">
                          <p class="name">{{item.name}}</p>
                          <p class="intro">
                             <span :class="{'man':item.sex=='男','woman':item.sex=='女'}">{{item.age}}</span>
                             {{item.info}}
                          </p>
                          <p class="from">{{item.from}}</p>
                          <button class="agree" v-if="item.status==1" 
                          @click="agree(item.apply_id)">同意</button>    
                          <button class="other" v-if="item.status==2">已同意</button>
                          <button class="other" v-if="item.status==3">已拒绝</button>
                       </template>
                       <template v-else>
                          <p class="name mes">{{item.name}}</p>
                          <p class="message"> {{item.info}}</p>
                          <button class="other">等待验证</button>
                       </template>
                    </div>
                </li>
            </ul>
        </div>
      </VScroll>
   </div>
</template>

<script>
import VScroll from '@/base/Scroll/Scroll'

export default {
  name: 'newFriend',
  data(){
    return {
       dataList:[
          {
            apply_id:1,
            face:'/static/user/face/4.jpg',
            name:'ThreeTree',
            age:19,
            sex:'男',
            info:'大哥 想请教一个问题',
            from:'来自：QQ群-JS讨论群',
            status:1  // 1 待处理  2 已同意 3 已拒绝 4 等待验证
          },
          {
            apply_id:2,
            face:'/static/user/face/6.jpg',
            name:'rshu',
            age:19,
            sex:'女',
            info:'我是rshu',
            from:'来自：QQ群-ThinkPHP技术讨论中心',
            status:3  // 1 待处理  2 已同意 3 已拒绝 4 等待验证
          },   
          {
            apply_id:3,
            face:'/static/user/face/10.jpg',
            name:'云端之上',
            age:19,
            sex:'男',
            info:'我是云端之上',
            from:'来自：临时会话',
            status:3  // 1 待处理  2 已同意 3 已拒绝 4 等待验证
          },
          {
            apply_id:4,
            face:'/static/user/face/8.jpg',
            name:'后知后觉',
            age:21,
            sex:'女',
            info:'请求加为好友',
            from:'来自：QQ群-JS讨论群',
            status:2  // 1 待处理  2 已同意 3 已拒绝 4 等待验证
          },
          {
            apply_id:5,
            face:'/static/user/face/9.jpg',
            name:'阿里巴巴社招内推',
            info:'已发送验证消息',
            status:4  // 1 待处理  2 已同意 3 已拒绝 4 等待验证
          },
       ]
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  components:{
    VScroll
  },
  methods:{
    //同意或者跳转到好友申请页面
    toApply(e){
      let target=$(e.target).get(0)
      while(target.tagName!='LI'){
        target=target.parentNode?target.parentNode:''
      }
      if(target) {
        const apply_id=$(target).attr('data-apply-id')
        this.$router.push({
          path: '/friendApply',
          query: {apply_id: apply_id} 
        })
      }
    },
    agree(id){
      this.$router.push({
        path:'friendSetting',
        query:id
      })
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
    z-index:4;
    .item{
    	  flex:1;
        &.left{
            background:url(/static/icon/4/flc.png) no-repeat left center;
            margin-left:-10px;
            padding-left:20px;
            background-size:26px 26px;
            cursor:pointer
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
#wrapper{
  background:#FFFDFD ;
}
.notify{
  cursor:pointer;
  background:#fff;
  p.title{
    color:#666;
    margin-left:2%;
    font-size:14px;
    line-height:30px;
    background:#FFFDFD;
  }
}
.notify ul{
   width:100%;
   li{
      &:first-child{
        border-top:1px solid #eee;
      }     
      border-bottom:1px solid #eee;
      height:80px;
      line-height:80px;
      padding:0 10px;  
      img.user{
          width:50px;
          height:50px;
          border-radius:50%;
          float:left;
          margin-left:2%;
          margin-top:15px 
      }
      .info{
          font-size:16px;
          width:100%;
          margin-left:10%;
          height:68px;
          padding-left:30px;
          position:relative;
          p{
            &.name{
              letter-spacing:1px;
              height:32px;
              line-height:32px;
              font-size:18px;
              &.mes{
                position:relative;
                top:10px
              }
            }
            &.intro,&.from{
              color:#666;
              font-size:14px;
              height:20px;
              line-height:20px;
            }
            &.intro{
              span{
                display:inline-block;
                color:#fff;
                font-size:12px;
                line-height:18px;
                padding-left:14px;
                width:32px;
                height:18px;
                border-radius:2px;
                background-size:10px;
                &.man{
                  background:#70D7FD url(/static/icon/4/rfk.png) no-repeat 14% center;
                  background-size:10px;
                }
                &.woman{
                  background:#FE639B url(/static/icon/4/rfi.png) no-repeat 14% center;
                  background-size:10px;
                }
              }
            }
            &.message{
              color:#666;
              height:32px;
              line-height:32px;
              font-size:14px;
            }
          }
          button{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            right:50px;
            height:30px;
            &.agree{
               width:50px;         
               color:white;     
               border-radius:2px;       
               cursor:pointer;
               background:#70D7FD;              
            }
            &.other{
              background:#fff;  
              color:#666
            }
          }
      }
    }
}

</style>