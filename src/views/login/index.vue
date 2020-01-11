<template>
  <div class="login">
    <van-nav-bar title="登录" />
<!--
      表单验证
      1、使用 ValidationObserver 组件把需要验证的整个表单包起来
      2、使用 ValidationProvider 组件把具体的表单元素包起来，例如 input
         name   配置字段的提示名称
         rules  配置校验规则
         v-slot="{ errors }" 获取校验失败的错误提示消息 -->
    <ValidationObserver  ref="from">
      <ValidationProvider name="手机号" rules="required|mobile" immediate>
        <van-field v-model="user.mobile"     placeholder="请输入手机号" >
          <!-- <i class="icon icon-mima" slot="left-icon"></i> -->
       <i class="iconfont icon-mobile-copy" slot="left-icon"></i>

        </van-field>
        <!-- <span>{{errors[0] }}</span> -->
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required|code" immediate>
        <van-field v-model="user.code"   placeholder="请输入验证码" >
      <i class="iconfont icon-verify-fill" slot="left-icon"></i>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000*6"
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

      </ValidationProvider>
    </ValidationObserver>

    <div class="login-btn-warp">
      <van-button class="login-button" type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
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
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          console.log(validateResult)

          this.$toast(validateResult.errors[0])
          return
        }

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
      // 表单验证
      const success = await this.$refs.from.validate()
      if (!success) {
        const errors = this.$refs.from.errors

        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })

      try {
        const res = await login(this.user)
        this.$store.commit('setUser', res.data.data)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
        this.$router.push('/')
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
  .van-cell{
    align-items: center
  }
}
</style>
