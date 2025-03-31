const express = require('express');
const router = express.Router();
const User = require('../models/perfil'); // Asegúrate de tener un modelo de usuario

// Ruta para guardar los datos del perfil
router.post('/', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Actualizar los datos del usuario en la base de datos
    const user = await User.findOneAndUpdate(
      { email }, // Busca al usuario por email
      { name, password, phone }, // Actualiza los datos
      { new: true } // Devuelve el documento actualizado
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Perfil actualizado', user });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  // Aquí puedes eliminar la sesión del usuario
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada correctamente' });
  });
});

module.exports = router;