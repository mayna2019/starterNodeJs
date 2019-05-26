<template>
  <div class="container pt-3">
    <h1>Ville : {{ city.name }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default',
  validate({ params }) {
    return typeof params.id
  },
  data: function() {
    return {
      id: this.$route.params.id,
      city: {
        name: ''
      }
    }
  },
  created: function() {
    this.getCity(this.id)
  },
  mounted: function() {
    // this.getCity()
  },
  methods: {
    async getCity(givenId) {
      const response = await axios.get(
        `http://localhost:4000/cities/${givenId}`
      )
      this.city = response.data
    }
  }
}
</script>
