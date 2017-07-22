# Vue全家桶+Socket.io+Express/Koa2打造网页版手机QQ

Vue全家桶+Socket.io+Express/Koa2打造的网页版手机QQ ,高仿手机QQ7.1.0版本

## 预览

在线预览地址：👉 https://lenshen.com/vue-qq/

## 技术栈
* **Vue2.0**：前端MVVM框架，实现单页SPA应用
* **Vuex**：实现不同组件间的状态共享
* **Vue-router**：页面路由切换
* **vueg**：页面场景切换效果
* **Socket.io**：实现实时消息推送
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求
* **Express**、**Koa2**：因为vue-cli生成的项目是基于**express**的，所以在开发阶段我使用的是它，但是真正上线生产环境我换成了**Koa2**
* **ES6**、**ES7**、**ES8**：服务端和客户端均使用ES6语法，promise/async/await 处理异步
* **localStorage**：本地保存用户信息
* **Webpack**：vue-cli自带Webpack，但是需要自己改造一下，比如要对需要安装sass相关loader，vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要`<style lang="scss"></style>`
* **SASS**(**SCSS**)：用SCSS做CSS预处理语言
* **Flex**：flex弹性布局，简单适配手机、PC端
* **CSS3**：CSS3过渡动画及样式
* **IScroll5**：移动端滚动条效果
* **MySQL**：MySQL关系型数据库持久化数据（考虑到表与表之间关系复杂，需要多表查询，最复杂的时候是六张表联查，用MySQL会比Mongodb好得多）
* **jsonp**：跨域请求数据

## 分析

* ### 服务端使用ES6语法

不需要使用babel转码以及一系列的配置，只需要将node升级到V8版本，V8已经很好地支持了ES6/ES7/ES8等最新特性，这是目前最好的办法。升级到V8版本，可以直接到nodejs中文网(http://nodejs.cn/download/) 下载即可，也可以使用NVM切换node版本。
升级到V8后，还不支持通过import/export关键字来导入导出模块(因为服务端已经有了CommonJS规范，如果再使用import/export的话就有点冲突了)，如果一定要使用import/export关键字一定这时可以在服务端的入口文件首行添加以下代码：

```javascript
require("babel-core/register")({
	presets: ['es2015', 'stage-0']
});
require("babel-polyfill")
```

上面的代码不可以使用import来导入，必须使用require，同时需要通过npm安装babel-core、babel-preset-es2015、babel-preset-stage-0、babel-polyfill等依赖。这样就可以愉快地使用import/export了。
服务端代码片段如下：

``` javascript
// ES6 import/export
import express from 'express'
import loginRouter from './router/login'
import registerRouter from './router/register'
import friendRouter from './router/friend'
import messageRouter from './router/message'
import userRouter from './router/user'

const apiRouter = express.Router()

apiRouter
	.use('/login', loginRouter)
	.use('/register', registerRouter)
	.use('/friend', friendRouter)
	.use('/message', messageRouter)
	.use('/user', userRouter)

export default apiRouter
```

``` javascript
// ES7/ES8 async/await
import express from 'express'
import login from '../../controller/login'

const loginRouter = express.Router()

loginRouter
	.get('/:user/:pwd', async(req, res) => { // 登录
		const result = await login.login(req, res)
		res.json(result)
	})

export default loginRouter
```

* ### Socket.io
通过Express/Koa在服务端可以这样做:

```javascript
// Server (app.js)

var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

server.listen(80)

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
```

客户端代码

```javascript
// Client (index.html)

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost')
  socket.on('news', function (data) {
    console.log(data)
    socket.emit('my other event', { my: 'data' })
  })
</script>
```

不管是服务器还是客户端都有 `emit` 和 `on` 这两个函数，可以说 socket.io 的核心就是这两个函数了，通过 `emit` 和 `on` 可以轻松地实现服务器与客户端之间的双向通信。

`emit` ：用来发射一个事件或者说触发一个事件，第一个参数为事件名，第二个参数为要发送的数据，第三个参数为回调函数（一般省略，如需对方接受到信息后立即得到确认时，则需要用到回调函数）。
`on` ：用来监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为一个匿名函数用来接收对方发来的数据，该匿名函数的第一个参数为接收的数据，若有第二个参数，则为要返回的函数。
socket.io 提供了三种默认的事件（客户端和服务器都有）：`connect` 、`message` 、`disconnect` 。当与对方建立连接后自动触发 `connect` 事件，当收到对方发来的数据后触发 `message` 事件（通常为 `socket.send()` 触发），当对方关闭连接后触发 `disconnect` 事件。

此外，socket.io 还支持自定义事件，毕竟以上三种事件应用范围有限，正是通过这些自定义的事件才实现了丰富多彩的通信。

最后，需要注意的是，在服务器端区分以下三种情况：

`socket.emit()` ：向建立该连接的客户端广播
`socket.broadcast.emit()` ：向除去建立该连接的客户端的所有客户端广播
`io.sockets.emit()` ：向所有客户端广播，等同于上面两个的和

## About
关于我：👉https://lenshen.com/about
GitHub：👉 https://github.com/lensh