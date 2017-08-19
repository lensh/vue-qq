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
			AND a.is_friend=1
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
			for (let value2 of res2.values()) {
				let arr = value2.zu_member.split(',').map(item => item - 0)
				if (arr.includes(value.id)) {
					res1[index]['fenzu'] = value2.zu_name
					break
				}
			}
		}

		return {
			allMember:res1,  //所有的成员
			fenzu:res2  //所有的分组
		}
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
		// to_user:2
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
		// status:1,  // 1 待处理  2 已同意 3 已拒绝
		// time:15000000,
		// face:'/static/user/face/9.jpg',
		// info:'已发送验证消息',  // info根据status来动态改变
		// nick_name:'阿里巴巴社招内推',

		// 别人加自己
		const sql1 = `
	        SELECT a.id,a.to_user,a.source, a.apply_message, a.status, a.time, 
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
			JOIN user_detail b ON a.from_user = ? and a.status!=2
			AND b.user_id = a.to_user
		`
		const res2 = await query(sql2, [userId]).catch((err) => {
			console.log(err)
		})
		for (let [index, value] of res2.entries()) {
			const info = value.status == 1 ? '已发送验证消息' : value.status == 3 ?
				'拒绝了你的好友申请' : ''
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
		// user_id:2,
		// face:'/static/user/face/4.jpg',
		// nick_name:'ThreeTree',
		// sex:'男',
		// place:'深圳',
		// age:'19'
		const sql = `
    		SELECT a.apply_message,a.source, a.status, 
    		b.user_id,b.face, b.nick_name,b.sex, b.place, b.age
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
		return res.affectedRows == 1 ? {
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
	static async getFenzu(applyId) {
		//先获取默认分组和添加方的昵称
		const sql = `
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
		const sql1 = `
			SELECT b.zu_name
			FROM friend_apply a
			JOIN fenzu b ON a.id =?
			AND b.user_id = a.to_user
        `
		const row1 = await query(sql1, [applyId]).catch((err) => {
			console.log(err)
		})
		return {
			code: 1,
			data: {
				userId: row[0].user_id,
				applyUserId: row[0].apply_user_id,
				beizhu: row[0].nick_name,
				defaulGroup: row[0].zu_name,
				groups: row1
			}
		}
	}

	/**
	 * [addFriend 添加好友,设置好友备注和分组]
	 * @param {[type]} req [description]
	 * @param {[type]} res [description]
	 */
	static async addFriend(req, res) {
		//好友表新增一条记录
		let data = {
			user_id: req.body.userId,
			other_user_id: req.body.applyUserId,
			special: 0,
			beizhu: req.body.beizhu,
			time: Date.parse(new Date()) / 1000
		}

		const {applyId} = req.body
		const sql = `select status from friend_apply where id=? limit 1`
		const row = await query(sql, [applyId]).catch((err) => {
			console.log(err)
		})
		// data的is_friend属性的值要看friend_apply表中的status字段来取值,
		// 如果为status为2(接收方同意了),则is_friend才为1，否则为0
		data.is_friend=row[0].status == 2 ? 1 : 0

		//往friend表新增记录
		const sql1 = `insert into friend set ?`
		const result = await query(sql1, data).catch((err) => {
			console.log(err)
		})

		//加到指定分组里
		if (result.affectedRows == 1) {
			const {userId,zuName,applyUserId} = req.body

			//取出组员id
			const sql2 ='select zu_member from fenzu where user_id=? and zu_name=? limit 1'
			const row2 = await query(sql2, [userId, zuName]).catch((err) => {
				console.log(err)
			})
			let zu_member = row2[0].zu_member.split(',').map(item => item - 0)

		    if(!zu_member.includes(applyUserId)){
				zu_member.push(applyUserId)
			}
			zu_member = zu_member.join(',')

			//更新组员id
			const data = {
				zu_member: zu_member
			}
			const sql3 = 'update fenzu set ? where user_id=? and zu_name=?'
			const row3 = await query(sql3, [data, userId, zuName]).catch((err) => {
				console.log(err)
			})

			return row3.affectedRows == 1? {code:1} :{code:0}
		}
	}
    
	/**
	 * [deleteFriend 删除好友]
	 * @param  {[type]} userId      [用户ID]
	 * @param  {[type]} otherUserId [另一个用户的id]
	 * @return {[type]}             [description]
	 */
	static async deleteFriend(userId,otherUserId){
		let sql=`
			delete from friend where (user_id=? and other_user_id=?)
			or (other_user_id=? and user_id=?)
		`
		const res = await query(sql, [userId,otherUserId,userId,otherUserId])
		  .catch((err) => {
			console.log(err)
		})

		sql=`
			delete from chat where (user_id=? and other_user_id=?)
			or (other_user_id=? and user_id=?)
		`
		const res1 = await query(sql, [userId,otherUserId,userId,otherUserId])
		  .catch((err) => {
			console.log(err)
		})

		return res.affectedRows>0 && res1.affectedRows>0? {code:1}:{code:0}
	}
    
    /**
     * [searchFriend 搜索朋友]
     * @param  {[type]} user [qq号或者是昵称]
     * @return {[type]}      [description]
     */
	static async searchFriend(user){
		let sql1,sql2
		//要获取QQ号、头像、年龄、性别、昵称、地方
		if(/^[\d]+$/.test(user)){  //如果是qq号
			//先精确查询
			sql1=`
				select a.id,a.qq,b.face,b.age,b.sex,b.nick_name,b.place 
				from user a,user_detail b
				where a.qq=? and b.user_id=a.id limit 1
			`
			//再模糊查询
			sql2=`
				select a.id,a.qq,b.face,b.age,b.sex,b.nick_name,b.place 
				from user a,user_detail b
				where a.qq like '${user}%' and b.user_id=a.id
			`
	    }
	    else{
			//先精确查询
			sql1=`
				select a.id,a.qq,b.face,b.age,b.sex,b.nick_name,b.place 
				from user a,user_detail b
				where b.nick_name=? and b.user_id=a.id
			`
			//再模糊查询
			sql2=`
				select a.id,a.qq,b.face,b.age,b.sex,b.nick_name,b.place 
				from user a,user_detail b
				where b.nick_name like '${user}%' and b.user_id=a.id
			`
	    }
        
        //精确查询
		let rows = await query(sql1,[user]).catch((err)=>{
			console.log(err)
		})
		if(rows.length){ 
			return {
				code:1,
				data:{
					type:'exact',
					users:rows
				}
			}
		}
        
        //模糊查询
		rows= await query(sql2).catch((err)=>{
			console.log(err)
		})
		return {
			code:1,
			data:{
				type:'like',
				users:rows
			}
		}
	}
}