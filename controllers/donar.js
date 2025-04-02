const express = require('express');
const router = express.Router();
const Donar = require('../models/donar'); // Importa el modelo de Donación

// Ruta para manejar el envío de datos del formulario de donación
router.post('/registrar', async (req, res) => {
  try {
    // Crear un nuevo documento en la base de datos con los datos enviados
    const nuevaDonacion = new Donar(req.body);
    await nuevaDonacion.save();

    res.status(201).json({ message: 'Donación registrada exitosamente', donacion: nuevaDonacion });
  } catch (error) {
    console.error('Error al registrar la donación:', error);
    res.status(500).json({ error: 'Error al registrar la donación' });
  }
});

module.exports = router;