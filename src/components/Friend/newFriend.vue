<template>
 <!--  新朋友 -->
   <div class="wrapper">
      <div class="header">
        <div class="item left" @click="$router.push('/friend')">联系人</div>
        <div class="item center">新朋友</div>
        <div class="item right" @click="$router.push('/friend/new/add')">添加</div>
      </div>
      
      <VScroll :data="dataList" component="newFriend">
        <div class="notify">
            <p class="title">好友通知</p>
            <ul>
                <li v-for="item in dataList">             
                  <template v-if="item.to_user==userId">
                    <img :src="item.face" class="user">
                    <div class="info">
                        <div @click="gotoApply(item.id)">
                          <p class="name">{{item.nick_name}}</p>
                          <p class="intro">
                             <span :class="{'man':item.sex=='男','woman':item.sex=='女'}">{{item.age}}</span>
                             {{item.apply_message}}
                          </p>
                          <p class="from">来自:{{item.source}}</p>
                          <button class="agree" v-if="item.status==1" 
                          @click.stop="agree(item.id)">同意</button>    
                          <button class="other" v-if="item.status==2">已同意</button>
                          <button class="other" v-if="item.status==3">已拒绝</button>
                        </div>
                    </div>
                  </template>
                  <template v-else-if="item.status==1">
                    <img :src="item.face" class="user">
                    <div class="info">
                      <div @click="gotoProfile(item.to_user)">
                        <p class="name mes">{{item.nick_name}}</p>
                        <p class="message">{{item.info}}</p>
                        <button class="other">等待验证</button>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.status==3">
                    <img :src="item.face" class="user">
                    <div class="info">
                      <div>
                        <p class="name mes">{{item.nick_name}}</p>
                        <p class="message">{{item.info}}</p>
                      </div>
                    </div>
                  </template>
                </li>
            </ul>
        </div>
      </VScroll>
   </div>
</template>

<script>
import VScroll from '@/base/Scroll/Scroll'
import {resolve_friend_apply} from '@/api/friend'
import {mapGetters} from 'vuex'

export default {
  name: 'newFriend',
  computed:{
    ...mapGetters([
      'userId',
      'hasGetNewFriends'
    ]),
    ...mapGetters({
      'dataList':'newFriends'
    })
  },
  created(){
    //获取数据
    this.hasGetNewFriends==0 && this.$store.dispatch('getNewFriends',this.userId)
  },
  components:{
    VScroll
  },
  methods:{
    gotoApply(apply_id){
      this.$router.push(`/friend/apply/${apply_id}`)
    },
    gotoProfile(user_id){
      this.$router.push(`/profile/${user_id}`)
    },
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
            background:url(./icon/flc.png) no-repeat left center;
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
            position:relative;
            top:7px;
            &.name{
              letter-spacing:1px;
              height:28px;
              line-height:28px;
              font-size:18px;
              &.mes{
                position:relative;
                top:14px
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
                  background:#70D7FD url(./icon/rfk.png) no-repeat 14% center;
                  background-size:10px;
                }
                &.woman{
                  background:#FE639B url(./icon/rfi.png) no-repeat 14% center;
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
            font-family: 'Microsoft Yahei' !important;
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