<template>
  <main-header />
  <Router-view />
  <main-footer v-if="$route.meta.footer_active"/>
</template>

<script>
import MainHeader from "./components/mainHeader.vue"
import MainFooter from "./components/mainFooter.vue"

export default {
  name: 'App',
  components: {
    MainHeader, MainFooter
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
    background-color: $main-black;
  }
  #app {
    min-height: 100%;
    font-family: 'pretendard';
    box-sizing: border-box;
  }
</style>
