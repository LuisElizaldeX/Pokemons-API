<template>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="justify-center">
              <img src="../images/Pokebola.png" alt="Login Image" class="login-image">
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="correo" label="Ingresa tu correo" required/>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password" 
                                  label="Ingresa tu password" 
                                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                                  @click:append="passwordVisibility"
                                  required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox v-model="rememberMe" label="Recordar usuario"></v-checkbox>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <v-btn type="submit" color="primary">
                      Entrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  
  export default {
    name: 'LoginView',
    data() {
      return {
        correo: '',
        password: '',
        rememberMe: false,
        showPassword: false,
      };
    },
    mounted() {
      this.correo = Cookies.get('ccorreo');
      this.rememberMe = (this.correo!='');
        
    },
    methods: {
      passwordVisibility() {
        this.showPassword = !this.showPassword;
      },
      async login() {
        try {
          const response = await axios.post('/auth/login', {
            correo: this.correo,
            password: this.password,
          });
          console.log('Logueo Correcto:', response.data.nombre);
          //console.log('Encabezados de la respuesta:', response.headers); 
          const token = response.headers['x-token'];
          Cookies.set('ccorreo', token);
          //sessionStorage.setItem('token', token);
          console.log(`x-token: ${token}`);
          this.$swal({
            icon: "success",
            title: `Bienvenido ${response.data.nombre}`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            localStorage.setItem('token', token);
            sessionStorage.setItem('usuario', JSON.stringify(response.data.nombre));
            localStorage.setItem('token', token);
            const userData = {
              name: response.data.nombre,
              email: response.data.correo,
              contrasenia: response.data.password, 
              id: response.data._id
            };
            sessionStorage.setItem('userData', JSON.stringify(userData));
            this.$store.dispatch('login', response.data.nombre);
            this.$router.push({ name: 'home' });
          }).then(()=>{
            if(this.rememberMe){
              Cookies.set('ccorreo', this.correo, { expires: 7, path: '/' });
            }else{
              Cookies.remove('ccorreo');
            }
          });
        } catch (error) {
          Vue.config.errorHandler(error, 'Error en login');
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Revisa tus credenciales de acceso",
          });
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .login-image {
    width: 200px;
    height: auto;
  }
  </style>
  