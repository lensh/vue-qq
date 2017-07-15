import {
    SHOW_SIDEBAR,
    SET_INIT
} from '../mutation-types'


// init state
const state = {
    'isShowSideBar':false,
    'isInit':true,
    'isShowMask':false
}

// mutations
const mutations = {
    [SHOW_SIDEBAR](state, {isShowSideBar,isInit,isShowMask}) {
        state.isShowSideBar = isShowSideBar
        state.isInit = isInit
        state.isShowMask = isShowMask
    },
    [SET_INIT](state,{isInit}){
        state.isInit = isInit
    }
}

export default {
    state,
    mutations
}