<template >
  <div class="p_cart" >
    <div class="top-nav-header" >
      <div class="cart-title" >购物车</div >
    </div >
    <!--    没有商品时显示-->
    <div class="main-nav-center" v-show="false" >
      <div class="login" >
        <span >登录后同步电脑与手机购物车的商品</span >
        <a href="" >登录</a >
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
    <div class="g-nav-card" v-for="item in $store.state.myStore.cartGoods" >
      <div class="card-checkbox" >
        <van-checkbox v-model="$store.getters.sta[item.id]" @click="cheState($store.getters.sta[item.id],item.id)" />
      </div >
      <div class="card-img" >
        <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?w=298&h=180&c=7&r=0&o=5&pid=1.7"
             alt="" >
      </div >
      <div class="card-detailed" >
        <h3 class="title" >商品标题</h3 >
        <p class="describe" >描述</p >
        <div class="g-price" >
          <span class="flag" >&yen;</span >
          <span class="price" >{{ item.sell }}</span >
          <span class="point" >.00</span >
          <!--          {php}$price = explode('.',$vo['shopPrice']){/php}-->
          <!--          <div class="price"><span>￥</span>{$price[0]}<span>.{$price[1]}</span></div>-->
        </div >
      </div >
      <div class="card-stepper" >
        <van-stepper :value="item.number" @change="Modified($event,item.id)" min="1" max="20" />
      </div >
    </div >

    <!--  底部订单提交-->
    <van-submit-bar :price="rete" safe-area-inset-bottom button-text="提交订单" >
      <van-checkbox v-model="isCheck" @click="allBtn" >全选</van-checkbox >
    </van-submit-bar >

  </div >
</template >

<script >


export default {
  name: "Cart",
  data() {
    return {
      isCheck: true,
    }
  },
  methods: {
    cheState(state, id) {
      let val = { state, id }
      //复选框选中状态
      this.$store.commit('cartState', val)
      let valResult = this.$store.state.myStore.cartGoods.every(item => item.selected)
      //如果为真就改为 true 否者 false
      this.isCheck = !!valResult
    },
    Modified(e, id) {
      //加减
      let valID = { e, id }
      this.$store.commit('setModified', valID)

    },
    allBtn() {
      //点击全选全部选
      this.$store.commit('setCheck')

    }
  },
  computed: {
    //总价
    rete() {
      let operationResult = this.$store.state.myStore.cartGoods.reduce((amt, item) => amt += item.sell * item.number, 0)
      return operationResult * 100
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

  //提交按钮
  .van-submit-bar {
    bottom: 50px;
  }

  //商品卡片
  .g-nav-card {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 10px;
    margin-top: 5px;
    background-color: white;
    overflow: hidden;
    box-shadow: black 0 0 3px -2px;

    .card-checkbox {
      line-height: 100px;
    }

    .card-img {
      width: 84px;
      height: 84px;
      border-radius: 6px;
      margin: 0 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .card-detailed {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      font-size: 14px;
      margin: 0;

      .title {
        width: 170px;
        height: 20px;
        color: #323233;
        font-size: 14px;
        margin: 0;
        /*1.先强制一行内显示文本*/
        white-space: nowrap;
        /*2.超出的部分隐藏*/
        overflow: hidden;
        /*3.文字用省略号替代超出的部分*/
        text-overflow: ellipsis;
      }

      .describe {
        width: 170px;
        height: 33px;
        color: #646566;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;

        /*弹性伸缩盒子模型显示*/
        display: -webkit-box;

        /*限制在一个块元素显示的文本的行数*/
        -webkit-line-clamp: 2;

        /*设置或检索伸缩盒对象的子元素的排列方式*/
        -webkit-box-orient: vertical;
      }

      .g-price {
        font-size: 16px;
        color: #ff505a;
        margin-top: 10px;

        .flag {
          font-size: 12px;
          margin-right: 2px;
        }

        .point {
          font-size: 12px;
        }
      }
    }

    .card-stepper {
      position: absolute;
      right: 10px;
      color: #9b9c9d;
      bottom: 5px;
    }
  }

}
</style >