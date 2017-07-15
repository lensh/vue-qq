import {
    SET_LOGIN
} from '../mutation-types'


// init state
const state = {
    'loginStatus': JSON.parse(window.localStorage.getItem("loginStatus")),
}

// mutations
const mutations = {
    [SET_LOGIN](state,{type,value}) {
        let loginStatus = JSON.stringify({
            'isLogin': 1,
            'type': type,
            'value': value
        })
        localStorage.setItem("loginStatus", loginStatus)
        state.loginStatus = loginStatus
    }
}

export default {
    state,
    mutations
}