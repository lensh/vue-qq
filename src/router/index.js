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
import MyProfile from '@/components/User/MyProfile'
import Setting from '@/components/Setting/Setting'
import AccontSet from '@/components/Setting/AccontSet'

Vue.use(Router)

//路由
const routes = [{
    path: '/',
    name: 'Boot',
    component: Boot
}, {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
}, {
    path: '/login',
    name: 'Login',
    component: Login
}, {
    path: '/register',
    name: 'Register',
    component: Register
}, {
    path: '/message',
    name: 'Message',
    component: Message
}, {
    path: '/chatOne/:id',
    name: 'chatOne',
    component: ChatOne
}, {
    path: '/chatGroup/:id',
    name: 'chatGroup',
    component: ChatGroup
}, {
    path: '/chatSetting',
    name: 'chatSetting',
    component: ChatSetting
}, {
    path: '/friend',
    name: 'friend',
    component: Friend
}, {
    path: '/friendAdd',
    name: 'friendAdd',
    component: FriendAdd
}, {
    path: '/friendNew',
    name: 'friendNew',
    component: FriendNew
}, {
    path: '/friendApply',
    name: 'friendApply',
    component: FriendApply
}, {
    path: '/friendSetting',
    name: 'friendSetting',
    component: FriendSetting
}, {
    path: '/social',
    name: 'Social',
    component: Social
}, {
    path: '/profile',
    name: 'profile',
    component: Profile
}, {
    path: '/myProfile',
    name: 'myProfile',
    component: MyProfile
}, {
    path: '/setting',
    name: 'setting',
    component: Setting
}, {
    path: '/accontSet',
    name: 'accontSet',
    component: AccontSet
}]

export default new Router({
    mode: "history",
    routes
})
