const mongoose = require('mongoose');

const canjeSchema = new mongoose.Schema({
  nombreComercial: { type: String, required: true },
  principioActivo: { type: String, required: true },
  concentracion: { type: String, required: true },
  formaFarmaceutica: { type: String, required: true },
  fechaVencimiento: { type: Date, required: true },
  lote: { type: String, required: true },
  cantidad: { type: Number, required: true },
  numeroContacto: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now } // Fecha automática
});

const Canje = mongoose.models.Canje || mongoose.model('Canje', canjeSchema);

module.exports = Canje;