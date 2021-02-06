// import axios from 'axios';
import Vue from 'vue';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
Vue.use(elementUI);

new Vue({
    render: h => h(App)
}).$mount('#root');
