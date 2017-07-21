import * as types from '../mutation-types'

// init state
const state = {
	'loginStatus': JSON.parse(localStorage.getItem("loginStatus") || '{}'), //当前登录用户的状态
	'userInfo': JSON.parse(localStorage.getItem("userInfo") || '{}'), //当前登录用户的信息
	'accounts': JSON.parse(localStorage.getItem("accounts")) || {
			ids: [],
			userInfo: []
		} //登录过的用户
}

// mutations
const mutations = {
	[types.SET_LOGIN](state, {loginStatus,userInfo}) {
		state.loginStatus = loginStatus
		state.userInfo = userInfo

		//设置登录过的用户
		console.log(state.accounts.ids.includes(userInfo))
		if (!state.accounts.ids.includes(userInfo.user_id)) {
			state.accounts.ids.push(userInfo.user_id)
			state.accounts.userInfo.push(userInfo)
		}

		localStorage.setItem("loginStatus", JSON.stringify(state.loginStatus))
		localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
		localStorage.setItem("accounts", JSON.stringify(state.accounts))
	},
	[types.REMOVE_ACCOUNT](state, id) {
		let indexOfAccount
		for (let [index, value] of state.accounts.userInfo.entries()) {
			if (value.id == id) {
				indexOfAccount = index
				break
			}
		}
		state.accounts.ids.splice(indexOfAccount, 1)
		state.accounts.userInfo.splice(indexOfAccount, 1)
		localStorage.setItem("accounts", JSON.stringify(state.accounts))
	},
	[types.UPDATE_LOGIN_STATUS](state, status) {
		state.userInfo.status = status
		localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
	}
}

export default {
	state,
	mutations
}