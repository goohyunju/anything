<template>
  <section class="not-found-page">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__content">
      보고싶은 영호가 <br>생각이 안 나시나요?
    </p>
    <router-link :to="{name: 'collection'}" class="back-to-search-button">추천 영화 보러가기</router-link>
  </section>
</template>

<script>
export default {
  name: "notFound404",
  
}
</script>

<style lang="scss" scoped>

  .not-found-page {
    @include flex(false, column, nowrap, center, center);

    min-height: calc(100vh - $header-height);
    width: 100%;
    color: white;
    font-family: $ptd;
    background-color: $main-black;

    .not-found__title {
      text-align: center;
      font-size: 10vw;
      font-weight: 700;
      line-height: 1;
      color: $main-orange;
    }
    .not-found__content {
      text-align: center;
      font-size: 18px;
      line-height: 1.4;
    }

    .back-to-search-button {
      padding: 12px 24px;
      color: $main-black;
      font-size: 18px;
      font-weight: 600;
      border-radius: 30px;
      margin-top: 32px;
      background-color: white;
    }
  }

</style>