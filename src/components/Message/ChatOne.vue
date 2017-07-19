<template>
 <!--  一对一聊天(私聊) -->
 <div class="wrapper">
    <div class="header">
      <div class="item left" @click="$router.back()"><span>11</span></div>
      <div class="item center">
      	<span class="name">{{dataList.chatWith}}</span>
      	<span class="status">{{dataList.status}}</span>
      </div>
      <div class="item right">
      	<img src="/static/icon/4/skin_aio_head_twocall.png" class="phone">
      	<img src="/static/icon/4/skin_header_icon_single.png" 
        @click="$router.push(`${dataList.user_id}/set`)" class="person">
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
                       @click="$router.push(`${dataList.user_id}/profile`)">
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
  name: 'ChatOne',
  data(){
     return {
       isScrollToBottom:true,
       dataList:{
          user_id:6,
          chatWith:'马哲涵',
          status:'手机在线',
          message:[
            {
            	type:'time',
            	content:'星期五 21:36'
            },
            {
            	type:'message',
            	content:{
                user_id:1,
            		from:'me',
  	          	faceUrl:'/static/user/face/0.jpg',
  	          	message:'腾讯'
            	} 
            },
            {
            	type:'message',
            	content:{
                user_id:2,
  	        	  from:'other',
  	          	faceUrl:'/static/user/face/4.jpg',
  	          	message:'腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。'
            	}
            }, 
            {
            	type:'message',
            	content:{
                user_id:3,
  	        	  from:'me',
  	          	faceUrl:'/static/user/face/0.jpg',
  	          	message:'百度'
            	}	
            },
            {
            	type:'message',
            	content:{
                user_id:4,
  		       	  from:'other',
  	          	faceUrl:'/static/user/face/4.jpg',
  	          	message:'百度，全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于2000年1月1日在中关村创建了百度公司。'
            	}
            }, 
            {  	
            	type:'message',
            	content:{
                user_id:1,
  	        	  from:'me',
  	          	faceUrl:'/static/user/face/0.jpg',
  	          	message:'阿里巴巴'
            	}
            },
            {
            	type:'message',
            	content:{
                user_id:4,
  		          from:'other',
  	          	faceUrl:'/static/user/face/4.jpg',
  	          	message:'阿里巴巴网络技术有限公司（简称：阿里巴巴集团）是以曾担任英语教师的马云为首的18人于1999年在杭州创立，他们相信互联网能够创造公平的竞争环境，让小企业通过创新与科技扩展业务，并在参与国内或全球市场竞争时处于更有利的位置。'
            	}
            }
          ]
       },
       iconName:['ptt','image','ptv','camera','hongbao','flash','emotion','plus']
    }
  },
  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('/login') :''
  },
  computed:{
    iconUrl(){
      return this.iconName.map(item=>`/static/icon/4/skin_aio_panel_${item}_nor.png`)
    }
  },
  components:{
    VScroll
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