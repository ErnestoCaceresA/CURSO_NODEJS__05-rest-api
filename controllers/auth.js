const bcryptjs = require('bcryptjs');
const {response} = require("express");
const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/generarJWT");

const login = async(req, res = response) => {

    const { correo, password } = req.body;
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            })
        }
        //verificar si el usuario esta activo en base de datos
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - Estado: false'
            })
        }
        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario.password ) //regresa un true si la comparacion si es correcta o un false si la comparacion es incorrecta
        if( !validarPassword ){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - Password'
            })
        }
        //Generar el JWT
        const token = await generarJWT( usuario.id )

        
        res.json({
            msg: "Login OK",
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salio mal..."
        })
    }

}

module.exports = {
    login
}