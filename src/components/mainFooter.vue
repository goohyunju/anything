<template>
  <footer class="main-footer">
    <div class="footer__top footer__item">
      <img src="../assets/image/Kinderfest-logo.svg" alt="kinderfest | 킨더페스트" class="footer__logo">

      <nav class="footer__nav">
        <a 
          v-for="nav in footer_nav"
          :key="nav.name"
          :href="nav.path" 
          class="nav__item"
          :class="nav.name"
        >{{nav.title}}</a>
      </nav>
    </div>
    <div class="footer__bottom footer__item">
      <p class="footer__paragraph">
        어릴 때 축제 같이
        영화를 즐길 땐, 킨더페스트
      </p>
      <ul class="footer__sns">
        <li 
          v-for="sns in sns_list"
          :key="sns.name"
          class="sns__item"
        >
          <a href="/" class="sns__router">
            <i class="icon" :class="sns.icon + '-flat'"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "mainFooter",
  data() {
    return {
      footer_nav: [
        {
          title: "메인",
          name: "main",
          path: "/",
        },
        {
          title: "검색",
          name: "search",
          path: "/search",
        },
        {
          title: "추천 영화",
          name: "search",
          path: "/movie",
        },
        {
          title: "요금제",
          name: "membership",
          path: "/#membership",
        },
      ],
      sns_list: [
        {
          name: "facebook",
          icon: "facebook",
          path: "",
        },
        {
          name: "twitter",
          icon: "twitter",
          path: "",
        },
        {
          name: "youtube",
          icon: "youtube",
          path: "",
        },
        {
          name: "twitch",
          icon: "twitch",
          path: "",
        },
        {
          name: "instagram",
          icon: "instagram",
          path: "",
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

  .main-footer {
    padding: 80px 0;
    color: white;
    font-family: $ptd;
    border-top: 1px solid darken($main-black, 10%);
    background-color: darken($main-black, 2%);

    .footer__item {
      width: 1200px;
      padding: 24px 10px;
      margin: 0 auto;

      @include responsive-1280 {
        width: calc(100% - 64px);
      }
    }
  }

  .footer__top {
    @include flex(false, row, nowrap, space-between, center);

    .footer__logo {
      display: block;
      width: auto;
      height: 24px;
    }
  }
  .footer__nav {
    @include flex(false, row, nowrap, flex-end, center);

    transition: all 0.3s ease;
    position: relative;
    right: -20px;

    .nav__item {
      color: white;
      padding: 12px 20px;
      transition: all 0.3s ease;

      &:hover {
        font-weight: 700;
        color: $main-orange;
      }
    }
  }
  .footer__bottom {
    @include flex(false, row, nowrap, space-between, center);

    border-top: 1px solid rgba(white, 0.3);
  }
  .footer__sns {
    @include flex(false, row, nowrap, flex-end, center);

    gap: 10px;

    .sns__item {
      display: block;
    }
    .icon {
      width: 28px;
      height: 28px;
      opacity: 0.5;
    }
  }

</style>