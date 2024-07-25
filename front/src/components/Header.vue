<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <router-link to="/" class="navbar-brand" active-class="router-link-active">Home</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link v-if="token" to="/movies" class="nav-link" active-class="router-link-active">Movies</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!token" to="/register" class="nav-link" active-class="router-link-active">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!token" to="/login" class="nav-link" active-class="router-link-active">Log In</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="token" @click.native="logout()" to="" class="nav-link" active-class="router-link-active">Log Out</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState([
      'token'
    ])
  },
  methods: {
    ...mapMutations([
      'removeToken',
      'setToken'
    ]),
    logout () {
      this.removeToken()
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      }
    }
  },
  watch: {
    token () {
      this.$forceUpdate()
    },
    mounted () {
      if (localStorage.token) {
        this.setToken(localStorage.token)
      }
    }
  }
}
</script>
<style>
.navbar-brand{
  color: #4256b9;
}
</style>
