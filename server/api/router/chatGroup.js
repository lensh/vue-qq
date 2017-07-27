import express from 'express'
import chatGroup from '../../controller/chatGroup'

const chatGroupRouter = express.Router()

chatGroupRouter
	.get('/message/:userId/:groupId', async(req, res) => {
		const {userId,groupId} = req.params
		const result = await chatGroup.getMessage(userId, groupId)
		res.json(result)
	})
	.put('/update_enter_chat/:userId/:groupId', async(req, res) => {
		const {userId,groupId} = req.params
		const result = await chatGroup.updateEnterChat(userId, groupId)
		res.json(result)
	})
	.post('/sendmessage', async(req, res) => {
		const {userId,groupId,message,nickName,time} = req.body
		const result = await chatGroup.sendMessage(userId,groupId,message,nickName,time)
		res.json(result)
	})

export default chatGroupRouter