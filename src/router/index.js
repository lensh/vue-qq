import Vue from 'vue'
import Router from 'vue-router'

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
const asyncComponent = (name) => {
    return resolve => require([`@/components/${name}`], resolve)
}

//异步加载组件
const Boot = asyncComponent('Welcome/Boot'),
    Welcome = asyncComponent('Welcome/Welcome'),
    Login = asyncComponent('Login/Login'),
    Register = asyncComponent('Register/Register'),
    Message = asyncComponent('Message/Message'),
    ChatOne = asyncComponent('Message/ChatOne'),
    ChatGroup = asyncComponent('Message/ChatGroup'),
    ChatSetting = asyncComponent('Message/ChatSetting'),
    Friend = asyncComponent('Friend/Friend'),
    FriendAdd = asyncComponent('Friend/addFriend'),
    FriendNew = asyncComponent('Friend/newFriend'),
    FriendApply = asyncComponent('Friend/applyFriend'),
    FriendSearch = asyncComponent('Friend/searchFriend'),
    FriendSetting = asyncComponent('Friend/settingFriend'),
    Social = asyncComponent('Social/Social'),
    Profile = asyncComponent('User/Profile'),
    Setting = asyncComponent('Setting/Setting'),
    AccontSet = asyncComponent('Setting/AccontSet'),
    AddUser = asyncComponent('Setting/AddUser')

Vue.use(Router)

//路由
const routes = [{
    path: '/',
    name: 'boot',
    component: Boot
}, {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/register',
    name: 'register',
    component: Register
}, {
    path: '/message',
    name: 'message',
    component: Message
}, {
    path: '/chat_one/:user_id',
    name: 'chat_one',
    component: ChatOne
}, {
    path: '/chat_one/:user_id/set',
    name: 'chat_set',
    component: ChatSetting
}, {
    path: '/chat_one/:user_id/set/profile',
    component: Profile
}, {
    path: '/chat_one/:user_id/profile',
    component: Profile
}, {
    path: '/chat_group/:group_id',
    name: 'chat_group',
    component: ChatGroup
}, {
    path: '/friend',
    name: 'friend',
    component: Friend
}, {
    path: '/friend/:user_id/profile',
    component: Profile
}, {
    path: '/friend/add',
    name: 'friend_add',
    component: FriendAdd
}, {
    path: '/friend/new',
    name: 'friend_new',
    component: FriendNew
}, {
    path: '/friend/new/add',
    component: FriendAdd
}, {
    path: '/friend/apply/:id',
    name: 'friend_apply',
    component: FriendApply
}, {
    path: '/friend/apply/:user_id/profile',
    component: Profile
}, {
    path: '/friend/setting/:apply_id',
    name: 'friend_setting',
    component: FriendSetting
}, {
    path: '/friend/add/search',
    name: 'friend_search',
    component: FriendSearch
}, {
    path: '/profile/:user_id',
    component: Profile
}, {
    path: '/social',
    name: 'social',
    component: Social
}, {
    path: '/setting',
    name: 'setting',
    component: Setting
}, {
    path: '/accont_set',
    name: 'accont_set',
    component: AccontSet
}, {
    path: '/accont_set/add_user',
    name: 'add_user',
    component: AddUser
}]

export default new Router({
    mode: "history",
    routes
})