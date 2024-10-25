const {response} = require('express');
const mongoose = require('mongoose'); 
const {usuarioSchema} = require('../schemas/schemas');
//Generar la Conexón a MongoDB
mongoose.connect('mongodb://localhost:27017/Pokemons');
const db = mongoose.connection;

// Creación de Modelos 
const Usuario = mongoose.model('Usuarios',usuarioSchema);

/**
 * Obtiene lista de todos los usuarios de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const get_all_usuarios = (async(req, res = response) =>{
    try {
        const usuarios = await db.collection('usuarios').find().toArray();
        res.json({ usuarios });
        console.log("Respuesta:\n",usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios: ',error);
        res.status(500).json({ error: 'Error Interno del Servidor'});
    }
});

/**
 * Obtiene un usuario por ID, el parámetro _id viene en el cuertpo de la solicitud
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const get_usuario_by_id_body = (async(req, res = response)=>{
    try{
        const {_id} = req.body;
        if(!_id){
            return res.sta|(400).json({mensaje:'requiere de un ID'});
        }
        const usuario = await Usuario.findById(_id);
        if(!usuario){
            return res.status(400).json({
                mensaje: 'ID de Usuario no fue localizado'
            });
        }
        res.json(usuario);
    }catch(error){
        console.error('Error al buscar usuario por ID: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
});

module.exports = {
    get_all_usuarios,
    get_usuario_by_id_body
};