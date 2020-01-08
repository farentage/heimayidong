<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        clearable
        left-icon="contact"
        placeholder="请输入手机号"
      />

      <van-field
       v-model="user.code"
       left-icon="contact"
       placeholder="请输入验证码"
      >
        <van-button
        slot="button"
        size="small"
        type="primary"
        round
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <div class="login-btn-warp">
      <van-button class="login-button" type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
// import { log } from 'util'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {

    async onLogin () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })

      try {
        const res = await request({
          url: '/app/v1_0/authorizations',
          method: 'POST',
          data: this.user
        })
        console.log('登陆成功', res)
        this.$toast.success('成功文案')
      } catch (error) {
        console.log('登陆失败', error)
        this.$toast.fail('失败文案')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-btn-warp {
    padding: 17px 16px;
    .login-button {
      width: 100%;
    }
  }
}
</style>
