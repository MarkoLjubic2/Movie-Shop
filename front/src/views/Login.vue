<template>
  <div id="app">
    <h1>Login</h1>
    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.username"
                      placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password"
                      type="password" required
                      placeholder="Enter password"></b-form-input>
      </b-form-group>
      <b-button class="submit" type="submit">Login</b-button>
    </b-form>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit (e) {
      e.preventDefault()
      this.login(this.form)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style scoped>
#app{
  color:#4256b9;
}
.submit{
  margin-top: 20px;
  background-color:#4256b9;
}
</style>
