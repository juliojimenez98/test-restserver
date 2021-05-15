const { Schema, model } = require("mongoose");

const BodegaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  descripcion: {
    type: String,
    required: [true, "Descripcion es obligatoria"],
  },
  producto: [
    {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
  ],
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

BodegaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Bodega", BodegaSchema);
