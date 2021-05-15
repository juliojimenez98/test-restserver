const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearBodega,
  obtenerBodegas,
  obtenerBodegasPorId,
  actualizarBodega,
  borrarBodega,
} = require("../controllers/bodegas");
const {
  existeProductoPorId,
  existeBodegaPorId,
} = require("../helpers/db-validators");
const { validarJWT, validarCampos, isAdminRole } = require("../middlewares");

const router = Router();

//get all bodegas
router.get("/", [validarJWT], obtenerBodegas);

//Get bodega por id
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeBodegaPorId),
    validarCampos,
  ],
  obtenerBodegasPorId
);

//Crear Bodega
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearBodega
);

//Actualizar producto
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeBodegaPorId),
    validarCampos,
  ],
  actualizarBodega
);

//Borrar Bodega
router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeBodegaPorId),
    validarCampos,
  ],
  borrarBodega
);

module.exports = router;
