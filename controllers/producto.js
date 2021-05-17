const { response, request } = require("express");
const { Producto } = require("../models");

//Obtener produtos
const obtenerProductos = async (req = request, res = response) => {
  const { limite, desde } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments(),
    Producto.find()
      .populate("usuario", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    productos,
  });
};

//Obtener producto por id
const obtenerProductoPorId = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id).populate("usuario", "nombre");

  res.json(producto);
};

//Crear productos
const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `Ya existe un producto con el nombre ${productoDB.nombre}`,
    });
  }
  //Generar data a guardar
  const data = {
    ...body,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  //Guardar en db
  await producto.save();

  res.status(201).json(producto);
};

//Actualizar Producto
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

//Borrar producto

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  borrarProducto,
  actualizarProducto,
};
