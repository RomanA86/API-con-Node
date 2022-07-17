const { request, response } = require("express");
const Usuario = require ('../models/usuario');
const bcrypt = require('bcrypt');

const usuariosGet = async (req=request, res) => {
    const { limite = 5, desde = 0 } = req.query;

    const usuarios = await Usuario.find({estado:true}).skip(desde).limit(limite);

    const total = await Usuario.countDocuments({estado:true});
    res.json({
        limite,
        desde,
        total,
        usuarios
    });
}

const usuariosPost = async (req = request, res = response) => {
    const { nombre, email, password} = req.body;

    const usuario = new Usuario({ nombre, email ,password })
    
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //Guardar en la BD
    await usuario.save()

    res.status(201).json({
        msg:'Usuario creado con éxito',
        usuario
    });
  }

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password,email,...resto } = req.body
    //Encriptar la contraseña
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt); 
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true});

    res.json({
        msg:"Usuario actualizado",
        usuario
    });
  }

const usuariosDelete = async(req, res) => {
    const { id } = req.params;
    //Inactivar usuario
    const usuarioBorrado = await Usuario.findByIdAndUpdate(
        id,
        { estado:false },
        { new:true }
    );

    res.json({
        msg:"Usuario inactivado",
        usuarioBorrado
    });
  }

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};