import {request_get} from './request'

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
	static async changeStatus(userId, status) {
		const sql = 'update user set status=? where id=? limit 1'
		const res = await query(sql, [status, userId]).catch((err) => {
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
	static async changeUser(currentUserId, userId) {
		//更改原来用户的登录状态
		let sql = 'update user set status=0,device=0 where id=? limit 1'
		await query(sql, [currentUserId]).catch((err) => {
			console.log(err)
		})

		//更改新用户的登录状态
		const update = {
			last_login: Date.parse(new Date()) / 1000,
			status: 1,
			device: ~~(Math.random() * 4 + 1) //设备状态暂时取随机数 [1~5]
		}
		sql = 'update user set ? where id = ? '
		await query(sql, [update, userId]).catch((err) => {
			console.log(err)
		})

		//获取新用户的信息
		sql = `
			select a.*,b.phone,b.status,b.qq,c.vip_type AS vip, c.accert
			from user_detail a 
			join user b on a.user_id = ? and b.id=a.user_id
			join vip c on c.user_id=a.user_id
        `
		const row = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})

		//要返回的数据
		let loginStatus = {
			isLogin: 1,
			type: 'qq',
			userId,
			value: row[0].qq
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

	/**
	 * [getUserProfile 获取用户的名片]
	 * @param  {[type]} userId       [当前用户id]
	 * @param  {[type]} targetUserId [目标用户id]
	 * @return {[type]}              [description]
	 */
	static async getUserProfile(userId, targetUserId) {
		//数据结构：
		// user_id:2,
		// nick_name:'一花一世界',
		// signature:'马哲涵',
		// face:'/static/user/face/4.jpg',
		// sex:'女',
		// place:'江西',
		// age:19,
		// xingzuo:'摩羯座',
		// favor:'娱乐/艺术/表演',
		// level:50,  // QQ等级
		// vip:0,   // vip表取  
		// accert:'慢速中',  // vip表取
		// qq:'936842133',  // user表中取
		// beizhu:'马哲涵',  // friend表中取
		// isFriend:1  //是否是朋友  // friend表中取
		const sql = `
			SELECT a.*, b.vip_type AS vip, b.accert,c.qq, d.beizhu,
			d.is_friend AS isFriend
			FROM user_detail a
			JOIN vip b ON a.user_id =?
			AND b.user_id = a.user_id
			JOIN user c ON c.id = a.user_id
			JOIN friend d ON d.user_id =?
			AND d.other_user_id = a.user_id
		`
		const row = await query(sql, [targetUserId, userId]).catch((err) => {
			console.log(err)
		})

		return {
			code: 1,
			data: row[0]
		}
	}

   /**
	 * [getWeather 获取天气]
	 * @return {[type]} [description]
	 */
	static async getWeather(ip) {
		//根据真实ip地址获取城市名称
		const {data} = await request_get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`)
		const city = data.city.substring(0, data.city.length - 1)

		//获取温度
		const weather = await request_get(`http://v.juhe.cn/weather/index?format=2&cityname=
			${encodeURIComponent(city)}&key=0d8bba24af0b49ca3258f9c18377dc2b`)
		return {
			code: 200,
			data: {
				city,
				temperature: weather.result.sk.temp
			}
		}
	}
}