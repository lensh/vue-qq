import express from 'express'
import user from '../../controller/user'

const userRouter = express.Router()

userRouter
	.put('/logout/:userId', async(req, res) => { // 登出
		const {userId} = req.params
		const result = await user.logout(userId)
		res.json(result)
	})
	.put('/changestatus/:userId/:status', async(req, res) => { // 切换用户的登录状态
		const {userId,status} = req.params
		const result = await user.changeStatus(userId, status)
		res.json(result)
	})
	.put('/changeuser/:currentUserId/:userId', async(req, res) => { // 切换用户
		const {currentUserId,userId} = req.params
		const result = await user.changeUser(currentUserId, userId)
		res.json(result)
	})
	.get('/profile/:userId/:targetUserId', async(req, res) => { // 获取用户的名片
		const {userId,targetUserId} = req.params
		const result = await user.getUserProfile(userId, targetUserId)
		res.json(result)
	})
	.get('/weather',async(req, res) => { // 获取天气(必须放到ECS服务器上才有效)
		const result = await user.getWeather(req.headers['x-real-ip']) //获取客户端真实ip，需要经过nginx代理
		res.json(result)
	})

export default userRouter