import Vue from 'vue'
import VueRouter from "vue-router"
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/index.js'

Vue.use(VueRouter)
Vue.use(Nprogress)

// 懒加载组件
const Index = () => import('../view/Index.vue')
const Home = () => import('../view/views/Home.vue')
const Cart = () => import('../view/views/Cart.vue')
const User = () => import('../view/views/User.vue')
const Goods_list = () => import('../view/views/Goods_list.vue')
const Introduction = () => import('../view/views/Introduction.vue')
const Login = () => import('../view/views/Login.vue')
const Register = () => import('../view/views/Register.vue')
const myData = () => import('../view/myinfo/MyData.vue')
const AddressList = () => import('../view/myinfo/AddressList.vue')
const orderList = () => import('../view/views/orderList.vue')
const Address = () => import('../view/myinfo/Address.vue')
const EditAddress = () => import('../view/myinfo/EditAddress.vue')
const OrderInfo = () => import('../view/views/OrderInfo.vue')
const Search = () => import('../view/views/Search.vue')
const searchResult = () => import('../view/views/searchResult.vue')
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home/index' },
    {
      path: '/home', component: Index, children: [
        {
          path: 'index', component: Home, meta: { name: 'Home', title: '首页', isMainPage: true }, children: [
            { path: '/home/index/search', component: Search, meta: { isMainPage: true } },
          ]
        },
        {
          path: 'cart', component: Cart, meta: { name: 'Cart', title: '购物车', isMainPage: true, requireAuth: true }
        },
        {
          path: 'user', component: User, meta: { name: 'User', title: '个人中心', isMainPage: true, requireAuth: true }
        }
      ]
    },
    {
      path: '/goodslist', component: Goods_list, meta: { title: '手机数码' }
    },
    { path: '/introduction/:id', component: Introduction, props: true, meta: { isMainPage: true } },
    { path: '/login', component: Login, meta: { pageTitle: '用户登录', isShowNavBar: true } },
    { path: '/register', component: Register, meta: { pageTitle: '注册', isShowNavBar: true } },
    { path: '/myinfo', component: myData },
    { path: '/orderlist', component: orderList },
    { path: '/addresslist', component: AddressList },
    { path: '/address', component: Address },
    { path: '/editaddress/:id', component: EditAddress, props: true },
    { path: '/orderInfo/:id', component: OrderInfo, meta: { title: '订单详情' } },
    { path: '/searchresult/:id', component: searchResult, meta: { isMainPage: true } },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 跳转其它页面后 回退时，回到当前预览位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

Nprogress.configure({
  showSpinner: false
})

// 前守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  // 判断需要权限的token
  let isRequireAuth = !!to.meta.requireAuth
  if (isRequireAuth) {
    if (store.state.myStore.token) {
      next();
    } else {
      // 获取之前的上一次的访问页面，登录成功，便于在回到之前的页面
      router.push('/login?redirect?' + to.fullPath)
    }
  } else {
    //不需要权限
    next()
  }
})

//后守卫
router.afterEach((to, from) => {
  Nprogress.done()
})
export default router;