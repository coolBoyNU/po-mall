<template >
  <div class="p_cart" >
    <div class="top-nav-header" >
      <div class="cart-title" >购物车</div >
    </div >
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

    <!--        有商品时显示-->
    <Card v-for="item in goods" :data="item" >
      <template #left >
        <van-checkbox v-model="$store.getters.sta[item.id]" @click="fan($store.getters.sta[item.id],item.id)" />
      </template >
      <template #navStepper >
        <van-stepper :value="$store.getters.allnumber[item.id]" @change="Modified($event,item.id)" min="1" max="20" />
      </template >
    </Card >
    <transition name="delAnimation" >
      <div class="del" v-show="delShow" @click="isDel" >删除</div >
    </transition >
    <!--  底部订单提交-->
    <van-submit-bar :price="rete" :disabled="BtnOrder" @submit="onSubmit" safe-area-inset-bottom button-text="提交订单" >
      <van-checkbox v-model="isCheck" @change="checkAll" >全选</van-checkbox >
    </van-submit-bar >

  </div >
</template >

<script >
import Card from '../../component/Card.vue'
import { fetchGetUserAddress } from "../../api/user";
import { fetchCommitOrder, getGoodsId } from "../../api/order.js";
import { genOrderId } from '../../util/tools.js';

export default {
  name: "Cart",
  components: {
    Card,
  },
  data() {
    return {
      isCheck: false,
      isShow: true,
      loginStetus: true,
      BtnOrder: true, //提交按钮
      addressList: [], //地址
      goods: [],
      delShow: false, //删除
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
    }
  },
  created() {
    this._fetchGetUserAddress()
  },
  methods: {
    async _getGoodsId(data) {
      //获取数据进行熏染
      let { message } = await getGoodsId(data)
      this.goods = message
    },
    Modified(e, id) {
      //加减
      let valID = { e, id }
      this.$store.commit('setModified', valID)
    },
    checkAll(checkState) {
      //复选
      this.$store.commit("checkAll", checkState)
    },
    fan(state, ID) {
      //单选
      let allVal = { state, ID }
      this.$store.commit('fan', allVal)
      let del = this.$store.state.myStore.cartGoods.some(item => item.selected)
      //只要有一个勾选就显示删除按钮
      this.delShow = del;
    },
    async onSubmit(data) {
      //提交按钮
      if (this.addressList.length === 0) {
        this.$Dialog.alert({
          message: '还未填写收货地址',
        }).then(() => {
          this.$router.push('/address')
        });
      } else {
        let orderData = {
          user_id: this.$store.state.myStore.userInfo.id,
          order_id: genOrderId(),
          address_id: this.addressList[0].id,
          total_price: this.rete / 100,
          number: this.$store.getters.totalPrices,
          goods_ids: this.$store.getters.getCart,
        };
        let { message, status } = await fetchCommitOrder(orderData);
        this.$Toast(message);
        if (status === 0) {
          this.$store.commit('clearShopCar');
          this.$router.replace('/orderlist')
        }
      }
    },
    async _fetchGetUserAddress() {
      let dataRerult = await fetchGetUserAddress(this.$store.state.myStore.userInfo.id)
      this.addressList = dataRerult;
    },
    isDel() {
      //删除
      this.$Dialog.confirm({
        message: '是否确认删除',
      }).then(() => {
        this.$store.commit('isDel')
        this.goods = this.$store.state.myStore.cartGoods
      }).catch(() => {
        // on cancel
      });

    }
  }
}
</script >

<style lang="scss" scoped >
.p_cart {
  height: 92.5vh;
  background-color: #f7f8fa;

  .top-nav-header {
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #e3e3e3;
    background-color: white;

    .cart-title {
      font-size: 16px;
      text-align: center;
    }
  }

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

  .del {
    position: fixed;
    right: 10px;
    bottom: 30%;
    width: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
    color: firebrick;
    border: 1px solid firebrick;
    border-radius: 50%;
  }

  /* 进场和出场期间动画 */
  .delAnimation-enter-active,
  .delAnimation-leave-active {
    transition: all .8s;
  }

  /* 进场时 */
  .delAnimation-enter {
    opacity: 0;
    transform: translate3d(50%, 0, 0);
  }

  /* 出场时 */
  .delAnimation-leave-to {
    opacity: 0;
    transform: translate3d(50%, 0, 0);
  }

  //提交按钮
  .van-submit-bar {
    bottom: 50px;
  }

}

</style >