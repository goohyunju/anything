<template>
  <li class="movie__item">
    <a :href="`/movie/${movie.imdbID}`" class="movie__router">
      <div class="movie__poster">
        <p class="movie__poster--inactive">
          <span class="poster__title">No Poster</span>
        </p>
        <img 
          v-if="movie.Poster != 'N/A'" 
          :src="movie.Poster" 
          :alt="movie.Title + 'Poster'" 
          class="movie__poster-image"
        >
      </div>
      <p class="movie__title">{{movie.Title}}</p>
      <p class="movie__year">{{movie.Year}}</p>
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
    @extend .movie-list--black-theme;

    width: calc(20% - 19.2px);
    position: relative;
  }

</style>