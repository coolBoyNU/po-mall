import axios from 'axios'

import { Toast } from 'vant';

//导入vuex
import store from '../store/index.js'
//路由
import router from '../router/index.js'

const instance = axios.create({
  baseURL: 'http://api.w0824.com/api',
})

//添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 若有token,添加请求头token给服务器校验(获取的有时是旧token)
  if (store.state.myStore.token) {
    config.headers['token'] = store.state.myStore.token
  }
  config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据

  Toast.loading({
    duration: 0, // 持续展示 toast
    message: 'Loading...',
    forbidClick: true,
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//添加响应拦截器
instance.interceptors.response.use(function (response) {
  Toast.clear();// 手动清除 Toast
  // 返回 token 失效时
  if (response.data.status === 40001) {
    //清空 vuex 中 token 用户信息
    store.commit('clearUerInfo')
    Toast(response.data.message)
    // 打回登录页面
    router.replace({
      path: '/login', query: {
        // 获取当前路由完整地址,便于登录成功跳回此地址
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return response.data;
}, function (error) {
  Toast.clear();// 手动清除 Toast
  return Promise.reject(error);
});

export default instance