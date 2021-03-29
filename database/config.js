const mongoose = require('mongoose')


const dbConnection = async() => { //funcion asincrona porque tiene que esperar a que se realice la coneccion

    try { //cuando hacemos algo en lo que nosotros no tenemos el control como lo es la conexion a base de datos es bueno ponerlo dentro de un try catch por si hay un error
        
        await mongoose.connect(process.env.MONGODB_CNN, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        }) //es una promesa asi que como estamos dentro de una funcion asincrona podemos usar el await envez del .then()

        console.log('Base de datos online');


    } catch (error) {
        console.log(error);
        throw new Error('Error  a la hora de iniciar la base de datos');
    }


}

module.exports = {
    dbConnection
}