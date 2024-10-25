const {Router} = require('express');

const { 
    get_all_usuarios,
    get_usuario_by_id_body
     } = require('../controllers/usuarios');

const router = Router();

router.get('/get_all', get_all_usuarios); 
router.get('/get_by_id_body', get_usuario_by_id_body); 

module.exports = router;