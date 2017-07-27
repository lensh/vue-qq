import express from 'express'
import friend from '../../controller/friend'

const friendRouter = express.Router()

friendRouter
	.get('/list/:userId', async(req, res) => { //获取某个用户的好友和群
		const {userId} = req.params
		const result = await friend.getFriendGroup(userId)
		res.json(result)
	})
	.get('/newfriend/:userId', async(req, res) => { //获取新朋友
		const {userId} = req.params
		const result = await friend.getNewFriends(userId)
		res.json(result)
	})
	.get('/applydetail/:applyId', async(req, res) => { //申请详情
		const {applyId} = req.params
		const result = await friend.getApplyDetail(applyId)
		res.json(result)
	})
	.get('/getfenzu/:applyId', async(req, res) => { //获取所有分组和好友昵称
		const {applyId} = req.params
		const result = await friend.getFenzu(applyId)
		res.json(result)
	})
	.post('/addfriend', async(req, res) => { //添加好友
		const result = await friend.addFriend(req, res)
		res.json(result)
	})
	.put('/:resolve/:applyId', async(req, res) => { //同意或拒绝好友申请
		let result
		const {applyId,resolve} = req.params
		if (resolve == 'agree') {
			result = await friend.agreeApply(applyId)
		} else if (resolve == 'reject') {
			result = await friend.rejectApply(applyId)
		}
		res.json(result)
	})
	.delete('/delete/:userId/:otherUserId',async(req, res) => { //删除好友
		const {userId,otherUserId} = req.params
		const result = await friend.deleteFriend(userId,otherUserId)
		res.json(result)
	})
	.get('/search/:user',async(req, res) => {   //搜索朋友
		const {user} = req.params
		const result = await friend.searchFriend(user)
		res.json(result)
	})

export default friendRouter