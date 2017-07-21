import * as types from './mutation-types'

export default {
	//清空所有状态
	[types.RESET](state) {
		clear(state)
		state.login.accounts = {}  //登录过的用户也清空

		localStorage.removeItem('accounts')  //清空登录过的用户
	},
	//登出
	[types.LOGOUT](state,status){
		clear(state)
	},
	//切换用户
    [types.CHANGE_USER](state,{loginStatus,userInfo}){
    	clear(state)
    	state.login.loginStatus=loginStatus
		state.login.userInfo=userInfo

		localStorage.setItem("loginStatus", JSON.stringify(loginStatus))
		localStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
}

function clear(state){
	//以下三项只需把标志初始化为0即可
	state.friend.hasGetFriendList=0
	state.friend.hasGetNewFriends=0
	state.message.hasGetAllMessage=0 

	state.sidebar = {
		'isShowSideBar': false,
		'isInit': true,
		'isShowMask': false
	}
	state.warn = {
		'isShow': false,
		'message': ''
	}
	state.login.loginStatus={}
	state.login.userInfo={}

	//注意不能清空accounts,即登录过的用户
	localStorage.removeItem("loginStatus")
	localStorage.removeItem("userInfo")
}