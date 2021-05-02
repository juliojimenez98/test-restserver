const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;

  res.json({
    msg: "get api-Controller",
    query,
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "post  API- COntroller no funca",
    nombre,
    edad,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put api - Controller",
    id,
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "delete api - Controller",
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
