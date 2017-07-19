import Vue from 'vue'
import Router from 'vue-router'
import Boot from '@/components/Welcome/Boot'
import Welcome from '@/components/Welcome/Welcome'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Message from '@/components/Message/Message'
import ChatOne from '@/components/Message/ChatOne'
import ChatGroup from '@/components/Message/ChatGroup'
import ChatSetting from '@/components/Message/ChatSetting'
import Friend from '@/components/Friend/Friend'
import FriendAdd from '@/components/Friend/addFriend'
import FriendNew from '@/components/Friend/newFriend'
import FriendApply from '@/components/Friend/applyFriend'
import FriendSetting from '@/components/Friend/settingFriend'
import Social from '@/components/Social/Social'
import Profile from '@/components/User/Profile'
import Setting from '@/components/Setting/Setting'
import AccontSet from '@/components/Setting/AccontSet'

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
    path: '/chat_one/:id',
    name: 'chat_one',
    component: ChatOne
}, {
    path: '/chat_one/:id/set',
    name: 'chat_set',
    component: ChatSetting
}, {
    path: '/chat_one/:id/set/profile',
    component: Profile
}, {
    path: '/chat_one/:id/profile',
    component: Profile
}, {
    path: '/chat_group/:id',
    name: 'chat_group',
    component: ChatGroup
}, {
    path: '/chat_group/:id/profile',
    component: Profile
}, {
    path: '/friend',
    name: 'friend',
    component: Friend
}, {
    path: '/friend/:id/profile',
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
    path: '/friend/apply/:id/profile',
    component: Profile
}, {
    path: '/friend/setting/:apply_id',
    name: 'friend_setting',
    component: FriendSetting
}, {
    path: '/profile/:id',
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
}]

export default new Router({
    mode: "history",
    routes
})