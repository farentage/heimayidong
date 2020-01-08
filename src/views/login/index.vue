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
      <van-count-down
      v-if="isCountDownShow"
      slot="button"
      :time="1000*1"
      format="ss s"
      @finish="isCountDownShow=false"
       />
        <van-button
        v-else
        slot="button"
        size="small"
        type="primary"
        round
         @click="onCountDownShow"
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <div class="login-btn-warp">
      <van-button class="login-button" type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'

export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false

    }
  },
  methods: {
    // 发送验证码
    async onCountDownShow () {
      try {
        // 获取手机号
        const { mobile } = this.user
        // 验证手机号是否有效
        // try {
        const res = await getSmsCode(mobile)
        console.log(res)
        this.isCountDownShow = true
        // } catch (error) {
        //   console.log(error)
        //   this.isCountDownShow = false
        // }
      } catch (error) {
        console.log(error)
        this.$toast('请勿频繁发送')
      }
    },
    // 登录
    async onLogin () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })

      try {
        const res = await login(this.user)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
      } catch (error) {
        console.log('登陆失败', error)
        this.$toast.fail('登陆失败')
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
