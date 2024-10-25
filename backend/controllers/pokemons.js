const {response} = require('express');
const mongoose = require('mongoose'); 
const {pokemonSchema} = require('../schemas/schemas');
//Generar la Conexón a MongoDB
mongoose.connect('mongodb://localhost:27017/Pokemons');
const db = mongoose.connection;

// Creación de Modelos 
const Pokemon = mongoose.model('Pokemon',pokemonSchema);

/**
 * Obtiene lista de todos los pokemones de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const get_all_pokemons = (async(req, res = response) =>{
    try {
        const pokemons = await db.collection('pokemons').find().toArray();
        res.json({ pokemons });
        console.log("Respuesta:\n",pokemons);
    } catch (error) {
        console.error('Error al obtener los pokemons: ',error);
        res.status(500).json({ error: 'Error Interno del Servidor'});
    }
});

/**
 * Registra un usuario en base de datos
 * @param {*} req 
 * @param {*} res 
 */
const save_pokemons = (async(req, res = response) => {
    try {
        const pokemon = new Pokemon({
            id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        const resultado = await pokemon.save();
        res.status(201).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Obtiene un pokemon por ID, el parámetro _id viene en el cuertpo de la solicitud
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const get_pokemon_by_id_body = (async(req, res = response)=>{
    try{
        const {_id} = req.body;
        if(!_id){
            return res.sta|(400).json({mensaje:'requiere de un ID'});
        }
        const pokemon = await Pokemon.findById(_id);
        if(!pokemon){
            return res.status(400).json({
                mensaje: 'ID de Pokemon no fue localizado'
            });
        }
        res.json(pokemon);
    }catch(error){
        console.error('Error al buscar pokemon por ID: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
});

/**
 * Actualiza a un usuario, el _id del usuario viene en el cuerpo de la solicitud
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const update_pokemon_body = (async(req, res = response)=>{
    try{
        const {_id, nombre, tipo, imagen} = req.body;
        if(!_id ||( !nombre && !tipo && !imagen)){
            return res.status(400).json({
                mensaje: 'Se requiere proporcionar ID y al menos campos a actualizar (nombre, correo, imagen)'
            });
        }

        // Validación de base64 para imagen
        if (imagen && !/^(data:image\/[a-zA-Z]+;base64,)[A-Za-z0-9+/=]+$/.test(imagen)) {
            return res.status(400).json({ mensaje: 'La imagen no es válida en formato base64' });
        }

        const pokemonActualizado = await Pokemon.findByIdAndUpdate(_id,{nombre, tipo, imagen}, {new : true});
        if(!pokemonActualizado){
            res.status(404).json({mensaje:'Pokemon no fue encontrado'});
        }
        res.json(pokemonActualizado);
    }catch(error){
        console.error('Error al actualizar pokemon por ID: ', error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
});

/**
 * Actualiza la información del pokemon, el id viene en el parámetro de segmento
 * @param {*} req 
 * @param {*} res 
 * @returns pokemon actualizado
 */
const update_pokemon = (async(req, res = response) => {
    try {
        const { id } = req.params;
        const actualizaciones = req.body;

        // Validación de base64 para imagen
        if (actualizaciones.imagen && !/^(data:image\/[a-zA-Z]+;base64,)[A-Za-z0-9+/=]+$/.test(actualizaciones.imagen)) {
            return res.status(400).json({ mensaje: 'La imagen no es válida en formato base64' });
        }

        const pokemonActualizado = await Pokemon.findByIdAndUpdate(id, actualizaciones, { new: true, runValidators: true });
        
        if (!pokemonActualizado) {
            return res.status(404).send({mensaje: 'Pokemon no encontrado' });
        }
        
        res.send(pokemonActualizado);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Elimina pokemon
 * @param {*} req 
 * @param {*} res 
 * @returns mensaje de eliminación
 */
const delete_pokemon = (async(req, res = response) => {
    try {
        const { id } = req.params;
        const pokemonEliminado = await Pokemon.findByIdAndDelete(id);
        if (!pokemonEliminado) {
            return res.status(404).send({ mensaje: 'Pokemon no encontrado' });
        }        
        res.send({ mensaje: 'Pokemon eliminado exitosamente' });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = {
    get_all_pokemons,
    save_pokemons,
    get_pokemon_by_id_body,
    update_pokemon_body,
    update_pokemon,
    delete_pokemon
};