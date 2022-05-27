<template >
  <div >
    <form action="/" >
      <van-search
        v-model="keyValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.replace('/home/index')"
      />
    </form >
    <van-dropdown-menu >
      <van-dropdown-item v-model="searchValue" :options="option" @change="change" />
    </van-dropdown-menu >

    <div class="p_center_goods" >
      <Goods v-for="item in goodsList" :goodsData="item" @PassDat="handle" />
    </div >
  </div >
</template >

<script >
  import Goods from "../../component/Goods.vue";
  import { fetchSearchGoods } from "../../api/getHomeData";

  export default {
    name: "",
    components: {
      Goods,
    },
    data() {
      return {
        keyValue: this.$route.params.id,
        searchValue: 'buy', //默认buy字段排序
        order: 'desc', //默认降序
        option: [
          { text: '全部商品', value: 'buy' },
          { text: '好评', value: 'likes' },
          { text: '价格', value: 'sell_price' },
        ],
        page: 1,
        pageSize: 10,
        goodsList: [],
      }
    },
    created() {
      this._fetchSearchGoods()
    },
    activated() {
      //keep激活
      this.keyValue = this.$route.params.id
      this._fetchSearchGoods()
    },
    methods: {
      async _fetchSearchGoods() {
        let data = {
          value: this.keyValue,
          sort: this.searchValue,
          order: this.order,
          page: this.page,
          pagesize: this.pageSize,

        }
        let result = await fetchSearchGoods(data)
        this.goodsList = result;
      },
      onSearch() {
        //回车时触发
        this._fetchSearchGoods()
      },
      handle(data) {
        this.$router.push('/introduction/' + data.id)
      },
      change(value) {
        this.searchValue = value
        this._fetchSearchGoods()
      }
    }
  }
</script >

<style lang="scss" scoped >
  //商品
  .p_center_goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    background-color: #f7f7f7;
  }
</style >