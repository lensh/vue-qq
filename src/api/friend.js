import {
	request_get
} from '@/common/js/request'

/**
 * [getAllMessage 获取某个用户的好友和群]
 * @param  {[type]} userId [用户id]
 * @return {[type]}        [消息]
 */
export function get_friend_list(userId) {
	const url = `/api/friend/list/${userId}`
	return request_get(url)
}