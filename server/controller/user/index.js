export default class User {

	/**
	 * [logout 登出]
	 * @param  {[type]} userId [用户id]
	 * @return {[type]}         [description]
	 */
	static async logout(userId) {
		const sql = 'update user set status=0,device=0 where id=? limit 1'
		const res = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		return res.affectedRows == 1 ? {
			code: 1
		} : {
			code: 0
		}
	}
    
    /**
     * [changeStatus 切换用户的登录状态]
     * @param  {[type]} userId [用户ID]
     * @param  {[type]} status [状态值]
     * @return {[type]}        [description]
     */
	static async changeStatus(userId,status){
		const sql = 'update user set status=? where id=? limit 1'
		const res = await query(sql, [status,userId]).catch((err) => {
			console.log(err)
		})
		return res.affectedRows == 1 ? {
			code: 1
		} : {
			code: 0
		}
	}
    
    /**
     * [changeUser 切换用户]
     * @param  {[type]} currentUserId [当前用户id]
     * @param  {[type]} userId        [新用户的id]
     * @return {[type]}               [description]
     */
	static async changeUser(currentUserId,userId){
		//更改原来用户的登录状态
		let sql = 'update user set status=0,device=0 where id=? limit 1'
		await query(sql, [currentUserId]).catch((err) => {
			console.log(err)
		})

		//更改新用户的登录状态
		const update = {
			last_login: Date.parse(new Date()) / 1000,
			status: 1,
			device: ~~(Math.random() * 4 + 1)  //设备状态暂时取随机数 [1~5]
		}
	    sql = `update user set ? where id = ? `
		await query(sql, [update,userId]).catch((err) => {
			console.log(err)
		})
		    
        //获取新用户的信息
		sql = `
			select a.*,b.phone,b.status,b.qq from user_detail a 
			join user b on a.user_id = ?
			and b.id=a.user_id
        `
		const row = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})

		//要返回的数据
		let loginStatus={
			isLogin:1,
			type:'qq',
			userId,
			value:row[0].qq
		}
		let userInfo = row[0]
        
        //返回信息
		return {
			"code": 1,
			"message": "登陆成功",
			"data": {
				loginStatus,
				userInfo
			}
		}
	}
}