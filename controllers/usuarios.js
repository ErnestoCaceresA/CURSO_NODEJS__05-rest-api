// crear funciones y exportarlas
const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

//ESTO DE IGUALAR EL res = response QUE IMPORTAMOS DE EXPRESS EN REBUNDANTE OSEA NO NECESARIO PORQUE ES LO MISMO
//SOLAMENTE HACEMOS ESTO PORQUE AQUI EN ESTA CARPETA AL NO TENER EXPORTADO EXPRESS PORQUE SOLO SON FUNCIONES PARA EXPORTARLAS
//ENTONCES NO ME SALE EL AUTOCOMPLETADO DE LAS FUNCIONES DE EXPRESS, ASI QUE ESTO LOS RESUELVE, YA ALFINAL PODEMOS BORRARLO
const usuariosGet = (req = request, res = response) => { 

    const {q, nombre = "no name default", apikey, page = 1, limit} = req.query; //obetener los parametros ej. api/usuarios/q=hola&nombre=ernesto

    res.json({ //se manda formato json
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre, //si no manda este query entonces se pone lo que se puso por defecto arriba 
        apikey, //si no manda nada entonces no aparece porque no le pusimos nada por defecto como el name
        page, //si no me manda la pagina entonces por defecto lo pusimos en 1
        limit
    })
}

const usuariosPut = (req, res) => {

    const {id} = req.params; //en los routes en el path se mandó '/:id' asi se mandan estos parametros y asi se reciben

    res.status(400).json({ //se manda formato json
        ok: true,
        msg: 'put API - controlador',
        id
    })
}

const usuariosPost = async(req, res) => { //se manda a traves de postman en un body, en raw en formato json

    //resultados de las validaciones del express-validation middleware que se pusieron en ../routes/usuarios/ en el router de este usuariosPost
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol} = req.body; //las request que se inserte en el POST cuando se mande info ej. en postman es  mandando un body json a esta peticion POST
    //como solo estamos desesctructurando lo que necesitamos entonces aunque el frontend agregue otro atrubuto en el post, este no se tomará en cuenta
    
    //guardar en base de datos {
        //si alguna validacion de las que hicimos en el Schema no se cumple, la peticion post se quedará cargando y tendremos un error en consola de eso 
    const usuario = new Usuario( {nombre, correo, password, rol} ); //mandar info al Schema que hicimos de la base de datos
    
    //VALIDACIONES ANTES DE GUARDAR EN BASE DE DATOS

    //verificar si el correo existe

    //EXPRESS-VALIDATOR MIDDLEWARE sirve para validar cosas (los middlewares se ponen en las rutas ../routes/usuarios se mandan como segundo arrgumento como puse en el POST router)
    //SE USÓ ESE PARA VALIDAD EL CORREO ELECTRONICO ANTES DE HACER EL REQUEST A ESTE CONTROLADOR

    const existeEmail = await Usuario.findOne({ correo: correo }); //verificar si ya existe ese correo
    if( existeEmail ){
        return res.status(400).json({ //si es que ya existe entonces con un return se para el proceso para que no se guarde y regrese un status 400 y el mensaje de erros usuario ya existe
            msg: 'El correo ya esta registrado'
        })
    }
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en base de datos
    await usuario.save(); 
    //}
    
    res.status(201).json({ //se manda formato json
        msg: 'post API - controlador',
        // body //un objeto con formato json adentro de todo lo que mando el user
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({ //se manda formato json
        ok: true,
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({ //se manda formato json
        ok: true,
        msg: 'delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}