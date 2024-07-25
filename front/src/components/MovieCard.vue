<template>
  <b-card class="movie-card shadow-sm">
    <h5>{{ movie.title }}</h5>
    <p>{{ movie.categories.title }}</p>
    <p>{{ movie.price }}RSD</p>
    <p>{{ movie.description }}</p>
    <input type="number" min="1" v-model="localQuantity" placeholder="Quantity">
    <button @click="selectMovie(movie)">Select</button>
  </b-card>
</template>

<script>
export default {
  props: ['movie'],
  data () {
    return {
      localQuantity: this.movie.quantity
    }
  },
  watch: {
    localQuantity (newQuantity) {
      this.$emit('updateAmount', { movie: this.movie, quantity: newQuantity })
    }
  },
  methods: {
    selectMovie (movie) {
      this.$emit('select', { ...movie, quantity: this.localQuantity })
    }
  }
}
</script>
<style>
.movie-card {
  background: url('@/assets/moviecard.jpg') no-repeat center center;
  background-size: cover;
  color: white;
}
</style>
