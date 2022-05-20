<template >
  <div class="p_goods-list" >
    <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
    >
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <div class="p_center_goods" >
          <goods v-for="item in list" :goodsData="item" @PassDat="handle" />
        </div >
      </van-list >
    </van-pull-refresh >
  </div >
</template >

<script >
import Goods from '../../component/Goods.vue'
import { poColes } from "../../api/getHomeData";

export default {
  name: "Goods_list",
  components: {
    Goods,
  },
  data() {
    return {
      list: [],
      isLoading: false, //是否处于加载中状态
      loading: false,
      finished: false,
      lists: 0,
      aFew: 6,
    }
  },
  methods: {
    async _poColes(data, num) {
      if (this.isLoading) {
        //清空数据
        this.list = [];
        this.isLoading = false;
      }
      let { message } = await poColes(data, num)
      message.forEach(key => {
        this.list = [ ...this.list, key ]
      })
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (message.length === 0) {
        //移除最后一个数组元素：
        this.list.length % 2 === 1 && this.list.pop()
        this.finished = true;
      }
    }, onRefresh() {
      this.lists = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad()
    },
    onLoad() {
      this.lists++
      this._poColes(this.lists, this.aFew)
    },
    handle(ID) {
      //跳转详情页
      this.$router.push('/introduction/' + ID.id)
    }
  }
}
</script >

<style lang="scss" scoped >
.p_goods-list {
  background-color: #ededed6e;

  //商品
  .p_center_goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    background-color: #f7f7f7;
  }
}
</style >