<template>
  <div class="container pt-3">
    <h1 class>Les villes</h1>
    <div>
      <b-button id="show-btn" @click="showModal">Ajouter une ville</b-button>
    </div>

    <div v-for="city in cities" :key="city._id" class="col-md-4">
      <b-card-text>{{ city.name }} - {{ city._id }}</b-card-text>
      <b-card-text>{{ country.name }} </b-card-text>
      <button class="btn btn-small btn-primary" @click="sendId(city._id)">
        Détails
      </button>
      <button class="btn btn-small btn-danger" @click="deleteIt(city._id)">
        Supprimez
      </button>
    </div>

    <b-modal ref="my-modal" hide-footer title="Ajoutez une ville">
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-2"
          label="Le nom de la ville:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Entrez le nom de la ville"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default',
  data: function() {
    return {
      form: {
        name: ''
      },
      show: true,
      cities: []
    }
  },
  created: function() {
    this.getCities()
  },
  mounted: function() {},
  methods: {
    async getCities() {
      const response = await axios.get('http://localhost:4000/cities')
      this.cities = response.data
    },
    async deleteIt(id) {
      try {
        await axios.delete(`http://localhost:4000/cities/${id}`)
        this.toast(
          'City deleted successfully',
          'b-toaster-top-center',
          'success'
        )
        this.getCities()
      } catch (error) {
        this.toast(`Error ${error}`, 'b-toaster-top-center', 'danger')
      }
    },
    sendId(id) {
      this.$router.push({
        name: 'cities-id',
        params: { id: id }
      })
    },
    async onSubmit(evt) {
      evt.preventDefault()
      this.$refs['my-modal'].hide()

      const cityName = this.form.name
      try {
        await axios.post('http://localhost:4000/cities', {
          name: cityName
        })
        await this.getCities()
        this.toast(
          'City Created successfully',
          'b-toaster-top-center',
          'success'
        )
      } catch (error) {
        this.toast(`Error ${error}`, 'b-toaster-top-center', 'danger')
      }
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    toast(content, toaster, variant, append = false) {
      this.$bvToast.toast(` ${content} `, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        variant: variant,
        appendToast: append
      })
    }
  }
}
</script>
