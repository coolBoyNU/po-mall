<template >
  <div class="g-nav-card" >
    <div class="card-checkbox" >
      <!--      左边插槽-->
      <slot name="left" ></slot >
    </div >
    <div class="card-img" >
      <img :src="data.thumb_path"
           alt="" >
    </div >
    <div class="card-detailed" >
      <h3 class="title" >{{ data.title }}</h3 >
      <p class="describe" ></p >
      <div class="g-price" >
        <span class="flag" >&yen;</span >
        <span class="price" >{{ data.sell_price }}</span >
        <span class="point" >.00</span >
        <!--          {php}$price = explode('.',$vo['shopPrice']){/php}-->
        <!--          <div class="price"><span>￥</span>{$price[0]}<span>.{$price[1]}</span></div>-->
      </div >
    </div >
    <div class="card-stepper" >
      <!--      右边插槽-->
      <slot name="navStepper" >
        x{{ data.cou }}
      </slot >
    </div >
  </div >
</template >

<script >
export default {
  name: "Card",
  props: {
    data: Object,
  }
}
</script >

<style lang="scss" scoped >
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
</style >