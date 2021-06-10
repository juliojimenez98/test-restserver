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

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
  desbloquearUsuarios,
  obtenerUsuariosId,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

//Get bodega por id
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existsUserById),
    validarCampos,
  ],
  obtenerUsuariosId
);

router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("correo", "el correo es obligatorio").not().isEmpty(),
    check("password", "la contrasena debe ser de 6 caracteres o mas").isLength({
      min: 6,
    }),
    // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    check("correo").custom(emailExists),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID Valido").isMongoId(),
    check("id").custom(existsUserById),
    check("role").custom(isRoleValid),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    // isAdminRole,
    tieneRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "No es un ID Valido").isMongoId(),
    check("id").custom(existsUserById),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

router.delete(
  "/:id/unlock",
  [
    validarJWT,
    isAdminRole,
    check("id", "No es un ID Valido").isMongoId(),
    check("id").custom(existsUserById),
    validarCampos,
  ],
  desbloquearUsuarios
);

module.exports = router;
