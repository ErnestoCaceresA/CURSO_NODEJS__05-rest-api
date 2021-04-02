const {
    Router
} = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

//middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt')

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
router.put('/:id', [

    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( id=> existeUsuarioPorId(id) ), //validator personalizado
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos //middleware personalizado para mostrar los errores, si no se cumplen las validaciones entonces no entra la funcion next() asi que hasta ahi llega y no pasa por el controlador

] ,usuariosPut) //ASI SI MANDAN LOS PARAMETROS PARA PONER EN LA DIRECCION usuarios/10 o cualquier numero de id

// ENDOPOINT POST
router.post('/', [
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //tiene que estar no empty
    check('password', 'El password es obligatorio y tiene que ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(), //middleware de express-validator paquete para validar el correo electronico
    check('correo').custom( emailExiste ), //validacion personalizada en carpeta helpers/validar-campos
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos //middleware personalizado para mostrar los errores, si no se cumplen las validaciones entonces no entra la funcion next() asi que hasta ahi llega y no pasa por el controlador

] ,usuariosPost)

// ENDPOINT PATCH
router.patch('/', usuariosPatch)

// ENDPOINT DELETE
router.delete('/:id', [
    validatJWT, //SE PONE AL PRINCIPIO PORQUE SI TODO ESTA BIEN Y DA "NEXT" CONTINUA CON LO SIGUIENTE PERO SI DA ERROR NO EJECUTA NADA DE LO QUE ESTA DESPUES, Y PUES ANTES DE HACER LO DE MAS HAY QUE VALIDAR SI TIENE UN TOKEN VALIDO
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( id=> existeUsuarioPorId(id) ), //validator personalizado
    validarCampos
] ,usuariosDelete)







module.exports = router