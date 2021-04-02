const {
    Router
} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

//controladores
const { login } = require('../controllers/auth');


const router = Router();

// PETICIONES HTTP:

// ENDPOINT POST
router.post('/login', [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validarCampos ]
,login ); //localhost:3000/api/auth/login


module.exports = router