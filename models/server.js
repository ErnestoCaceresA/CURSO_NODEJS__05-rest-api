require("dotenv").config();
const cors = require('cors')

const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes(); //inicializa las rutas
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() ) //cualquier informacion que venga ya sea de PUT, POST, DELETE la va a parsear a formato json

        // directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        // // PETICIONES HTTP:

       this.app.use(this.usuariosPath, require('../routes/usuarios')); //ruta: /api/usuarios
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;