import axios from 'axios'

/**
 * [request_get 封装get请求]
 * @param  {[string]} url [请求地址]
 * @return {[object]}     [promise]
 */
export function request_get(url) {
	return axios.get(url)
		.then((res) => {
			return Promise.resolve(res.data)
		})
}