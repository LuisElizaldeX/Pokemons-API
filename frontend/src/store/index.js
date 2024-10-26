import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    nombre_usuario: ''
  },
  getters: {
  },
  mutations: {
    login(state, nombre_usuario) {
      state.isLoggedIn = true;
      state.nombre_usuario = nombre_usuario;  
      // Guardar el estado en localStorage
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('nombre_usuario', nombre_usuario);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.nombre_usuario = '';  
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('nombre_usuario');
    },
    initializeStore(state) {
      // Cargar el estado desde localStorage si está presente
      if (localStorage.getItem('isLoggedIn')) {
        state.isLoggedIn = true;
        state.nombre_usuario = localStorage.getItem('nombre_usuario');
      }
    },
  },
  actions: {
    login({ commit }, nombre_usuario) {
      commit('login', nombre_usuario);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  modules: {
  }
  
});
