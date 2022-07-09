const { request, response } = require("express");

const usuariosGet = (req, res) => {
    res.json({
        msg:'Petición GET - Controllers'
    });
}

const usuariosPost = (req = request, res = response) => {
    const body = req.body;
    console.log(body); //    <------ me lo muestra como undefined pero nose bien porque, ya que importe el express

    res.json({
        msg:"Petición POST - Controllers",
        body
    });
  }

const usuariosPut = (req, res) => {
    const {id} = req.params;
    res.json({
        msg:"Peticion PUT - Controllers",
        parametro: id
    });
  }

const usuariosDelete = (req, res) => {
    res.json({
        msg:"Peticion DELETE - rutas"
    });
  }

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};