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

UsuarioSchema.methods.toJSON = function(){
    //basicamente para no mostrar el __v y el password del usuario a la hora de registrarse unicamente guardarlos
    const { __v, password, _id , ...usuario } = this.toObject();
    usuario.uid = _id; //agregar un atributo llamado uid donde tiene el valor de _id que da en automatico mongodb
    return usuario
}


//model (se importa de mongoose) para exportar el Schema model( '<nombre para darle a la coleccion>', < nombre del Schema que creamos >)

module.exports = model( 'Usuario', UsuarioSchema );