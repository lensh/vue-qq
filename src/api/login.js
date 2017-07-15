import encrypt from '@/common/js/encrypt'
import {
	request_post
} from '@/common/js/request'

//验证登陆
export function checkLogin(data) {
	const url = '/api/login'
		//加密登录
	data.pwd = encrypt(data.pwd)

	return request_post(url, data)
}