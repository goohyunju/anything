<template>
  <main-header />
  <Router-view />
</template>

<script>
import MainHeader from './components/mainHeader.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style lang='scss'>

  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  #app {
    min-height: 100%;
    font-family: 'pretendard';
    box-sizing: border-box;
  }
</style>
