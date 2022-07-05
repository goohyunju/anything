<template>
  <main 
    v-show="!loading" 
    class="movie-detail-page" 
    :class="{
      'movie--no-poster': !movie.Poster || movie.Poster == 'N/A'
    }"
    :style="{
      backgroundImage: 'url(' + changePosterResolution(movie.Poster) + ')',
    }"
  >
    <section class="movie-detail">
      <div class="mobile-movie-poster">
        <img :src="changePosterResolution(movie.Poster)" :alt="movie.Title + ' 포스터'">
      </div>
      <div class="movie-info">
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
      </div>
      
      <div 
        v-if="related_movies.length"
        class="related-movies-wrapper" 
      >
        <h3 class="related-movies__title">관련 영화</h3>
        <Splide 
          v-show="related_active"
          class="related-movies"
          :options="{ 
            autoWidth: true,
            perPage: 1,
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
            </router-link>
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
      related_active: false,
      rates: {},
    }
  },
  watch: {
    $route(now, prev) {
      if(now.params.id !== prev.params.id) {
        window.location.reload();
      }
    },
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

      this.$nextTick(() => {
        this.related_active = true;
      })
    },
    changePosterResolution(data) {
      return !data || data == 'N/A' ? 'none' : String(data).replace('SX300', 'SX700');
    }
  },
  mounted() {
    this.getMovie();
  },
  unmounted() {
    this.$store.commit("movie/resetMoives");
  },
}
</script>

<style lang="scss" scoped>

  .movie-detail-page {
    @include flex(false, row, nowrap, flex-end, center);

    width: 100%;
    color: white;
    background-color: $main-black;
    background-size: auto calc(100% - $header-height);
    background-position: left bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;

    @include responsive-1280 {
      background: unset !important;
    }

    &.movie--no-poster {
      background-image: url(@/assets/image/kinderfest-poster.svg) !important;
    }
  }

  .movie-detail {
    position: relative;
    width: calc(100% - 42vh);
    min-height: 100vh;
    margin: 0 0 auto;
    padding: 100px 24px 100px 19%;
    background-image: linear-gradient(to right, transparent, $main-black 18%);

    @include responsive-1280 {
      @include flex(false, row, wrap, stretch, flex-start);

      width: 100%;
      padding: 100px 32px;
      flex-wrap: wrap;
    }
    @include responsive-768 {
      flex-direction: column;
    }

    .detail__item {
      width: 100%;
    }
  }

  .mobile-movie-poster {
    display: none;

    @include responsive-1280 {
      display: block;
      flex: 0 0 auto;
      margin-right: 40px;
    }
    @include responsive-768 {
      margin: 0 0 60px;
    }

    img {
      display: block;
      width: 250px;
      height: auto;

      @include responsive-768 {
        width: 100%;
      }
    }
  }

  .movie-info {

    @include responsive-1280 {
      flex: 1 1 0;
    }
    @include responsive-768 {
      flex: 0 0 auto;
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

      width: 150px;

      .movie__poster {
        width: 100%;
        height: 200px;
      }
    }
  }
  ::v-deep .splide__arrows {
    @extend .splide-arrow--orange-theme;
  }
</style>  