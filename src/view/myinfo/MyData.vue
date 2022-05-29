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
        :disabled="true"
      />
      <van-field name="uploader" label="上传头像" >
        <template #input >
          <van-uploader v-model="uploader" max-count="1" />
        </template >
      </van-field >
      <div style="margin: 16px;" >
        <van-button round block type="info" native-type="submit" >保存</van-button >
      </div >
    </van-form >
  </div >
</template >

<script >

  import { upload } from "../../api/user";

  export default {
    name: "MyData",
    data() {
      return {
        value: this.$store.state.myStore.userInfo.username,
        uploader: [],
        user_id: this.$store.state.myStore.userInfo.id,
      }
    },
    methods: {
      async onSubmit(values) {
        let file = values.uploader[0].file
        let formData = new FormData();
        formData.append('user_id', this.user_id)
        formData.append('file', file)
        let { message, src, status } = await upload(formData)
        this.$Toast(message)
        if (status === 0) {
          this.$store.commit('ModifyPicture', src)
          this.$router.push('/home/user')
        }
      },
    }
  }
</script >

<style lang="scss" scoped >

</style >