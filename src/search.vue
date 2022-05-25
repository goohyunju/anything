<template>
  <main class="search-page">
    <h1 class="search-title">영화 검색</h1>
    <search-form></search-form>
    <movie-list></movie-list>
  </main>
</template>

<script>
import searchForm from "@/components/search";
import movieList from "@/components/movieList.vue"

export default {
  name: "searchView",
  components: {
    searchForm,
    movieList,
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global";

  .search-page {
    @include flex(false, column, nowrap, center, center);

    width: 100%;
    min-height: calc(100vh - $header-height);
    padding: 100px 0;
    background-color: $main-black;

    .search-title {
      font-size: 32px;
      color: $main-orange;
      text-align: center;
    }
  }

</style>