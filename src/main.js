import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import '@/common/js/hide-address'

Vue.config.productionTip = false   //生产环境请用true

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios)

// Vuex 进行状态管理
Vue.use(Vuex)

// vueg 转场动画
const options = {
	forwardAnim: 'fadeInRight',
	duration:0.2
}
Vue.use(vueg, router, options)

// fastclick,解决移动端300ms延迟
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body)
	}, false)
}

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})