const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    default: 'Anónimo'
  },
  contenido: {
    type: String,
    required: true,
    maxlength: 500
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Comentario', comentarioSchema);
