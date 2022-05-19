import Vue from 'vue'
import App from './App.vue'

//导入 normalize 样式规范
import './assets/css/normalize/normalize.css'

//导入路由
import router from './router/index.js'

// vant 框架
import './Element/vant.js'

//scss
import './assets/css/scss/common.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')