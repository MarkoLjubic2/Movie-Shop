<template>
  <div id="app">
    <h1>Register</h1>
    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email"
                      placeholder="Enter email" required></b-form-input>
      </b-form-group>
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="username" v-model="form.username"
                      placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password"
                      type="password" required
                      placeholder="Enter password"></b-form-input>
      </b-form-group>
      <b-button class="submit" type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    onSubmit (e) {
      e.preventDefault()
      this.register(this.form)
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
