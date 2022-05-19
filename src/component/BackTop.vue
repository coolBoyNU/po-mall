<template >
  <div v-show="isShow" class="backTop" @click="to_Back" >
    <slot >
      <van-icon name="back-top" />
    </slot >
  </div >
</template >

<script >
export default {
  name: "BackTop",
  props: {
    top: {
      type: Number,
      default: 800,
    }
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    //监听页面滚动
    Scrollbottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 简写 大于指定高度就显示 否者就隐藏
      this.isShow = scrollTop > this.top;
    },
    //点击返回顶部
    to_Back() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  created() {
    window.addEventListener('scroll', this.Scrollbottom);
  },
  destroyed() {
    //离开页面后销毁
    window.removeEventListener('scroll', this.Scrollbottom);
  }
}
</script >

<style lang="scss" scoped >

.backTop {
  position: fixed;
  right: 10px;
  bottom: 120px;
  width: 38px;
  line-height: 38px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;

  .van-icon {
    font-weight: bold;
  }
}
</style >