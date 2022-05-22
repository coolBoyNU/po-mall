import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import myStore from './module/storeModule.js'

Vue.use(Vuex)

//创建仓库
const store = new Vuex.Store({
  strict: true,
  modules: {
    myStore
  },
  //进行本地存储
  plugins: [ createPersistedState({
    key: 'cart'
  }) ]
})

export default store