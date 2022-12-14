<template>
  <main-carousel></main-carousel>

  <main class="home-page">
    <article class="article article-canne">
      <div class="article__inner">
        <h2 class="article__title">제 75회 칸 영화제 경쟁부문</h2>
        <ul class="canne-competition-movies home-movie-list">
          
          <template v-if="!cannes_competition.loading">
            <movie-item
              v-for="canne in cannes_competition.data"
              :key="canne.imdbID"
              :movie="canne"
            ></movie-item>
          </template>
  
          <loader-spinner 
            v-if="cannes_competition.loading" 
            :background="false" 
            :key="'canne-competition'"
            absolute 
          ></loader-spinner>
          <skeleton-UI 
            v-if="cannes_competition.loading" 
            active="collection"
            :key="'canne-competition'"
          ></skeleton-UI>
        </ul>
      </div>
    </article>

    <article class="banner banner-dr-strange">
      <h2 class="banner__title" data-aos="zoom-in" data-aos-delay="100">
        <img src="@/assets/image/banner-logo1.png" alt="닥터 스트레인지: 대 혼돈의 멀티버스" class="title__image">
      </h2> 
      <p class="banner__content">
        <router-link 
          :to="{name: 'movie', params: { id: 'tt9419884'}}"
          data-aos="zoom-in" data-aos-delay="100" 
          class="content__button"
        >지금 보러가기</router-link>
      </p>
    </article>
    
    <article class="article article-marvle">
      <div class="article__inner">
        <h2 class="article__title">최신 마블 영화 정주행</h2>
        <ul class="marvle-movies home-movie-list">
          <template v-if="!marvle.loading">
            <movie-item
              v-for="marvle in marvle.data"
              :key="marvle.imdbID"
              :movie="marvle"
            ></movie-item>
          </template>
        </ul>

        <loader-spinner 
          v-if="marvle.loading" 
          :background="false" 
          :key="'marvle'"
          absolute 
        ></loader-spinner>
        <skeleton-UI 
          v-if="marvle.loading" 
          active="collection"
          :key="'marvle'"
        ></skeleton-UI>
      </div>
    </article>

    <article id="membership" class="banner banner-advertisement">
      <div class="banner__video" data-aos="fade-up">
        <video class="video" autoplay loop muted>
          <source src="./assets/video/5star.mp4" type="video/mp4">
          <source src="./assets/video/5star.webm" type="video/webm">
        </video>
        <p class="video__text">coda</p>
      </div>
      <h2 class="advertisement__title">
        <img src="./assets/image/coda.svg" alt="coda" class="logo-image">
        <span class="break-line"></span>
         자유롭게 즐겨보세요!
      </h2>
      <ol class="kinderfest-membership">
        <li 
          class="membership__item"
          v-for="member, index in membership.class"
          :key="index"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <p class="membership__title">{{member.name}}</p>
          <p class="membership__detail" v-html="member.detail"></p>

          <ul class="membership__price">
            <li class="price__item">
              <span class="price__title">매 달</span>
              <span class="price__won">{{member.month_price}} 원</span>
            </li>
            <li class="price__item">
              <span class="price__title">매 년</span>
              <span class="price__won">{{member.year_price}} 원</span>
            </li>
          </ul>
        </li>
      </ol>
    </article>
  </main>
</template>

<script>
import mainCarousel from './components/mainCarousel.vue'
import movieItem from "./components/movieItem.vue"
import loaderSpinner from './components/loaderSpinner.vue';
import skeletonUI from './components/skeleton.vue';
import AOS from "aos";
import "aos/dist/aos.css"

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
      marvle: {
        list: ["tt9419884", "tt0145487", "tt10872600", "tt9032400", "tt9376612", "tt3480822", "tt6320628", "tt4154796"],
        data: [],
        loading: true,
      },
      membership: {
        class: [
          {
            name: "코다 무제한",
            detail: `PC, 스마트폰, 태블릿, 크롬캐스트에서
            모든 컨텐츠를 즐겨요!<br><br>
            <strong>720P</strong>의 고화질로 감상`,
            month_price: 5600,
            year_price: 56000,
          },
          {
            name: "코다 무제한 플러스",
            detail: `PC, 스마트폰, 태블릿, 크롬캐스트, 스마트티비에서<br>
            모든 컨텐츠를 즐겨요!<br><br>
            <strong>1080P</strong>의 초고화질로 감상`,
            month_price: 9600,
            year_price: 92000,
          },
          {
            name: "코다 투게더",
            detail: `PC, 스마트폰, 태블릿, 크롬캐스트, 스마트티비에서
            모든 컨텐츠를 최대 3명과 함께 즐겨요!<br><br>
            <strong>1080P</strong>의 초고화질로 감상`,
            month_price: 13000,
            year_price: 130000,
          },
        ]
      }
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

      this.$nextTick(() => {
        variables.loading = false;
      })
    },
  },
  mounted() {
    this.getMoviesByList(this.cannes_competition);
    this.getMoviesByList(this.marvle);
  },
  updated() {
    AOS.init({
      duration: 800,
      offest: 100,
    });
  },
}
</script>

<style lang='scss' scoped>

  .home-page {
    background: url(./assets/image/drstrange.jpg) no-repeat fixed center center;
    background-size: cover;
  }

  .article {
    width: 100%;
    padding: 250px 0;
    background-color: $main-black;
    
    .article__inner {
      width: 1200px;
      margin: 0 auto;

      @include responsive-1280 {
        width: 100%;
        padding: 0 32px;
      }
      @include responsive-768 {
        padding: 0 24px;
      }
    }
    .article__title {
      text-align: center;
      color: #fffff9;
      margin-bottom: 50px;
    }

    .home-movie-list {
      @include flex(false, row, wrap, flex-start, center);

      gap: 24px;

      @include responsive-custom(1024) {
        gap: 32px;
      }
      @include responsive-768 {
        gap: 15px;
      }
      @include responsive-375 {
        gap: 16px;
      }
    }
  }
  .article-canne {
    min-height: 200px;
    color: white;
  }
  .canne-competition-movies {
    position: relative;
  }

  .banner {
    width: 100%;
    height: 400px;

    @include responsive-768 {
      height: 100vh;
    }

    .content__button {
      display: inline-block;
      padding: 16px 40px;
      border-radius: 30px;
      text-align: center;
      color: white;
      font-weight: 700;
    }
  }
  .banner-dr-strange {
    @include flex(false, row, nowrap, space-between, center);

    padding: 0 80px 0 40px;

    @include responsive-768 {
      padding: 100px 24px;
      flex-direction: column;
    }
    
    .title__image {
      
      @include responsive-768 {
        height: 130px;
      }
    }
    .banner__content {
      text-align: right;
      font-weight: 700;
      color: white;
    }
    .content__button {
      font-size: 24px;
      box-shadow: 0 0 16px rgba($main-black, 0.5);
      background-color: #FB0000;

      @include responsive-768 {
        font-size: 18px;
      }
    }
  }

  .article-marvle {
    position: relative;
  }

  .banner-advertisement {
    height: auto;
    padding: 0 0 150px;
    background-color: $main-black;
  }
  .banner__video {
    @include flex(false, row, nowrap, center, center);

    width: 100%;
    height: 40vw;
    margin-bottom: 150px;
    overflow: hidden;
    position: relative;
    
    .video {
      width: 100%;
      height: auto;
    }
    .video__text {
      width: 100%;
      text-align: center;
      line-height: 1;
      font-size: 16vw;
      letter-spacing: -0.08em;
      font-weight: 700;
      position: absolute;
      bottom: -3vw;
      left: 0;
      color: $main-black;
      background: linear-gradient(to bottom, transparent, $main-black 70%) no-repeat center center;
      background-size: 100%, 100%;
    }
  }

  .advertisement__title {
    text-align: center;
    font-weight: 700;
    color: $main-orange;
    margin-bottom: 80px;

    .logo-image {
      width: auto;
      height: 45px;
      margin-bottom: -5px
    }
    .break-line {
      display: none;

      @include responsive-custom(640) {
        display: block;
        max-height: 6px;
      }
    }
  }

  .kinderfest-membership {
    @include flex(false, row, nowrap, center, center);

    gap: 0 40px;

    @include responsive-custom(1024) {
      flex-direction: column;
      gap: 32px 0;
    }

    .membership__item {
      @include flex(false, column, nowrap, flex-start, center);

      width: 280px;
      height: 320px;
      border-radius: 12px;
      padding: 48px 36px 42px;
      color: white;
      text-align: center;
      box-shadow: 6px 6px 20px rgba(black, 0.8), -6px -6px 20px rgba(white, 0.2);

    }
    .membership__title {
      flex: 0 0 auto;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 24px;
      color: $main-orange;
    }
    .membership__detail {
      flex: 1 1 auto;
      font-size: 15px;
      font-weight: 400;
    }

    .membership__price {
      @include flex(false, column, nowrap, flex-start, center);
      
      flex: 0 0 auto;
      width: 100%;
      gap: 8px;
    }
    .price__item {
      @include flex(false, row, nowrap, space-between, center);

      width: 95%;
      padding: 6px 16px;
      border-radius: 20px;
      background-color: rgba(white, 0.3);

      .price__title {
        font-size: 14px;
        color: rgba(white, 0.7);
      }
      .price__won {
        font-weight: 700;
      }
    }
  }
</style>