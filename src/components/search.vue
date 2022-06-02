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
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

  .search-movie {
    @include flex(true, row, nowrap, center, center);

    gap: 16px;
    margin: 0 auto;
    padding: 12px 20px !important;
    border-radius: 40px;
    border: 2px solid $main-orange !important;
    background-color: white;

    * {
      font-family: $ptd;
    }

    .search__field {
      height: 32px;
      border: 0;
      padding: 0 16px;
      font-size: 16px;
      background-color: white;
    }
    .search__select {
      width: 110px;
      height: 32px;
      padding: 0 20px 0 8px;
      font-size: 16px;
      color: gray;
      background: white url(@/assets/image/mini-chevron-down.svg) no-repeat right 8px top 14px;
      background-size: 10px auto;

      &:focus,
      &:active {
        border: 0;
        outline: 0;
      }
      &:focus-visible {
        border: 0;
        outline: 0;
        color: $main-orange;
      }
    }

    .search__title {
      width: 400px;
      font-weight: 600;
    }
    .search__quantity {
      width: 70px;
    }
    .search__year {
      width: 140px;
    }
    .search__apply {
      height: 32px;
      padding: 0 16px;
      font-size: 18px;
      color: $main-orange;
      font-weight: 600;
      background-color: white;
    }
  }


</style>