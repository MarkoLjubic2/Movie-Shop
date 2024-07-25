<template>
  <div class="home">
    <img src="../assets/movieclub.png" alt="Movie Club">
    <h3 class="desc">
      Discover and enjoy a world of cinematic entertainment at your fingertips with our Movie Shop app
    </h3>
    <h3 class="desc">Browse and buy with ease through our streamlined dashboard, simplifying your movie-watching experience.</h3>
    <router-link v-if="$store.state.token" to="/movies" class="explore-button">Search</router-link>  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}
.desc{
  color: #4256b9;
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 20px;
}
.explore-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4256b9;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
