import {
	request_get,
	request_post,
	request_put
} from '@/common/js/request'

const API_CONFIG = '/api/chat'

/**
 * [get_message 获取用户的私聊消息]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @return {[type]}             [description]
 */
export const get_message = (userId, otherUserId) => {
	const url = `${API_CONFIG}/message/${userId}/${otherUserId}`
	return request_get(url)
}

/**
 * [update_enter_chat 按返回时要更新状态]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @return {[type]}             [description]
 */
export const update_enter_chat = (userId, otherUserId) => {
	const url = `${API_CONFIG}/update_enter_chat/${userId}/${otherUserId}`
	return request_put(url)
}

/**
 * [update_pingbi 屏蔽对方聊天]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @param  {[type]} status      [新的屏蔽状态]
 * @return {[type]}             [description]
 */
export const update_pingbi = (userId, otherUserId, status) => {
	const url = `${API_CONFIG}/update_pingbi/${userId}/${otherUserId}/${status}`
	return request_put(url)
}

/**
 * [update_special 更新特别关心状态]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @param  {[type]} status      [新的状态]
 * @return {[type]}             [description]
 */
export const update_special = (userId, otherUserId, status) => {
	const url = `${API_CONFIG}/update_special/${userId}/${otherUserId}/${status}`
	return request_put(url)
}

/**
 * [send_message 发送消息]
 * @param  {[type]} data [数据]
 * @return {[type]}      [description]
 */
export const send_message = (data) => {
	const url = `${API_CONFIG}/sendmessage`
	return request_post(url, data)
}

/**
 * [get_userinfo 得到用户的基本信息,聊天设置里用]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @return {[type]}             [description]
 */
export const get_userinfo = (userId, otherUserId) => {
	const url = `${API_CONFIG}/userinfo/${userId}/${otherUserId}`
	return request_get(url)
}