import axios from 'axios'
import { URL } from '../../helpers/env'

const state = () => {
  return {
    all: [],
    oneUser: [],
    userChat: [],
    getFriends: []
  }
}

const getters = {
  getAllUsers (state) {
    return state.all
  },
  getOneUser (state) {
    return state.oneUser
  },
  dataz (state) {
    const q = state.oneUser.id
    // console.log(q)
    const w = state.all.filter(e => e.id !== q)
    return w
  },
  getUserChat (state) {
    return state.userChat
  },
  getuserFriends (state) {
    return state.getFriends
  }
}

const mutations = {
  SET_ALL (state, payload) {
    state.all = payload
  },
  SET_ONE_USER (state, payload) {
    state.oneUser = payload
  },
  SET_USER_CHAT (state, payload) {
    state.userChat = payload
  },
  SET_USER_FRIENDS (state, payload) {
    state.getFriends = payload
  }
}

const actions = {
  getuserFriends (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/getone/${localStorage.getItem('idReceiver')}`)
        .then((response) => {
          console.log(response.data.data)
          context.commit('SET_USER_FRIENDS', response.data.data)
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getAllUsers (context, payload) {
    // console.log(payload)
    this.sortBy = payload ? null : 'id'
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/getall?sorting=${payload}`)
        .then((response) => {
          // console.log(response.data.data)
          context.commit('SET_ALL', response.data.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
    })
  },
  getOneUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/getone/${localStorage.getItem('id')}`)
        .then((response) => {
          console.log(response.data.data)
          context.commit('SET_ONE_USER', response.data.data)
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getUserChat (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/getall`)
        .then((response) => {
          const datax = response.data.data
          const datac = datax.filter(e => e.name === payload)
          // console.log(datac)
          const datav = datac[0]
          context.commit('SET_USER_CHAT', datav)
          // console.log(response.data.data)
          // context.commit('SET_ALL', response.data.data)
          // resolve()
        }).catch((err) => {
          reject(err)
        })
    })
  },
  updateData (context, payload) {
    const formdata = new FormData()
    formdata.append('username', payload.username)
    formdata.append('image', payload.newImage)
    formdata.append('phone', payload.phone)
    formdata.append('bio', payload.bio)
    console.log(payload)

    // for (var value of formdata.values()) {
    //   console.log(value)
    // }
    return new Promise((resolve, reject) => {
      axios.patch(`${URL}/users/edit/${localStorage.getItem('id')}`, formdata)
        .then((response) => {
          // if (response.data.message === 'Update success') {
          localStorage.setItem('image', response.data.data.image)
          // }
          resolve(response.data.message)
          // console.log(response.data.message)
        })
        .catch((err) => {
          reject(err)
          // console.log(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
