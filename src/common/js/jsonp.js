import JSONP from 'jsonp'

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

function param(data) {
	let url = ''
	for (let k in data) {
		let value = data[k] != 'undefined' ? data[k] : ''
		url += `&${k}=${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}