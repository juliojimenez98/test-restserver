const Role = require("../models/role");
const usuario = require("../models/usuario");

const isRoleValid = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`);
  }
};

const emailExists = async (correo = "") => {
  const existeEmail = await usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya esta registrado `);
  }
};

const existsUserById = async (id) => {
  const existsUsuario = await usuario.findById(id);
  if (!existsUsuario) {
    throw new Error(`El id: ${id}, No existe `);
  }
};

module.exports = {
  isRoleValid,
  emailExists,
  existsUserById,
};
