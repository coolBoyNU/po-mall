<template >
  <div class="nav-cart" >
    <van-nav-bar title="我的购物车" />
    <!--    没有商品时显示-->
    <div class="main-nav-center" v-show="isShow" >
      <div class="login" v-show="loginStetus" >
        <span >登录后同步电脑与手机购物车的商品</span >
        <router-link to="/login" >登录</router-link >
      </div >
      <div class="cart-content-empty" >
        <img src="https://oss.suning.com/vss/activity/wximg/cart/sn-cart-empty.png" alt="" >
        <span class="empty-cart-tip" >购物车还是空的，快来挑选好货吧</span >
        <div class="lead" @click="$router.push('/home/index')" >去逛逛</div >
      </div >
      <div class="reach-bottom" >
        <img src="https://oss.suning.com/vss/activity/wximg/cart/reach-bottom.png" alt="" >
      </div >
    </div >

    <!--商品-->
    <van-swipe-cell v-for="(item,i) in goods" :key="item.id" >
      <template #left >
        <van-button square type="primary" text="选择" />
      </template >
      <van-card
        :price="item.sell_price"
        desc="描述信息"
        :title="item.title"
        :thumb="item.thumb_path"
      >
        <template #num >
          <van-stepper :value="$store.getters.allnumber[item.id]" theme="round" button-size="22" disable-input
                       @change="Modified($event,item.id)" />
        </template >
        <template #tag >
          <van-checkbox :value="$store.getters.sta[item.id]" @click="checkOne($store.getters.sta[item.id],item.id)" />
        </template >
      </van-card >
      <!--    删除按钮-->
      <template #right >
        <van-button square text="删除" type="danger" class="delete-button" @click="isDel(item.id,i)" />
      </template >
    </van-swipe-cell >

    <!--  提交按钮-->
    <van-submit-bar :price="rete" :disabled="BtnOrder" @submit="onSubmit" button-text="提交订单" >
      <van-checkbox v-model="checkAll" @click="checkA" >全选</van-checkbox >
    </van-submit-bar >
  </div >
</template >

<script >
  import { fetchCommitOrder, getGoodsId } from "../../api/order";
  import { fetchGetUserAddress } from "../../api/user";
  import { genOrderId } from '../../util/tools.js';

  export default {
    name: "",
    data() {
      return {
        isShow: true, //无商品背景
        loginStetus: true, //无商品背景
        checkAll: false,//全选按钮状态
        BtnOrder: true, //提交按钮
        goods: [], //存放后台数据
        user_id: this.$store.state.myStore.userInfo.id, //用户id
        order: [], //地址
      }
    },
    computed: {
      //总价
      rete() {
        let operationResult = this.$store.state.myStore.cartGoods.reduce((amt, item) => amt += item.sell * item.number, 0)
        return operationResult * 100
      }
    },
    watch: {
      isShow: {
        handler() {
          let data = this.$store.state.myStore.cartGoods
          this.isShow = data.length === 0;
          this.BtnOrder = data.length === 0;
          if (data.length > 0) {
            this._getGoodsId(this.$store.getters.getCart)
          }
        },
        immediate: true
      },
      loginStetus: {
        handler() {
          let state = this.$store.state.myStore.token
          if (state) {
            this.loginStetus = false;
          }
        },
        immediate: true
      },
    },
    created() {
      this._fetchGetUserAddress()
    },
    methods: {
      Modified(e, id) {
        //加减
        this.$store.commit('setModified', { e, id })
      },
      checkA() {
        //全选
        this.$store.commit('checkAll', this.checkAll)
      },
      checkOne(status, i) {
        //单选
        this.$store.commit('checkOne', { status, i })
        //如果全部选中就把 全选按钮勾选 有一个未选中就取消全选按钮
        let bool = this.$store.state.myStore.cartGoods.every(item => {
          return item.selected
        })
        this.checkAll = bool;
      },
      isDel(id, i) {
        //删除
        this.goods.splice(i, 1)
        // 删除vuex
        this.$store.commit("isDel", id);
      },
      async _getGoodsId(goods_id) {
        //商品价格图片渲染
        let { message } = await getGoodsId(goods_id)
        this.goods = message
      },
      async _fetchGetUserAddress() {
        this.order = await fetchGetUserAddress(this.user_id)
      },
      async onSubmit(data) {
        //提交按钮
        if (this.order.length === 0) {
          this.$Dialog.alert({
            message: '还未填写收货地址',
          }).then(() => {
            this.$router.push('/address')
          });
        } else {
          let orderData = {
            user_id: this.user_id,
            order_id: genOrderId(),
            address_id: this.order[0].id,
            total_price: this.rete / 100,
            number: this.$store.getters.totalPrices,
            goods_ids: this.$store.getters.getCart,
          }
          let { message, status } = await fetchCommitOrder(orderData);
          this.$Toast(message);
          if (status === 0) {
            this.$store.commit('clearShopCar');
            this.$router.replace('/orderlist')
          }
        }
      }
    }
  }
</script >

<style lang="scss" scoped >
  .nav-cart {
    .van-submit-bar {
      bottom: 49px;
    }

    //删除按钮
    .goods-card {
      margin: 0;
      background-color: white;

    }

    //删除按钮大小
    .delete-button {
      height: 100%;
    }

    //没有商品显示
    .main-nav-center {
      padding: 0 10px;

      .login {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        line-height: 10px;
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 15px;
        background-color: #ffe37e;

        span {
          font-size: 12px;
          color: black;
        }

        a {
          line-height: 20px;
          font-size: 14px;
          border-radius: 3px;
          padding: 0 4px;
          color: rgba(255, 255, 255, 0.91);
          background-color: black;
        }
      }

      .cart-content-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 40vh;

        img {
          width: 100px;
          height: 100px;
        }

        .empty-cart-tip {
          width: 100%;
          font-size: 12px;
          color: #666666;
          text-align: center;
          margin: 10px 0;
        }

        .lead {
          width: 47px;
          line-height: 20px;
          border-radius: 3.5px;
          border: 1px solid #e5e5e5;
          text-align: center;
          background-color: white;
          color: #666666;
          font-size: 12px;
        }

      }

      .reach-bottom {
        display: flex;
        justify-content: center;

        img {
          width: 210px;
        }
      }
    }

  }
</style >