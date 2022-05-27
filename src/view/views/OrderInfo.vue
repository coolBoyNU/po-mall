<template >
  <div id="orderInfo" >
    <div class="nav-top-herder" >
      <div class="left-trade" >
        {{ tradeInfo }}
      </div >
      <div class="right-trade" >
        <img src="https://res.suning.cn/project/mvs/RES/project/orderOnline/build/static/media/nodata1.b7f2be61.png"
             alt="" >
      </div >
    </div >
    <van-cell-group inset >
      <van-cell >
        <template #title v-if="goodsInfo.address_info" >
          <van-icon name="logistics" color="#f78b22" size="20" />
          {{ goodsInfo.address_info.name }}
          &nbsp
          {{ goodsInfo.address_info.tel }}
          <van-divider />
          {{
            goodsInfo.address_info.province + goodsInfo.address_info.city + goodsInfo.address_info.country + goodsInfo.address_info.addressDetail
          }}
        </template >
      </van-cell >
    </van-cell-group >

    <van-cell-group inset >
      <van-card
        v-for="item in goods_list"
        :key="item.id"
        :price="item.sell_price"
        :title="item.title"
        :thumb="item.thumb_path"
      />
      <van-cell >
        <template #title >
          <div >
            下单时间<br />
            商品总价<br />
            实付款<br />
            付款方式<br />
            运费险<br />
            订单号: <span class="odd line_ellipsis_l1" >{{ goodsInfo.order_id }}</span >
          </div >
        </template >
        <template #default >
          {{ goodsInfo.add_time | dateFormat('YYYY-MM-DD HH:mm') }}<br />
          ¥ {{ goodsInfo.total_price }}<br />
          ¥ {{ goodsInfo.actual_price }}<br />
          {{ goodsInfo.pay_way }}<br />
          ¥ 0.00<br />
          <a href="javascript:;" v-clipboard:copy="goodsInfo.order_id" v-clipboard:success="onCopy" >复制</a >
        </template >
      </van-cell >
    </van-cell-group >

    <!--    物流信息-->
    <van-popup v-model="orderShow" position="bottom" :style="{ height: '60%' }" >
      <van-steps direction="vertical" :active="0" >
        <van-cell >
          <template #title v-if="goodsInfo.address_info" >
            <van-icon name="logistics" color="#f78b22" size="20" />
            收获地址：
            <span class="logisticsCss" >
            {{
                goodsInfo.address_info.province + goodsInfo.address_info.city + goodsInfo.address_info.country + goodsInfo.address_info.addressDetail
              }}
              </span >
          </template >
        </van-cell >
        <van-step v-for="log in logistics" :key="log.time" >
          <h3 >{{ log.location }}</h3 >
          <p >{{ log.time }}</p >
        </van-step >
      </van-steps >
    </van-popup >

    <!--    底部-->
    <van-tabbar :placeholder="true" >
      <van-button v-if="goodsInfo.status ===1 &&goodsInfo.is_out===1" type="primary" size="mini"
                  @click="logisticsInfo" >物流信息
      </van-button >
      <van-button v-if="goodsInfo.status===0" type="danger" size="mini" >立即付款</van-button >
      <van-button v-if="goodsInfo.status===1" type="info" size="mini" >已完成</van-button >
      <van-button v-if="goodsInfo.status===2" size="mini" type="warning" >去评价</van-button >
      <van-button type="danger" size="mini" @click="callPhone" >客服</van-button >
    </van-tabbar >
  </div >
</template >

<script >
  import { fetchLogistics, fetchOrderInfo, getGoodsId } from '../../api/order.js'

  export default {
    name: "OrderInfo",
    data() {
      return {
        orderID: this.$route.params.id,
        goodsInfo: {},
        goods_list: [],
        orderShow: false,
        logistics: [], //物流信息
      }
    },
    computed: {
      tradeInfo() {
        let tradeMap = {
          0: '未发货',
          1: '已发货运送中',
          2: '交易成功',
        }
        return tradeMap[this.goodsInfo.status]
      }
    },
    created() {
      this._fetchOrderInfo();
    },
    methods: {
      async _fetchOrderInfo() {
        let result = await fetchOrderInfo(this.orderID)
        let { message } = await getGoodsId(result.goods_ids)
        this.goodsInfo = result;
        this.goods_list = message;
      },
      onCopy() {
        this.$toast('复制成功')
      },
      async logisticsInfo() {
        //物流信息
        let result = await fetchLogistics()
        this.logistics = result;
        this.orderShow = true;
      },
      callPhone() {
        //客服电话
        this.$Dialog.confirm({
          message: '是否确认拨打客服电话',
        })
          .then(() => {
            // on confirm
            window.location.href = 'tel:13412342234'
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  }
</script >

<style lang="scss" scoped >
  #orderInfo {
    height: 100vh;
    padding-bottom: 50px;
    background-color: #f1f1f1;

    //头部
    .nav-top-herder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 160px;
      background-color: #ffdb47;

      .left-trade {
        font-size: 18px;
        font-weight: bold;
        color: #262626;
      }

      .right-trade {
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .van-cell-group {
      transform: translateY(-40px);
      margin-bottom: 10px;
    }

    .logisticsCss {
      font-weight: bold;
      font-size: 13px;
    }

    .odd {
      position: absolute;
      width: 228px;
    }

    .van-button {
      margin-right: 10px;
    }

    ::v-deep .van-tabbar {
      justify-content: right;
      align-items: center;
    }
  }
</style >