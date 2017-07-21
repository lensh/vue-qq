import sendMessage from './sendMessage'

export default class Register {

	/**
	 * [sendMessage 发送手机短信]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	static async sendMessage(req, res) {
		const {phone} = req.body
		let code = ''; //验证码
		for (let i = 0; i < 6; i++) {
			let number = ~~(Math.random() * 9)
			code += number;
		}
		//设置session
		req.session.code = code

		// 下面的返回信息应该放在 sendMessage函数里
		return {
			'code': 1,
			'message': '短信发送成功',
			'data': {
				code: code
			}
		}

		// const response= await sendMessage(code,phone).catch((err)=>{
		// 	console.log(err)
		// })
		// if(response.code==200){
		// 	res.json({
		// 		'code': 1,
		// 		'message': '短信发送成功',
		// 		'data':{
		// 			code:code
		// 		}
		//     })
		// }
	}

	/**
	 * [checkCode 检查用户的验证码]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	static async checkCode(req, res) {
		const {code} = req.body
		return code == req.session.code ? {
			'code': 1
		} : {
			'code': 0
		}
	}

	/**
	 * [createQQ 随机生成8~10位的qq号]
	 * @return {[type]} [description]
	 */
	static createQQ() {
		let qq = ''
		//qq的位数
		let n = Math.round(Math.random() * 2 + 8) // 四舍五入
		//第一位,随机生成1~9的数
		let num = Math.round(Math.random() * 8 + 1) // 四舍五入
		qq += num
		// 剩下n-1位
		for (let i = 0; i < n - 1; i++) {
			qq += Math.round(Math.random() * 9)
		}
		return qq
	}

	/**
	 * [register 注册]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	static async register(req, res) {
		const qq = this.createQQ()
		const user = {
			"qq": qq,
			"phone": req.body.phone,
			"time": Date.parse(new Date()) / 1000
		}
		const {nickname} = req.body

		// 新增用户
		const user_detail = await this.insert(user, nickname).catch((err) => {
			console.log(err)
		})

		// 关联的表也增加相应记录
		const afterinsert = await this.afterInsert(user_detail).catch((err) => {
			console.log(err)
		})

		if (afterinsert == 1) {
			return {
				"code": 1,
				"message": "注册成功",
				"data": {
					qq: qq
				}
			}
		}
	}

	/**
	 * [insert 新增用户]
	 * @param  {[type]} user     [用户信息]
	 * @param  {[type]} nickname [昵称]
	 * @return {[type]}          [description]
	 */
	static async insert(user, nickname) {
		const sql = `insert into user set ?`
		const res = await query(sql, user).catch((err) => {
			console.log(err)
		})
		if (res.affectedRows == 1) {
			const user_detail = {
				"user_id": res.insertId, //用户的id
				"nick_name": nickname // 昵称
			}
			return user_detail
		}
	}

	/**
	 * [afterInsert 关联的表也增加相应记录]
	 * @param  {[type]} user_detail [description]
	 * @return {[type]}             [description]
	 */
	static async afterInsert(user_detail) {
		const sql = `insert into user_detail set ?`
		const res = await query(sql, user_detail).catch((err) => {
			console.log(err)
		})
		if (res.affectedRows == 1) {
			return 1
		}
	}

	/**
	 * [login 注册后首次登陆]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	static async login(req, res) {
		const {qq} = req.body
		const update = {
			last_login: Date.parse(new Date()) / 1000
		}
		const sql = `update user set ? where qq= ? `
		const result = await query(sql, [update, qq]).catch((err) => {
			console.log(err)
		})
		if (result.affectedRows == 1) {
			req.session.qq = qq
			return {
				"code": 1
			}
		}
	}
}