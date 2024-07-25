<template>
  <div class="order-form">
    <b-container class="mx-auto">
      <h1 class="mb-4">Place an Order</h1>
      <b-form @submit.prevent="confirmOrder">
        <b-form-group id="input-group-address" label="Address:" label-for="address">
          <b-form-input id="address" v-model="order.address" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-name_surname" label="Name and Surname:" label-for="name_surname">
          <b-form-input id="name_surname" v-model="order.name_surname" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-phone" label="Phone:" label-for="phone">
          <b-form-input id="phone" v-model="order.phone_number" type="tel" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mt-3">Place Order</b-button>

        <div>
          <b-modal ref="orderModal" id="modal-1" title="BootstrapVue">
            <p class="my-4">Your order has been successfully placed!</p>
          </b-modal>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        order_time: '',
        scheduled_time: '',
        status: '',
        address: '',
        name_surname: '',
        phone_number: '',
        movies: []
      }
    }
  },
  created () {
    this.initializeMovies()
  },
  methods: {
    initializeMovies () {
      const moviesFromRoute = this.$route.params.movies || JSON.parse(localStorage.getItem('selectedMovies')) || []
      this.order.movies = moviesFromRoute
      localStorage.removeItem('selectedMovies')
    },
    async confirmOrder () {
      try {
        this.order.order_time = new Date().toISOString()
        const scheduledTime = new Date()
        scheduledTime.setDate(scheduledTime.getDate() + 10)
        this.order.scheduled_time = scheduledTime.toISOString()
        this.order.status = 'New'

        const response = await fetch('http://localhost:8000/order/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.$store.state.token}`
          },
          body: JSON.stringify(this.order)
        })
        const data = await response.json()

        if (response.ok && data.id) {
          for (const movie of this.order.movies) {
            const movieResponse = await fetch('http://localhost:8000/orderitem/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.$store.state.token}`
              },
              body: JSON.stringify({ order_id: data.id, movie_id: movie.id, quantity: movie.quantity, price: movie.price })
            })

            const movieData = await movieResponse.json()
            if (!movieResponse.ok) {
              console.error('Failed to create orderitem:', movieData)
            } else {
              console.log('Order item created:', movieData)
            }
          }
          this.$store.commit('clearSelectedMovies')
          this.clearOrder()
          this.$refs.orderModal.show()
        } else {
          console.error('Failed to create order:', data)
        }
      } catch (error) {
        console.error('Error during order confirmation:', error)
      }
    },
    clearOrder () {
      this.order = {
        order_time: '',
        scheduled_time: '',
        status: '',
        address: '',
        name_surname: '',
        phone_number: '',
        movies: []
      }
    }
  }
}
</script>

<style scoped>
.order-form {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90vh;
  z-index: -1;
}
</style>
