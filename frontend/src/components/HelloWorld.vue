<template>
  <v-container>
    <!-- Encabezado de la página -->
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../images/Pokebola.png')"
          class="my-3"
          contain
          height="150"
        />
      </v-col>
    </v-row>
    <br />

    <!-- Tabla de Pokémons -->
    <v-data-table
      :headers="headers"
      :items="pokemons"
      class="elevation-1"
      item-key="id"
    >
      
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',

  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Imagen', value: 'imagen' },
    ],
    pokemons: [],
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
    slides: [
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
    ],
  }),

  created() {
    this.cargarPokemons();
  },

  methods: {
    async cargarPokemons() {
      try {
        const response = await axios.get('http://localhost:3000/api/pokemons');
        this.pokemons = response.data.pokemons;
      } catch (error) {
        console.error('Error al cargar los Pokémons:', error);
      }
    },
  },
};
</script>
