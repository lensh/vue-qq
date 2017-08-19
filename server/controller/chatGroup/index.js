export default class chatGroup {

	/**
	 * [getMessage 获取用户的群聊消息]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} groupId 	[群id]
	 * @return {[type]}             [description]
	 */
	static async getMessage(userId, groupId) {
		//先把group_user表的unread置0, is_enter置1
		let sql='UPDATE group_user SET unread=0,is_enter=1 WHERE user_id = ? AND group_id = ?'
		await query(sql, [userId, groupId])

		//查找消息
		sql=`
			SELECT a.from_user, a.message, a.time, b.face, c.nick_name
			FROM message_group a, user_detail b, group_user c
			WHERE a.to_group = ? AND b.user_id = a.from_user
			AND c.group_id = a.to_group AND c.user_id = a.from_user
			ORDER BY TIME ASC
		`
		const message = await query(sql, [groupId])

		//获取群信息和自己的群昵称
		sql=`
			SELECT a.id, a.group_name,a.group_avator,b.nick_name 
			FROM groups a, group_user b
			WHERE a.id =? AND b.user_id =? AND b.group_id =a.id LIMIT 1
		`
		const info = await query(sql, [groupId,userId])
        
        //查找其它群成员的id（socket判断时会用到）
		sql='select user_id from group_user where group_id=? and user_id!=?'
		const groupMember = await query(sql, [groupId,userId])
		let groupMemberids=[]
		for(let value of groupMember.values()){
			groupMemberids.push(value.user_id)
		}

		return {
			code: 1,
			data: {
				message,
				info:info[0],
				groupMember:groupMemberids
			}
		}
	}

	/**
	 * [updateEnterChat 返回时要更新状态]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} groupId     [群id]
	 * @return {[type]}             [description]
	 */
	static async updateEnterChat(userId, groupId) {
		const sql = 'UPDATE group_user SET is_enter=0 WHERE user_id = ? AND group_id = ?'
		const res = await query(sql, [userId, groupId])
		return res.affectedRows==1? {code:1}:{code:0}
	}

    /**
     * [sendMessage 发送消息]
     * @param  {[type]} userId      [用户id]
     * @param  {[type]} groupId     [群id]
     * @param  {[type]} message     [消息]
     * @param  {[type]} nick_name   [昵称] 
     * @param  {[type]} time    	[时间]
     * @return {[type]}             [description]
     */
	static async sendMessage(userId, groupId, message, nick_name,time) {
		const data = {
			from_user: userId,
			to_group: groupId,
			message:`${nick_name}:${message}`,  //群消息是这样的格式，即 群昵称:消息
			time
		}
		let sql = 'insert into message_group set ? '
		const res = await query(sql, [data]).catch((err) => {
			console.log(err)
		})

		//更新未读消息条数
	    sql=`
			UPDATE group_user SET unread = CASE 
			WHEN is_enter =1 THEN 0 
			WHEN is_enter =0 THEN unread +1 END 
			WHERE group_id =?
	    `
        query(sql, [groupId]).catch((err) => {
			console.log(err)
		})
		
		return res.affectedRows==1? {code:1}:{code:0}
	}
}