import JSONP from 'jsonp'

/**
 * [封装jsonp]
 * @param  {[string]} url     [请求地址]
 * @param  {[object]} data    [数据]
 * @param  {[object]} options [选项]
 * @return {[object]}         [promise]
 */
export default (url, data, options) => {
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	return new Promise((reslove, reject) => {
		JSONP(url, options, (err, data) => {
			if (!err) {
				reslove(data)
			} else {
				reject(err)
			}
		})
	})
}

/**
 * [将数据对象拼接成url]
 * @param  {[object]} data [数据]
 * @return {[string]}      [拼接后的url]
 */
function param(data) {
	let url = ''
	for (let k in data) {
		let value = data[k] != 'undefined' ? data[k] : ''
		url += `&${k}=${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}