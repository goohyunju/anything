<template>
  <main-carousel></main-carousel>

  <main class="home-page">
    <article class="article article-adverstment">
      main
    </article>
  </main>
</template>

<script>
import mainCarousel from './components/mainCarousel.vue'

export default {
  name: 'homeView',
  components: {
    mainCarousel,
  },
}
</script>

<style lang='scss' scoped>
@import "@/assets/css/global.scss";

  .article-adverstment {
    min-height: 200px;
    color: white;
    background-color: $main-black;
  }
</style>