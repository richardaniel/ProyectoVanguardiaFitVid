const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler'); // Si deseas evitar el uso de try/catch manual

// Obtener todos los comentarios ordenados por fecha descendente
router.get('/', asyncHandler(async (req, res) => {
  const comentarios = await Comentario.find().sort({ fecha: -1 });
  res.json(comentarios);
}));

// Crear un nuevo comentario
router.post('/', asyncHandler(async (req, res) => {
  const { nombre, contenido, fecha } = req.body;

  if (!contenido || contenido.length < 3) {
    return res.status(400).json({ message: 'El comentario debe tener al menos 3 caracteres' });
  }

  const nuevoComentario = new Comentario({
    nombre: nombre?.trim() || 'Anónimo',
    contenido: contenido.trim(),
    fecha: fecha || new Date()
  });

  const comentarioGuardado = await nuevoComentario.save();
  res.status(201).json(comentarioGuardado);
}));

// Eliminar un comentario por ID
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de comentario inválido' });
  }

  const comentarioEliminado = await Comentario.findByIdAndDelete(id);

  if (!comentarioEliminado) {
    return res.status(404).json({ message: 'Comentario no encontrado' });
  }

  res.json({ message: 'Comentario eliminado correctamente', id });
}));

module.exports = router;
