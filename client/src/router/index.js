import Vue from 'vue';
import AccountDetail from '@/components/AccountDetail/AccountDetail.vue';
import AccountList from '@/components/AccountList/AccountList.vue';
import Account from '@/components/Account/Account.vue';
import UserCenter from '@/components/UserCenter/UserCenter.vue';
import UserLogin from '@/components/UserLogin/UserLogin.vue';
import UserRegister from '@/components/UserRegister/UserRegister.vue';
import UserEdit from '@/components/UserEdit/UserEdit.vue';
import Channel from '@/components/Channel/Channel.vue';
import User from '@/components/User/User.vue';
import VueRouter from 'vue-router';

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/account',
        component: Account,
        children: [{
            path: '/account/detail',
            component: AccountDetail
        }, {
            path: '/account/list',
            component: AccountList
        }, {
            path: '/account',
            redirect: '/account/list'
        }]
    }, {
        path: '/user',
        component: User,
        children: [{
            path: '/user/center',
            component: UserCenter
        }, {
            path: '/user/login',
            component: UserLogin
        }, {
            path: '/user/register',
            component: UserRegister
        }, {
            path: '/user/edit',
            component: UserEdit
        }, {
            path: '/user/channel',
            component: Channel
        }, {
            path: '/user',
            redirect: '/user/center'
        }]
    }, {
        path: '/',
    }, {
        path: '/',
        redirect: '/user'
    }]
});

export default router;
