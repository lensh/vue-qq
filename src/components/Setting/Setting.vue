<template>
    <!--  设置 -->
	<div class="wrapper">
	  <div class="header">
	    <div class="item left" @click="$router.back()">返回</div>
	    <div class="item center">设置</div>
	  </div>
	  <VScroll component="setting">
	  <div class="Sysconfig">
          <div class="first">
          	  <p class="item" @click="$router.push('/accont_set')">账号管理
          	     <span class="face">
          	     	<img :src="dataList.face">
          	     </span>
          	  </p>
          	  <p class="item">手机号码<span class="phone">{{formatPhone}}</span></p>
          	  <p class="item">QQ达人
          	    <span class="da"><img src="./icon/poa.png">{{dataList.time}}天</span></p>
          </div>
          <div class="second">
          	  <p class="item">消息通知</p>
          	  <p class="item">聊天记录</p>
          	  <p class="item">空间清理</p>
          </div>
          <div class="third">
          	  <p class="item">账号、设备安全</p>
          	  <p class="item">联系人、隐私</p>
          	  <p class="item">辅助功能</p>
          </div>
          <div class="fourth">
          	  <p class="item">关于QQ与帮助</p>
          </div>
	  </div>
	  </VScroll>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import VScroll from '@/base/Scroll/Scroll'

export default {
  name: 'Sysconfig',
  computed:{
  	...mapGetters([
    	'userInfo'
  	]),
  	dataList(){
  		return {
	 		face:this.userInfo.face,
       	 	phone:this.userInfo.phone,
       	 	time:this.userInfo.login_day
  		}
  	},
  	formatPhone(){
  		return `${this.dataList.phone.substring(0,3)}******
  			${this.dataList.phone.substring(9,11)}`
  	}
  },
  components:{
    VScroll
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
    .Sysconfig{
    	.first,.second,.third,.fourth{
			background:white;
			margin-top:20px;
			border-top:1px solid #eee;
			.item{
				 border-bottom:1px solid #eee;
				 height:2.7rem;
				 line-height:2.7rem;
				 padding-left:10px;
				 background:url(./icon/nqj.9.png) no-repeat 98% center;
				 background-size:14px;
				 overflow:hidden;
				 span{
					float:right;
					margin-right:26px;
					font-size:14px;
					&.face{
					   img{
					   	 width:2.4rem;
					   	 height:2.4rem;
					   	 margin-top:0.15rem;
					   	 border-radius:50%
					   }
					}
					&.phone{
						color:#666;
					}
					&.da{
						color:orange;
						img{
							width:62.6px;
							height:24px;
							position:relative;
							top:4px;
							margin-right:6px
						}
					}
				 }
			}
    	}
    	.fourth{
    		margin-top:40px;
    	}
    }
}
</style>