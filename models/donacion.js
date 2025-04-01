const mongoose = require('mongoose');

const donacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  concentracion: { type: String, required: true },
  forma: { type: String, required: true },
  cantidad: { type: Number, required: true },
  contacto: { type: String, required: true },
  fechaSolicitud: { type: Date, default: Date.now } 
});

const Donacion = mongoose.models.Donacion || mongoose.model('Donacion', donacionSchema);

module.exports = Donacion;