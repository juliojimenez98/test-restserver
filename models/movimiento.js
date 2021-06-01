const { Schema, model, models } = require("mongoose");

const MovimientoSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  bodega: {
    type: Schema.Types.ObjectId,
    ref: "Bodega",
    required: true,
  },
  productos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  tipoMovimiento: { type: Number, default: 0 },
  cantidadMovimiento: { type: Number, default: 0 },
});

MovimientoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Movimiento", MovimientoSchema);
