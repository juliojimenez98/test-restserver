const { response, request } = require("express");
const { Bodega, Movimiento } = require("../models");

//Obtener todas las bodegas
const obtenerBodegas = async (req, res = response) => {
  const { limite, desde } = req.query;

  const [total, bodegas] = await Promise.all([
    Bodega.countDocuments(),
    Bodega.find()
      .populate("usuario", "nombre")
      .populate("producto", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    bodegas,
  });
};

const obtenerBodegasPorId = async (req, res = response) => {
  const { id } = req.params;
  const bodegas = await Bodega.findById(id)
    .populate("usuario", "nombre")
    .populate("producto", "nombre");

  res.json({ bodegas });
};

//Crear Bodegas
const crearBodega = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const bodegaDB = await Bodega.findOne({ nombre: body.nombre });

  if (bodegaDB) {
    return res.status(400).json({
      msg: `Ya existe una bodega con el nombre ${bodegaDB.nombre}`,
    });
  }
  //Generar data a guardar
  const data = {
    ...body,
    usuario: req.usuario._id,
  };

  const bodega = new Bodega(data);

  //Guardar en db
  await bodega.save();

  res.status(201).json(bodega);
};

//Actualizar Bodegas
const actualizarBodega = async (req, res = response) => {
  const { id } = req.params;

  const antiguo = await Bodega.findById(id);

  const { estado, usuario, ...data } = req.body;

  data.usuario = req.usuario._id;

  const bodega = await Bodega.findByIdAndUpdate(id, data, { new: true });

  res.json(bodega);
  const movimientos = {
    bodega: bodega.id,
    productos: bodega.producto,
    usuario: req.usuario._id,
    tipoMovimiento: 0,
    cantidadMovimiento: 0,
  };

  if (antiguo.producto.length < movimientos.productos.length) {
    movimientos.tipoMovimiento = 1; //Se agregaron Productos
    movimientos.cantidadMovimiento =
      movimientos.productos.length - antiguo.producto.length;
    const movimiento = new Movimiento(movimientos);
    await movimiento.save();
  } else if (antiguo.producto.length > movimientos.productos.length) {
    movimientos.tipoMovimiento = 2; //Se Retiraron productos
    movimientos.cantidadMovimiento =
      movimientos.productos.length - antiguo.producto.length;
    const movimiento = new Movimiento(movimientos);
    await movimiento.save();
  }
};

//Bloquear Bodega
const borrarBodega = async (req, res = response) => {
  const { id } = req.params;

  const bodegaBorrada = await Bodega.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(bodegaBorrada);
};

module.exports = {
  crearBodega,
  obtenerBodegas,
  obtenerBodegasPorId,
  actualizarBodega,
  borrarBodega,
};
