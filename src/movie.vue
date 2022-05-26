<template>
  <main class="movie-detail-page" :style="{backgroundImage: `url(${movie.Poster})`}">
    <section class="movie-detail">
      <h2 class="detail__item movie__title">{{movie.Title}}</h2>
      <p class="detail__item movie__info-data">
        <span class="info__item year">{{movie.Year}}</span>
        <span class="info__item runtime">{{parseInt(movie.Runtime, 10)}}분</span>
        <span class="info__item genre">{{movie.Genre}}</span>
      </p>
      <div class="detail__item movie__plot">
        {{movie.Plot}}
      </div>
        <!-- {{movie.Director}} -->
        <!-- {{movie.Writer}} -->
        <!-- {{movie.Actors}} -->
        {{movie.Ratings}}
        <!-- {{movie.BoxOffice}} -->
        <!-- {{movie.Production}} -->
        <!-- {{movie}} -->
  </section>
  </main>

  <loader-spinner v-if="loading" :backgroundColor="'transparent'" fixed></loader-spinner>
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
    async getMovie() {
      await this.$store.dispatch("movie/getMovie", {id: this.id});
      this.movie = this.$store.state.movie.movie;
    },
  },
  mounted() {
    this.getMovie();
  },
  unmounted() {
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

  .movie-detail-page {
    width: 100%;
    color: white;
    background-color: $main-black;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .movie-detail {
    @include flex(false, column, nowrap, flex-start, flex-start);

    position: relative;
    min-height: calc(100vh - $header-height);
    padding: 100px 24px 0 40vw;
    background-image: linear-gradient(to right, transparent, $main-black 38%);

    .detail__item {
      width: 100%;
    }
  }

  .movie__title {
    max-width: 400px;
    text-align: left;
    margin-bottom: 16px;
    color: $main-orange;
  }

  .movie__info-data {
    @include flex(false, row, nowrap, flex-start, center);

    margin-bottom: 32px;

    .info__item {
      display: inline-block;
      line-height: 16px;
      padding: 0 8px;
      border-left: 1px solid white;

      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
    }
  }

  .movie__plot {
    max-width: 600px;
    line-height: 1.4;
    margin-bottom: 45px;
  }
  
</style>