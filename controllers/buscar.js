const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Producto, Bodega } = require("../models");

const coleccionesExistentes = ["bodegas", "productos", "role", "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoID = ObjectId.isValid(termino);

  if (isMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const isMongoID = ObjectId.isValid(termino);

  if (isMongoID) {
    const producto = await Producto.findById(termino);
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
  });

  res.json({
    results: productos,
  });
};

const buscarBodegas = async (termino = "", res = response) => {
  const isMongoID = ObjectId.isValid(termino);

  if (isMongoID) {
    const bodega = await Bodega.findById(termino);
    return res.json({
      results: bodega ? [bodega] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const bodegas = await Bodega.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
  });

  res.json({
    results: bodegas,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesExistentes.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesExistentes}`,
    });
  }
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "bodegas":
      buscarBodegas(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No hizo la busqueda de coleccion",
      });
      break;
  }
};
module.exports = {
  buscar,
};
