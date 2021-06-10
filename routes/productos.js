const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  borrarProducto,
  desbloquearProductos,
} = require("../controllers/producto");
const { existeProductoPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, isAdminRole } = require("../middlewares");

const router = Router();

//Obtener productos
router.get("/", [validarJWT], obtenerProductos);

//Obtener producto por id
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProductoPorId
);

//Crear producto
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

//Actualizar producto
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar producto
router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

//Desbloquear producto
router.delete(
  "/:id/unlock",
  [
    validarJWT,
    isAdminRole,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  desbloquearProductos
);

module.exports = router;
