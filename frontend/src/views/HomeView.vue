<template>
    <div>
    <hello-world />
   </div>
  </template>
  
  
  <script>
  import HelloWorld from '../components/HelloWorld'
  
  export default {
    name: 'HomeView',
  
    data() {
      return {
        
      };
    },
  
    components: {
      HelloWorld,
    },
    beforeCreate() {
      if (!sessionStorage.getItem('usuario')) {
        this.$router.push('/');
      }
    },
    mounted(){
      this.nombre_usuario = sessionStorage.getItem('usuario');
      console.log(this.nombre_usuario);
    },
    
  }
  </script>
  