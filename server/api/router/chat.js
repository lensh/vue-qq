import express from 'express'
import chat from '../../controller/chat'

const chatRouter = express.Router()

chatRouter
	.get('/message/:userId/:otherUserId', async(req, res) => {
		const {userId,otherUserId}=req.params
		const result = await chat.getMessage(userId,otherUserId)
		res.json(result)
	})
	.put('/update_enter_chat/:userId/:otherUserId',async(req, res) => {
		const {userId,otherUserId}=req.params
		const result = await chat.updateEnterChat(userId,otherUserId)
		res.json(result)
	})
	.put('/update_pingbi/:userId/:otherUserId/:status',async(req, res) => {
		const {userId,otherUserId,status}=req.params
		const result = await chat.updatePingbi(userId,otherUserId,status)
		res.json(result)
	})
	.put('/update_special/:userId/:otherUserId/:status',async(req, res) => {
		const {userId,otherUserId,status}=req.params
		const result = await chat.updateSpecial(userId,otherUserId,status)
		res.json(result)
	})
	.post('/sendmessage',async(req, res) => {
		const {userId,otherUserId,message,time}=req.body
		const result = await chat.sendMessage(userId, otherUserId, message, time)
		res.json(result)
	})
	.get('/userinfo/:userId/:otherUserId',async(req, res) => {
		const {userId,otherUserId}=req.params
		const result = await chat.getUserInfo(userId,otherUserId)
		res.json(result)
	})

export default chatRouter