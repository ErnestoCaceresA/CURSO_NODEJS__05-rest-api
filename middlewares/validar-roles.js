const { response } = require("express");

const esAdminRole = (req, res=response, next) => {

    // como ya paso por el middleware de validar-jwt entonces si paso satisfactoriamente se creo el atributo usuario en el objeto req
    //y como este middleware esta despues de ese anterior, entonces tiene acceso a ese atributo de req.usuario donde esta la info del usuario que quiere borrar a otro
    //tiene que ser admin para hacer eso
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es admnistrador - No puede hacer esto`
        })
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return (req, res=response, next) => {
        
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio necesita uno de estos roles ${roles}`
            })
        }
        
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}