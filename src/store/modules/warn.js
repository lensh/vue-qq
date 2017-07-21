import * as types from '../mutation-types'

// init state
const state = {
   isShow:false,
   message:''
}

// mutations
const mutations = {
    [types.SHOW_WARN](state, {isShow,message}) {
        state.isShow = isShow
        state.message = message
    }
}

// actions
const actions = {
    setShowWarn: ({ commit }, message) => {
    	let warn={
    	  'isShow':true,
    	  'message':message
    	}
    	commit(types.SHOW_WARN,warn)
      setTimeout(()=>{
      	warn={
      		'isShow':false,
    	    'message':''
      	}
      	commit(types.SHOW_WARN,warn)
      },2000)
    }
}

export default {
    state,
    actions,
    mutations
}