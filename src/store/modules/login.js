import {
    SET_LOGIN
} from '../mutation-types'


// init state
const state = {
    'loginStatus': JSON.parse(window.localStorage.getItem("loginStatus"))
}

// mutations
const mutations = {
    [SET_LOGIN](state, loginStatus) {
    	state.loginStatus = loginStatus
        localStorage.setItem("loginStatus", JSON.stringify(loginStatus))
    }
}

export default {
    state,
    mutations
}