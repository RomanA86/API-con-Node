//Conexion a mi BD
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online')
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar a la BD');
    }
    
}

module.exports = {
    dbConnection
}