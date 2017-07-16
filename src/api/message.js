import {
	request_get
} from '@/common/js/request'

/**]
 
 * [getAllMessage 获取某个用户的首页的所有消息 * @param  {[type]} userId [用户id]
 * @return {[type]}        [消息]
 */
export function get_all_message(userId) {
	const url = `/api/message/all/${userId}`
	return request_get(url)
}