import * as types from '../mutation-types'
import * as api from '@/api/message'
import {parseMessageTime} from '@/common/js/parse-time'

// state
const state = {
  'allMessage': [] //所有消息
}

// mutations
const mutations = {
  [types.GET_ALL_MESSAGE](state, data) {
    state.allMessage = data.allMessage
  },
  [types.UPDATE_MESSAGE](state, data) {
    const index = state.allMessage.findIndex((item) => {
      return item.type == data.type && item.id == data.id
    })

    let unread
    if (index != -1) {
      unread = (state.allMessage)[index].unread
      unread++
      state.allMessage.splice(index, 1)
    } else {
      unread = 1
    }

    if (data.isEnterChat) unread = 0

    state.allMessage.unshift({
      from_user: data.from_user,
      id: data.id,
      imgUrl: data.imgUrl,
      message: data.message,
      time: parseMessageTime(data.time),
      type: data.type,
      unread: unread
    })
  },
  [types.UPDATE_UNREAD_MESSAGE](state, data) {
    const index = state.allMessage.findIndex((item) => {
      return item.type == data.type && item.id == data.id
    })
    if (index != -1) {
      (state.allMessage)[index].unread = 0
    }
  }
}

// actions
const actions = {
  async getAllMessage({commit}, userId) {
    const res = await api.get_all_message(userId)
    const {singleMessage,groupMessage} = res.data

    for (let index of singleMessage.keys()) {
      singleMessage[index]['type'] = 'single'
    }
    for (let index of groupMessage.keys()) {
      groupMessage[index]['type'] = 'group'
    }
    const allMessage = singleMessage.concat(groupMessage)
    allMessage.sort((prev, current) => { //按时间降序排列
        return current.time - prev.time
    })
    for (let [index, value] of allMessage.entries()) {
      allMessage[index]['time'] = parseMessageTime(value.time) //解析时间
    }

    const data = {allMessage}
    commit(types.GET_ALL_MESSAGE, data)
  }
}

export default {
  state,
  actions,
  mutations
}