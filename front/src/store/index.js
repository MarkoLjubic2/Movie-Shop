import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token ? localStorage.token : '',
    movies: [],
    selectedMovies: [],
    currentPage: 1,
    numberForPage: 3
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.token = token
    },
    removeToken (state) {
      state.token = ''
      localStorage.token = ''
    },
    setMovies (state, movies) {
      state.movies = movies
    },
    selectMovie (state, movie) {
      state.selectedMovies.push({ id: movie.id, quantity: movie.quantity, price: movie.price })
      localStorage.setItem('selectedMovies', JSON.stringify(state.selectedMovies))
    },
    clearSelectedMovies (state) {
      state.selectedMovies = []
      localStorage.removeItem('selectedMovies')
    },
    setCurrentPage (state, page) {
      state.currentPage = page
    }
  },
  actions: {
    async register ({ commit }, obj) {
      const response = await fetch('http://localhost:8001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })

      const json = await response.json()
      commit('setToken', json.token)
    },

    async login ({ commit }, obj) {
      const response = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })

      const json = await response.json()
      if (json.token) {
        commit('setToken', json.token)
      } else {
        alert('Login failed')
      }
    },
    async fetchMovies (context) {
      const response = await fetch('http://localhost:8000/movie/', {
        headers: { Authorization: `Bearer ${context.state.token}` }
      })
      const movies = await response.json()
      context.commit('setMovies', movies)
    }
  },
  getters: {
    totalPages (state) {
      return Math.ceil(state.movies.length / state.numberForPage)
    },
    displayedMovies (state) {
      const start = (state.currentPage - 1) * state.numberForPage
      const end = start + state.numberForPage
      return state.movies.slice(start, end)
    },
    selectedMovies (state) {
      return state.selectedMovies
    }
  }
})
