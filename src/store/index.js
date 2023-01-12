import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create a new store instance.
const store = new Vuex.Store({
  state: {
    data: null,
  },
  mutations: {
    setData(state, data) {
      state.data = data
    },
  },
  actions: {
    async loadData({ commit }) {
      const url = 'https://surgut.ritm3.ru/edu/objects'
      const { data } = await Vue.axios.get(url)
      commit('setData', data)
    },
  },
  getters: {
    data: (state) => state.data,
  },
})

export default store
