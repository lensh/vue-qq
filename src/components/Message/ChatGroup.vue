<template>
 <!--  群聊 -->
 <div class="wrapper">
    <div class="header">
      <div class="item left" @click="$router.back()"></div>
      <div class="item center">
      	<span class="name">{{dataList.groupName}}</span>
      </div>
      <div class="item right">
      	<img src="/static/icon/4/skin_header_icon_group_selected.png" class="person">
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
                      <img :src="item.content.faceUrl">
                      <p class="name">{{item.content.name}} :</p>
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
    	 	 <input type="text" class="text">
    	 	 <button class="btn enable">发送</button>
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

export default {
  name: 'ChatGroup',
  data(){
     return {
       isScrollToBottom:true,
       dataList:{
          groupName:'牛客网IT笔试面试讨论群9',
          message:[
            {
            	type:'time',
            	content:'昨天 21:36'
            },
            {
            	type:'message',
            	content:{
            		from:'other',
            		name:'程文宇',
  	          	faceUrl:'/static/user/face/7.jpg',
  	          	message:'电商项目中发模板邮件这种业务有谁了解吗'
            	} 
            },
            {
            	type:'message',
            	content:{
  	        	from:'other',
  	        	name:'马哲涵',
  	          	faceUrl:'/static/user/face/4.jpg',
  	          	message:'邮件是html格式'
            	}
            }, 
            {
            	type:'message',
            	content:{
  	        	from:'other',
  	        	name:'程文宇',
  	          	faceUrl:'/static/user/face/7.jpg',
  	          	message:'嗯，那个能实现。老板给两张表就不管了，我不太清楚具体的业务流程之类'
            	}	
            },
            {
            	type:'message',
            	content:{
  		       	from:'other',
  		       	name:'程文宇',
  	          	faceUrl:'/static/user/face/7.jpg',
  	          	message:'那你直接发html不就OK了吗'
            	}
            }, 
            {  	
            	type:'message',
            	content:{
  	        	from:'other',
  	            name:'许易',
  	          	faceUrl:'/static/user/face/10.jpg',
  	          	message:'Java调用html模板发送html内容的邮件'
            	}
            },
            {
            	type:'message',
            	content:{
  		        from:'me',
  		        name:'莫知我哀',
  	          	faceUrl:'/static/user/face/0.jpg',
  	          	message:'nodejs也可以的'
            	}
            }
          ]
       },
       iconName:['ptt','image','ptv','camera','hongbao','flash','emotion','plus']
    }
  },
  computed:{
    iconUrl(){
      return this.iconName.map(item=>`/static/icon/4/skin_aio_panel_${item}_nor.png`)
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  components:{
    VScroll
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
#wrapper{
   background:#eee !important;
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
        }
        &.center{
            text-align:center;
            span{
              display:block;
              letter-spacing:2px;
              line-height:26px;
              font-size:16px;
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
	      	margin-top:10px;
	      	text-align:left;
	      }
	      p.name{
	      	color:#666;
	      	font-size:14px;
	      	position:relative;
	      }
	    }
	    li.time{
	       height:40px;
	       line-height:40px;
	       font-size:14px;
	       color:#666;
	       text-align:center;
	    }
	    li.me{
	    	text-align:right;
	    	overflow:hidden;
	    	img{
	    		float:right;
	    	}
	    	p.message{
	    		margin-right:10px;
	    		background:#1E90FF;
	    		color:#fff;
	    	}
	    	p.name{
	    	    right:14px;
	    	}
	    }
	    li.other{
	    	text-align:left;
	    	overflow:hidden;
	    	img{
	    		float:left;
	    	}
	    	p.message{
	    		margin-left:10px;
	    		background:#fff;
	    		color:#000;
	    	}
	    	p.name{
	    	    left:14px;
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
		input.text{
			height:100%;
			width:80%;
			margin:0 6px;
			padding-left:6px;
			border-radius:2px;
		}
		button.btn{
			height:100%;
			width:16%;
			background:#ccc;
			color:white;
			border-radius:2px;
			cursor:not-allowed;
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