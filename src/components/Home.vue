<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
          <h1>UniProt service</h1>
          <v-content>
            <v-layout align-space-around justify-center column fill-height>
              
              <v-card 
                v-for="(protein, index) in proteins"
                v-bind:protein = "protein"
                :key="index"
                class="mt-3 elevation-7"
                >

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{protein.protein.recommendedName.fullName.value}}</h3>
                    <div v-if="typeof protein.proteinExistence !== 'undefined'">{{protein.proteinExistence}}</div>
                  </div>
                  <v-btn v-on:click="protein.show = !protein.show" fab dark small>
                    <v-icon dark>list</v-icon>
                  </v-btn>
                </v-card-title>
                
                <v-card-actions>
                  <transition name="slide-fade">
                    
                    <div class="detail pa-3" v-if="protein.show">
                      <v-layout align-center justify-space-around="" row>
                      <div class="property">
                        <div class="label">Organism</div>
                        <div class="value" v-if="typeof protein.organism !== 'undefined'">{{protein.organism.names[0].value}}</div>
                      </div>
                      <div class="property">
                        <div class="label">Gene</div>
                        <div class="value" v-if="typeof protein.gene[0] !== 'undefined'">{{protein.gene[0].name.value}}</div>   
                      </div>
                      </v-layout>
                    </div>
                    
                  </transition>  
                </v-card-actions>
                
              </v-card>
              
            </v-layout>
          </v-content>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.detail {
  width: 100%;
}

.property {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0px 4px;
  border-radius: 7px;  
}

.detail .property .label {
  font-weight: bold;
}
</style>

<script>
import Vue from 'vue'
export default Vue.component('Home', {
  props: ['protein'],
  data () {
    return {
      message: ''
    }
  },
  created () {
    this.$store.dispatch('loadProteins')
  },
  computed: {
    proteins () {
      return this.$store.getters.proteins
    }
  }
})
</script>
