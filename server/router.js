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
	.get('/friend/:type/:id', async(req, res) => {
		let result, type = req.params.type
		if (type == 'list') { //获取某个用户的好友和群
			const userId = req.params.id
			result = await friend.getFriendGroup(userId)
		} else if (type == 'newfriend') { //获取新朋友
			const userId = req.params.id
			result = await friend.getNewFriends(userId)
		} else if (type == 'applydetail') { //申请详情
			const applyId = req.params.id
			result = await friend.getApplyDetail(applyId)
		} else if (type == 'getfenzu') { //获取所有分组和好友昵称
			const applyId = req.params.id
			result = await friend.getFenzu(applyId)
		}
		res.json(result)
	})
	.put('/friend/:type/:apply_id', async(req, res) => { //处理好友申请
		const type = req.params.type
		const applyId = req.params.apply_id
		let result
		if (type == 'agree') { //同意
			result = await friend.agreeApply(applyId)
		} else if (type == 'reject') { //拒绝
			result = await friend.rejectApply(applyId)
		}
		res.json(result)
	})
	.post('/friend/add', async(req, res) => { //添加好友最后一步
		const result = await friend.addFriend(req, res)
	})

module.exports = router