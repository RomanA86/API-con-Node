const express = require('express');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        //Conectar DB
        this.conectarDb();

        //middlewares
        this.middleWare();

        //RUTAS
        this.routes();
    }
    //Funcion para conectar a DB
    async conectarDb(){
        await dbConnection()
    }

    middleWare(){
    //Leer el body

        this.app.use(express.json());

    //Abro pagina estatica 
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,()=>{console.log('Servidor online en puerto ', this.port)});
    }
}

module.exports = Server;