<template>
  <div class="tabbar-container">
<router-view></router-view>
<van-tabbar  route>
  <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="comment-o" to="/pa">问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="manager-o" to="/my">
  {{$store.state.user?"我的":"未登录"}}
  </van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>

</style>
