export default class Messge {

	/**
	 * [getAllMessage 获取某个用户的首页的所有消息]
	 * @param  {[type]} userId [description]
	 * @return {[type]}        [description]
	 */
	static async getAllMessage(userId) {
		//先获取私聊消息
		const singleMessage = await this.getSingleMessage(userId)
	    //再获取群聊消息
		const groupMessage = await this.getGroupMessage(userId)

		return {
			code: 1,
			data: {
				singleMessage,
				groupMessage
			}
		}
	}
	
	/**
	 * [getSingleMessage 获取私聊消息]
	 * @param  {[type]} userId [用户的id]
	 * @return {[type]}        [description]
	 */
	static async getSingleMessage(userId) {
		const sql = `
			SELECT a.from_user as id, b.face AS imgUrl, (

			SELECT COUNT( * ) 
			FROM message_user c
			WHERE c.is_read =0
			AND c.to_user = a.to_user
			AND c.from_user = a.from_user
			) AS unread, (

			SELECT d.message
			FROM message_user d
			WHERE (d.to_user = a.to_user
			AND d.from_user = a.from_user)
			OR (d.to_user = a.from_user
			AND d.from_user = a.to_user)
			ORDER BY d.time DESC 
			LIMIT 1
			) AS message, (

			SELECT f.time
			FROM message_user f
			WHERE (f.to_user = a.to_user
			AND f.from_user = a.from_user)
			OR (f.to_user = a.from_user
			AND f.from_user = a.to_user)
			ORDER BY f.time DESC 
			LIMIT 1
			) AS time,(

			SELECT beizhu
			FROM friend e
			WHERE e.other_user_id = a.from_user
			limit 1
			) AS from_user
			FROM message_user a
			JOIN user_detail b ON a.to_user =?
			AND a.from_user = b.user_id
			GROUP BY from_user
		`

		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		return rows
	}

	/**
	 * [getGroupMessage 获取群消息]
	 * @param  {[number]} userId [用户id]
	 * @return {[type]}        [description]
	 */
	static async getGroupMessage(userId) {
		const sql = `
			SELECT a.group_id as id, a.unread, c.group_name AS from_user, 
			c.group_avator AS imgUrl, (

			SELECT d.message
			FROM message_group d
			WHERE d.to_group = a.group_id
			ORDER BY TIME DESC 
			LIMIT 1
			) AS message, (

			SELECT e.time
			FROM message_group e
			WHERE e.to_group = a.group_id
			ORDER BY TIME DESC 
			LIMIT 1
			) AS time
			FROM group_user a
			JOIN message_group b ON a.user_id =?
			AND b.to_group = a.group_id
			LEFT JOIN groups c ON c.id = a.group_id
			GROUP BY a.group_id
		`

		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		return rows
	}
}
