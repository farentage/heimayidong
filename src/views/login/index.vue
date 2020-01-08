<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        clearable
        left-icon="contact"
        placeholder="请输入手机号"
      />

      <van-field
       left-icon="contact"
       placeholder="请输入验证码">
        <van-button
        slot="button"
        size="small"
        type="primary"
        round
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <div class="login-btn-warp">
      <van-button class="login-button" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {}
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
