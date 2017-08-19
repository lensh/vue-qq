import * as types from '../mutation-types'

// init state
const state = {
    'isShowSideBar': false,
    'isShowMask': false
}

// mutations
const mutations = {
    [types.SHOW_SIDEBAR](state, {isShowSideBar,isShowMask}) {
        state.isShowSideBar = isShowSideBar
        state.isShowMask = isShowMask
    }
}

export default {
    state,
    mutations
}