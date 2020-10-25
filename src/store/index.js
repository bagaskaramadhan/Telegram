import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/index'
import duser from './duser/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    duser
  },

  state: {
  },
  mutations: {
  },
  actions: {
  }
})
