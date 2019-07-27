import Vue from 'vue'
import Vuex from 'vuex'
import Requests from '../requests'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    data: new Array()
  },
  mutations: {
    setData(state, payload){
      state.data = payload.post
    }
  },
  actions: {
    async setData (context) {
      const req = await Requests.getPosts();
      context.commit('setData', {post: req})
    }
  },
  getters: {
    compId: (state) => {
      return state.data
    }
  }
})