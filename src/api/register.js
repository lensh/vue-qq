import encrypt from '@/common/js/encrypt'
import {
	request_post
} from '@/common/js/request'

//发送验证码到用户的手机
export function sendMessage(data) {
	const url = '/api/register/phone'
	return request_post(url, data)
}

//验证用户填写的验证码
export function validate(data) {
	const url = '/api/register/code'
	return request_post(url, data)
}

//注册
export function register(data) {
	const url = '/api/register/register'
	return request_post(url, data)
}

//注册后首次登陆
export function login(data) {
	const url = '/api/register/login'
	return request_post(url, data)
}