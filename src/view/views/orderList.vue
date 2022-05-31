<template >
  <div >
    <van-tabs v-model="active" @change="onClickChange" >
      <van-tab v-for="item in onderTabs" :title="item.title" :key="item.title" >
        <van-card v-for="item in findStatusOrderComputed" :key="item.order_id"
                  :num="item.number"
                  :price="item.total_price"
                  :desc="item.pay_way"
                  :title="item.goodsInfo.message[0].title"
                  :thumb="item.goodsInfo.message[0].thumb_path"
                  @click="$router.push('/orderInfo/'+item.order_id)"
        >
          <template #tags >下单时间：{{ item.add_time | dateFormat( 'YYYY-MM-DD HH:mm') }}</template >
          <template #footer >
            <van-button
              size="mini"
              type="primary"
              v-if="item.status === 1||item.status===2"
              v-clipboard:copy="item.order_id"
              v-clipboard:success="onCopy"
            >
              复制订单号
            </van-button >
            <van-button size="mini" type="danger" v-if="item.status ===0" @click.stop="pay(item)" >立即付款
            </van-button >
            <van-button size="mini" type="info" v-if="item.status ===2" >已完成</van-button >
            <van-button v-if="item.status===2" size="mini" type="warning" >去评价</van-button >
            <van-button size="mini" type="danger" @click.stop="callPhone" >客服</van-button >
          </template >
        </van-card >
      </van-tab >
    </van-tabs >
  </div >
</template >

<script >
  import { fetchPayOrder, fetchUserorder, getGoodsId } from "../../api/order";

  export default {
    name: "orderList",
    data() {
      return {
        active: 2,
        onderTabs: [
          { title: '全部', status: 'all' },
          { title: '未付款', status: '0' },
          { title: '已付款', status: '1' },
          { title: '完成', status: '2' },
        ],
        allOrder: [],
        status: '1', //记录状态
      };
    },
    computed: {
      // 通过订单状态status筛选订单
      findStatusOrderComputed() {
        if (this.status == 'all') {
          return this.allOrder;
        }
        return this.allOrder.filter(item => item.status == this.status)
      }
    },
    created() {
      this._fetchUserorder()
    },
    methods: {
      onClickChange(item, text) {
        //记录状态
        let statusMap = {
          '全部': 'all',
          '未付款': '0',
          '已付款': '1',
          '完成': '2',
        }
        this.status = statusMap[text]
      },
      async _fetchUserorder() {
        // 获取订单
        let orderData = await fetchUserorder(this.$store.state.myStore.userInfo.id)
        let promiseArr = [];
        orderData.forEach(item => {
          promiseArr.push(getGoodsId(item.goods_ids))
        })
        //并发获取关联商品
        let goodsOrder = await Promise.all(promiseArr)
        // 合并订单和订单商品
        orderData.map((item, index) => {
          item.goodsInfo = goodsOrder[index];
          return item
        })
        this.allOrder = orderData;
      },
      onCopy() {
        //复制订单号
        this.$toast('复制成功')
        event.stopPropagation(); // 阻止事件冒泡
      },
      callPhone() {
        //客服电话
        this.$Dialog.confirm({
          message: '是否确认拨打客服电话',
        }).then(() => {
          window.location.href = 'tel:13412342234'
        }).catch(() => {
          // on cancel
        });
      },
      pay(value) {
        //付款
        this.$dialog.confirm({
          message: '确认支付'
        }).then(async () => {
          // 调用付款接口，真是业务 强烈使用try-catch 去捕获异常
          try {
            await fetchPayOrder(value.order_id)
            //支付成功
            this.$Toast.success({
              message: '支付成功',
              icon: 'wechat-pay'
            });
            //修改订单 发货 收货状态
            value.status = 1;
            value.is_take = 1;
            value.is_out = 1;
          } catch (err) {
            // 支付异常
          }
        }).catch(() => {
          this.$Toast('支付取消')
        })
      }
    }
  }
</script >

<style lang="scss" scoped >

</style >