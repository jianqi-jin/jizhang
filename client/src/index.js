// import axios from 'axios';
import router from './router/index';
import Vue from 'vue';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';
import "regenerator-runtime/runtime";
Vue.use(elementUI);
window.vueInstance = {};

window.vueInstance = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#root');

router.afterEach((to, from) => {
    if (/(user\/center|account)/i.test(to.path)) {
        store.dispatch('checkLogin');
    }
});
