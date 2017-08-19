import * as types from './mutation-types'

//根级别的state
export const state = {
	'loginStatus': JSON.parse(localStorage.getItem("loginStatus") || '{}'), //用户登录状态
	'userInfo': JSON.parse(localStorage.getItem("userInfo") || '{}'), //用户登录信息
	'accounts': JSON.parse(localStorage.getItem("accounts") || '[]') //登陆过的用户
}

//根级别的mutations
export const mutations = {
	//登录
	[types.SET_LOGIN](state, {loginStatus,userInfo}) {
		state.loginStatus = loginStatus
		state.userInfo = userInfo
		localStorage.setItem("loginStatus", JSON.stringify(state.loginStatus))
		localStorage.setItem("userInfo", JSON.stringify(state.userInfo))

		if (state.accounts.length == 0) {
			state.accounts.unshift(userInfo)
		}
		localStorage.setItem("accounts", JSON.stringify(state.accounts))
	},
	//登出
	[types.LOGOUT](state) {
		clear(state)
	},
	//更新登录状态
	[types.UPDATE_LOGIN_STATUS](state, status) {
		state.userInfo.status = status
		localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
	},
	//清空所有状态
	[types.RESET](state) {
		clear(state)
		state.accounts = [] //登录过的用户也清空
		localStorage.removeItem('accounts') //清空登录过的用户
	},
	//切换账号
	[types.CHANGE_USER](state, {loginStatus,userInfo}) {
		clear(state)
		state.loginStatus = loginStatus
		state.userInfo = userInfo
		localStorage.setItem("loginStatus", JSON.stringify(loginStatus))
		localStorage.setItem("userInfo", JSON.stringify(userInfo))
	},
	//添加账号
	[types.ADD_USER](state, {loginStatus,userInfo}) {
		clear(state)
		state.loginStatus = loginStatus
		state.userInfo = userInfo

		//设置登录过的用户
		const index=state.accounts.findIndex((item)=>{ 
			return item.id==userInfo.user_id
		})
		if(index==-1)   state.accounts.unshift(userInfo)

		localStorage.setItem("loginStatus", JSON.stringify(loginStatus))
		localStorage.setItem("userInfo", JSON.stringify(userInfo))
		localStorage.setItem("accounts", JSON.stringify(state.accounts))
	},
	//移除账号
	[types.REMOVE_ACCOUNT](state, id) {
		const index=state.accounts.findIndex((item)=>{ 
			return item.id==id
		})
		state.accounts.splice(index, 1)
		localStorage.setItem("accounts", JSON.stringify(state.accounts))
	}
}

function clear(state) {
	state.friend.hasGetFriendList = 0
	state.friend.hasGetNewFriends = 0

	state.sidebar = {
		'isShowSideBar': false,
		'isShowMask': false
	}
	state.warn = {
		'isShow': false,
		'message': ''
	}
	state.loginStatus = {}
	state.userInfo = {}

	//注意不能清空accounts,即登录过的用户
	localStorage.removeItem("loginStatus")
	localStorage.removeItem("userInfo")
}