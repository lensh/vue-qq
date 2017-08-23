import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import apiRouter from './api' //api
import query from './common/mysql/db' //数据库连接句柄
import http from 'http'
import socketio from 'socket.io'
import socketHander from './socket' //socket要实现的具体逻辑

const app = express()
const server = http.createServer(app)
const io = socketio(server)
server.listen(3000,'0.0.0.0')

// 解析表单post数据
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())

// cookie、session配置
app.use(session({
	secret: 'lenshen qq',
	cookie: {
		maxAge: 60 * 1000 * 30
	},
	resave: false,
	saveUninitialized: true,
}))

// 使用路由
app.use('/api', apiRouter)

// 设置为全局数据库连接句柄
global.query = query

// socket事件监听
io.on('connection', (socket) => {
	const socketId = socket.id

	//监听用户登录
	socket.on('login', (userId) => {
		//保存用户的id和socketid
		socketHander.saveUserSocketId(userId, socketId)
	})

	//监听用户刷新
	socket.on('update', (userId) => {
		//保存用户的id和socketid
		socketHander.saveUserSocketId(userId, socketId)
	})

	//监听用户发私聊消息
	socket.on('sendPrivateMessage', async(data) => {
		const {to_user} = data
		//根据用户的id取到socketid，从而实现只对该用户推送新消息
		const socketid = await socketHander.getUserSocketId(to_user)
		io.to(socketid).emit('receivePrivateMessage', data)
	})

	//监听用户发群消息
	socket.on('sendGroupMessage', async(data) => {
		//直接群发会快点，客户端只需要判断是否是发给自己的
		io.sockets.emit('receiveGroupMessage', data)
	})
    
    //监听用户切换账号
	socket.on('changeUser',async(data) => {
		const {currentUserId,userId}=data
 		await socketHander.changeUser(currentUserId,userId,socketId)
	})
})

module.exports = app