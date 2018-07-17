<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
          <h1>UniProt service</h1>
          <v-content>
            {{ proteins }}
          </v-content>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<script>
export default {
  created () {
    this.$store.dispatch('loadProteins')
  },
  computed: {
    proteins () {
      return this.$store.state.proteins
    }
  }
}
</script>
