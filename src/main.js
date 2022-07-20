import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
// 导入 elementUI 三件套
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入拦截器permission.js文件
import './router/permission'

// 获取本地的存储数据
let userinfo = localStorage.getItem('userinfo');
// 如果本地数据存在，那么把数据转为对象，然后在存入vuex
if (userinfo) {
  userinfo = JSON.parse(userinfo);
  store.commit('LoginModule/setUser', userinfo);
}

// 写api
import api from './api/index'
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
