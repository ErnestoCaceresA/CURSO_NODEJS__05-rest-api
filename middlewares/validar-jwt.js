const { response } = require("express")
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validatJWT = async(req, res, next) => {

    const token = req.header('x-token'); //para obtener los headers

    if( !token ){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

        // leer el usuario que correspone al uid
        
        // req.uid = uid; //crear una nueva propiedad en el objeto request que se llame uid y que tenga el valor de ui que extrajimos arriba
        usuario =  await Usuario.findById( uid )
        req.usuario = usuario; //crear nuevo atributo en el objeto req que se llame usuario y que tenga la informacion del usuario autenticado

        // si el usuario esta undefined
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - usuario que quiere borrar a otro usuario no existe en base de datos '
            })
        }

        // verificar si el uid tiene estado en true
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario que quiere borrar otro usuario esta con estado false'
            })
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
    }

}


module.exports = {
    validatJWT
}