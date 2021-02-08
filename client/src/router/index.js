import Vue from 'vue';
import AccountDetail from '@/components/AccountDetail/AccountDetail.vue';
import AccountList from '@/components/AccountList/AccountList.vue';
import Account from '@/components/Account/Account.vue';
import UserCenter from '@/components/UserCenter/UserCenter.vue';
import UserLogin from '@/components/UserLogin/UserLogin.vue';
import UserEdit from '@/components/UserEdit/UserEdit.vue';
import User from '@/components/User/User.vue';
import VueRouter from 'vue-router';
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
            path: '/user/edit',
            component: UserEdit
        }, {
            path: '/user',
            redirect: '/user/center'
        }]
    }, {
        path: '/',
        redirect: '/user'
    }]
});

export default router;
