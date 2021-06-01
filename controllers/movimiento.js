const { response, request } = require("express");

const { Movimiento } = require("../models");

const movimientosGet = async (req = request, res = response) => {
  const { limite, desde } = req.query;

  const [total, movimientos] = await Promise.all([
    Movimiento.countDocuments(),
    Movimiento.find()
      .populate("usuario", "nombre")
      .populate("productos", "nombre")
      .populate("bodega", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    movimientos,
  });
};

module.exports = {
  movimientosGet,
};
