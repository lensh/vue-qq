import mysql from 'mysql'

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'qq'
})

export default (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				if (err.errno == 'ECONNREFUSED') {
					console.log('连接数据库失败，请确认您的MySQl服务是否已启动'.red)
				} else {
					reject(err);
				}
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						if (err.errno == 1055) {
							console.log('查询数据库失败，请参考 https://github.com/lensh/vue-qq/issues/8 对MySQL进行配置'.red)
						} else {
							reject(err);
						}
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}