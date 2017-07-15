import {
    SHOW_WARN
} from '../mutation-types'


// init state
const state = {
   isShow:false,
   message:''
}

// mutations
const mutations = {
    [SHOW_WARN](state, {isShow,message}) {
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
    	commit(SHOW_WARN,warn)
      setTimeout(()=>{
      	warn={
      		'isShow':false,
    	    'message':''
      	}
      	commit(SHOW_WARN,warn)
      },2000)
    }
}

export default {
    state,
    actions,
    mutations
}