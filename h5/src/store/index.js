import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'
import router from '@/router'

export default createStore({
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
  },
  actions: {
    updateUser({ commit }) {
      api.userConfig().then(res => {
        commit('setUserInfo', res.welcome)
      })
    },
  },
  plugins: [createPersistedState()]
})
