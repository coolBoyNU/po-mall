<template >
  <div >
    <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />
  </div >
</template >
<script >
import { areaList } from "@vant/area-data";
import { delAdress, fetchGetUserAddress, fetchUpdateAddress } from '../../api/user.js'

export default {
  name: "EditAddress",
  props: [ 'id' ],
  data() {
    return {
      areaList,
      searchResult: [],
      initialInfo: [],
      areaCode: '', // 记录省市区编码 格式： 110000-111200-111233
    };
  },
  computed: {
    addressInfo() {
      //回显
      let alterResult = this.initialInfo.map(item => {
        item.isDefault = item.isDefault === 1;
        item.areaCode = item.areaCode.split('-')[2];
        return item
      })
      return alterResult[0]
    }
  },
  created() {
    this._fetchGetUserAddress()
  },
  methods: {
    async _fetchGetUserAddress() {
      //获取数据回显
      let data = await fetchGetUserAddress(this.$store.state.myStore.userInfo.id)
      this.initialInfo = data.filter(item => item.id === parseInt(this.id))
      this.areaCode = this.initialInfo[0].areaCode;
    },
    async onSave(data) {
      data.isDefault = data.isDefault === true ? 1 : 0;
      data.country = data.county;
      data.areaCode = this.areaCode;
      let { status, message } = await fetchUpdateAddress(data.id, data)
      this.$Toast(message)
      if (status === 0) {
        this.$router.back()
      }
    },
    async onDelete() {
      let { status, message } = await delAdress(parseInt(this.id))
      this.$Toast(message)
      if (status === 0) {
        this.$router.back()
      }
    }
  },
}
</script >

<style lang="scss" scoped >

</style >