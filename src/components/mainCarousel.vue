<template>
  <Splide 
    class="main-carousel"
    :options="{
      perPage: 1,
      gap: 0,
      perMove: 1,
      pagination: true,
      arrows: false,
      autoplay: true,
      interval: 5000,
      type: 'loop'
    }"
  >
    <SplideSlide 
      v-for="cs in carousel"
      :key="cs.name"
      class="carousel__item"
    >
      <a :href="cs.link" class="carousel__router">
        <div 
          class="carousel__content"
          :class="[`content--${cs.style.title_position[0]}-${cs.style.title_position[1]}`]"
        >
          <div class="carousel__title">
            <img :src="cs.title_image" :alt="cs.title" class="title__image">
          </div>
          <p 
            class="carousel__sub-title" 
            :style="{
              textAlign: cs.style.text_align,
              color: cs.style.color,
            }"
            v-html="cs.sub_title"
          ></p>
        </div>
        <img 
          :src="cs.image" 
          :alt="cs.title + 'official trailer image'" 
          class="carousel__image"
          :class="[`image--${cs.style.image_position}`]"
        >
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
          style: {
            title_position: ["right", "bottom"],
            color: "white",
            text_align: "right",
            image_position: "left",
          }
        },
        {
          name: "little-forest",
          title: "리틀 포레스트",
          title_image: require("../assets/image/little-forest-logo.png"),
          sub_title: "잠시 쉬어가도 괜찮아!",
          image: require("@/assets/image/main-carousel3.jpg"),
          link: "movie/tt6083230",
          style: {
            title_position: ["left", "center"],
            color: "white",
            text_align: "left",
            image_position: "right",
          }
        },
        {
          name: "accepted",
          title: "억셉티트",
          title_image: require("../assets/image/accepted-logo.png"),
          sub_title: '당신에게 "yes"를 전합니다',
          image: require("@/assets/image/main-carousel2.jpg"),
          link: "movie/tt0384793",
          style: {
            title_position: ["left", "center"],
            color: "white",
            text_align: "left",
            image_position: "right",
          }
        },
      ],
    }
  },
}
</script>

<style scoped>
  @import '@splidejs/vue-splide/css/core';
</style>

<style lang="scss" scoped>

  .main-carousel {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    font-family: $ptd;
    position: relative;
    background-color: black;

    @include responsive-custom(1024) {
      height: 600px;
    }
  }

  .carousel__item {
    width: 100%;
    height: 100vh;

    @include responsive-custom(1024) {
      height: 600px;
    }

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

      @include responsive-custom(1024) {
        padding: 40px;
      }
      
      &.content--right-bottom {
        @include flex(false, column, nowrap, flex-end, flex-end);
      }
      &.content--left-center {
        @include flex(false, column, nowrap, center, flex-start);
      }
    }
    .carousel__title {
      margin-bottom: 16px;

      .title__image {
        min-width: 400px;
        max-width: 500px;
      }
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

  // pagination
  ::v-deep .splide__pagination {
    @include flex(false, row, nowrap, center, center);

    width: 100%;
    gap: 6px;
    position: absolute;
    left: 0;
    bottom: 24px;
    z-index: 9;

    .splide__pagination__page {
      width: 15px;
      height: 15px;
      border-radius: 12px;
      transition: all 0.3s ease;
      background-color: white;

      &.is-active {
        width: 30px;
        transition: all 0.3s ease;
        background-color: $main-orange;
      }
    }
  }

</style>