<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
          <h1>xs-protein-search</h1>
          <p>List all the proteins (<strong v-text="totalProteins"></strong>) for the taxon id 10090 organism Mus musculus using UniProt API</p>
          <v-content>
            <v-layout align-space-around justify-center column fill-height>
              
              <v-pagination
                v-model="page"
                :length="totalPages"
                circle
              ></v-pagination>

              <v-card 
                v-for="(protein, index) in proteins"
                v-bind:protein = "protein"
                :key="index"
                class="mt-3"
                raised
                >

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{protein.protein.recommendedName.fullName.value}}</h3>
                    <div v-if="typeof protein.proteinExistence !== 'undefined'">{{protein.proteinExistence}}</div>
                  </div>
                  <v-layout align-center justify-end row fill-height>
                    <v-btn v-on:click="protein.show = !protein.show" fab dark small class="ml-4">
                      <v-icon>mdi-arrow-down-drop-circle</v-icon>
                    </v-btn>
                  </v-layout>
                </v-card-title>
                
                <v-card-actions>
                  <transition name="slide-fade">
                    
                    <div class="detail pa-3" v-if="protein.show">
                      <v-layout align-center justify-space-around="" row>
                        <div class="property px-3 py-1">
                          <div class="label">Organism</div>
                          <div class="value" v-if="typeof protein.organism !== 'undefined'">{{protein.organism.names[0].value}}</div>
                        </div>
                        <div class="property px-3 py-1">
                          <div class="label">Gene</div>
                          <div class="value" v-if="typeof protein.gene[0] !== 'undefined'">{{protein.gene[0].name.value}}</div>   
                        </div>
                        <div class="property px-3 py-1 ml-1">
                          <div class="label">First reference</div>
                          <div class="value" v-if="typeof protein.references[0] !== 'undefined'">{{protein.references[0].citation.title}}</div>   
                        </div>
                      </v-layout>
                      <v-layout class="ma-3" align-start justify-center row wrap>
                        <div class="text-xs-center" v-for="(keywords, i) in protein.keywords"
                        :key="i">
                          <v-chip color="primary" text-color="white">{{keywords.value}}</v-chip>
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
    <script type="application/ld+json" v-text="schemaData"></script>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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
    border-radius: 7px;  
  }

  .detail .property .label {
    font-weight: bold;
  }
</style>

<script>
import Vue from 'vue'

export default Vue.component('Home', {
  data () {
    return {
      page: 1
    }
  },
  created () {
  },
  beforeCreate () {
    let params = {
      offset: 0,
      size: 20,
      reviewed: true,
      isoform: 0,
      taxid: 10090
    }
    this.$store.dispatch('loadProteins', { 'params': params })
  },
  computed: {
    proteins () {
      return this.$store.getters.proteins
    },
    totalPages () {
      let proteinsCount = this.$store.getters.proteinsCount
      let totalPages = Math.ceil(proteinsCount / 20)
      return totalPages
    },
    totalProteins () {
      return this.$store.getters.proteinsCount
    },
    schemaData () {
      /* eslint-disable quotes */
      let schema = {
        "@context": [
          "http://schema.org",
          "http://bioschemas.org/specifications"
        ],
        "@type": "Dataset",
        "name": "Extra small protein collection",
        "description": "List all the proteins for the taxon id 10090 organism Mus musculus using UniProt API",
        "url": "https://ricardoaat.github.io/xs-protein-search/dist",
        "@graph": []
      }

      this.proteins.forEach((protein) => {
        schema['@graph'].push(
          {
            "@type": [ "BioChemEntity", "Protein" ],
            "@id": `http://www.identifiers.org/uniprot:${protein.accession}`,
            "identifier": protein.accession,
            "url": `http://www.uniprot.org/uniprot/${protein.accession}`,
            "name": protein.protein.recommendedName.fullName.value,
            "alternateName": protein.protein.alternativeName !== undefined ? protein.protein.alternativeName[0].fullName.value : '',
            "sameAs": `http://purl.uniprot.org/uniprot/${protein.accession}`,
            "contains": {
              "@type": "Gene",
              "name": protein.gene !== undefined ? protein.gene[0].name.value : ''
            }
          }
        )
      })
      return schema
    }
  },
  methods: {
  },
  watch: {
    page: function (newVal, oldVal) {
      let params = {
        offset: (newVal - 1) * 20,
        size: 20,
        reviewed: true,
        isoform: 0,
        taxid: 10090
      }
      this.$store.dispatch('loadProteins', { 'params': params })
    }
  }
})
</script>
