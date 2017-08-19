export default class Chat {

	/**
	 * [getMessage 获取用户的私聊消息]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
	 * @return {[type]}             [description]
	 */
	static async getMessage(userId, otherUserId) {
		//先把chat表的is_enter_chat置为1,把message_user表的is_read置为1，
		let sql='UPDATE chat SET is_enter_chat =1 WHERE user_id = ? AND other_user_id = ?'
		await query(sql, [userId, otherUserId])

		sql='UPDATE message_user SET is_read =1 WHERE to_user = ? AND from_user = ? AND is_read =0'
		await query(sql, [userId, otherUserId])

		//最后获取消息
		sql = `
			SELECT a.from_user, a.to_user, a.message, a.time, b.face 
			FROM message_user a, user_detail b
			WHERE (
			a.to_user =?
			AND a.from_user =?
			OR a.from_user =?
			AND a.to_user =?
			)
			AND b.user_id = a.from_user ORDER BY TIME ASC
		`
		const message = await query(sql, [userId,otherUserId,userId,otherUserId])
        
        //用户信息
		sql=`SELECT a.device,b.beizhu,c.face FROM user a, friend b,user_detail c
			WHERE a.id=? AND b.user_id = ? AND b.other_user_id = a.id 
			AND c.user_id=a.id limit 1
		`
		const info = await query(sql, [otherUserId,userId])
        
        //别人对自己的备注（socket时会用到）
		sql='SELECT beizhu from friend WHERE user_id = ? AND other_user_id = ? limit 1 '
		const info1 = await query(sql, [otherUserId,userId])

		return {
			code: 1,
			data: {
				message,
				info:info[0],
				info1:info1[0]
			}
		}
	}

	/**
	 * [updateEnterChat 返回时要更新状态]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
	 * @return {[type]}             [description]
	 */
	static async updateEnterChat(userId, otherUserId) {
		const sql = 'UPDATE chat SET is_enter_chat =0 WHERE user_id = ? AND other_user_id = ? '
		const res = await query(sql, [userId, otherUserId])
		return res.affectedRows==1? {code:1}:{code:0}
	}

	/**
	 * [updatePingbi 屏蔽对方聊天]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
	 * @param  {[type]} status      [状态]
	 * @return {[type]}             [description]
	 */
	static async updatePingbi(userId, otherUserId, status) {
		const sql = 'UPDATE chat SET is_pingbi =? WHERE user_id = ? AND other_user_id = ?'
		const res=await query(sql, [status, userId, otherUserId])
        return res.affectedRows==1? {code:1}:{code:0}
	}

	/**
	 * [updateSpecial 更新特别关心状态]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
	 * @param  {[type]} status      [状态]
	 * @return {[type]}             [description]
	 */
	static async updateSpecial(userId, otherUserId, status) {
		/***更改好友表***/
		let sql = 'UPDATE friend SET special =?WHERE user_id = ? AND other_user_id = ?'
		await query(sql, [status, userId, otherUserId])

		/***更改分组表***/
		
		//更改特别关心分组
		sql="select zu_member from fenzu where user_id=? and zu_name='特别关心' limit 1"
		let row= await query(sql, [userId])
		let zu_member=row[0].zu_member.split(',').map(item=>item-0)
		let index=zu_member.findIndex((item)=>{
			return item==otherUserId
		})
		if(status==0){  //取关
			index!=-1 && zu_member.splice(index,1) //特别关心分组里移除该用户
		}else{  //设关
			index==-1 && zu_member.push(otherUserId) //特别关心分组里添加该用户
		}
		zu_member = zu_member.join(',')
		sql="update fenzu set zu_member=? where user_id=? and zu_name='特别关心' limit 1"
		await query(sql, [zu_member,userId])

		//更改默认分组
	    sql="select zu_member from fenzu where user_id=? and is_default=1 limit 1"
		row= await query(sql, [userId])
		zu_member=row[0].zu_member.split(',').map(item=>item-0)
		index=zu_member.findIndex((item)=>{
			return item==otherUserId
		})
	    if(status==1){   //设关
			index!=-1 && zu_member.splice(index,1) //默认分组里移除该用户
		}else{   //取关
			index==-1 && zu_member.push(otherUserId) //默认分组里添加该用户
		}
		zu_member = zu_member.join(',')
		sql="update fenzu set zu_member=? where user_id=? and is_default=1 limit 1"
		const res = await query(sql, [zu_member,userId])
        return res.affectedRows==1? {code:1}:{code:0}
	}

	/**
	 * [getStatus 得到聊天状态]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
	 * @return {[type]}             [description]
	 */
	static async getStatus(userId, otherUserId) {
		const sql = 'select is_pingbi,is_enter_chat from chat where user_id = ? AND other_user_id = ? limit 1'
		const row = await query(sql, [userId, otherUserId])
		return row[0] 
	}
    
    /**
     * [sendMessage 发送消息]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
     * @param  {[type]} message     [消息]
     * @param  {[type]} time     	[时间]
     * @return {[type]}             [description]
     */
	static async sendMessage(userId, otherUserId, message, time) {
		//先查一下状态
		const {is_pingbi,is_enter_chat} = await this.getStatus(otherUserId, userId)
		if (is_pingbi == 1) {
			return {
				code: 0,
				message: '对方已屏蔽你的消息'
			}
		}
		const data = {
			from_user: userId,
			to_user: otherUserId,
			message,
			time,
			is_read: is_enter_chat
		}
		const sql = 'insert into message_user set ? '
		const res = await query(sql, [data]).catch((err) => {
			console.log(err)
		})
		return res.affectedRows > 0 ? {
			code: 1,
			message:'发送成功'
		} : {
			code: 0,
			message:'发送失败'
		}
	}
    
  	/**
  	 * [getUserInfo 得到用户的基本信息,聊天设置里用]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} otherUserId [另一个用户id]
  	 * @return {[type]}             [description]
  	 */
    static async getUserInfo(userId,otherUserId){
		const sql = `
			SELECT a.user_id, a.other_user_id, a.is_pingbi, 
			b.face, b.sex, b.age, b.place, c.special, c.beizhu
			FROM chat a
			JOIN user_detail b ON a.user_id =?
			AND a.other_user_id =?
			AND b.user_id = a.other_user_id
			JOIN friend c ON c.user_id = a.user_id
			AND c.other_user_id = a.other_user_id
		`
		const row = await query(sql, [userId, otherUserId])

		return {
			code: 1,
			data: row[0]
		}
    }
}