import * as types from './mutation-types'

//重置所有状态
export const reset = ({ commit }) => {
    commit(types.RESET)
}
