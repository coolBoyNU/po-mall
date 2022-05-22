<template >
  <div class="app" >
    <van-sticky >
      <van-nav-bar
          :title="title"
          left-text="返回"
          left-arrow
          v-show="isShow"
          @click-left="$router.back()"
      />
    </van-sticky >
    <!--    Index组件-->
    <keep-alive include="Home" >
      <router-view />
    </keep-alive >
  </div >
</template >

<script >

export default {
  name: "App",
  data() {
    return {
      title: 'po商城',
      isShow: false,
    }
  },
  watch: {
    '$route': {
      handler: function (newVal) {
        // newVal.meta.isMainPage 为真就取反
        this.isShow = !newVal.meta.isMainPage;
        this.title = newVal.meta.title;
      },
      immediate: true
    }
  }

}
</script >

<style lang="scss" >
* {
  font-family: Arial, Helvetica, STHeiTi, sans-serif;
  box-sizing: border-box;

  .app {
    min-width: 350px;
    max-width: 750px;
    margin: auto;
  }
}
</style >