import fs from 'fs'

/**
 * [读取文件的内容]
 * @param  {[type]} filePath [文件路径]
 * @return {[type]}          [description]
 */
export const readFile = (filePath) => {
	return new Promise((reslove, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (!err) {
				reslove(JSON.parse(data))
			} else {
				reject(err)
			}
		})
	})
}

/**
 * [写文件]
 * @param  {[type]} filePath [文件路径]
 * @param  {[type]} data     [新的文件数据]
 * @return {[type]}          [description]
 */
export const writeFile = (filePath, data) => {
	return new Promise((reslove, reject) => {
		fs.writeFile(filePath, JSON.stringify(data), (err) => {
			if (err) {
				reject(err)
			}
		})
	})
}