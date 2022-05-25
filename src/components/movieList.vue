<template>
  <section class="movie-list">
    <loader-spinner v-if="loading"/>
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
  </section>
</template>

<script>
import movieItem from "@/components/movieItem"
import loaderSpinner from "@/components/loaderSpinner"

export default {
  name: "movieList",
  components: {
    movieItem, loaderSpinner
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
  mounted() {
    console.log(this.movies);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

  .movie-list {
    width: 1200px;
    margin: 100px auto;
    padding: 24px;
    position: relative;
    background-color: #eeeeee;
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

    gap: 24px;
  }
</style>