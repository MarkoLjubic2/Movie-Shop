<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

header {
  text-align: center;
  padding: 20px 0;
}

body{
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #fff;
  margin-right: 15px;
}

</style>

<script setup>
</script>
