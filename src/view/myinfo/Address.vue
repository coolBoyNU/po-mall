<template >
  <div >
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-area="changeArea"
    />
  </div >
</template >

<script >
import { areaList } from '@vant/area-data'
import { fetchAddUserAddress } from '../../api/user.js'

export default {
  name: "Address",
  data() {
    return {
      areaList,
      searchResult: [],
      areaCode: '', // 记录省市区编码 格式： 110000-111200-111233
    };
  },
  methods: {
    async onSave(data) {
      data.country = data.county;
      data.isDefault = data.isDefault ? 1 : 0;
      let formData = { ...data, areaCode: this.areaCode, }
      let result = await fetchAddUserAddress(this.$store.state.myStore.userInfo.id, formData);
      if (result.status === 0) {
        this.$router.back();
      } else {
        this.$Toast('添加失败')
      }
    },
    // 切换省市区会去切换
    changeArea(values) {
      this.areaCode = values.map(item => item.code).join('-')
    },
  },
}
</script >

<style lang="scss" scoped >

</style >