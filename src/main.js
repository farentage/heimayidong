import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
// rem适配：动态设置 html 标签字体大小
import 'amfe-flexible'
// 封装注册Vant组件模块
import './utils/register-vant.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
