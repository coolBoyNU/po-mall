<template >
  <div class="p_home" >
    <!--    搜索框-->
    <div class="j_sear" >
      <div class="j_sear-top" >
        <div class="p_icon_top" >
          <a href="" >
            <van-icon name="apps-o" size="21px" />
            分类
          </a >
        </div >
        <div class="p-top-wrapper" >
          <img src="https://image2.suning.cn/uimg/cms/img/165268079226928831.gif" alt="" >
        </div >
        <div class="p_icon_top" >
          <router-link to="/login" >
            <van-icon name="contact" size="26px" />
            登录
          </router-link >
        </div >
      </div >
      <van-search
        shape="round"
        background="#ffdb47"
        placeholder="商品/店铺"
        @focus="$router.push('/home/index/search')"
      />
    </div >
    <!--    粘性点位search框-->
    <van-sticky >
      <van-search
        v-show="searchShow"
        background="#ffdb47"
        placeholder="华为p40"
        @focus="$router.push('/home/index/search')"
      >
        <template #left >
          <img src="../../assets/Img/logo-1.png" alt="" >
        </template >
      </van-search >
    </van-sticky >

    <!--    搜索弹框-->
    <router-view />

    <!--    轮播图-->
    <div class="p-hm-swipe" >
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ffdb47" >
        <van-swipe-item v-for="item in swipeImage" :key="item.img" >
          <img :src=" item.img " alt="" >
        </van-swipe-item >
      </van-swipe >
    </div >

    <!--    格子-->
    <div class="p_grid" >
      <van-grid :clickable="true" :border="false" :icon-size="50" >
        <van-grid-item v-for="val in GongGe" :key="val.id" :icon="val.url" :text="val.name" :to="val.to" />
      </van-grid >
    </div >


    <!--    推荐商品-->
    <van-divider >推荐商品</van-divider >
    <div class="p_center_goods" >
      <Goods v-for="item in goods_list" :goodsData="item" @PassDat="handle" />
    </div >
    <!--    回到顶部-->
    <BackTop :top="600" />

  </div >
</template >

<script >
  import { figure, goodsData } from "../../api/getHomeData.js";

  import BackTop from "../../component/BackTop.vue";

  import Goods from "../../component/Goods.vue"

  export default {
    name: "Home",
    components: {
      BackTop,
      Goods,
    },
    data() {
      return {
        searchShow: false,
        swipeImage: '',
        GongGe: [
          { id: 1, name: 'po秒杀', url: 'https://image2.suning.cn/uimg/cms/img/165050362924208528.png?from=mobile' },
          {
            id: 2, name: 'po超市', url: 'https://image3.suning.cn/uimg/cms/img/161293951076282456.png?from=mobile'
          },
          { id: 3, name: 'po拼购', url: 'https://image2.suning.cn/uimg/cms/img/161294179334814175.png?from=mobile' },
          {
            id: 4, name: '手机数码', url: 'https://image2.suning.cn/uimg/cms/img/161293957567317395.png?from=mobile',
            to: '/goodslist'
          },
          { id: 5, name: '电视家电', url: 'https://image2.suning.cn/uimg/cms/img/161293958842515136.png?from=mobile' },
          { id: 6, name: '免费水果', url: 'https://image3.suning.cn/uimg/cms/img/161293959950045622.png?from=mobile' },
          { id: 7, name: '领卷中心', url: 'https://image1.suning.cn/uimg/cms/img/161293965567020138.png?from=mobile' },
          { id: 8, name: '签到有奖', url: 'https://image3.suning.cn/uimg/cms/img/161293963977525820.png?from=mobile' },
        ],
        goods_list: [],
        page: 1,
      }
    },
    created() {
      this._figure()
      this._goodsData()
      window.addEventListener('scroll', this.scrollBottom)
    },
    destroyed() {
      //离开页面销毁
      window.removeEventListener('scroll', this.scrollBottom)
    },
    methods: {
      async _figure() {
        let { message } = await figure()
        this.swipeImage = message;
      },
      async _goodsData(pages) {
        let { message } = await goodsData(pages)
        if (message.length === 0) {
          this.$Toast.fail('加载完毕');
          return
        }
        message.forEach((item) => {
          this.goods_list = [ ...this.goods_list, item ]
        })

      },
      //监听页面滚动
      scrollBottom() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        //到达视口最大高度时进行数据递增
        if (scrollTop + clientHeight >= scrollHeight) {
          this.page++
          this._goodsData(this.page)
        }
        //到达指定高度显示
        this.searchShow = scrollTop >= 500;
      },
      //接收子组件传递的数据
      handle(data) {
        this.$router.push('/introduction/' + data.id)
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
      }
    }

    .p-top-wrapper {
      img {
        width: 230px;
      }
    }
  }

  //粘性定位搜索框
  .van-search {
    img {
      width: 35px;
      margin-right: 8px;
    }
  }

  //轮播图
  .p-hm-swipe {
    height: 125px;
    padding: 0 10px;
    background-color: #ffdb47;

    .my-swipe .van-swipe-item {
      height: 114.5px;

      img {
        width: 100%;
        max-width: 46rem;
        height: 100%;
        border-radius: 8px;
      }
    }
  }

  //推荐商品
  .van-divider {
    font-size: 16px;
    font-weight: 600;
    color: black;
  }

  //商品
  .p_center_goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    background-color: #f7f7f7;
  }

</style >