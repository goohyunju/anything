<template>
  <main 
    v-show="!loading" 
    class="movie-detail-page" 
    :class="{
      'movie--no-poster': !movie.Poster || movie.Poster == 'N/A'
    }"
    :style="{
      backgroundImage: !movie.Poster || movie.Poster == 'N/A' ? 'none' : 'url(' + String(movie.Poster).replace('SX300', 'SX700') + ')'
    }"
  >
    <section class="movie-detail">
      <h2 class="detail__item movie__title">{{movie.Title}}</h2>
      <p class="detail__item movie__info-data">
        <span class="info__item year">{{movie.Year}}</span>
        <span 
          v-if="Number(movie.Runtime) == NaN"
          class="info__item runtime
        ">{{parseInt(movie.Runtime, 10)}}분</span>
        <span class="info__item genre">{{movie.Genre}}</span>
      </p>
      <div v-if="rates.length !== 0" class="detail__item movie__rates">
        <span 
          v-for="rate in rates"
          :key="rate.name"
          class="rate__item" 
        >
          <i 
            class="icon"
            :class="rate.name"
          ></i>
          {{rate.value}}
        </span>
      </div>
      <div v-if="movie.Plot != 'N/A'" class="detail__item movie__plot">
        {{movie.Plot}}
      </div>
      <div class="detail__item movie__directing">
        <div class="directing__item category-label">
          <span class="category__name">감독</span> {{movie.Director}}
        </div>
        <div class="directing__item category-label">
          <span class="category__name">각본</span> {{movie.Writer}}
        </div>
        <div class="directing__item category-label">
          <span class="category__name">제공</span> {{movie.Production}}
        </div>
        <div class="directing__item category-label">
          <span class="category__name">출연</span> {{movie.Actors}}
        </div>
      </div>
      <div class="detail__item movie__box-office category-label">
        <span class="category__name">매출</span> {{movie.BoxOffice}}
      </div>
      
      <div class="related-movies-wrapper" v-if="related_movies.length">
        <h3 class="related-movies__title">관련 영화</h3>
        <Splide 
          class="related-movies"
          :options="{ 
            perPage: 4,
            gap: 16,
            perMove: 2,
            pagination: false,
            arrowPath: arrow_path,
          }"
        >
          <SplideSlide
            v-for="movie in related_movies"
            :key="movie.imdbID"
            class="related__item"
          >
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
            </a>
          </SplideSlide>
        </Splide>
      </div>
    </section>
  </main>

  <loader-spinner v-if="loading" :backgroundColor="'transparent'" fixed></loader-spinner>
</template>

<script>
import loaderSpinner from "@/components/loaderSpinner.vue"
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  name: 'movieView',
  components: {
    loaderSpinner, Splide, SplideSlide, 
  },
  data() {
    return {
      movie: {},
      related_movies: [],
      rates: {},
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    loading() {
      return this.$store.state.movie.loading;
    },
    arrow_path() {
      return this.$store.state.movie.arrow_path;
    },
  },
  methods: {
    async getMovie() {
      await this.$store.dispatch("movie/getMovie", {id: this.id});
      this.movie = this.$store.state.movie.movie;

      this.assignRate();
      this.getRelatedMoives();
    },
    assignRate() {
      const rates = this.movie.Ratings;
      const result = [];
      
      rates.forEach(value => {
        let result_object;

        switch(value.Source) {
          default : {
            result_object = {
              name: value.Source,
              title: value.Source,
              value: value.Value,
            };
            break;
          }
          case "Internet Movie Database" : {
            result_object = {
              name: "imdb",
              title: value.Source,
              value: value.Value.replace("/", " / "),
            };
            break;
          }
          case "Rotten Tomatoes" : {
            result_object = {
              name: "rotten-tomatoes",
              title: value.Source,
              value: value.Value,
            };
            break;
          }
          case "Metacritic" : {
            result_object = {
              name: "metacritic",
              title: value.Source,
              value: value.Value.replace("/", " / "),
            };
            break;
          }
        }

        result.push(result_object);
      });

      this.rates = result;
    },
    async getRelatedMoives() {
      const state = this.$store.state.movie;
      const genre = this.movie.Genre.split(", ")[0];

      await this.$store.dispatch("movie/searchMovies", {
        title: genre,
        type: "movie",
        quantity: 1,
        year: state.year,
      });
      
      this.related_movies = state.movies;
    },
  },
  mounted() {
    this.getMovie();
  },
}
</script>

<style lang="scss" scoped>

  .movie-detail-page {
    width: 100%;
    color: white;
    background-color: $main-black;
    background-size: auto calc(100% - $header-height);
    background-position: left bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;

    &.movie--no-poster {
      background-image: url(@/assets/image/kinderfest-poster.svg) !important;
    }
  }

  .movie-detail {
    @include flex(false, column, nowrap, flex-start, flex-start);

    position: relative;
    min-height: 100vh;
    padding: 100px 24px 100px 48vw;
    background-image: linear-gradient(to right, transparent, $main-black 40%);

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

    margin-bottom: 40px;

    .info__item {
      display: inline-block;
      line-height: 16px;
      padding: 0 10px;
      border-left: 1px solid white;

      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
    }
  }

  .movie__rates {
    @include flex(false, row, nowrap, flex-start, center);

    gap: 16px;
    margin-bottom: 16px;

    .rate__item {
      @include flex(false, row, nowrap, flex-start, center);

      gap: 6px;
    }
  }

  .movie__plot {
    width: 90% !important;
    line-height: 1.4;
    margin-bottom: 60px;
  }

  .movie__directing {
    margin-bottom: 24px;
  }
  .category-label {
    line-height: 24px;

    .category__name {
      display: inline-block;
      width: 45px;
      color: $skeleton-gray;
    }
  }

  .movie__box-office {
    margin-bottom: 60px;
  }
  
  .related-movies-wrapper {
    width: calc(100% - 40px);
    
    .related-movies__title {
      margin-bottom: 16px;
    }
  }
  .related-movies {
    
    .related__item {
      @extend .movie-list--black-theme;

      .movie__poster {
        width: 100%;
        height: 235px;
      }
    }
  }
  ::v-deep .splide__arrows {
    @extend .splide-arrow--orange-theme;
  }
</style>  