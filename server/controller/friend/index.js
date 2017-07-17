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
		// 要获取如下格式的数据结构：
		// id:5,   
		// name:'马哲涵', 
		// special:1,  
		// time:15000000, 
		// face:'/static/user/face/4.jpg',
		// sign:'哈哈,今天特别开心',  
		// vip:0, 
		// status:0,  
		// fenzu:'晓风残月'
		const sql1 = ` 
			SELECT a.other_user_id AS id, a.beizhu AS name, a.special, 
			b.face, b.signature AS sign, c.vip_type as vip, d.device AS status
			FROM friend a
			LEFT JOIN user_detail b ON a.user_id =${userId}
			AND b.user_id = a.other_user_id
			LEFT JOIN vip c ON c.user_id = a.other_user_id
			LEFT JOIN user d ON d.id = a.other_user_id`

		//没有包含分组的数据
		const res1 = await query(sql1, [userId]).catch((err) => {
			console.log(err)
		})

		const sql2 = `SELECT zu_name,zu_member from fenzu where user_id=${userId}`
		
	    //包含了分组的数据
		const res2 = await query(sql2, [userId]).catch((err) => {
			console.log(err)
		})

		//将res1转换成包含分组的数据
		for(let [index,value] of res1.entries()){
			if(value.special==1){
				res1[index]['fenzu']='特别关心'
				continue
			}
			for(let value2 of res2.values()){
				let arr=value2.zu_member.split(',').map(item=> item - 0)
				if(arr.includes(value.id)){
					res1[index]['fenzu']=value2.zu_name
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
		// 要获取如下格式的数据结构：
		// id:1,
		// role:0,  // 0 我创建的  1 我管理的  2 我加入的
	    // add_time:'14896997909',
	    // name:'英语四六级自动查询',
	    // url:'/static/user/face/4.jpg'
		const sql = `
		            SELECT a.group_id AS id, a.role, 
					b.group_name AS name, b.group_avator AS url
					FROM group_user a
					LEFT JOIN groups b ON b.id = a.group_id
					AND a.user_id =${userId}`

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
	static async getNewFriends(userId){
		//要获取如下格式的数据结构：
	    // apply_id:1,
	    // source:'来自：QQ群-JS讨论群',
	    // apply_message:'大哥 想请教一个问题'
        // status:1   // 1 待处理  2 已同意 3 已拒绝 4 等待验证	
        // face:'/static/user/face/4.jpg',
        // nick_name:'ThreeTree',
        // age:19,
        // sex:'男'
        // 或者
        //  apply_id:5,
        // face:'/static/user/face/9.jpg',
        // name:'阿里巴巴社招内推',
        // info:'已发送验证消息',
        // status:4  // 1 待处理  2 已同意 3 已拒绝 4 等待验
        const sql = ``
		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		return rows
	}
}