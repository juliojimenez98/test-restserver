const { Schema, model, models } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
