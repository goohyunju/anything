<template>
  <main-carousel></main-carousel>

  <main class="home-page">
    <article class="article article-canne">
      <div class="article__inner">
        <h2 class="article__title">제 75회 칸 영화제 경쟁부문</h2>
        <ul class="canne-competition-movies">
          
          <template v-if="!cannes_competition.loading">
            <movie-item
              v-for="canne in cannes_competition.data"
              :key="canne.imdbID"
              :movie="canne"
            ></movie-item>
          </template>
  
          <loader-spinner v-if="cannes_competition.loading" :background="false" absolute></loader-spinner>
          <skeleton-UI v-if="cannes_competition.loading" active="collection"></skeleton-UI>
        </ul>
      </div>
    </article>

    <article class="banner banner-dr-strange">
      <h2 class="banner__title">
        <img src="@/assets/image/banner-logo1.png" alt="닥터 스트레인지: 대 혼돈의 멀티버스" class="title__image">
      </h2>
    </article>

  </main>
</template>

<script>
import mainCarousel from './components/mainCarousel.vue'
import movieItem from "./components/movieItem.vue"
import loaderSpinner from './components/loaderSpinner.vue';
import skeletonUI from './components/skeleton.vue';

export default {
  name: 'homeView',
  components: {
    mainCarousel, movieItem, loaderSpinner, skeletonUI
  },
  data() {
    return {
      cannes_competition: {
        list: ["tt18550140", "tt14549466", "tt10354106", "tt9660502", "tt10343028", "tt13056052", "tt14034614", "tt12477480", "tt7322224", "tt18550182", "tt13923216", "tt19653180", "tt15452062", "tt17538510", "tt19652910", "tt14641542", "tt17014214", "tt13702796"],
        data: [],
        loading: true,
      },
    };
  },
  methods: {
    async getMoviesByList(variables) {
      const list = variables.list;

      variables.loading = true;

      for(const val of list) {
        
        try {
          await this.$store.dispatch("movie/getMovie", {id: val});
          const movie = this.$store.state.movie.movie;

          variables.data.push(movie);
        } catch(error) {
          console.log(error);
        }
      }

      variables.loading = false;
    },
  },
  mounted() {
    this.getMoviesByList(this.cannes_competition);
  },
}
</script>

<style lang='scss' scoped>

  .home-page {
    }

  .article {
    width: 100%;
    background-color: $main-black;
    
    .article__inner {
      width: 1200px;
      margin: 0 auto;
    }
    .article__title {
      text-align: center;
      color: $main-orange;
      margin-bottom: 50px;
    }
  }
  .article-canne {
    min-height: 200px;
    color: white;
    padding: 250px 0;
  }
  .canne-competition-movies {
    @include flex(false, row, wrap, flex-start, center);

    gap: 24px;
    position: relative;
  }

  .banner {
    width: 100%;
    height: 400px;
  }
  .banner-dr-strange {
    @include flex(false, row, nowrap, flex-start, center);

    padding: 0 40px;
    background: url(./assets/image/movie-banner.jpg) no-repeat top -40px center;
    background-size: 100% auto;
  }
</style>