import axios from 'axios'
import { URL } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    // data: []
    // email: localStorage.getItem('email') || null,
    all: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const mutations = {
  SET_ALL_DATA_PRODUCT (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}
const actions = {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/users/login`, payload)
        .then(response => {
          if (response.data.message === 'Login Success') {
            localStorage.setItem('phone', response.data.data.phone)
            localStorage.setItem('name', response.data.data.name)
            localStorage.setItem('bio', response.data.data.bio)
            localStorage.setItem('image', response.data.data.image)
            localStorage.setItem('email', response.data.data.email)
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('id', response.data.data.id)
            localStorage.setItem('username', response.data.data.username)
            resolve(response.data.message)
          } else {
            resolve(response.data.message)
          }
        })
        .catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Login failed, email or password is wrong')
        })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/users/register/`, payload)
        .then(response => {
          resolve(response.data.message)
        })
        .catch(() => {
          alert('Register failed')
        })
    })
  },
  logout (context) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshtoken')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
