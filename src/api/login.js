import encrypt from '@/common/js/encrypt'
import {
	request_get
} from '@/common/js/request'

/**
 * [checkLogin 验证登录]
 * @param  {[type]} options.user [description]
 * @param  {[type]} options.pwd  [description]
 * @return {[type]}              [description]
 */
export function checkLogin({user,pwd}) {
	pwd = encrypt(pwd)    //加密登录
	const url = `/api/login/${user}/${pwd}`

	return request_get(url)
}