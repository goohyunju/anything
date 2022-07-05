<template>
  <li class="movie__item">
    <router-link 
      class="movie__router" 
      :to="{name: 'movie', params: {id: movie.imdbID}}"
    >
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
    </router-link>
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

  .movie__item {
    @extend .movie-list--black-theme;
    @extend .movie-item--default;

  }

</style>