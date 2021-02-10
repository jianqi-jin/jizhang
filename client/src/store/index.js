import Vue from 'vue';
import Vuex from 'vuex'
import {login, getUserInfo, getAccountDetailList} from '@/request/request';
import router from '../router';

Vue.use(Vuex);

const store = {
    state: {
        userInfo: {},
        requestLoading: false,
        accountDetailInfo: {
            list: [],
            total: 0
        }
    },
    getters: {
        isLogin: state => {
            return !!state.userInfo?.userid;
        },
        userInfo: state => state.userInfo,
        loading: state => state.requestLoading,
        accountDetailInfo: state => state.accountDetailInfo
    },
    mutations: {
        setUserInfo(state, userInfo = {}) {
            state.userInfo = userInfo;
        },
        requestStart(state) {
            state.requestLoading = true;
        },
        requestEnd(state) {
            state.requestLoading = false;
        },
        setAccountDetailList(state, {list, total}) {
            state.accountDetailInfo = {
                list,
                total
            }
        }
    },
    actions: {
        login: ({commit}, form) => {
            login(form).then(({err, msg, data}) => {
                if (err !== 0) {
                    return vueInstance.$message.error(msg);
                }
                commit('setUserInfo', data);
                vueInstance.$message({
                    type: 'success',
                    message: `欢迎回来! ${data.nickname}~`
                });
                vueInstance.$router.go(-1);
            });
        },
        checkLogin: ({dispatch, getters}) => {
            if (getters.isLogin) {
                return;
            }
            dispatch('getUserInfo');
        },
        getUserInfo: ({commit}) => {
            getUserInfo().then(({code, msg, data}) => {
                if (code === 0) {
                    commit('setUserInfo', data);
                }
                else {
                    router.push('/user/login');
                }
            });
        },
        getAccountDetailList({commit, getters}, {
            pn = 0,
            rn = 10
        } = {}) {
            commit('requestStart');
            getAccountDetailList({
                pn,
                rn
            }).then(({code, msg, data, total}) => {
                if (code !== 0) {
                    return vueInstance.$message.error(msg);
                }
                commit('setAccountDetailList', {list: data, total});
            }).finally(() => {
                commit('requestEnd');
            })
        }
    }
}

export default new Vuex.Store(store);
