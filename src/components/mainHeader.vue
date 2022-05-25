<template>
  <header class="main-header">
    <h1 class="main-logo">
      <a href="/" class="logo__link">Kinderfest</a>
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
        {
          name: 'About',
          href: '/about'
        },
      ]
    }
  },
}
</script>

<style lang='scss' scoped>
@import "@/assets/css/global.scss";

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
    background-color: $main-black;
  }
  .main-logo {
    margin-right: 24px;

    .logo__link {
      color: $main-orange;
    }
  }

  .main-nav {

    .nav__item {
      display: inline-block;
      width: 70px;
      padding: 14px 0 2px;
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