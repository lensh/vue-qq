<template>
	<div class="wrapper">
		<div class="search">
			<div class="search_input">
				<input type="text" class="text" placeholder="QQ号/手机号/群/公众号"
					v-model="search">	
				<img src="./icon/cross.png" class="clear"@click="clear" v-show="search!=''">
				<span class="btn" @click="$router.back()">取消</span>
			</div>
			<div class="search_choose" v-show="!hasSearch&&search!=''">
				<ul>
					<li class="first" @click="findPeople">找人：{{search}}</li>
					<li class="second">找群：{{search}}</li>
					<li class="third">找公众号：{{search}}</li>
				</ul>
			</div>
			<div class="search_result" v-show="hasSearch">	
				<p v-show="!hasResult" class="no_result">没有找到相关结果</p>
				<VScroll :data="dataList" v-show="hasResult&&hasManyResult"
				 component="searchFriend">
					<ul>
						<li v-for="item in dataList"
							@click="$router.push(`/profile/${item.id}`)">
						    <img :src="item.face" class="user">
		                    <div class="info">
		                          <p class="name">{{search}}<span>({{item.qq}})</span></p>
		                          <p class="intro">
		                             <span :class="{'man':item.sex=='男',
		                             'woman':item.sex=='女'}">
		                             {{item.age}}</span>  {{item.place}}
		                          </p>
		                    </div>
						</li>
					</ul>
				</VScroll>
			</div>
		</div>	
	</div>
</template>

<script>
import {search_friend} from '@/api/friend'
import VScroll from '@/base/Scroll/Scroll'

export default {
  name: 'friendSearch',
  data(){
    return {
      	vuegConfig: {
            forwardAnim: 'fadeInUp',
            duration:0.5
        },
        search:'',  //要搜索的内容
        hasSearch:false,  //是否已经查找了
        hasResult:false,  //查找后是否有结果
        hasManyResult:false,  // 查找后是否有很多匹配项
        dataList:[]
    }
  },
  components:{
  	VScroll
  },
  methods:{
  	clear(){
  		this.search=''
  	},
  	async findPeople(){
  		this.hasSearch=true  //设置为已经查找过了

  		const {data}=await search_friend(this.search)
  		if(data.users.length==0){  //没有记录
  			this.hasResult=false
  			return
  		}

  		//查询到了有记录
  		this.hasResult=true
  		if(data.users.length==1){  //查询到一条
  			if(data.type=='exact'){  //而且是精确查询
  				const id=(data.users)[0].id
  				this.$router.push(`/profile/${id}`)  //跳转到个性名片页面
  			}else{  //而且是模糊查询
  				this.hasManyResult=true
  				this.dataList=data.users
  			}
  			return
  		}

  		//查询到多条记录
  		this.hasManyResult=true
  		this.dataList=data.users
  	}
  },
  watch:{
  	search(){
  		this.hasSearch=false
  		this.hasResult=false
  		this.hasManyResult=false
  		this.dataList=[]
  	}
  }
}
</script>

<style scoped lang="scss" type="text/css">
.wrapper{
	background:#FFFDFD;
}
.search{
	height:40px;
	line-height:40px;
	background:#fff;
	.search_input{
		overflow:hidden;
		margin:2px 0 0 6px;
		display:flex;
		position:relative;
		input{
		    border:none;
		    height:30px;
		    line-height:30px;
		    padding-left:40px;
		    flex:12;
		    background:#FFFDFD url(./icon/okh.png) no-repeat 6% center;
		    background-size:16px;
		    border-radius:6px;
		    margin-top:4px;
		    font-size:14px;
		    font-family:'Microsoft Yahei'
	  	}
	  	span.btn{
	  		color:#9cf;
	  		flex:2;
	  		cursor:pointer;
	  		text-align:center;
	  	}
	  	img.clear{
	  		position:absolute;
	  		top:10px;
	  		width:20px;
	  		height:20px;
	  		right:62px;
	  		cursor:pointer;
	  	}
	}
	.search_choose{
		background:#fff;
		ul{
			display:block;
			li{
				cursor:pointer;
				border-bottom:1px solid #eee;
				padding-left:13%;
				&.first{
					background:url(./icon/nwg.png) no-repeat 4% center;
					background-size:30px;
				}
				&.second{
					background:url(./icon/ouk.png) no-repeat 4% center;
					background-size:30px;
				}
				&.third{
					background:url(./icon/oug.png) no-repeat 4% center;
					background-size:30px;
				}
			}
		}
	}
	.search_result{
		p.no_result{
			margin-top:100px;
			width:100%;
			color:#666;
			text-align:center;
		}
		ul{
	   		width:100%;
	   		border-top:1px solid #eee;
	   		li{   
		        border-bottom:1px solid #eee;
		        height:60px;
		        line-height:60px;
		        padding:0 10px;  
		        overflow:hidden;
		        img.user{
		            width:34px;
		            height:34px;
		            border-radius:50%;
		            float:left;
		            margin-left:2%;
		            margin-top:13px 
		        }
  				.info{
		            font-size:16px;
		            margin-left:14%;       
		            p{
			            position:relative;
			            top:7px;
			            &.name{
			              line-height:22px;
			              font-size:16px;
			              color:#9cf;
			              span{
			              	color:#666
			              }         
			            }
			            &.intro{
			              color:#666;
			              font-size:14px;
			              height:20px;
			              line-height:20px;
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
		            }
      			}
	        }
	    }
	}
}
</style>