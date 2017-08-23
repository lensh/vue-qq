// socket具体业务逻辑
export default class socketHander {
	
	/**
	 * [saveUserSocketId 保存用户的id和socketid]
	 * @param  {[type]} userId   [用户id]
	 * @param  {[type]} socketId [用户的socketid]
	 * @return {[type]}          [description]
	 */
	static async saveUserSocketId(userId, socketId) {
		const sql='update user set socketid=? where id=? limit 1 '
		await query(sql,[socketId,userId])
	}

	/**
	 * [getUserSocketId 获取指定用户的socketid]
	 * @param  {[type]} toUserId [指定用户的id]
	 * @return {[type]}          [description]
	 */
	static async getUserSocketId(toUserId) {
		const sql='select socketid from user where id=? limit 1 '
		const row= await query(sql,[toUserId])
		return row[0].socketid
	}
    
    /**
     * [changeUser 用户切换账号]
     * @param  {[type]} currentUserId [原来的用户ID]
     * @param  {[type]} userId        [新用户id]
     * @param  {[type]} socketId      [新用户的socket]
     * @return {[type]}               [description]
     */
	static async changeUser(currentUserId,userId,socketId){
		let sql="update user set socketid='' where id=? limit 1"
		await query(sql,[currentUserId])
		
		sql='update user set socketid=? where id=? limit 1 '
		await query(sql,[socketId,userId])
	}
}