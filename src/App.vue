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
    <keep-alive include="Index,Goods_list" >
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
        isOnLine: navigator.online
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
      },
      // watch监听网络的状态
      isOnLine() {
        this.isOnLine === false && this.$Toast.fail("网络异常，请检查网络");
        this.isOnLine === true && this.$Toast.success("网络已经连接");
      }
    },
    mounted() {
      window.addEventListener('online', this.updateNetworkStatu);
      window.addEventListener('offline', this.updateNetworkStatu);
    },
    methods: {
      updateNetworkStatu(e) {
        //网络是否在线
        this.isOnLine = e.type === 'online'
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