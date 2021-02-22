<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>

</template>

<script scoped>
import MainTabBar from 'components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import url("./assets/css/base.css");
</style>
