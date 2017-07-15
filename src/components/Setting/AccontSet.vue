<template>
    <!--  账号管理 -->
	<div class="wrapper">
	  <div class="header">
	    <div class="item left" @click="$router.back()">返回</div>
	    <div class="item center">账号管理</div>
	    <div class="item right" @click="edit">编辑</div>
	  </div>
	  <div class="accontSet">
          <div class="first">
      	      <ul class="users">
      	      	 <li v-for="item in dataList">
      	      	 	<img :src="item.face" class="face">
      	      	 	<div class="info">
      	      	 		<p>{{item.name}}</p>
      	      	 		<p class="message">{{item.qq}}</p>
      	      	 		<img src="/static/icon/4/gzb.png" class="cur" id="remove" data-remove="0" data-src="/static/icon/4/gzb.png" data-remove-src="/static/icon/4/osr.png"  @click="remove">
      	      	 	</div>
      	      	 </li>
      	      </ul>
      	      <p class="addAccont">添加或注册账号</p>
          </div>
          <div class="second">
          	  <p class="item relative">关联QQ号</p>
          	  <p class="item info">关联QQ号后,即可代收该号的好友消息</p>
          </div>

          <div class="third">
          	  <p class="item">在线状态<img src="/static/icon/4/gzb.png" 
          	   :class="{'cur':loginStatus==1}"></p>
          	  <p class="item">隐身状态<img src="/static/icon/4/gzb.png"
          	   :class="{'cur':loginStatus==2}"></p>
          </div>
          <div class="fourth">
          	  <p class="item">退出当前账号</p>
          </div>
         
	  </div>
	</div>
</template>

<script>
export default {
  name: 'accontSet',
  data(){
    return {
       dataList:[
          {
          	name:'莫知我哀',
          	face:'/static/user/face/0.jpg',
          	qq:'986992484'
          }
       ],
       loginStatus:1  // 当前登录用户的状态  1在线 2隐身
    }
  },

  beforeCreate(){
    //如果没有登陆,则跳到登陆页面
    !this.$store.state.login.loginStatus ? this.$router.push('login') :''
  },
  methods:{
  	edit(e){
  		const text=$(e.target).text()
  		if(text==='编辑'){
  		    $(e.target).text('完成')
  		    const removeEle=$('#remove').get(0)
  			if(!removeEle) return
    		$('#remove').attr('src',$('#remove').attr('data-remove-src')).attr(
    		'data-remove',1)
  		}else{
  			$(e.target).text('编辑')
  			const removeEle=$('#remove').get(0)
  			if(!removeEle) return
    		$('#remove').attr('src',$('#remove').attr('data-src')).attr(
    		'data-remove',0)
  		}
  	},
  	remove(){
  		if($('#remove').attr('data-remove')==1){
  			$('#remove').parent().parent().remove()
  		}
  	}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.wrapper{
	background:#FFFDFD;
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
    .accontSet{
    	margin-top:70px;
    	.first,.second,.third,.fourth{
			background:white;
			margin-top:20px;
			border-top:1px solid #eee;
			.item{
				border-bottom:1px solid #eee;
				height:2.7rem;
				line-height:2.7rem;
				padding-left:10px;
				overflow:hidden;
				&.relative{
		 		   background:url(/static/icon/4/nqj.9.png) no-repeat 98% center;
				   background-size:14px;
				}
			}
    	}
    	.first{
		    ul{
		     cursor:pointer;
		     width:100%;
		    }
		    ul li{
		     border-bottom:1px solid #eee;
		     height:60px;
		     line-height:60px;
		     padding:4px 10px;
		     overflow:hidden;
		     img.face{
		       width:50px;
		       height:50px;
		       border-radius:50%;
		       float:left;
		       vertical-align:middle;
		     }
		     .info{
		       font-size:16px;
		       line-height:24px;
		       margin-left:60px;
		       position:relative;
		       p.message{
		          color:#666;
		          font-size:12px;
		       }
		       img{
		          position:absolute;
		          top:50%;
		          transform:translateY(-50%) scale(0.6);
		          right:0;
		          display:none;
		          &.cur{
		            display:block
		          }
		       }
		     }
		    }
		    p.addAccont{
				line-height:50px;
				padding-left:14%;
				color:#1E90FF;
				border-top:1px solid #eee;
				border-bottom:1px solid #eee;
				background:url('/static/icon/4/idz.png') no-repeat 2% center;
				background-size:40px;
		        cursor:pointer;
        	}
    	}
    	.second{
    		.info{
    			background:#FFFDFD;
    			border-bottom:none;
    			color:#666;
    			font-size:14px;
    			margin-left:4px;
    		}
    	}
    	.fourth{
    	   margin-top:40px;
    	}
    	.third{
    	   .item{
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