import express from 'express'

import login from './controller/login'
import register from './controller/register'

const router = express.Router()

router
	.post('/login', async(req, res) => { // 登录
		let result = await login.login(req, res)
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

module.exports = router