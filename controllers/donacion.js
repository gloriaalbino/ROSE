const express = require('express');
const router = express.Router();
const Donacion = require('../models/donacion'); // Importa el modelo de Donación

// Ruta para manejar el envío de datos del formulario de donación
router.post('/solicitar', async (req, res) => {
  try {
    // Crear un nuevo documento en la base de datos con los datos enviados
    const nuevaDonacion = new Donacion(req.body);
    await nuevaDonacion.save();

    res.status(201).json({ message: 'Solicitud de donación registrada exitosamente', donacion: nuevaDonacion });
  } catch (error) {
    console.error('Error al registrar la solicitud de donación:', error);
    res.status(500).json({ error: 'Error al registrar la solicitud de donación' });
  }
});

module.exports = router;