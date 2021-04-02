// crear funciones y exportarlas
const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

//ESTO DE IGUALAR EL res = response QUE IMPORTAMOS DE EXPRESS EN REBUNDANTE OSEA NO NECESARIO PORQUE ES LO MISMO
//SOLAMENTE HACEMOS ESTO PORQUE AQUI EN ESTA CARPETA AL NO TENER EXPORTADO EXPRESS PORQUE SOLO SON FUNCIONES PARA EXPORTARLAS
//ENTONCES NO ME SALE EL AUTOCOMPLETADO DE LAS FUNCIONES DE EXPRESS, ASI QUE ESTO LOS RESUELVE, YA ALFINAL PODEMOS BORRARLO

//GET: Para enlistar y Paginar todos los usuario que existen en la base de datos (paginar para que el del frontend pueda mandar queries de limite y desde para hacer paginacion el pagina web)
const usuariosGet =  async(req = request, res = response) => { 

    // const {q, nombre = "no name default", apikey, page = 1, limit} = req.query; //obetener los parametros ej. api/usuarios?q=hola&nombre=ernesto
    const { limite = 5, desde = 0 } = req.query;
    
    // //los query son string y si quiero usar el limite para ponerlo dentro de la funcion limit() de mongoose hay que parsear a number
    // const usuarios = await Usuario.find({ estado: true }) //find de mongoose, como condicion el estado tiene que estar activo
    //     .skip( Number(desde) )
    //     .limit( Number(limite) );

    // const totalRegistros = await Usuario.countDocuments({ estado:true }); //condicion que el estado este en true
    const [totalRegistros, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado:true }),
        Usuario.find({ estado: true })
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({ //se manda formato json
        totalRegistros,
        usuarios
        // ok: true,
        // msg: 'get API - controlador',
        // q,
        // nombre, //si no manda este query entonces se pone lo que se puso por defecto arriba 
        // apikey, //si no manda nada entonces no aparece porque no le pusimos nada por defecto como el name
        // page, //si no me manda la pagina entonces por defecto lo pusimos en 1
        // limit
    })
}

//PUT: Para actualizar informacion de un usuario a traves de su ID
const usuariosPut = async(req, res) => {

    const {id} = req.params; //en los routes en el path se mandó '/:id' asi se mandan estos parametros y asi se reciben
    const { _id, password, google, correo, ...resto } = req.body; //excluimos el _id, password, google y correo para que esos no los pueda ACTUALIZAR, solamente el resto utilizando el operador spread

    //TODO validar contra base de datos
    if( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto ); //encontrar por el ID Y ACTUALIZAR esto es de mongoose

    res.status(400).json({ //se manda formato json
        ok: true,
        msg: 'put API - controlador',
        usuario
    })
}

//POST: para registrar un usuario
const usuariosPost = async(req, res) => { //se manda a traves de postman en un body, en raw en formato json

    //resultados de las validaciones del express-validation middleware que se pusieron en ../routes/usuarios/ en el router de este usuariosPost
    

    const {nombre, correo, password, rol} = req.body; //las request que se inserte en el POST cuando se mande info ej. en postman es  mandando un body json a esta peticion POST
    //como solo estamos desesctructurando lo que necesitamos entonces aunque el frontend agregue otro atrubuto en el post, este no se tomará en cuenta
    
    //guardar en base de datos {
        //si alguna validacion de las que hicimos en el Schema no se cumple, la peticion post se quedará cargando y tendremos un error en consola de eso 
    const usuario = new Usuario( {nombre, correo, password, rol} ); //mandar info al Schema que hicimos de la base de datos
    
    //VALIDACIONES ANTES DE GUARDAR EN BASE DE DATOS
    //verificar si el correo existe
    //EXPRESS-VALIDATOR MIDDLEWARE sirve para validar cosas (los middlewares se ponen en las rutas ../routes/usuarios se mandan como segundo arrgumento como puse en el POST router)
    //SE USÓ ESE PARA VALIDAD EL CORREO ELECTRONICO ANTES DE HACER EL REQUEST A ESTE CONTROLADOR

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

// PATCH: namas es de prueba no hace nada
const usuariosPatch = (req, res) => {
    res.json({ //se manda formato json
        ok: true,
        msg: 'patch API - controlador'
    })
}

// DELETE: para borrar un usuario de la base de datos pasandole el id
const usuariosDelete = async(req, res) => {
    //validaciones esta en routes
    const {id} = req.params;


    //FISICAMENTE LO BORRAMOS
    // const usuario = await Usuario.findByIdAndDelete( id );

    //BORRARLO CAMBIANDO EL ESTADO DEL USUARIO DE TRUE A FALSE SIMULANDO QUE ESE USUARIO YA NO ESTA ACTIVO OSEA "BORRADO" pero sin perder su informacion
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    // const usuarioAutenticado = req.usuario //nuevo atributo de el objeto req que se creao en el middleware validar-jwt.js
    
    res.json({ //se manda formato json
        msg: `usuario ${usuario.nombre} borrado satisfactoriamente`,
        usuario
        // usuarioAutenticado
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}