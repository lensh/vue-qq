import axios from 'axios'

export function request_post(url, data) {
	return axios.post(url, data)
		.then((res) => {
			return Promise.resolve(res.data)
		})
}

export function request_get(url) {
	return axios.get(url)
		.then((res) => {
			return Promise.resolve(res.data)
		})
}