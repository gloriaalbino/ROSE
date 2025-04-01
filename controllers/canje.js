const express = require('express');
const router = express.Router();
const Canje = require('../models/canje'); // Importa el modelo de Canje

// Ruta para manejar el envío de datos del formulario de canje
router.post('/canjear', async (req, res) => {
  try {
    // Crear un nuevo documento en la base de datos con los datos enviados
    const nuevoCanje = new Canje(req.body);
    await nuevoCanje.save();

    res.status(201).json({ message: 'Canje registrado exitosamente', canje: nuevoCanje });
  } catch (error) {
    console.error('Error al registrar el canje:', error);
    res.status(500).json({ error: 'Error al registrar el canje' });
  }
});

module.exports = router;