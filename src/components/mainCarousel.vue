<template>
  <Splide 
    class="main-carousel"
    :options="{
      perPage: 1,
      gap: 0,
      perMove: 1,
      pagination: true,
      arrows: false,
    }"
  >
    <SplideSlide 
      v-for="cs in carousel"
      :key="cs.name"
      class="carousel__item"
    >
      <a :href="cs.link" class="carousel__router">
        <div class="carousel__content content--right-bottom">
          <div class="carousel__title">
            <img :src="cs.title_image" :alt="cs.title" class="title__image">
          </div>
          <p class="carousel__sub-title text--white text--right" v-html="cs.sub_title"></p>
        </div>
        <img :src="cs.image" :alt="cs.title + 'official trailer image'" class="carousel__image image--left">
      </a>
    </SplideSlide>
  </Splide>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  name: "mainCarousel",
  components: {
    Splide, SplideSlide,
  },
  data() {
    return {
      carousel: [
        {
          name: "american-chef",
          title: "아메리칸 셰프",
          title_image: require("../assets/image/american-chef-logo.png"),
          sub_title: "뉴 올리언스에서 LA까지,<br>푸드트럭 셰프의 맛있는 도전!",
          image: require("@/assets/image/main-carousel1.jpg"),
          link: "movie/tt2883512",
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@splidejs/vue-splide/css/core';

  .main-carousel {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    font-family: $ptd;
    background-color: black;
  }

  .carousel__item {
    width: 100%;
    height: 100vh;

    .carousel__router {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .carousel__content {
      width: 100%;
      height: 100%;
      padding: 60px;
      position: absolute;
      top: 0;
      left: 0;
      
      &.content--right-bottom {
        @include flex(false, column, nowrap, flex-end, flex-end);

        .carousel__title {
          text-align: right;
        }
      }
    }
    .carousel__title {
      margin-bottom: 16px;
    }
    .carousel__sub-title {
      font-size: 32px;
      font-weight: 600;
      line-break: 1;
    }

    .carousel__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;

      &.image--left {
        object-position: left center;
      }
    }
  }

</style>