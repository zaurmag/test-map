import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create a new store instance.
const store = new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    increment(state) {
      state.counter++
    },
  },
  getters: {
    counter: (state) => state.counter,
  },
})

export default store
