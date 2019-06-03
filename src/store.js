import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    identity: 'student', // teacher
    hasRouter: false,
    menu: []
  },
  mutations: {
    setIdentity: (state, data) => {
      state.identity = data
    },
    menu: (state, data) => {
      state.menu = data
    }
  },
  actions: {
  }
})
