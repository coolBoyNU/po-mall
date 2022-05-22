<template xmlns="http://www.w3.org/1999/html" >
  <div class="introGoods" >
    <div class="G-header-top" >
      <div class="backTo" @click="$router.back()" >
        <van-icon name="arrow-left" color="#fff" :size="2" />
      </div >
      <van-swipe @change="onChange" :autoplay="4000" >
        <van-swipe-item v-for="item in shuffling" @click="previewImg" >
          <img :src="item.src" alt="" >
        </van-swipe-item >
        <template #indicator >
          <div class="custom-indicator" >{{ current + 1 }}/{{ shuffling.length }}</div >
        </template >
      </van-swipe >
    </div >

    <div class="g-top" >
      <div class="real_price" >
        <span class="flag" >&yen;</span >
        <span class="g_price" >{{ goods.sell_price }}</span >
        <van-tag plain type="primary" color="#ff5500" >促销价</van-tag >
        <div class="g-price-del" >
          <span class="flag" >&yen;</span >
          <span class="price-del" >{{ goods.market_price }}</span >
        </div >
      </div >
      <div class="g-title" >
        <h3 class="title" >{{ goods.title }}</h3 >
        <a href="" class="FocusOn" >
          <van-icon name="star-o" :size="20" />
          关注
        </a >
      </div >
    </div >
    <!--    优惠卷-->
    <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px;"
    >
      <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onSale"
          @exchange="onExchange"
      />
    </van-popup >

    <!--    介绍-->
    <div class="space-top" >
      <div class="tab-header" >
        商品介绍
      </div >
      <div class="g_referral" >
        <van-divider content-position="left" >详情</van-divider >
        <div class="tab-con" v-html="goods.content" ></div >
      </div >
    </div >
    <!--    底部-->
    <van-goods-action >
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="toCar" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="toBuy" />
    </van-goods-action >

    <!--    sku-->
    <van-sku
        v-model="skuShow"
        :sku="sku"
        :goods="goodsImg"
        :goods-id="goods.id"
        :hide-stock="sku.hide_stock"
        reset-stepper-on-hide
        :show-add-cart-btn="showAddCartBtn"
        @add-cart="onAddCartClicked"
        @buy-clicked="onBuyClicked"
    >
      <template #sku-messages >
        <div class="card" >
          <van-divider content-position="left" >详情</van-divider >
          <div >商品货号：{{ goods.goods_no }}</div >
          <div >库存：{{ goods.stock_quantity }}件</div >
          <div >上架时间：{{ goods.add_time | dateFormat('YYYY-MM-DD') }}</div >
        </div >
      </template >
    </van-sku >
  </div >
</template >

<script >
import { gDetails, gIntroduction } from "../../api/getHomeData";

const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',// 满足条件
  reason: '', //优惠卷不可用时展示
  value: 150, // 优惠卷单位
  name: '优惠券名称', //优惠卷名
  startAt: 1489104000, //有效时间
  endAt: 1514592000, //失效时间
  valueDesc: '5.5', // 优惠卷金额
  unitDesc: '元', //单位文案
};

export default {
  name: "Introduction",
  props: [ 'id' ],
  data() {
    return {
      isShow: false,
      current: 0,
      chosenCoupon: -1,
      coupons: [ coupon ],
      disabledCoupons: [ coupon ],
      showList: false,
      shuffling: [],
      skuShow: false,
      showAddCartBtn: false,
      goods: [],
      goodsImg: {
        // 默认商品 sku 缩略图
        picture: ''
      },
      sku: {
        tree: [],//数据据文档
        price: '2', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        hide_stock: false // 是否隐藏剩余库存
      }
    }
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onSale(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    previewImg() {
      let imgs = this.shuffling.map(item => item.src);
      this.$ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
    //回去轮播数据
    async _gIntroduction(num) {
      let { message } = await gIntroduction(num)
      this.shuffling = message
      //第一张图片作为商品购买弹出框的头部图片
      this.goodsImg.picture = message[0].src;
    },
    //详情
    async _gDetails(num) {
      let { message } = await gDetails(num)
      this.goods = message
      // 购买商品弹出穿赋值
      this.sku.price = message.sell_price;
      this.sku.stock_num = message.stock_quantity;
    },
    //跳转购物车
    onClickIcon() {
      this.$router.push('/home/cart')
    },
    //加入购物车
    toCar() {
      this.showAddCartBtn = true;
      this.skuShow = true;
    },
    //立即购买
    toBuy() {
      this.showAddCartBtn = false;
      this.skuShow = true;
    },
    //点击购买后
    onBuyClicked(e) {
      let { goodsId, selectedNum } = e;
      let cartItem = { id: goodsId, number: selectedNum, sell: this.goods.sell_price, selected: true }
      //把数据添加到vuex
      this.$store.commit('getPrint', cartItem)
      //跳转到购物车页面
      this.$router.push('/home/cart')
    },
    //加入购物车
    onAddCartClicked(e) {
      let { goodsId, selectedNum } = e;
      let cartItem = { id: goodsId, number: selectedNum, sell: this.goods.sell_price, selected: true }
      this.$store.commit('getPrint', cartItem)
      this.skuShow = false;
    }

  },
  created() {
    this._gIntroduction(this.id)
    this._gDetails(this.id)
  }
}
</script >

<style lang="scss" scoped >
.introGoods {
  background-color: #ededed6e;

  .backTo {
    position: absolute;
    top: 8px;
    left: 10px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #00000054;
    border-radius: 50%;
    z-index: 1;
  }

  //轮播图
  .van-swipe-item {
    height: 400px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

  //标题内容
  .g-top {
    padding: 10px;
    background-color: white;
    margin-bottom: 8px;

    .real_price {
      font-size: 20px;
      font-weight: bold;
      color: #ff4422;

      .flag {
        font-size: 12px;
      }

      .g_price {
        margin-right: 8px;
      }

      .g-price-del {
        display: inline-block;
        color: #ccc;
        text-decoration: line-through; //中划线
        font-size: 12px;
        margin-left: 5px;
      }
    }

    .g-title {
      .title {
        width: 320px;
        font-size: 16px;
        display: inline-block;
      }

      .FocusOn {
        width: 35px;
        font-size: 12px;
        font-weight: 600;
        color: #bbb;
        display: inline-block;
        text-align: center;
      }
    }
  }

  //商品介绍
  .space-top {
    line-height: 40px;
    background-color: white;
    margin-top: 8px;

    .tab-header {
      font-size: 16px;
      color: black;
      text-align: center;
    }

    .g_referral {
      border-radius: 6px;
      margin-bottom: 8px;
      background: #fff;
      padding: 8px;


      .tab-con {
        color: #666;

        ::v-deep img {
          width: 100%;
          height: 100%;
        }

        ::v-deep table {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style >