const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol }); //buscar en la coleccion Roles de la base de datos a ver si existe ese rol ESTO ES DE MONGOOSE
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo: correo }); //verificar si ya existe ese correo ESTO ES DE MONGOOSE
    if( existeEmail ){
        throw new Error(`El correo: ${correo} ya está registrado `);
    }

}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id: ${id} no existe `);
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}