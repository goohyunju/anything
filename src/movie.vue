<template>
  <h1>movie</h1>
  {{$store.state.movie.movie}}
  <section class="movie-detail">
    <img :src="movie.Poster" alt="" class="movie__poster">
    <h1 class="movie__title">{{movie.Title}}</h1>
    <p class="movie__info">
      <span class="info-year">{{movie.Year}}</span>
    </p>
  </section>

  <loader-spinner v-if="false" backgroundOpacity="50" fixed></loader-spinner>
</template>

<script>
import loaderSpinner from "@/components/loaderSpinner.vue"

export default {
  name: 'movieView',
  components: {
    loaderSpinner,
  },
  data() {
    return {
      movie: {},
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    loading() {
      return this.$store.state.movie.loading;
    },
  },
  methods: {
    getMovie() {
      this.$store.dispatch("movie/getMovie", {id: this.id});
      this.movie = this.$store.state.movie.movie;
    },
  },
  mounted() {
    this.getMovie();
  },
  unmounted() {
    this.$store.commit("movie/resetMovies");
  },
}
</script>

<style>

</style>