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
      :class="`collection-${genre.value}`"
    >
      <h2 :id="genre.value" class="collection__title">#{{genre.name}}</h2>

      <Splide 
        v-if="!loading"
        :options="{ 
          perPage: 5,
          gap: 16,
          perMove: 2,
          pagination: false,
          arrowPath: arrow_path,
        }"
        :aria-label="`${genre.name} 장르 영화 추천 모음 | movie ${genre.value} genre collection`"
        class="collection-movie-list splide"
      >
        <SplideSlide
          v-for="movie in genre_data[genre.value]"
          :key="movie.imdbID"
          class="movie__item"
        >
          <div class="splide__slide__container movie__poster-cover">
            <img :src="movie.Poster" alt="" class="movie__poster">
          </div>
          <p class="movie__title">{{movie.Title}}</p>
          <p class="movie__year">{{parseInt(movie.Year, 10)}}</p>
        </SplideSlide>

      </Splide>
      
      <skeleton-UI v-if="loading" :active="'collection'"></skeleton-UI>
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
      arrow_path: "M18.676 13.619a.5.5 0 0 1 .705.057l5 5.887a.5.5 0 0 1 .006.64l-5 6.114a.5.5 0 1 1-.774-.634l4.736-5.79-4.73-5.57a.5.5 0 0 1 .057-.704Z",
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
@import "@/assets/css/global.scss";

  .movie-collection-page {
    width: 100%;
    min-height: calc(100vh - $header-height);
    background-color: $main-black;
    padding: 100px 0;
    font-family: $ptd;
  }

  .collection-title {
    @include flex(false, row, nowrap, center, center);

    color: white;
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 24px;

    .like-present {
      display: inline-block;
      width: auto;
      height: 36px;
      margin-right: 16px;
    }
  }

  .recommand-genre {
    @include flex(false, row, nowrap, center, flex-start);

    width: 1200px;
    margin: 0 auto 120px;
    gap: 16px;

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

    .collection__title {
      margin-bottom: 16px;
      color: white;
      font-weight: 600;
    }
  }
  .collection-movie-list {
    position: relative;

    .movie__poster-cover {
      width: 100%;
      height: 338px;
      overflow: hidden;
      border-radius: 6px;
      margin-bottom: 8px;

      .movie__poster {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
    
    .movie__title {
      @include ellipsis(1, 1);

      width: 100%;
      margin-bottom: 6px;
      color: white;
      font-weight: 600;
    }
    .movie__year {
      font-size: 16px;
      color: white;
    }

  }
  // ***** arrows ***** //
  ::v-deep .splide__arrows {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 11;
    pointer-events: none;

    .splide__arrow {
      width: 80px;
      height: 80px;
      pointer-events: auto;
      border: 0;
      outline: 0;
      padding: 0;
      border-radius: 50%;
      cursor: pointer;
      position: absolute;
      top: 50%;
      margin-top: -26px;
      transition: all 0.3s ease;
      background-color: rgba($main-orange, 0.5);

      &:disabled {
        opacity: 0.3;
        background: rgba(white, 0.5);
      }
      &:hover {
        transition: all 0.3s ease;
        background-color: rgba($main-orange, 0.8);
      }

      &.splide__arrow--prev {
        left: 0;
        transform: translate(-50%, -50%);

        svg {
          transform: rotate(-180deg) scale(1.5);
        }
      }
      &.splide__arrow--next {
        right: 0;
        transform: translate(50%, -50%);
      }

      svg {
        transform: scale(1.5);
      }
    }
  }

</style>