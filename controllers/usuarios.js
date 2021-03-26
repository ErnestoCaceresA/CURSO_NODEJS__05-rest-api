// crear funciones y exportarlas
const { response, request } = require('express')

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

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body; //las request que se inserte en el POST cuando se mande info ej. en postman es  mandando un body json a esta peticion POST

    res.status(201).json({ //se manda formato json
        ok: true,
        msg: 'post API - controlador',
        // body //un objeto con formato json adentro de todo lo que mando el user
        nombre,
        edad
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