<template>
  <div class="search-movie" role="search">
    <input 
      type="text" 
      class="search__title search__field" 
      v-model="search.title" 
      placeholder="영화, 시리즈와 더 많은 것을 검색하세요!"
      @keyup.enter="searchMovie"
    >
    
    <select 
      name="search-type" 
      id="search-type" 
      class="search__select search__type"
      v-model="search.type"
    >
      <option 
        v-for="type in filters.type"
        :key="type"
        :value="type"
        class="type__item"
      >{{type}}</option>
    </select>

    <select 
      name="search-quantity" 
      id="search-quantity" 
      class="search__select search__quantity"
      v-model="search.quantity"
    >
      <option 
        v-for="quantity in filters.quantity"
        :key="quantity"
        :value="quantity"
        class="quantity__item"
      >{{quantity}}</option>
    </select>

    <select 
      name="search-year" 
      id="search-year" 
      class="search__select search__year"
      v-model="search.year"
    >
      <option value="" class="year__item">ALL YEARS</option>
      <option 
        v-for="year in filters.year"
        :key="year"
        :value="year"
      >{{year}}</option>
    </select>

    <button class="search__button search__apply" @click="searchMovie">검색</button>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: "searchForm",
  data() {
    return {
      search: {
        title: "",
        type: "movie",
        quantity: 10,
        year: "",
      },
    }
  },
  computed: {
    year() {
      return moment().format("YYYY");
    },
    filters() {

      return {
        type: [
          "movie",
          "series",
          "episode",
        ],
        quantity: [10, 20, 30],
        year: (() => {
          const years = [];

          for(let i = this.year; i >= 1985; i--) {
            years.push(i);
          }
          return years;
        })()
      };
    },
  },
  methods: {
    searchMovie() {
      const search = this.search;

      this.$store.dispatch("movie/searchMovies", {
        title: search.title,
        type: search.type,
        quantity: search.quantity,
        year: search.year,
      });
    },
  },
  mounted() {
  },
}
</script>

<style>

</style>