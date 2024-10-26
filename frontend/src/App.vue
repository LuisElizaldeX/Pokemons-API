<template>
    <v-app>
      <v-app-bar app color="primary" dark v-if="isLoggedIn">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="d-flex align-center">
          <v-img alt="UV Logo" class="shrink mr-2" contain src="../src/images/BN_Logo_de_la_Universidad_Veracruzana.png"
            transition="scale-transition" width="40" />
        </div>
  
        <v-spacer></v-spacer>
  
        <v-btn @click="logout">
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>{{ nombre_usuario }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link @click="handleItemClick(item)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'App',
    computed: {
      ...mapState(['isLoggedIn', 'nombre_usuario']) 
    },
    data: () => ({
      drawer: false,
      items: [
        // elementos de navegación
        { title: 'Home', icon: 'mdi-home' },
        { title: 'Cuenta', icon: 'mdi-account' },
        { title: 'Foto de Perfil', icon: 'mdi-camera' },
        { title: 'Logout', icon: 'mdi-logout' },
      ],
    }),
    
    methods: {
      logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.dispatch('logout');
        this.$router.push('/');
      },
      handleItemClick(item) {
        const currentPath = this.$route.path;
        switch (item.title) {
          case 'Home':
            if (currentPath !== '/home') this.$router.push('/home');
            break;
          case 'Cuenta':
            if (currentPath !== '/user_edit') this.$router.push('/user_edit');
            break;
          case 'Foto de Perfil':
            if (currentPath !== '/user_picture') this.$router.push('/user_picture');
            break;
          case 'Logout':
            this.logout();
            break;
          default:
            break;
        }
      }
    }
  };
  </script>
  