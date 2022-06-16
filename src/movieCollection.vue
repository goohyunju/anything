<template>
  <main class="movie-collection-page">
    <h1 class="collection-title">
      <img src="./assets/image/collection-title.svg" alt="마치 생일선물 같은" class="like-present">
      맞춤형 영화
    </h1>
    <nav class="recommand-genre">
      <a 
        v-for="genre in recommand_tag"
        :key="genre.value"
        :href="`#${genre.value}`" 
        class="genre__item"
        :class="{'genre__item--active': active_tag == genre.value}"
        @click="active_tag = genre.value"
      >{{genre.name}}</a>
    </nav>

    
    <section 
      v-for="genre in recommand_tag"
      :key="genre.value"
      class="collection"
      :class="[`collection-${genre.value}`]"
    >
      <h2 
        v-if="!loading"
        :id="genre.value" 
        class="collection__title"
      >#{{genre.name}}</h2>

      <skeleton-UI v-if="loading" :active="'collection'" :margin="true"></skeleton-UI>
      <Splide 
        v-if="!loading"
        :options="{ 
          perPage: 5,
          gap: 16,
          perMove: 2,
          pagination: false,
          arrowPath: arrow_path,
          breakpoints: {
            1024: {
              perPage: 4,
            },
            768: {
              autoWidth: true,
              perPage: 3,
              arrows: false,
              drag: 'free',

            },
            375: {
              perPage: 2,
            },
          }
        }"
        :aria-label="`${genre.name} 장르 영화 추천 모음 | movie ${genre.value} genre collection`"
        class="collection-movie-list splide"
      >
        <SplideSlide
          v-for="movie in genre_data[genre.value]"
          :key="movie.imdbID"
          class="movie__item"
        >
          <a :href="`/movie/${movie.imdbID}`" class="movie__router">
            <div class="splide__slide__container movie__poster">
              <img :src="movie.Poster" :alt="movie.Title + 'poster'" class="movie__poster-image">
            </div>
            <p class="movie__title">{{movie.Title}}</p>
            <p class="movie__year">{{parseInt(movie.Year, 10)}}</p>
          </a>
        </SplideSlide>

      </Splide>
      
    </section> 
  </main>

  <loader-spinner v-if="loading" fixed backgroundColor="black"></loader-spinner>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import loaderSpinner from "./components/loaderSpinner.vue";
import skeletonUI from "./components/skeleton.vue";

export default {
  name: "movieCollection",
  components: {
    Splide, SplideSlide, loaderSpinner, skeletonUI,
  },
  computed: {
    arrow_path() {
      return this.$store.state.movie.arrow_path;
    },
  },
  data() {
    return {
      recommand_tag: [
        { name: "로맨스", value: "love" },
        { name: "괴물", value: "monster" },
        { name: "좀비", value: "walking dead" },
        { name: "판타지", value: "fantasy" },
        { name: "미스터리", value: "mystery" },
        { name: "클래식", value: "classic" },
        { name: "음악", value: "musical" },
        { name: "뮤지컬", value: "music" },
        { name: "공포", value: "scary" },
      ],
      loading: false,
      active_tag: "love",
      genre_data: {},
    }
  },
  methods: {
    getMovieByGenre(tags) {
      this.loading = true;

      tags.forEach(async target => {
        const response = await this.$store.dispatch("movie/getMovieByGenre", {title: target.value});
        const { Search } = response.data

        this.genre_data[target.value] = Search;

        this.$nextTick(() => {
          this.loading = false;
        })
      })
    },
  },
  mounted() {
    this.$store.commit("movie/resetMovies");
    this.getMovieByGenre(this.recommand_tag);
  },
}
</script>

<style scoped>
@import '@splidejs/vue-splide/css/core';
</style>

<style lang="scss" scoped>

  .movie-collection-page {
    width: 100%;
    min-height: 100vh;
    padding: 160px 0 100px;
    font-family: $ptd;
    background-color: $main-black;
  }

  .collection-title {
    @include flex(false, row, nowrap, center, center);

    color: white;
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 24px;

    @include responsive-768 {
      flex-direction: column;
    }

    .like-present {
      display: inline-block;
      width: auto;
      height: 32px;
      margin-right: 16px;

      @include responsive-768 {
        margin-bottom: 8px;
      }
      @include responsive-375 {
        height: 28px;
      }
    }
  }

  .recommand-genre {
    @include flex(false, row, nowrap, center, flex-start);

    width: 1200px;
    margin: 0 auto 120px;
    gap: 16px;

    @include responsive-1280 {
      flex-wrap: wrap;
      width: 100%;
      padding: 0 32px;
    }
    @include responsive-768 {
      padding: 0 24px;
      gap: 12px;
    }
    @include responsive-375 {
      padding: 0 16px;
    }

    .genre__item {
      padding: 6px 16px;
      border-radius: 20px;
      border: 1px solid white;
      color: white;
      font-weight: 600;
      background-color: rgba(white, 0.3);

      &.genre__item--active {
        border-color: $main-orange;
        color: $main-orange;
        background-color: rgba($main-orange, 0.3);
      }
    }
  }

  .collection {
    width: 1200px;
    margin: 0 auto 120px;

    @include responsive-1280 {
      width: 100%;
      padding: 0 60px;
    }
    @include responsive-768 {
      padding: 0 24px;
    }
    @include responsive-375 {
      padding: 0 16px;
    }

    .collection__title {
      margin-bottom: 16px;
      color: white;
      font-weight: 600;
    }
  }
  .collection-movie-list {
    position: relative;

    .movie__item {
      @extend .movie-list--black-theme;

      @include responsive-768 {
        max-width: 180px;
      }
    }

    .movie__poster {

      @include responsive-768 {
        width: 180px !important;
        height: 260px !important;
      }
    }
  }
  
  ::v-deep .splide__arrows {
    @extend .splide-arrow--orange-theme;
  }

</style>