const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    maxLength: 20
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
    maxLength: 100
  },
  categoria: {
    type: String,
    trim: true,
    enum: ["Asistencia", "Entretenimiento", "Autonomía", "Educación"],
    required: true,
    maxLength: 15
  },
  precio: {
    type: Number,
    trim: true,
    required: true,
    min: 0,
    max: Infinity
  },
  fechaCreacion: {
    type: Date,
    default: Date.now()
  }
});

const serviceModel = model("servicios", serviceSchema);

module.exports = serviceModel;
