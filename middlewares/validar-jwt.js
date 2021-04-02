const { response } = require("express")
const jwt = require("jsonwebtoken")

const validatJWT = (req, res, next) => {

    const token = req.header('x-token'); //para obtener los headers

    if( !token ){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        
        req.uid = uid; //crear una nueva propiedad en el objeto request que se llame uid y que tenga el valor de ui que extrajimos arriba

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