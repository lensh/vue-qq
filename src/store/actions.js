import * as types from './mutation-types'

//登录
export const setLogin = ({commit}, data) => {  //设置登录
	commit(types.SET_LOGIN, data)
}
