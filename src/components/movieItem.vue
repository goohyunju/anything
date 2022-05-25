<template>
  <li class="movie__item">
    <a :href="`/movie/${movie.imdbID}`" class="movie__router">
      <div class="movie__poster">
        <img 
          v-if="movie.Poster != 'N/A'" 
          :src="movie.Poster" 
          :alt="movie.Title + 'Poster'" 
          class="poster-image"
        >
        <p v-else class="movie__poster--inactive">
          <span class="poster__title">No Poster</span>
        </p>
      </div>
      <div class="movie__info">
        <p class="info__title">{{movie.Title}}</p>
        <p class="info__year">{{movie.Year}}</p>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "movieItem",
  props: {
    movie: {
      type: Object,
      default: () => {}      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

  .movie__item {
    width: calc(25% - 18px);
    position: relative;

    .movie__poster {
      width: 100%;
      height: 400px;
      overflow: hidden;
      background-color: $main-black;

      .poster-image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
      
    }
    .movie__poster--inactive {
      @include flex(false, row, nowrap, center, center);

      width: 100%;
      height: 100%;

      .poster__title {
        max-width: 75%;
        text-align: center;
        color: white;
      }
    }

    .movie__info {
      @include flex(false, column, nowrap, center, center);

      width: 100%;
      min-height: 90px;
      padding: 12px 16px;
      position: absolute;
      bottom: 0;
      left: 0;
      color: white;
      text-align: center;
      backdrop-filter: blur(16px);
      background-color: rgba(black, 0.6);
    }
    .info__title {
      @include ellipsis(2, 20px);

      font-size: 20px;
      font-weight: 600;
      color: $main-orange;
      margin-bottom: 6px;
    }
  }
</style>