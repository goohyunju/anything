<template>
  <ul class="main-carousel">
    <li class="carousel__title">
      <span class="title__text">Kinderfest</span>
    </li>
    <li class="carousel__item"></li>
  </ul>
</template>

<script>
export default {
  name: "mainCarousel",
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

  .main-carousel {
    width: 100%;
    height: calc(100vh - $header-height);
    position: relative;
    overflow: hidden;
    background-color: rgba($main-orange, 0.3);
  }
  .carousel__title {
    @include flex(false, row, nowrap, center, flex-end);

    width: 100%;
    height: 100%;
    font-size: 34vw;
    font-weight: 700;
    letter-spacing: -0.15em;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom, transparent 80%, $main-black 95%);

    .title__text {
      margin-bottom: -125px;
      color: $main-black;
    }
  }

</style>