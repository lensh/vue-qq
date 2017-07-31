import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import { state, mutations } from './mutations'
import sidebar from './modules/sidebar'
import warn from './modules/warn'
import message from './modules/message'
import friend from './modules/friend'
import scroll from './modules/scroll'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	modules: {
		sidebar,
		warn,
		message,
		friend,
		scroll
	}
})