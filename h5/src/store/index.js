import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'
import router from '@/router'

export default createStore({
  state: {
    token: '',
    userInfo: {},
    lives: [],
    // 新澳门
    macaujc2: {},
    macaujc2his: [],
    // 澳门
    macaujc: {},
    macaujchis: [],
    // 3分
    macaujc3: {},
    macaujc3his: [],
    // 新彩
    plat: {},
    platHis: [],
    // 帖子
    cheats: [],
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setLives(state, val) {
      state.lives = val
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
    setPlat(state, val) {
      state.platHis = val
      state.plat = val[0]
    },
    setCheats(state, val) {
      state.cheats = val
    },
  },
  actions: {
    updateUser({ commit }) {
      api.userConfig().then(res => {
        commit('setUserInfo', res.welcome)
      })
    },
    updateLives({ commit }) {
      api._lives().then(res => {
        commit('setLives', res)
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
    updatePlat({ commit }) { // 新彩
      api._plat().then(res => {
        if (res) {
          commit('setPlat', res)
        }
      })
    },
  },
  plugins: [createPersistedState()]
})
