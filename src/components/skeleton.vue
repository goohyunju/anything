<template>
  <div 
    v-if="active == 'collection'"
    class="skeleton skeleton-movie-collection"
    :style="{
      opacity: opacity * 0.01, 
      margin: margin ? '0 auto' : 0,
    }"
  >
    <div 
      v-for="index in 5"
      :key="index"
      class="skeleton__movie"
    >
      <div class="skeleton__item movie__poster skeleton__poster"></div>
      <div class="skeleton__item skeleton__title"></div>
      <div class="skeleton__item skeleton__year"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "skeletonUI",
  props: {
    active: {
      type: String,
      default: "",
    },
    margin: {
      type: Boolean,
      default: true,
    },
    opacity: {
      type: Number,
      default: 80,
    }
  }
}
</script>

<style lang="scss" scoped>

  .skeleton {
    pointer-events: none;

    .skeleton__item {
      background-color: $skeleton-gray;
      border-radius: 8px;
      animation: skeleton-twinkle 0.6s linear backwards infinite;
      background-image: linear-gradient(135deg, transparent 40%, rgba(white, 0.3) 60%, transparent 80%);
      background-size: 500% 500%;
    }

    @keyframes skeleton-twinkle {
      0% {
        background-position: left top;
      }
      50% {
        background-position: right bottom;
      }
      100% {
        background-position: right bottom;
      }
    }

    &.skeleton-movie-collection {
      @extend .movie-list--default;

      .skeleton__movie {
        @extend .movie-list--black-theme;
        @extend .movie-item--default;

        @include responsive-custom(1024) {
          
          &:nth-child(n + 5) { display: none; }
        }
        @include responsive-768 {

          &:nth-child(n + 4) { display: none; }
        }
        @include responsive-375 {

          &:nth-child(n + 3) { display: none; }
        }
      }
      .skeleton__poster {
        width: 100%;
        height: 338px;
        margin-bottom: 8px;

        @include responsive-1280 {
          height: vw(1280, 330);
        }
      }
      .skeleton__title {
        width: 80%;
        height: 18px;
        margin-bottom: 6px;
      }
      .skeleton__year {
        width: 40%;
        height: 16px;
      }
    }
  }

</style>