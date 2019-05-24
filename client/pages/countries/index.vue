<template>
  <div class="container pt-3">
    <h1 class>Listes des pays</h1>
    <div>
      <b-button id="show-btn" @click="showModal">Ajouter un pays</b-button>
    </div>

    <div v-for="country in countries" :key="country._id" class="col-md-4">
      <b-card-text>{{ country.name }} - {{ country._id }}</b-card-text>
      <button class="btn btn-small btn-primary" @click="sendId(country._id)">
        details
      </button>
      <button class="btn btn-small btn-danger" @click="deleteIt(country._id)">
        supprimez
      </button>
    </div>

    <b-modal ref="my-modal" hide-footer title="Ajoutez le pays">
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-2"
          label="Le nom du pays:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Entrez le nom"
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
      countries: []
    }
  },
  created: function() {
    this.getCountries()
  },
  mounted: function() {},
  methods: {
    async getCountries() {
      const response = await axios.get('http://localhost:4000/countries')
      this.countries = response.data
    },
    async deleteIt(id) {
      try {
        await axios.delete(`http://localhost:4000/countries/${id}`)
        this.toast('Created successfully', 'b-toaster-top-center', 'success')
        this.getCountries()
      } catch (error) {
        this.toast(`Error ${error}`, 'b-toaster-top-center', 'danger')
      }
    },
    sendId(id) {
      this.$router.push({
        name: 'countries-id',
        params: { id: id }
      })
    },
    async onSubmit(evt) {
      evt.preventDefault()
      this.$refs['my-modal'].hide()

      const countryName = this.form.name
      try {
        await axios.post('http://localhost:4000/countries', {
          name: countryName
        })
        await this.getCountries()
        this.toast('Created successfully', 'b-toaster-top-center', 'success')
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
