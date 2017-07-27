import {
	request_get,
	request_post,
	request_put
} from '@/common/js/request'

const API_CONFIG = '/api/chatgroup'

/**
 * [get_message 获取用户的群聊消息]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [群id]
 * @return {[type]}             [description]
 */
export const get_message = (userId, groupId) => {
	const url = `${API_CONFIG}/message/${userId}/${groupId}`
	return request_get(url)
}

/**
 * [update_enter_chat 按返回时要更新状态]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [群id]
 * @return {[type]}             [description]
 */
export const update_enter_chat = (userId, groupId) => {
	const url = `${API_CONFIG}/update_enter_chat/${userId}/${groupId}`
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