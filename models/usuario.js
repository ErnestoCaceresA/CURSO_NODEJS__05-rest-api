/*
    {
        nombre: 'rhsdf',
        correo: 'adfdfsdf@gmail.com',
        password: 'NdfSDoujf2345',
        img: 'fdkjflkdsf.jpg',
        rol: 'admin',
        estado: false,
        google: true
    }
*/ 
const { Schema, model } = require('mongoose');


//Schema para hacer el esquema de nuestra "tabla" de base de datos

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //para que sea un correo unico
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // estos dos roles habrá
    },
    estado: {
        type: Boolean,
        default: true //por defecto estará en true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//model (se importa de mongoose) para exportar el Schema model( '<nombre para darle a la coleccion>', < nombre del Schema que creamos >)

module.exports = model( 'Usuario', UsuarioSchema );