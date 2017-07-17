import {
  GET_ALL_MESSAGE
} from '../mutation-types'
import {
  get_all_message
} from '@/api/message'

import parseTime from '@/common/js/parse-time'


// state
const state = {
  'hasGetAllMessage': 0, //是否已经获取过所有消息
  'allMessage': [] //所有消息
}

// mutations
const mutations = {
  [GET_ALL_MESSAGE](state, data) {
    state.allMessage = data.allMessage
    state.hasGetAllMessage = data.hasGetAllMessage
  }
}

// actions
const actions = {
  getAllMessage: ({commit}, userId) => {
    get_all_message(userId)
      .then((res) => {
        const {
          singleMessage,
          groupMessage
        } = res.data
        for (let index of singleMessage.keys()) {
          singleMessage[index]['type'] = 'single'
        }
        for (let index of groupMessage.keys()) {
          groupMessage[index]['type'] = 'group'
        }
        const allMessage = singleMessage.concat(groupMessage)
        allMessage.sort((prev, current) => { //按时间降序排列
          return prev.time < current.time
        })
        for (let [index, value] of allMessage.entries()) {
          allMessage[index]['time'] = parseTime(value.time) //解析时间
        }

        const data = {
          hasGetAllMessage: 1,
          allMessage
        }
        commit(GET_ALL_MESSAGE, data)
      })
  }
}

export default {
  state,
  actions,
  mutations
}