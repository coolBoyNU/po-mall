import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
//导入 normalize 样式规范
import './assets/css/normalize/normalize.css'

//导入路由
import router from './router/index.js'

// vant 框架
import './Element/vant.js'

//scss
import './assets/css/scss/common.scss'

//动画
import 'animate.css'
//全局过滤器 时间
import './filters/index.js'

//vuex
import store from './store/index.js'

//复制订单号
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')