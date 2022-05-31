<template>
  <header 
    class="main-header"
    :class="{
      'header--active': header_active,
    }"
  >
    <h1 class="main-logo">
      <a href="/" class="logo__link">
        <img class="logo__image" src="../assets/image/Kinderfest-logo.svg" alt="kinderfest | 킨더페스트 ∙ 세상의 모든 영화 검색">
      </a>
    </h1>
    <nav class="main-nav">
      <router-link 
        class="nav__item"
        :to="nav.href"
        v-for="nav in main_navs"
        :key="nav.name"
        active-class="nav--active"
      >
        {{nav.name}}
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
          name: 'Search',
          href: '/search'
        },
        {
          name: 'Movie',
          href: '/movie'
        },
      ],
      save_scroll: 0,
      header_active: true,
    }
  },
  methods: {
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
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHeaderActive);
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