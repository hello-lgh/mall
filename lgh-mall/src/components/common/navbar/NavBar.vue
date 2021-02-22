<template>
  <div class="nav-bar">
    <div class="lf"><slot name="lf"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="rg"><slot name="rg"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{display: flex;height: 44px;line-height: 44px;box-shadow: 0px 1px 1px rgba(100,100,100,0.1)}
  .lf,.rg{width: 60px;}
  .center{flex: 1;text-align: center;}
</style>
