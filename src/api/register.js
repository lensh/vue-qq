import encrypt from '@/common/js/encrypt'
import {
	request_post
} from '@/common/js/request'

const API_CONFIG = '/api/register'

/**
 * [发送验证码到用户的手机]
 * @param  {[type]} data [数据]
 * @return {[type]}      [description]
 */
export const sendMessage = (data) => {
	const url = `${API_CONFIG}/phone`
	return request_post(url, data)
}

/**
 * [验证用户填写的验证码
 * @param  {[type]} data [数据]
 * @return {[type]}      [description]
 */
export const validate = (data) => {
	const url = `${API_CONFIG}/code`
	return request_post(url, data)
}

/**
 * [注册]
 * @param  {[type]} data [数据]
 * @return {[type]}      [description]
 */
export const register = (data) => {
	const url = `${API_CONFIG}/register`
	return request_post(url, data)
}