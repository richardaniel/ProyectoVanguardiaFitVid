const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    default: 'Anónimo',
    trim: true,
    maxlength: 50 // Evita nombres demasiado largos
  },
  contenido: {
    type: String,
    required: [true, 'El comentario no puede estar vacío'],
    maxlength: 500
  },
  fecha: {
    type: Date,
    default: Date.now,
    index: true // Mejora la eficiencia de búsqueda por fecha
  },
  likes: {
    type: Number,
    default: 0,
    min: 0 // No permite valores negativos
  }
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);
