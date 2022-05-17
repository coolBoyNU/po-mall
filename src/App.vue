<template >
  <div class="app" >
    <van-nav-bar
        :title="title"
        left-text="返回"
        right-text="按钮"
        left-arrow
        v-show="isShow"
        @click-left="$router.back()"
    />

    <!--    Index组件-->
    <router-view ></router-view >

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
.app {
  min-width: 350px;
  max-width: 750px;
  margin: auto;
}
</style >