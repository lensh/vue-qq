import * as types from '../mutation-types'

// state
const state = {
	'position': [ //保存各个页面的滚动位置
		{
			'name': 'message', //组件名称
			'pos': 0 //滚动位置
		}, {
			'name': 'friend', //联系人页要保存6个位置
			'pos': [0, 0, 0, 0, 0, 0]
		}, {
			'name': 'newFriend',
			'pos': 0
		}, {
			'name': 'chatOne',
			'pos': 0
		}, {
			'name': 'chatGroup',
			'pos': 0
		}, {
			'name': 'setting',
			'pos': 0
		}, {
			'name': 'accountSet',
			'pos': 0
		}, {
			'name': 'searchFriend',
			'pos': 0
		}
	]
}

// mutations
const mutations = {
	[types.SAVE_SCROLL_POSITION](state, data) {
		const {component,position,tabIndex} = data

		const indexOfComponent = state.position.findIndex((item) => {
			return item.name == component
		})

		if (component != 'friend') {
			(state.position)[indexOfComponent].pos = position
		} else {
			(state.position)[indexOfComponent]['pos'][tabIndex - 1] = position

			//如果其它标签页的位置为0，则也设置为这个position
			const arr = (state.position)[indexOfComponent]['pos']
			for (let [index, value] of arr.entries()) {
				if (value == 0) {
					(state.position)[indexOfComponent]['pos'][index] = position
				}
			}
		}

	}
}

export default {
	state,
	mutations
}