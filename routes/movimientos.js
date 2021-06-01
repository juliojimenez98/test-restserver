const { Router } = require("express");
const { check } = require("express-validator");
const {
  isRoleValid,
  emailExists,
  existsUserById,
} = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  isAdminRole,
  tieneRole,
} = require("../middlewares");

const { movimientosGet } = require("../controllers/movimiento");

const router = Router();

router.get("/", movimientosGet);

module.exports = router;
