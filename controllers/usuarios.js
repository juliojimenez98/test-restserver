const { response, request } = require("express");

const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  //Forma mas lenta de hacer la consulta
  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, role } = req.body;

  const usuario = new Usuario({ nombre, correo, password, role });

  //Encriptar contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "Se creo correctamente el usuario",
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    //Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "Se actualizo correctamente el usuario",
    usuario,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  //Cambiar estado

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "patch api - Controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
