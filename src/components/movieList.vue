<template>
  <section class="movie-list">
    <p 
      v-if="message" class="movie-message"
      :class="{'movie--no-result': !movies.length}"
    >
      {{message}}
    </p>
    <ul v-if="!loading" class="movie__inner">
      <movie-item
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
      ></movie-item>
    </ul>

    <skeleton-UI v-if="loading" :active="'collection'"></skeleton-UI>
    <loader-spinner v-if="loading" absolute :backgroundColor="'transparent'"/>
  </section>
</template>

<script>
import movieItem from "@/components/movieItem"
import loaderSpinner from "@/components/loaderSpinner"
import skeletonUI from "./skeleton.vue"

export default {
  name: "movieList",
  components: {
    movieItem, loaderSpinner, skeletonUI
  },
  data() {
    return {
    }
  },
  computed: {
    loading() {
      return this.$store.state.movie.loading;
    },
    movies() {
      return this.$store.state.movie.movies;
    },
    message() {
      return this.$store.state.movie.message;
    },
  },
}
</script>

<style lang="scss" scoped>

  .movie-list {
    width: 100%;
    margin: 100px 0 !important;
    position: relative;
    background-color: $main-black;
  }
  .movie-loading {
    @include flex(false, row, nowrap, center, center);

    width: 100%;
    height: 100%;
    padding: 100px 0;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(8px);
    z-index: 1;
    background-color: rgba(white, 0.6);
  }
  .movie-message {
    @include flex(false, row, nowrap, center, center);

    width: 100%;
    color: gray;

    &.movie--no-result {
      padding: 100px 0;
    }
  }
  .movie__inner {
    @include flex(false, row, wrap, flex-start, flex-start);
    @extend .movie-list--default;

  }
</style>