import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)

Vue.config.productionTip = false
store.commit('initializeStore');

axios.defaults.baseURL = 'http://localhost:3000';

// Configuración del manejador de errores global
Vue.config.errorHandler = function (err) {
  console.log('ErroHandler in action');

  // También puedes mostrar el error en la consola
  console.error(err);
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')