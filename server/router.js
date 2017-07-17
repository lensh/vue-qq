import express from 'express'

import login from './controller/login'
import register from './controller/register'
import message from './controller/message'
import friend from './controller/friend'

const router = express.Router()

// RESTFul API 
// GET /tickets # 获取ticket列表
// GET /tickets/12 # 查看某个具体的ticket
// POST /tickets # 新建一个ticket
// PUT /tickets/12 # 更新ticket 12.
// DELETE /tickets/12 #删除ticekt 12

router
	.get('/login/:user/:pwd', async(req, res) => { // 登录
		const result = await login.login(req, res)
		res.json(result)
	})
	.post('/register/:type', async(req, res) => { //注册
		let result, type = req.params.type
		if (type == 'phone') {
			result = await register.sendMessage(req, res)
		} else if (type == 'code') {
			result = await register.checkCode(req, res)
		} else if (type == 'register') {
			result = await register.register(req, res)
		} else if (type == 'login') {
			result = await register.login(req, res)
		}
		res.json(result)
	})
	.get('/message/all/:userId', async(req, res) => { //获取某个用户首页的所有消息
		const userId = req.params.userId
		const result = await message.getAllMessage(userId)
		res.json(result)
	})
	.get('/friend/:type/:userId', async(req, res) => { //获取某个用户的好友和群
	    let result, type = req.params.type
	    const userId = req.params.userId
		if (type == 'list') {
			result = await friend.getFriendGroup(userId)
		} else if(type=='newfriend'){
			result = await friend.getNewFriends(userId)
		}
		res.json(result)
	})

module.exports = router