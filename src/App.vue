
<template>
  <div id="app">
    <router-view />
    <div id="box">

    </div>

  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less" >
@import url("~@/style/variables.less");
#box{
  color:@color-primary;
}
</style>
