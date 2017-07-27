import {readFile,writeFile} from './fs-async'

const filePath = `${__dirname}/users.json`

// socket具体业务逻辑
export default class socketHander {

	/**
	 * [saveUserSocketId 保存用户的id和socketid]
	 * @param  {[type]} userId   [用户id]
	 * @param  {[type]} socketId [用户的socketid]
	 * @return {[type]}          [description]
	 */
	static async saveUserSocketId(userId, socketId) {
		let data = await readFile(filePath).catch((err) => {
			console.log(err)
		})
		data[userId] = socketId
		writeFile(filePath, data)
	}

	/**
	 * [getUserSocketId 获取指定用户的socketid]
	 * @param  {[type]} toUserId [指定用户的id]
	 * @return {[type]}          [description]
	 */
	static async getUserSocketId(toUserId) {
		const data = await readFile(filePath)
		return data[toUserId]
	}

	/**
	 * [removeUserSocketId 移除用户的id和socketid]
	 * @param  {[type]} socketId [用户的socketid]
	 * @return {[type]}          [description]
	 */
	static async removeUserSocketId(socketId) {
		let data = await readFile(filePath)
		for (let i in data) {
			if (data[i] == socketId) {
				delete data[i]
				break
			}
		}
		writeFile(filePath, data)
	}
    
    /**
     * [removeUser 移除用户]
     * @param  {[type]} userId [用户id]
     * @return {[type]}        [description]
     */
	static async removeUser(userId) {
		let data = await readFile(filePath)
		for (let i in data) {
			if (i == userId) {
				delete data[i]
				break
			}
		}
		writeFile(filePath, data)
	}
}