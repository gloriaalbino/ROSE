// models/Product.js
//const mongoose = require('/api/products'); // Ajusta la ruta según la estructura de tu proyecto
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  imagen: String,             // URL de la imagen o path
  nombre: String,
  concentracion: String,
  formaFarmaceutica: String,
  lote: String,
  fechaVencimiento: Date,
  precio: Number,
  ubicacion: String
});

const product = mongoose.model('Product', productSchema);
module.exports = product;
