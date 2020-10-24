import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/index'
import users from './users/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users
  },

  state: {
  },
  mutations: {
  },
  actions: {
  }
})
