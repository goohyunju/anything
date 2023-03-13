<template>
  <main-header />
  <Router-view />
  <script src="https://buttr.dev/butter.js" data-site-id="xtyyhtdtap" async></script>
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
    background-color: #dddd;
  }
  #app {
    min-height: 100%;
    font-family: $ptd !important;
    box-sizing: border-box;
  }
</style>
