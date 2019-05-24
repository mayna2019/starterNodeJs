<template>
  <div class="container pt-3">
    <h1>Pays : {{ country.name }}</h1>
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
      country: {
        name: ''
      }
    }
  },
  created: function() {
    this.getCountry(this.id)
  },
  mounted: function() {
    // this.getCountry()
  },
  methods: {
    async getCountry(givenId) {
      const response = await axios.get(
        `http://localhost:4000/countries/${givenId}`
      )
      this.country = response.data
    }
  }
}
</script>
