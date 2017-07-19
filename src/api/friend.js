import {
	request_get,
	request_put,
	request_post
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

/**
 * [get_new_friends 获取某个用户的新朋友申请]
 * @return {[type]} [description]
 */
export function get_new_friends(userId) {
	const url = `/api/friend/newfriend/${userId}`
	return request_get(url)
}

/**
 * [get_apply_detail 获取好友申请详情]
 * @param  {[type]} applyId [description]
 * @return {[type]}         [description]
 */
export function get_apply_detail(applyId) {
	const url = `/api/friend/applydetail/${applyId}`
	return request_get(url)
}

/**
 * [resolve_friend_apply 处理好友申请]
 * @param  {[type]} type    [同意还是拒绝]
 * @param  {[type]} applyId [申请ID]
 * @return {[type]}         [description]
 */
export function resolve_friend_apply(type, applyId) {
	let resolve = type == 1 ? 'agree' : 'reject'
	const url = `/api/friend/${resolve}/${applyId}`
	return request_put(url)
}

/**
 * [get_fenzu 获取所有分组和好友昵称]
 * @param  {[type]} applyId [申请ID]
 * @return {[type]}         [description]
 */
export function get_fenzu(applyId) {
	const url = `/api/friend/getfenzu/${applyId}`
	return request_get(url)
}

export function set_friend(){
	
}