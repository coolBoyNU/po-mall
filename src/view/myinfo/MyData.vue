<template >
  <div >
    <van-form @submit="onSubmit" >
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="value"
          name="name"
          label="用户名"
          placeholder="输入账户名"
          :rules="[{ message: '请输入正确内容' }]"
      />
      <van-field name="uploader" label="上传头像" >
        <template #input >
          <van-uploader v-model="uploader" />
        </template >
      </van-field >
      <div style="margin: 16px;" >
        <van-button round block type="info" native-type="submit" >保存</van-button >
      </div >
    </van-form >
  </div >
</template >

<script >
export default {
  name: "MyData",
  data() {
    return {
      value: '',
      uploader: [],
    }
  },
  methods: {
    onSubmit(values) {
      console.log('failed', values);
    },
  }
}
</script >

<style lang="scss" scoped >

</style >