export default class Login {

	/**
	 * [login 登陆]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	static async login(req, res) {
		const {user,pwd} = req.params

		let type //填写的类型
		if (/^[\d]{8,10}$/.test(user)) { //如果填写的是qq号
			type = 1
		} else if (/^((13)|(14)|(15)|(17)|(18))[\d]{9}$/.test(user)) { //如果是手机号
			type = 2
		} else if (/^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(user)) { //如果是邮箱
			type = 3
		} else {
			type = 0 //无效的输入
		}
		if (type == 0) { //如果输入无效则直接返回,否则检查用户名
			return {
				"code": 0,
				"message": "无效的输入"
			}
		}

		//要检查的字段
		const field = type == 1 ? 'qq' : type == 2 ? 'phone' : 'email'

		//检查用户名
		const userRowNums = await this.checkUser(user, field) //检查用户名是否存在
		if (userRowNums == 0) { //如果用户名不存在则直接返回,否则检查密码
			const userType = type == 1 ? 'qq号' : type == 2 ? '手机号' : '邮箱'
			return {
				"code": 0,
				"message": `此${userType}不存在`
			}
		}

		//检查密码
		const userId = await this.checkPwd(user, pwd, field)
		if (userId == 0) { //如果密码错误则直接返回,否则保存登陆信息
			return {
				"code": 0,
				"message": "密码错误,请检查"
			}
		}

		//更新用户登录信息
		await this.updateLoginInfo(user, field)

		//保存session
		let loginStatus = await this.saveSession(req, user, type)
		loginStatus.isLogin = 1 // 将登录态置为1
		loginStatus.userId = userId //取到用户的id

		//取出用户的基本信息
		const userInfo = await this.getUserDetail(userId)

		//返回数据
		return {
			"code": 1,
			"message": "登陆成功",
			"data": {
				loginStatus,
				userInfo
			}
		}
	}

	/**
	 * [checkUser 检查user]
	 * @param  {[type]} user [用户名/qq号/邮箱]
	 * @param  {[type]} field [对应的字段]
	 * @return {[Promise]}      [description]
	 */
	static async checkUser(user, field) {
		const sql = `select id from user where ${field} = ? limit 1`
		const rows = await query(sql, user).catch((err) => {
			console.log(err)
		})
		return rows.length > 0 ? 1 : 0
	}

	/**
	 * [checkPwd 检查密码]
	 * @param  {[type]} user [用户名/qq号/邮箱]
	 * @param  {[type]} pwd  [密码]
	 * @param  {[type]} field [对应的字段]
	 * @return {[type]}      [description]
	 */
	static async checkPwd(user, pwd, field) {
		const sql = `select id from user where ${field} = ? and pwd= ? limit 1 `
		const rows = await query(sql, [user, pwd]).catch((err) => {
			console.log(err)
		})
		return rows.length > 0 ? rows[0].id : 0
	}

	/**
	 * [updateLoginInfo 更新登录信息]
	 * @param  {[type]} user  [字段值]
	 * @param  {[type]} field [字段]
	 * @return {[type]}       [description]
	 */
	static async updateLoginInfo(user, field) {
		const update = {
			last_login: Date.parse(new Date()) / 1000,
			status: 1,
			device: ~~(Math.random() * 4 + 1) //设备状态暂时取随机数 [1~5]
		}
		const sql = `update user set ? where ${field} = ? `
		const res = await query(sql, [update, user]).catch((err) => {
			console.log(err)
		})
		return res.affectedRows > 0 ? 1 : 0
	}

	/**
	 * [saveSession 存储session]
	 * @param  {[type]} res  [res响应]
	 * @param  {[type]} user [用户名/qq号/邮箱]
	 * @param  {[type]} type [user的类型]
	 * @return {[type]}      [返回登陆的信息供客户端存储]
	 */
	static async saveSession(req, user, type) {
		let data
		//如果是qq号
		if (type == 1) {
			req.session.qq = user
			data = {
				"type": "qq",
				"value": user
			}
		} else if (type == 2) {
			req.session.phone = user
			data = {
				"type": "phone",
				"value": user
			}
		} else if (type == 3) {
			req.session.email = user
			data = {
				"type": "email",
				"value": user
			}
		}
		return data
	}

	/**
	 * [getUserDetail 取出用户的基本信息]
	 * @param  {[type]} userId [description]
	 * @return {[type]}        [description]
	 */
	static async getUserDetail(userId) {
		const sql = `
			select a.*,b.phone,b.status,b.qq,c.vip_type AS vip, c.accert
			from user_detail a 
			join user b on a.user_id = ? and b.id=a.user_id
			join vip c on c.user_id=a.user_id
        `
		const row = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		return row[0]
	}
}