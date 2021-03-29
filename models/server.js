require("dotenv").config();
const cors = require('cors')

const express = require('express');
const { dbConnection } = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //funciones que se van a ejecutar justo cuando se llama al constructor de este objeto: =>

        //Conectar a base de datos
        this.conectardb();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes(); //inicializa las rutas
    }

    async conectardb(){
        await dbConnection() //Funcion que nosotros creamos para la coneccion de base de datos en la carpeta database
    }


    //un middleware es una funcion que se ejecuta antes de llamar ya sea a un controlador o seguir con la ejecucion de mis peticiones
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