# Web手Q

Vue全家桶+Socket.io+Express/Koa2打造的网页版手机QQ(web app),高仿手机QQ7.1.0版本。为了方便大家学习，现在IP定位接口和实时气温接口也开放了！接口请在源码中查看。

## 预览

在线预览地址：https://qq.lenshen.com
（尽量使用Chrome浏览器体验最佳效果，另外提供了3个测试账号，需要账号才能登录哦）

三个测试账号如下:

* qq:986992484  密码:111111    (对应昵称是莫知我哀----宇文玥)

* qq:986992483  密码:111111    (对应昵称是浅唱低吟----楚乔)

* qq:986992482  密码:111111    (对应昵称是以梦之铭----马哲涵)

## 技术栈
* **Vue2.0**：实现前端页面构建
* **Vuex**：实现不同组件间的状态共享
* **Vue-router**：页面路由切换,实现单页的核心
* **vueg**：页面复杂场景切换效果
* **Socket.io**：实现实时消息推送
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求
* **Express**、**Koa2**：开发环境使用Express，生产环境使用Koa2
* **ES6**、**ES7**、**ES8**：服务端和客户端均使用ES6语法，promise/async/await 处理异步
* **localStorage**：本地保存用户信息
* **Webpack**：模块打包，前端项目构建工具首选
* **SASS**(**SCSS**)：CSS预处理语言
* **Flex**：flex弹性布局，简单适配手机、PC端
* **CSS3**：CSS3过渡动画及样式
* **IScroll**：模拟原生app的列表滚动效果(ListView)
* **MySQL**：MySQL关系型数据库持久化数据（考虑到表与表之间关系复杂，需要多表查询，最复杂的时候是六张表联查，用MySQL会比Mongodb好得多）
* **jsonp**：跨域请求数据
* **pm2**：服务端使用pm2部署，常驻进程，比forever好用得多（https://github.com/Unitech/pm2 ）
* **nginx**：服务端使用nginx代理端口转发

## 使用方式

先将根目录下的qq.sql导入到你的MySQL数据库里(可以使用Navicat)，用户名为root，登录密码为空。启动MySQL服务。然后使用cnpm install 安装所有依赖(最好用cnpm安装，因为项目依赖很多，npm用的是国外的镜像，在网络不稳定的情况下很有可能会导致安装失败，而且下载速度远远慢于国内的cnpm)，最后运行npm run dev。服务器部署运行项目只需要npm run pm2，这样就可以常驻进程，不过前提是得先全局安装pm2。

目前已经实现了QQ的核心功能，如消息列表、好友列表、新朋友、好友申请、实时群聊、实时私聊、聊天设置、屏蔽对方聊天、特别关心、会员等级、个性名片、添加好友、删除好友、好友分组、查找用户、登录、注销、切换用户、右滑显示侧栏、地理定位、温度等等。后期会考虑增加更多功能。如果你想体验实时聊天的酷炫效果，那么你可以打开两个浏览器，用上面不同的账号登录即可。

## 截图

* 消息页面

![](https://github.com/lensh/vue-qq/blob/master/screenshot/1.png)

* 联系人页面

![](https://github.com/lensh/vue-qq/blob/master/screenshot/2.png)

* 群聊

![](https://github.com/lensh/vue-qq/blob/master/screenshot/3.png)

* 私聊

![](https://github.com/lensh/vue-qq/blob/master/screenshot/4.png)

## 分析

* ### 服务端使用ES6语法

不需要使用babel转码以及一系列的配置，只需要将node升级到V8版本，V8已经很好地支持了ES6/ES7/ES8等最新特性，这是目前最好的办法。升级到V8版本，可以直接到nodejs中文网(http://nodejs.cn/download/) 下载即可，也可以使用NVM切换node版本。

升级到V8后，还不支持通过import/export关键字来导入导出模块(因为服务端已经有了CommonJS规范，如果再使用import/export的话就有点冲突了)，如果一定要使用import/export关键字，这时可以在服务端的入口文件首行添加以下代码：

```javascript
require("babel-core/register")({
	presets: ['es2015', 'stage-0']
})
require("babel-polyfill")
```

上面的模块不可以使用import来导入，必须使用require，同时需要通过npm安装babel-core、babel-preset-es2015、babel-preset-stage-0、babel-polyfill等依赖。这样就可以愉快地使用import/export了。

服务端代码片段如下：

``` javascript
// ES7 async/await
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
服务端(结合Express/Koa):

```javascript
// Server
import express from 'express'
import http from 'http'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
server.listen(3000)

io.on('connection', (socket)=>{
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
```

客户端：

```javascript
// Client
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script>
  const socket = io.connect('http://localhost:3000')
  socket.on('news', (data)=>{
    socket.emit('my other event', { my: 'data' })
  })
</script>
```

socket.io最核心的两个api就是`emit` 和 `on`了 ，服务端和客户端都有这两个api。通过 `emit` 和 `on`可以实现服务器与客户端之间的双向通信。

`emit` ：发射一个事件，第一个参数为事件名，第二个参数为要发送的数据，第三个参数为回调函数（如需对方接受到信息后立即得到确认时，则需要用到回调函数）。

`on` ：监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为回调函数，用来接收对方发来的数据，该函数的第一个参数为接收的数据。

服务端常用API：

`socket.emit()`：向建立该连接的客户端发送消息

`socket.on()`：监听客户端发送信息

`io.to(socketid).emit()`：向指定客户端发送消息

`io.sockets.socket(socketid).emit()`：向指定客户端发送消息，新版本用`io.sockets.socket[socketid].emit()` ，数组访问

`socket.broadcast.emit()`：向除去建立该连接的客户端的所有客户端广播

`io.sockets.emit()`：向所有客户端广播

客户端常用API：

`socket.emit()`：向服务端发送消息

`socket.on()`：监听服务端发来的信息

## FAQ

若使用的过程中遇到问题，可以加官方群交流：611212696。

如果觉得不错，就毫不吝啬地给个star吧。后期项目还会继续更新和完善。
