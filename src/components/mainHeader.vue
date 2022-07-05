<template>
  <header 
    class="main-header"
    :class="{
      'header--active': header_active,
    }"
  >
    <h1 class="main-logo">
      <router-link class="logo__link" :to="{name: 'home'}">
        <img class="logo__image" src="../assets/image/Kinderfest-logo.svg" alt="kinderfest | 킨더페스트 ∙ 세상의 모든 영화 검색">
      </router-link>
    </h1>
    <nav class="main-nav">
      <router-link 
        v-for="nav in main_navs"
        :key="nav.title"
        :to="{name: nav.name}"
        class="nav__item"
        active-class="nav--active"
        @click="scrollTop"
      >
        {{nav.title}}
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'mainHeader',
  data() {
    return {
      main_navs: [
        {
          title: 'Search',
          name: 'search'
        },
        {
          title: 'Movie',
          name: "movieCollection"
        },
      ],
      save_scroll: 0,
      header_active: true,
    }
  },
  methods: {
    animationFrame(callback) {
      let timeout = null;
      return function() {
        if(timeout) {
          window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function() {callback();});
      };
    },
    scrollHeaderActive() {
      const scroll = window.scrollY;
      const direction = this.save_scroll - scroll;

      if(scroll < 50) {
        this.header_active = true;
      } else if(scroll > 50) {
        this.header_active = false;
      }
      
      // if(direction <= 0) {
      //   // down
      // } else {
      //   // up
      // }
      
      this.save_scroll = scroll;
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.animationFrame(this.scrollHeaderActive));
  },
}
</script>

<style lang='scss' scoped>

  .main-header {
    @include flex(false, row, nowrap, flex-start, center);

    width: 100%;
    height: $header-height;
    color: white;
    padding: 8px 24px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    transition: background 0.3s ease;
    background-color: $main-black;

    &.header--active {
      transition: background 0.3s ease;
      background-color: transparent;
    }
  }
  .main-logo {
    margin-right: 16px;

    .logo__image {
      display: block;
      width: auto;
      height: 30px;

      @include responsive-375 {
        height: 24px;
      }
    }
  }

  .main-nav {

    .nav__item {
      display: inline-block;
      width: 70px;
      padding: 12px 0 3px;
      font-size: 18px;
      color: white;
      text-align: center;
      transition: font 0.3s ease;

      @include responsive-375 {
        padding: 12px 0 5px;
      }

      &.nav--active {
        color: $main-orange;
        font-weight: 600;
      }
      &:hover {
        font-weight: 600;
        transition: font 0.3s ease;
      }
    }
  }
</style>