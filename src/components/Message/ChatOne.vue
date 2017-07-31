<template>
 <!--  一对一聊天(私聊) -->
 <div class="wrapper">
    <div class="header">
      <div class="item left" @click="back"><span>11</span></div>
      <div class="item center">
      	<span class="name">{{dataList.chatWith}}</span>
      	<span class="status">{{dataList.status}}</span>
      </div>
      <div class="item right">
      	<img src="/static/icon/4/skin_aio_head_twocall.png" class="phone">
      	<img src="/static/icon/4/skin_header_icon_single.png" 
        @click="$router.push(`/chat_one/${dataList.user_id}/set`)" class="person">
      </div>
    </div>
    
    <VScroll :isScrollToBottom='isScrollToBottom' :data="dataList.message">
      <div class="chat">
          <ul>
              <li v-for="item in dataList.message" :class="{
                  'time':item.type=='time',
                  'me':item.type=='message'&&item.content.from=='me',
                  'other':item.type=='message'&&item.content.from=='other'}">
                  <template v-if="item.type=='message'">
                      <img :src="item.content.faceUrl" :class="{
                       'me':item.content.from=='me',
                       'other':item.content.from=='other'}"
                       @click="$router.push(`/chat_one/${item.content.user_id}/profile`)">
                  	  <p class="message">{{item.content.message}}</p>
      				    </template>
      				    <template v-else>
      				    	{{item.content}} 
      				    </template>
              </li>
          </ul>
      </div>
    </VScroll>

    <div class="footer">
    	 <div class="writeMessage">
          <textarea v-model="writeMessage"></textarea>
    	 	  <button class="btn" :class="{'enable':writeMessage!=''}"
            @click="sendMessage">发送</button>
    	 </div>
    	 <div class="other">
          <div class="item" v-for="item in iconUrl">
            <img :src="item">
          </div>
       </div>
    </div>
 </div>
</template>

<script>
import VScroll from '@/base/Scroll/Scroll'
import {mapGetters} from 'vuex'
import * as api from '@/api/chat'
import {parseChatTime} from '@/common/js/parse-time'

export default {
  name: 'ChatOne',
  data(){
     return {
        isScrollToBottom:true,
        writeMessage:'',
        dataList:{
          user_id:'',   //别人的id
          chatWith:'正在加载中...',  //自己对别人的备注
          status:'', //别人的设备状态
          user_face:'',  //别人的头像
          beizhu:'',  //别人对自己的备注
          message:[]  //消息
        },
        iconName:['ptt','image','ptv','camera','hongbao','flash','emotion','plus']
    }
  },
  computed:{
    ...mapGetters([
      'userId',
      'userInfo'
    ]),
    iconUrl(){
      return this.iconName.map(item=>`/static/icon/4/skin_aio_panel_${item}_nor.png`)
    }
  },
  mounted(){
    this.dataList.user_id=this.$route.params.user_id
    this.getMessage(this.userId,this.dataList.user_id)
    this.updateBySocket()
  },
  components:{
    VScroll
  },
  methods:{
    //获取消息
    async getMessage(userId,otherUserId){
      const {data} = await api.get_message(userId,otherUserId) 
      const {info,info1,message} = data
      const {device,beizhu,face} = info  //别人的信息
      this.dataList.status = device==0?'离线':device==1?'手机在线':device==2?'3G在线':
          device==3?'4G在线':device==4?'WiFi在线':'电脑在线'
      this.dataList.chatWith = beizhu  // 自己对别人的备注
      this.dataList.beizhu=info1.beizhu  //别人对自己的备注
      this.dataList.user_face=face  //别人的头像

      //取消息
      if(message.length==0) return
      message.sort((prev,current)=>{  //按时间升序排列
        return prev.time>current.time
      })

      //添加第一条时间消息，不需要经过判断
      this.isAddTimeMessage(0,message[0].time)
      //添加消息内容
      for(let [index,value] of message.entries()){
          //需要通过判断才能确定是否要添加时间消息
          index>0 && this.isAddTimeMessage(1, value.time, message[index-1].time)
          let content={
              type:'message',
              content:{
                user_id:value.from_user, // 发送方的id
                from:value.from_user==this.userId?'me':'other',
                faceUrl:value.face,  // 发送方的头像
                message:value.message, //发送方的消息
                time:value.time // 发送方的发送时间
              } 
          }
          this.dataList.message.push(content)
      }
    },
    //发送消息
    async sendMessage(){
      if(this.writeMessage.trim()=='') return
      
      this.sendBySocket()  //先通过socket发送消息

      //持久化到服务器
      let data={
        userId:this.userId,  //发送方的id
        otherUserId:this.dataList.user_id,  //接收方的id
        message:this.writeMessage, //消息内容
        time:Date.parse(new Date())/1000 //时间
      }
      const {code,message} = await api.send_message(data)
      if(code==1){
        data={
          type:'message',
          content:{
            user_id:this.userId, //自己的id
            from:'me',
            faceUrl:this.userInfo.face,  // 自己的头像
            message:this.writeMessage, //发的消息
            time:Date.parse(new Date())/1000  //时间
          } 
        }
        this.writeMessage=''
        //本地追加自己发送的消息
        this.addMessageLocal(data)
      }else{
        this.dataList.message.push({
          type:'time',
          content:message
        })
      }
    },
    // 本地追加消息
    addMessageLocal(data){
      const message=this.dataList.message //获取本地已经存在的消息
      if(message.length==0){//如果本地原来没有消息，则直接添加时间消息，不需要经过比较判断
        this.isAddTimeMessage(0, data.content.time)
      }else{  //否则需要经过比较判断才能确定是否要添加时间消息
        const latestMessage = message[message.length-1] //本地最新的一条消息
        const latestTime=latestMessage.content.time  //该消息的时间
        this.isAddTimeMessage(1, data.content.time, latestTime)
      }
      this.dataList.message.push(data)  
    },
    //是否要添加时间消息
    isAddTimeMessage(flag,currentTime,prevTime=''){
      if(flag){   //当flag为真时,需要比较判断，才能确定是否要添加时间
        const seprator=30*60   //时间间隔基准,半个小时
        if(currentTime-prevTime>seprator){//当下一条消息和这条消息的时间间隔大于30分钟,才添加时间
          this.dataList.message.push({
            type:'time',
            content:parseChatTime(currentTime)
          })
        } 
      }else{  //当flag为假时,是必须要添加时间消息的
        this.dataList.message.push({
          type:'time',
          content:parseChatTime(currentTime)
        })
      }
    },
    // 返回时更新状态
    back(){
      //这里不需要await，不然可能会卡
      api.update_enter_chat(this.userId,this.dataList.user_id) 
      this.$router.back()
    },
    // socket更新消息
    updateBySocket(){
      socket.removeAllListeners()  //一定要先移除原来的事件，否则会有重复的监听器
      
      socket.on('receivePrivateMessage',(data)=>{
          if(data.from_user==this.userId) return

          //本地追加别人通过socket发来的消息
          this.addMessageLocal({
              type:'message',
              content:{
                user_id:data.from_user, // 发送方id
                from:'other',
                time:data.time, // 发送时间
                faceUrl:data.from_user_face, //发送方的头像
                message:data.message  //消息内容
              } 
          })
      })
    },
    // socket发送消息
    sendBySocket(){
      socket.emit('sendPrivateMessage',{
        from_user:this.userId,  //发送方id（即自己的id）
        from_user_face:this.userInfo.face,//发送方头像（即自己的头像）
        from_user_beizhu:this.dataList.beizhu,//发送方名字（即别人对自己的备注）
        to_user:this.dataList.user_id,//接收方id
        message:this.writeMessage,//消息内容
        time:Date.parse(new Date())/1000 //时间
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
#wrapper{
   background:#EFEFEF !important;
   bottom:70px !important
}
.header{
	  display:flex;
    padding:0 20px;
    height:50px;
    line-height:50px;
    background: #1E90FF;
    color: white;
    font-size:18px;
    position:absolute;
    top:0;
    width:100%;
    z-index:3;
    .item{
    	flex:1;
        &.left{
            background:url(/static/icon/4/flc.png) no-repeat left center;
            margin-left:-10px;
            padding-left:20px;
            background-size:26px 26px;
            cursor:pointer;
            span{
            	display:inline-block;
            	background:rgba(255,255,255,0.5);
            	border-radius:50%;
            	width:24px;
            	height:24px;
            	line-height:24px;
      				text-align:center;
      				font-size:14px
            }
        }
        &.center{
            text-align:center;
            span{
              display:block;
              letter-spacing:2px;
            }
            span.name{
              display:block;
              line-height:22px;
              font-size:16px;
              margin:0 auto;
              overflow:hidden;
              width:200px;
              text-overflow:ellipsis; /*当文本溢出时显示省略标记(...)*/
              white-space:nowrap; /*不换行*/
            }
            span.status{
              line-height:18px;
              font-size:12px;
            }
        }
        &.right{
            text-align:right;
            cursor:pointer;
            position:relative;
            left:20px;
            img{
               transform:scale(0.5)
            }
            img.phone{
            	position:relative;
            	left:20px
            }
        }
    }
}
.chat {
	cursor:pointer;
    ul{
	    width:100%;   
	    li{  
	      padding:6px 10px;
	      img{
	      	border-radius:50%;
	      	width:46px;
	      	height:46px;
	      }
	      p.message{
	      	min-height:40px;
	      	line-height:30px;
	        max-width:56%;
	      	display:inline-block;
	      	border-radius:10px;
	      	padding:6px 10px;
          word-break: break-all; 
	      }
	    }
	    li.time{
	       height:50px;
	       line-height:50px;
	       font-size:14px;
	       color:#666;
	       text-align:center;
	    }
	    li.me{
	    	overflow:hidden;
	    	img{
	    		float:right;
	    	}
	    	p.message{
	    		margin-right:10px;
	    		background:#1E90FF;
	    		color:#fff;
          float:right;
	    	}
	    }
	    li.other{
	    	overflow:hidden;
	    	img{
	    		float:left;
	    	}
	    	p.message{
	    		margin-left:10px;
	    		background:#fff;
	    		color:#000;
          float:left;
	    	}
	    }
    }
}
.footer{
	width:100%;
	height:70px;
	position:absolute;
	bottom:0;
	background:#eee;
	.writeMessage{
		height:32px;
		display:flex;
    textarea{
      width:80%;
      margin:0 6px;
      padding-left:6px;
      border-radius:2px;
      outline:none;
      resize:none;
      border:none;
      overflow-y:hidden;
      font-family:'Microsoft Yahei';
    }
		button.btn{
			height:100%;
			width:16%;
			background:#ccc;
			color:white;
			border-radius:2px;
			cursor:not-allowed;
      font-family:'Microsoft Yahei';
			&.enable{
				background:#1E90FF;
				cursor:pointer;
			}
		}
	}
	.other{
		display:flex;
		background:#eee;
		.item{
			height:100%;
			flex:1;
			text-align:center;
      line-height:32px;
			img{
				width:32px;
				height:32px;	
				margin-top:4px;
				cursor:pointer;
			}
		}
	}
}
</style>