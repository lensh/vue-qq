import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import login from './modules/login'
import sidebar from './modules/sidebar'
import warn from './modules/warn'
import message from './modules/message'
import friend from './modules/friend'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	mutations,
	modules: {
		login,
		sidebar,
		warn,
		message,
		friend
	}
})