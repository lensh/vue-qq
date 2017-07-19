import query from '../../common/mysql/db'

export default class Friend {

	/**
	 * [getAllMessage 获取某个用户的所有好友和群]
	 * @param  {[type]} userId [description]
	 * @return {[type]}        [description]
	 */
	static async getFriendGroup(userId) {
		//先获取好友
		const friend = await this.getFriend(userId)
		//再获取群
		const group = await this.getGroup(userId)

		return {
			code: 1,
			data: {
				friend,
				group
			}
		}
	}

	/**
	 * [getFriend 获取好友]
	 * @param  {[type]} userId [用户的id]
	 * @return {[type]}        [description]
	 */
	static async getFriend(userId) {
		// 数据结构：
		// id:5,   
		// name:'马哲涵', 
		// special:1,  
		// face:'/static/user/face/4.jpg',
		// sign:'哈哈,今天特别开心',  
		// vip:0, 
		// status:0,  
		// fenzu:'晓风残月'
		const sql1 = `
		    SELECT a.other_user_id AS id, a.beizhu AS name, a.special, 
			b.face, b.signature AS sign, c.vip_type as vip, d.device AS status
			FROM friend a
			JOIN user_detail b ON a.user_id =?
			AND b.user_id = a.other_user_id
			LEFT JOIN vip c ON c.user_id = a.other_user_id
			LEFT JOIN user d ON d.id = a.other_user_id
		`

		//没有包含分组的数据
		const res1 = await query(sql1, [userId]).catch((err) => {
			console.log(err)
		})

		const sql2 = 'SELECT zu_name,zu_member from fenzu where user_id= ?'

		//包含了分组的数据
		const res2 = await query(sql2, [userId]).catch((err) => {
			console.log(err)
		})

		//将res1转换成包含分组的数据
		for (let [index, value] of res1.entries()) {
			if (value.special == 1) {
				res1[index]['fenzu'] = '特别关心'
				continue
			}
			for (let value2 of res2.values()) {
				let arr = value2.zu_member.split(',').map(item => item - 0)
				if (arr.includes(value.id)) {
					res1[index]['fenzu'] = value2.zu_name
					break
				}
			}
		}

		return res1
	}

	/**
	 * [getGroup 获取群]
	 * @param  {[type]} userId [用户的id]
	 * @return {[type]}        [description]
	 */
	static async getGroup(userId) {
		// 数据结构：
		// id:1,
		// role:0,
		// name:'英语四六级自动查询',
		// url:'/static/user/face/4.jpg'	    
		const sql = `
	        SELECT a.group_id AS id, a.role, 
			b.group_name AS name, b.group_avator AS url
			FROM group_user a
			JOIN groups b ON a.user_id =?
			AND b.id = a.group_id
		`

		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		return rows
	}

	/**
	 * [getNewFriends 获得新朋友的申请信息]
	 * @param  {[type]} userId [用户id]
	 * @return {[type]}        [description]
	 */
	static async getNewFriends(userId) {
		// 数据结构：
		// 1.别人加自己
		// id:1,
		// source:'来自：QQ群-JS讨论群',
		// apply_message:'大哥 想请教一个问题'
		// status:1   // 1 待处理  2 已同意 3 已拒绝 4 等待验证	
		// time:15000000,
		// face:'/static/user/face/4.jpg',
		// nick_name:'ThreeTree',
		// age:19,
		// sex:'男'
		// 2.自己加别人
		// id:5,
		// to_user:6
		// status:4,  // 1 待处理  2 已同意 3 已拒绝 4 等待验证
		// time:15000000,
		// info:'已发送验证消息',  // info根据status来动态改变
		// face:'/static/user/face/9.jpg',
		// nick_name:'阿里巴巴社招内推',

		// 别人加自己
		const sql1 = `
	        SELECT a.id,a.source, a.apply_message, a.status, a.time, 
	        b.face, b.nick_name, b.age, b.sex
			FROM friend_apply a
			JOIN user_detail b ON a.to_user = ?
			AND b.user_id = a.from_user
		`
		const res1 = await query(sql1, [userId]).catch((err) => {
			console.log(err)
		})

		// 自己加别人
		const sql2 = `
			SELECT a.id,a.to_user,a.status, a.time, b.face, b.nick_name
			FROM friend_apply a
			JOIN user_detail b ON a.from_user = ?
			AND b.user_id = a.to_user
		`
		const res2 = await query(sql2, [userId]).catch((err) => {
			console.log(err)
		})
		for (let [index, value] of res2.entries()) {
			const info = value.status == 4 ? '已发送验证消息' : value.status == 2 ?
				'对方已同意' : '对方已拒绝'
			res2[index]['info'] = info
		}

		//合并并排序
		const res = res1.concat(res2).sort((prev, current) => {
			return prev.time < current.time
		})

		return {
			code: 1,
			data: res
		}
	}

	/**
	 * [getApplyDetail 好友申请详情]
	 * @param  {[type]} applyId [申请ID]
	 * @return {[type]}         [description]
	 */
	static async getApplyDetail(applyId) {
		// 数据结构：
		// apply_message:'大哥,想请教一个问题',
		// source:'QQ群-JS讨论群',
		// status:1   //1为还未处理,2为已同意,3为已拒绝
		// face:'/static/user/face/4.jpg',
		// nick_name:'ThreeTree',
		// sex:'男',
		// place:'深圳',
		// age:'19'
		const sql = `
    		SELECT a.apply_message,a.source, a.status, 
    		b.face, b.nick_name,b.sex, b.place, b.age
			FROM friend_apply a
			JOIN user_detail b ON a.id =?
			AND b.user_id = a.from_user
		`
		const row = await query(sql, [applyId]).catch((err) => {
			console.log(err)
		})
		return {
			code: 1,
			data: row[0]
		}
	}
    
    /**
     * [rejectApply 拒绝申请]
     * @param  {[type]} applyId [申请ID]
     * @return {[type]}         [description]
     */
	static async rejectApply(applyId) {
		const sql = 'update friend_apply set status=3 where id=? limit 1'
		const res = await query(sql, [applyId]).catch((err) => {
			console.log(err)
		})
		console.log(res)
		return res.affectedRows==1 ? {
			code: 1
		} : {
			code: 0
		}
	}

	/**
     * [agreeApply 同意申请]
     * @param  {[type]} applyId [申请ID]
     * @return {[type]}         [description]
     */
	static async agreeApply(applyId) {
		let sql = 'update friend_apply set status=2 where id=? limit 1'
		const res = await query(sql, [applyId]).catch((err) => {
			console.log(err)
		})
		console.log(res)
		return res.affectedRows == 1 ? {
			code: 1
		} : {
			code: 0
		}
	}    

    /**
     * [settingFriend 获取所有分组和添加方的昵称]
     * @param  {[type]} applyId [申请ID]
     * @return {[type]}         [description]
     */
	static async getFenzu(applyId){
		//先获取默认分组和添加方的昵称
		const sql=`
			SELECT a.to_user as user_id,b.user_id as apply_user_id,b.nick_name,c.zu_name
			FROM friend_apply a
			JOIN user_detail b ON a.id =?
			AND b.user_id = a.from_user
			JOIN fenzu c ON c.user_id = a.to_user
			AND c.is_default =1
		`
		const row = await query(sql, [applyId]).catch((err) => {
			console.log(err)
		})
        
        //再获取所有分组
        const sql1=`
			SELECT b.zu_name
			FROM friend_apply a
			JOIN fenzu b ON a.id =?
			AND b.user_id = a.to_user
        `
        const row1 = await query(sql1, [applyId]).catch((err) => {
			console.log(err)
		})
		return {
			code:1,
			data:{
				remark:row[0].nick_name,
				defaulGroup:row[0].zu_name,
				groups:row1
			}
		}
	}

	static async addFriend(){
		
	}
}