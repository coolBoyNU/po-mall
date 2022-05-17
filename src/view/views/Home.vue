<template >
  <div class="p_home" >
    <!--    搜索框-->
    <div class="j_sear" >
      <div class="j_sear-top" >
        <div class="p_icon_top" >
          <a href="" >
            <van-icon name="apps-o" size="26px" />
            分类
          </a >
        </div >
        <div class="p-top-wrapper" >
                    <img src="https://image2.suning.cn/uimg/cms/img/165268079226928831.gif" alt="" >
        </div >
        <div class="p_icon_top" >
          <a href="" >
            <van-icon name="contact" size="26px" />
            登录
          </a >
        </div >
      </div >
      <van-search
          v-model="value"
          shape="round"
          background="#ffdb47"
          placeholder="商品/店铺"
      />
    </div >
    <!--    轮播图-->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item >1</van-swipe-item >
      <van-swipe-item >2</van-swipe-item >
      <van-swipe-item >3</van-swipe-item >
      <van-swipe-item >4</van-swipe-item >
    </van-swipe >

    <!--    格子-->
    <div class="p_grid" >
      <van-grid :gutter="10" :clickable="true" >
        <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="商品" />
      </van-grid >
    </div >

    <router-link to="/goodslist" >我的商品</router-link >
  </div >
</template >

<script >
export default {
  name: "Home",
  data() {
    return {
      value: '',
    }
  }
}
</script >

<style lang="scss" scoped >

// 搜索框
.j_sear-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 12px 12px 0 20px;
  background-color: #ffdb47;

  .p_icon_top {
    width: 30px;

    a {
      font-size: 12px;
      color: #fbfbfbed;
      font-weight: bold;
    }
  }

  .p-top-wrapper {
    img {
      width: 230px;
    }
  }
}

//轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

//格子
.p_grid {
  margin: 5px 0;
}

</style >