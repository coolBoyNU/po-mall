<template >
  <div >
    <van-form @submit="onSubmit" >
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;" >
        <van-button round block type="info" native-type="submit" >登录</van-button >
      </div >
    </van-form >
  </div >
</template >

<script >
import { fetchLogin } from "../../api/user";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async onSubmit(formData) {
      let { message, status, token, userInfo } = await fetchLogin(formData)
      //登录提示
      this.$Toast(message);
      if (status === 0) {
        //将token登录态存储到vuex,vuex再把数据同步到本地存储
        this.$store.commit('setToken', token)
        this.$store.commit('setUserInfo', userInfo)
        if (this.$route.query.redirect) {
          //回到登录前的页面
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/home/index')
        }
      } else {
        //登录失败
        this.$store.commit('clearUserInfo')
      }
    }
  }
}
</script >

<style lang="scss" scoped >

</style >