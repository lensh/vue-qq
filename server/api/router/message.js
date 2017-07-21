import express from 'express'
import message from '../../controller/message'

const messageRouter = express.Router()

messageRouter
	.get('/all/:userId', async(req, res) => { //获取某个用户首页的所有消息
		const {userId} = req.params
		const result = await message.getAllMessage(userId)
		res.json(result)
	})

export default messageRouter