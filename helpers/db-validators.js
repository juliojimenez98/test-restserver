const { Producto, Usuario, Bodega } = require("../models");
const Role = require("../models/role");

const isRoleValid = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`);
  }
};

const emailExists = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya esta registrado `);
  }
};

const existsUserById = async (id) => {
  const existsUsuario = await Usuario.findById(id);
  if (!existsUsuario) {
    throw new Error(`El id: ${id}, No existe `);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El producto con id: ${id}, No existe `);
  }
};

const existeBodegaPorId = async (id) => {
  const existeBodega = await Bodega.findById(id);
  if (!existeBodega) {
    throw new Error(`La bodega con id: ${id}, No existe `);
  }
};

module.exports = {
  isRoleValid,
  emailExists,
  existsUserById,
  existeProductoPorId,
  existeBodegaPorId,
};
