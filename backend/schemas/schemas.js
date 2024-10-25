const mongoose = require('mongoose'); 
const { Schema } = mongoose;

/**
 * Define el esquema de usuarios
 */
const usuarioSchema = new mongoose.Schema({
    usuario: String,
    correo: String,
    password: String,
    nombre: String
});

/**
 * Define el esquema de pokemons
 */
const pokemonSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    imagen: String
});

/**
 * Define el esquema para almacenar logs
 */
const errorSchema = new mongoose.Schema({
    error: String,
    info: String,
    url: String,
    date: { type: Date, default: Date.now }
});

//Exporta los esquemas creados para ser usados en otras partes del servidor
module.exports = {
    usuarioSchema, 
    pokemonSchema,
    photoSchema,
    errorSchema
}