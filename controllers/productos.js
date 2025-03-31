const express = require('express');
const productosRouter = express.Router();
const Product = require('../models/productos'); // Ajusta la ruta según la estructura de tu proyecto

// Ejemplo de función para crear un producto
productosRouter.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Listar todos los productos
productosRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({ error: 'Error al listar productos' });
  }
});

// Obtener un producto por su id
productosRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Actualizar un producto existente
productosRouter.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
productosRouter.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = productosRouter;