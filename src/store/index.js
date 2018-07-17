
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: true,
    proteins: []
  },
  mutations: {
    SET_LOADING (state, flag) {
      state.loading = flag
    },
    SET_PROTEINS (state, proteins) {
      state.proteins = proteins
    }
  },
  actions: {
    loadProteins ({ commit }) {
      commit('SET_LOADING', true)
      axios
        .get('https://www.ebi.ac.uk/proteins/api/proteins?offset=0&size=20&reviewed=true&isoform=0&taxid=10090')
        .then(r => r.data)
        .then(proteins => {
          commit('SET_PROTEINS', proteins)
          commit('SET_LOADING', false)
        })
    }
  },
  getters: {
    proteins: state => state.proteins
  }
})
