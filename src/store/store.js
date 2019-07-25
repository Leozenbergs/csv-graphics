import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    historico:[]
  },
  mutations: {
    change(state, historico) {
        state.historico = historico
    },
    add(state, historico){
        state.historico.push(historico);
    }
  },
  getters: {
    getHistorico: state => {
        return state.historico
    }
  }
})