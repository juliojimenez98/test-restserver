const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si email existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - correo ",
      });
    }

    //Si el usuario esta activo en la bbdd

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - estado:false ",
      });
    }

    //verificar contrasena

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - password ",
      });
    }

    //generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = {
  login,
};
