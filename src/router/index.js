import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

// 懒加载组件
const Index = () => import('../view/Index.vue')
const Home = () => import('../view/views/Home.vue')
const Cart = () => import('../view/views/Cart.vue')
const User = () => import('../view/views/User.vue')
const Goods_list = () => import('../view/views/Goods_list.vue')

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home/index' },
    {
      path: '/home', component: Index, children: [
        {
          path: 'index', component: Home, meta: { name: 'Home', title: '首页', isMainPage: true }
        },
        {
          path: 'cart', component: Cart, meta: { name: 'Cart', title: '购物车', isMainPage: true }
        },
        {
          path: 'user', component: User, meta: { name: 'User', title: '个人中心', isMainPage: true }
        }
      ]
    },
    {
      path: '/goodslist', component: Goods_list, meta: { title: '商品' }
    }
  ]
})

export default router;