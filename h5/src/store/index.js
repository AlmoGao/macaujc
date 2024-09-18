import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'
import router from '@/router'

export default createStore({
  state: {
    token: '',
    userInfo: {},
    // 新澳门
    macaujc2: {},
    macaujc2his: [],
    // 澳门
    macaujc: {},
    macaujchis: [],
    // 3分
    macaujc3: {},
    macaujc3his: [],
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setMacaujc2(state, val) {
      state.macaujc2 = val
    },
    setMacaujc2his(state, val) {
      state.macaujc2his = val
    },
    setMacaujc(state, val) {
      state.macaujc = val
    },
    setMacaujchis(state, val) {
      state.macaujchis = val
    },
    setMacaujc3(state, val) {
      state.macaujc3 = val
    },
    setMacaujc3his(state, val) {
      state.macaujc3his = val
    },
  },
  actions: {
    updateUser({ commit }) {
      api.userConfig().then(res => {
        commit('setUserInfo', res.welcome)
      })
    },
    updateMacaujc2({ commit }) { // 新澳门
      api._macaujc2().then(res => {
        if (res && res[0]) {
          commit('setMacaujc2', res[0])
        }
      })
      api._macaujc2his().then(res => {
        if (res && res.data) {
          commit('setMacaujc2his', res.data)
        }
      })
    },
    updateMacaujc({ commit }) { // 澳门
      api._macaujc().then(res => {
        if (res && res[0]) {
          commit('setMacaujc', res[0])
        }
      })
      api._macaujchis().then(res => {
        if (res && res.data) {
          commit('setMacaujchis', res.data)
        }
      })
    },
    updateMacaujc3({ commit }) { // 3分
      api._macaujc3().then(res => {
        if (res && res[0]) {
          commit('setMacaujc3', res[0])
        }
      })
      api._macaujc3his().then(res => {
        if (res && res.data) {
          commit('setMacaujc3his', res.data)
        }
      })
    },
  },
  plugins: [createPersistedState()]
})
