import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import apiRouter from './api'   //api
import query from './common/mysql/db'  //数据库连接句柄

const app = express()

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
global.query=query   

module.exports = app