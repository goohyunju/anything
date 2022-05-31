<template>
  <main class="search-page">
    <h1 class="search-title">영화 검색</h1>
    <search-form></search-form>
    <movie-list v-if="movie_list.length"></movie-list>
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
  computed: {
    movie_list() {
      return this.$store.state.movie.movies;
    },
  },
}
</script>

<style lang="scss" scoped>

  .search-page {
    @include flex(false, column, nowrap, center, center);

    width: 100%;
    min-height: 100vh;
    padding: 100px 0;
    background-color: $main-black;

    .search-title {
      font-size: 32px;
      color: $main-orange;
      text-align: center;
      margin-bottom: 32px;
    }
  }

</style>