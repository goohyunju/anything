import axios from "axios"
import _uniqBy from "lodash/uniqBy"

export default {
  namespaced: true,
  state: () => ({
    loading: false,
    movies: [],
    movie: {},
    message: "영화를 검색해보세요!",
    id: "",
    year: new Date().getFullYear(),
  }),
  getters: {  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.movie = {};
    },
  },
  actions: {
    async getMovie({ commit }, payload) {
      commit("updateState", {loading: true});
      
      const { id } = payload;
      const movie = await _fetchMovie({id});

      commit("updateState", {
        movie: movie.data,
        loading: false,
      });
    },
    async searchMovies({ state, commit }, payload) {
      if(state.loading) return
      
      commit("updateState", {
        message: "",
        loading: true,
      })

      const { title, type, quantity, year } = payload;

      try {
        const params = {title, type, year, page: 1};
        const response = await _fetchMovie(params);

        const { Search, totalResults } = response.data;
        const total = parseInt(totalResults, 10);
        const page_length = Math.ceil(total / 10);

        commit("updateState", {
          movies: _uniqBy(Search, "imdbID")
        });
        
        if(page_length > 1) {
          for(let page_i = 2; page_i <= page_length; page_i++) {
            if(page_i > quantity) break;
  
            const response = await _fetchMovie({title, type, year, page: page_i});
            const { Search } = response.data;
  
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
  
      } catch(message) {
        commit("updateState", {
          movies: [],
          message
        })
      } finally {
        commit("updateState", {
          loading: false,
        })
      }

    },
    async getMovieByGenre(context, payload) {
      const { title } = payload;
      const response = await _fetchMovie({title: title, type: "", year: "", page: 1});

      return response;
    }
  }
}

function _fetchMovie(payload) {
  const OMDB_MY_KEY = "c59cdc91";
  const {title, type, year, page, id} = payload;
  const params = id ? {i: id, plot: "full"} : {s: title, type: type, y: year, page: page};

  return new Promise( (resolve, reject) => {
    
    axios.get(`http://www.omdbapi.com/?&apikey=${OMDB_MY_KEY}`, {params: params})
      .then(response => {
        if(response.data.Error) reject(response.data.Error)
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
  })
}