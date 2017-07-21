import encrypt from '@/common/js/encrypt'
import {
	request_post
} from '@/common/js/request'

const API_CONFIG='/api/register'

//发送验证码到用户的手机
export function sendMessage(data) {
	const url = `${API_CONFIG}/phone`
	return request_post(url, data)
}

//验证用户填写的验证码
export function validate(data) {
	const url = `${API_CONFIG}/code`
	return request_post(url, data)
}

//注册
export function register(data) {
	const url = `${API_CONFIG}/register`
	return request_post(url, data)
}

//注册后首次登陆
export function login(data) {
	const url = `${API_CONFIG}/login`
	return request_post(url, data)
}