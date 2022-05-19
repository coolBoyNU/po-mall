<template >
  <div class="g_center" @click="HomePass" >
    <div class="g_Img" >
      <img
          v-lazy="goodsData.img_url"
          alt="" >
    </div >
    <div class="g_text" >
      <h3 class="g_title line_ellipsis_l2" >{{ goodsData.title }}</h3 >
      <van-tag type="danger" color="#7232dd" >自营</van-tag >
      <van-tag plain type="primary" color="#ff5500" >大聚会</van-tag >

      <slot >
        <span class="like" >
              <van-icon name="like-o" />
          {{ goodsData.likes }}
              </span >
        <div class="real_price" >
          <span class="flag" >&yen;</span >
          <span class="g_price" >{{ goodsData.sell_price }}</span >
          <span class="g_eval" >{{ goodsData.buy }}+卖出</span >
        </div >
      </slot >

    </div >
  </div >

</template >

<script >
export default {
  name: "Goods",
  props: {
    goodsData: Object
  },
  methods: {
    HomePass(event) {
      //传递给父组件
      this.$emit('PassDat', this.goodsData, event)
    }
  }
}
</script >

<style lang="scss" scoped >


.g_center {
  width: 48.5%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;

  .g_Img {
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .van-tag:nth-child(3) {
    margin-left: 3px;
  }

  .like {
    float: right;
    line-height: 25px;
    font-size: 12px;
    color: #db0000;
  }

  .g_text {
    padding: 0 10px;
    margin-bottom: 10px;

    .g_title {
      width: 130px;
      font-size: 14px;
      font-weight: 600;
      margin: 5px 0;
    }

    .real_price {
      margin-top: 10px;
      color: #c11e00;

      .flag {
        font-size: 12px;
        font-weight: bold;
      }

      .g_price {
        font-size: 16px;
        font-weight: bold;
        margin-left: 2px;
      }

      .g_eval {
        font-size: 13px;
        color: #bbb;
        margin-left: 8px;
      }
    }
  }
}

</style >