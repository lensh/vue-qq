import express from 'express'
import register from '../../controller/register'

const registerRouter = express.Router()

registerRouter
	.post('/phone', async(req, res) => {
		const result = await register.sendMessage(req, res)
		res.json(result)
	})
	.post('/code', async(req, res) => {
		const result = await register.checkCode(req, res)
		res.json(result)
	})
	.post('/register', async(req, res) => {
		const result = await register.register(req, res)
		res.json(result)
	})

export default registerRouter