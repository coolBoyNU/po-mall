<template >
  <div class="p_Index" >

    <!--    路由-->
    <router-view ></router-view >

    <van-tabbar v-model="active" :placeholder="true" active-color="#ffcd00" >
      <van-tabbar-item icon="home-o" to="/home/index" >首页</van-tabbar-item >
      <van-tabbar-item icon="cart-o" to="/home/cart" >购物车</van-tabbar-item >
      <van-tabbar-item icon="user-o" to="/home/user" >我的po</van-tabbar-item >
    </van-tabbar >
  </div >
</template >

<script >
export default {
  name: "Index",
  data() {
    return {
      active: 0,

    }
  },
  watch: {
    '$route': {
      handler(newVal) {
        const mateMap = {
          'Home': 0,
          'Cart': 1,
          'User': 2,
        }
        let _active = mateMap[newVal.meta.name]
        this.active = _active

      },
      immediate: true
    }
  }
}
</script >

<style lang="scss" scoped >

</style >