<template >
  <div class="p_user" >
    <van-nav-bar
        title="个人中心"
    />
    <!--      个人信息-->
    <div class="my-center" >
      <div class="via-top-header" >
        <div class="p-nav-header" >
          <img
              :src="HeadPortrait"
              alt="" >
        </div >
        <div class="title" >
          <span >{{ title }}</span >
        </div >
        <div class="Theorder" @click="$router.push('/orderlist')" >
          <p >
            <van-icon name="cart-circle-o" />
            我的订单
          </p >
        </div >
      </div >
    </div >

    <!--    选项-->
    <van-cell-group inset >
      <van-cell title="个人资料" clickable @click="$router.push('/myinfo')" />
      <van-cell title="收货地址" clickable @click="$router.push('/addresslist')" />
      <van-cell title="人工客服" clickable @click="hint" />
      <van-cell title="退出登录" clickable @click="exit" >
      </van-cell >
    </van-cell-group >
    <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        description="是否确认退出"
        close-on-click-action
        @select="exitBtn"
    />
  </div >
</template >

<script >
import { Dialog } from 'vant';

export default {
  name: "User",
  data() {
    return {
      show: false,
      actions: [
        { name: '确认退出' },
      ],
      title: this.$store.state.myStore.userInfo.username,
      HeadPortrait: 'http://api.w0824.com/' + this.$store.state.myStore.userInfo.avatar
    }
  },
  methods: {
    exit() {
      this.show = true;
    },
    hint() {
      Dialog.alert({
        title: '温馨提示',
        message: '开发人员比较懒，你所需要的内容正在开发中。敬请期待！',
      }).then(() => {
        // on close
      });
    },
    exitBtn() {
      //清空 vuex 中 token 用户信息
      this.$store.commit('clearUerInfo')
      this.$router.push('/login')
    }
  }
}
</script >

<style lang="scss" scoped >
.p_user {
  height: 92.5vh;
  background-color: #f9f9f9;

  .van-nav-bar {
    background-color: #ffdb47;
  }

  .my-center {
    padding: 10px 17px;

    .via-top-header {
      position: relative;
      display: flex;
      width: 100%;
      height: 150px;
      background-color: white;
      border: 1px solid #cccccc;
      border-radius: 8px;
      padding: 20px;

      .p-nav-header {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        color: #6e6e6e;
        margin: 20px;
      }

      .Theorder {
        position: absolute;
        right: 20px;
        bottom: 10px;

        p {
          width: 100px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #cccccc;
          border-radius: 3px;
          font-size: 13px;
          color: black;
          background-color: #ffdb47;
        }
      }
    }
  }

  .van-cell-group {
    border: 1px solid #cccccc;
  }
}

.van-action-sheet__description {
  font-size: 20px;

}
</style >