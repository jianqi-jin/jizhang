import Vue from 'vue';
import AccountDetail from '@/components/AccountDetail/AccountDetail.vue';
import AccountReconcil from '@/components/AccountReconcil/AccountReconcil.vue';
import AccountList from '@/components/AccountList/AccountList.vue';
import Account from '@/components/Account/Account.vue';
import UserCenter from '@/components/UserCenter/UserCenter.vue';
import UserLogin from '@/components/UserLogin/UserLogin.vue';
import UserRegister from '@/components/UserRegister/UserRegister.vue';
import UserEdit from '@/components/UserEdit/UserEdit.vue';
import Channel from '@/components/Channel/Channel.vue';
import User from '@/components/User/User.vue';

import Sale from '@/components/Sale/Sale.vue';
import SaleGoodList from '@/components/SaleGoodList/SaleGoodList.vue';
import SaleGoodDetail from '@/components/SaleGoodDetail/SaleGoodDetail.vue';
import SaleList from '@/components/SaleList/SaleList.vue';
import SaleDetail from '@/components/SaleDetail/SaleDetail.vue';

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
            path: '/account/reconcil',
            component: AccountReconcil
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
        path: '/sale',
        component: Sale,
        children: [{
            path: '/sale/goodList',
            component: SaleGoodList
        }, {
            path: '/sale/goodDetail',
            component: SaleGoodDetail
        }, {
            path: '/sale/saleList',
            component: SaleList
        }, {
            path: '/sale/saleDetail',
            component: SaleDetail
        }, {
            path: '/sale',
            redirect: '/sale/good'
        }]
    }, {
        path: '/',
        redirect: '/user'
    }]
});

export default router;
