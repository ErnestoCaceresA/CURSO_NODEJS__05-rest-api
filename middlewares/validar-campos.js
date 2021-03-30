const {
    validationResult
} = require('express-validator');

//un middleware es una funcion que se ejecuta antes de llamar ya sea a un controlador o seguir con la ejecucion de mis peticiones

const validarCampos = (req, res, next) => { //next es lo que se tiene que llamar si este middleware pasa
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //si hay errores de las validaciones que se pusieron en el middleware entonces no continua con el proceso y retorna los errores con un status 400
        return res.status(400).json(errors);
    }

    next(); //si no hay ningun error entonces continua con el siguiente, en el caso de que tenga un error entonces este next() no entrará asi que 
    //no continuará con los controladores hasta que se pasen  todas las validaciones ../routes/usuarios  en POST
}

module.exports = {
    validarCampos
}