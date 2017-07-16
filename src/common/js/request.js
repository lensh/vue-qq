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

/**
 * [request_post 封装post请求]
 * @param  {[string]} url  [请求地址]
 * @param  {[object]} data [数据]
 * @return {[object]}      [promise]
 */
export function request_post(url, data) {
	return axios.post(url, data)
		.then((res) => {
			return Promise.resolve(res.data)
		})
}