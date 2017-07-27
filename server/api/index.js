import express from 'express'

import loginRouter from './router/login'
import registerRouter from './router/register'
import friendRouter from './router/friend'
import messageRouter from './router/message'
import userRouter from './router/user'
import chatRouter from './router/chat'
import chatGroupRouter from './router/chatGroup'

const apiRouter = express.Router()

apiRouter
	.use('/login', loginRouter)
	.use('/register', registerRouter)
	.use('/friend', friendRouter)
	.use('/message', messageRouter)
	.use('/user', userRouter)
	.use('/chat', chatRouter)
	.use('/chatgroup', chatGroupRouter)

export default apiRouter