const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario');

// Obtener todos los comentarios
router.get('/', async (req, res) => {
  try {
    const comentarios = await Comentario.find().sort({ fecha: -1 });
    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ message: 'Error al obtener comentarios', error: error.message });
  }
});

// Crear un nuevo comentario
router.post('/', async (req, res) => {
  try {
    const { nombre, contenido, fecha } = req.body;
    
    if (!contenido) {
      return res.status(400).json({ message: 'El contenido del comentario es obligatorio' });
    }
    
    const nuevoComentario = new Comentario({
      nombre: nombre || 'Anónimo',
      contenido,
      fecha: fecha || new Date()
    });
    
    const comentarioGuardado = await nuevoComentario.save();
    res.status(201).json(comentarioGuardado);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ message: 'Error al crear comentario', error: error.message });
  }
});

// Eliminar un comentario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Comentario.findByIdAndDelete(id);
    
    if (!resultado) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    res.json({ message: 'Comentario eliminado correctamente', id });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario', error: error.message });
  }
});

module.exports = router;
