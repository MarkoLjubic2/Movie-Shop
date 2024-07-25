<template>
  <div class="center-card" v-if="movie">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-text>
              <h1>{{ movie.title }}</h1>
              <p>{{ movie.description }}</p>
              <p>{{ movie.category }}</p>
              <p>{{ movie.price }}</p>
              <router-link :to="`/order/${movie.id}`" class="btn btn-primary">Order</router-link>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  data () {
    return {
      movie: null
    }
  },
  async created () {
    const id = this.$route.params.id
    const response = await fetch(`http://localhost:8000/movie/${id}`)
    this.movie = await response.json()
  }
}
</script>

<style scoped>
h1 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
}

.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

p {
  color: #666;
  font-size: 1em;
  margin: 5px 0;
}
</style>
