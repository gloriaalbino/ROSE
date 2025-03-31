const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  profileImage: String, // Agrega este campo si estás manejando imágenes de perfil
});

// Verifica si el modelo ya está registrado
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;