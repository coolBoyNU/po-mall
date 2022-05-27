<template >
  <div >
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
  </div >
</template >

<script >
import { fetchGetUserAddress, fetchUpdateAddress } from '../../api/user.js'

export default {
  name: "AddressList",
  data() {
    return {
      chosenAddressId: '', //获取id
      list: [],
    };
  },
  created() {
    this._fetchGetUserAddress()
  },
  methods: {
    _fetchUpdateAddress(userID, data) {
      //修改
      let rus = fetchUpdateAddress(userID, data)
    },
    onAdd() {
      this.$router.push('/address');
    },
    onEdit(item) {
      this.$router.push('/editaddress/' + item.id)
    },
    async _fetchGetUserAddress() {
      let address = await fetchGetUserAddress(this.$store.state.myStore.userInfo.id)
      address.map(item => {
        item.address = item.province + item.city + item.country + item.addressDetail
        return item
      })
      if (!address.length) {
        // 数据为空的话就 return 出去
        return
      }

      if (address.length === 1) {
        // 只有一条信息就把这条信息设为默认
        if (address[0].isDefault !== 1) {
          //对数据进行修改
          address[0].isDefault = 1;
          this._fetchUpdateAddress(address[0].id, address[0])
        }
      }
      let key = address.findIndex(item => item.isDefault === 1)
      // 若有默认地址。则把默认排在第一位
      if (key !== -1) {
        //赋值下标对应的地址
        let defaultAddress = address[key]
        // 设置地址勾选
        this.chosenAddressId = defaultAddress.id
        address.splice(key, 1)
        address.unshift(defaultAddress)
      } else {
        // this.chosenAddressId = address[key].id
      }
      this.list = address
    }
  }
}
</script >

<style lang="scss" scoped >
.van-address-item {
  border: 1px solid black;
}
</style >