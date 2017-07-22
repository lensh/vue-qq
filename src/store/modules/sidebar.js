import * as types from '../mutation-types'

// init state
const state = {
    'isShowSideBar': false,
    'isInit': true,
    'isShowMask': false
}

// mutations
const mutations = {
    [types.SHOW_SIDEBAR](state, {isShowSideBar,isInit,isShowMask}) {
        state.isShowSideBar = isShowSideBar
        state.isInit = isInit
        state.isShowMask = isShowMask
    },
    [types.SET_INIT](state, {isInit}) {
        state.isInit = isInit
    }
}

export default {
    state,
    mutations
}