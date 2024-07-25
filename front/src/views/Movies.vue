<template>
  <div>
    <h1>Catalog</h1>
    <b-container fluid>
      <b-row class="flex-row flex-nowrap overflow-auto">
        <b-col cols="4" class="mb-3" v-for="movie in displayedMovies" :key="movie.id">
          <MovieCard :movie="movie" @select="selectMovie" />
        </b-col>
      </b-row>
      <div>
        <ul class="pagination" style="justify-content: center;">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="prevPage">Previous</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </div>
      <b-button squared variant="success" class="submit" @click="order">Order movies</b-button>
    </b-container>
    <div class="background-bottom"></div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  components: {
    MovieCard
  },
  computed: {
    totalPages () {
      return this.$store.getters.totalPages
    },
    displayedMovies () {
      return this.$store.getters.displayedMovies
    },
    currentPage: {
      get () {
        return this.$store.state.currentPage
      },
      set (page) {
        this.$store.commit('setCurrentPage', page)
      }
    }
  },
  methods: {
    async fetchMovies () {
      await this.$store.dispatch('fetchMovies')
    },
    selectMovie (movie) {
      this.$store.commit('selectMovie', movie)
    },
    order () {
      localStorage.setItem('selectedMovies', JSON.stringify(this.$store.state.selectedMovies))
      this.$router.push('/order')
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    goToPage (page) {
      this.currentPage = page
    }
  },
  created () {
    this.fetchMovies()
  }
}
</script>

<style scoped>
h1 {
  color: #4256b9;
  font-size: 2em;
  margin-bottom: 20px;
}

.navbar a {
  font-weight: bold;
}

.submit {
  margin-top: 20px;
  background-color: #4256b9;
}

.background-bottom {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50vh;
  z-index: -1;
}
</style>
