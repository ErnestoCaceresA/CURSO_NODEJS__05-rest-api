const {
    Router
} = require('express');

// controladores
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

// PETICIONES HTTP:

// ENDPOINT GET
router.get('/', usuariosGet)

// ENDPOINT PUT
router.put('/:id', usuariosPut) //ASI SI MANDAN LOS PARAMETROS PARA PONER EN LA DIRECCION usuarios/10 o cualquier numero de id

// ENDOPOINT POST
router.post('/', usuariosPost)

// ENDPOINT PATCH
router.patch('/', usuariosPatch)

// ENDPOINT DELETE
router.delete('/', usuariosDelete)







module.exports = router