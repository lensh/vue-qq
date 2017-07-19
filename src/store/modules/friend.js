import {
  GET_FRIEND_LIST,
  GET_NEW_FRIENDS,
  UPDATE_NEW_FRIENDS
} from '../mutation-types'
import {
  get_friend_list,
  get_new_friends
} from '@/api/friend'


// state
const state = {
  'hasGetFriendList': 0, //是否已经获取过好友列表
  'friendList': {},
  'hasGetNewFriends':0,
  'newFriends':[]
}

// mutations
const mutations = {
  [GET_FRIEND_LIST](state, data) {
    state.hasGetFriendList = data.hasGetFriendList
    state.friendList = data.friendList
  },
  [GET_NEW_FRIENDS](state,data){
    state.hasGetNewFriends=data.hasGetNewFriends
    state.newFriends=data.newFriends
  },
  [UPDATE_NEW_FRIENDS](state,update){
    (state.newFriends)[update.index].status=update.status
  }
}

// actions
const actions = {
  getFriendList: ({commit}, userId) => {
    get_friend_list(userId)
      .then((res) => {
        let friendData = res.data.friend,
          groupData = res.data.group

        //按在线状态和VIP类型降序排列
        friendData.sort((prev, current) => {
          //先按在线状态排序
          if (prev.status == 0 && current.status > 0) {
            return true
          }
          //状态一样的情况下再按VIP级别排序
          if ((prev.status > 0 && current.status > 0) || (prev.status == 0 && 
            current.status == 0)){    
            return prev.vip < current.vip
          }
          //否则不排序
          return false
        })
        //按角色升序排列
        groupData.sort((prev, current) => {
          return prev.role > current.role
        })

        let friend_set = new Set(),
          group_set = new Set() //保存最终结果

        //先将好友数据转换成指定格式
        let fenzu_map = new Map()
        for (let [index, value] of friendData.entries()) {
          let fenzuName = value.fenzu
          let friend
          if (fenzu_map.has(fenzuName)) {
            friend = fenzu_map.get(fenzuName)
          } else {
            friend = {
              name: value.fenzu,
              online: 0,
              members: []
            }
          }
          if (value.status != 0) {
            friend.online++
          }
          friend.members.push({
            id: value.id,
            name: value.name,
            face: value.face,
            vipurl: value.vip == 0 ? '' : value.vip == 1 ? '/static/icon/4/vip.png' : '/static/icon/4/ewm.png',
            status: value.status == 0 ? '离线' : value.status == 1 ? '手机在线' : value.status == 2 ? '3G在线' : value.status == 3 ? '4G在线' : value.status == 4 ? 'WiFi在线' : '电脑在线',
            sign: value.sign
          })
          fenzu_map.set(fenzuName, friend)
        }
        fenzu_map.forEach((item) => {
          friend_set.add(item)
        })

        //再将群数据转换成指定格式
        let group_map = new Map()
        for (let [index, value] of groupData.entries()) {
          let fenzuName = value.role
          let group
          if (group_map.has(fenzuName)) {
            group = group_map.get(fenzuName)
          } else {
            group = {
              type: value.role == 0 ? '我创建的群' : value.role == 1 ? '我管理的群' : '我加入的群',
              groups: []
            }
          }
          group.groups.push({
            id: value.id,
            name: value.name,
            url: value.url
          })
          group_map.set(fenzuName, group)
        }
        group_map.forEach((item) => {
          group_set.add(item)
        })

        const data = {
          hasGetFriendList: 1,
          friendList: {
            friends: Array.from(friend_set),
            groups: Array.from(group_set)
          }
        }
        commit(GET_FRIEND_LIST, data)
      })
  },
  getNewFriends:({commit},userId)=>{
    get_new_friends(userId)
      .then((res)=>{
        const data={
          hasGetNewFriends:1,
          newFriends:res.data
        }
        commit(GET_NEW_FRIENDS,data)
      })
  },
  updateNewFriends:({commit,state},data)=>{
    let newFriends=state.newFriends,
        indexOfNewFriends   //要更新的项的下标
    for(let [index,value] of newFriends.entries()){
      if(value.id==data.applyId){
        indexOfNewFriends=index
        break
      }
    }
    const update={
      index:indexOfNewFriends,
      status:data.status
    }
    commit(UPDATE_NEW_FRIENDS,update)
  }
}

export default {
  state,
  actions,
  mutations
}