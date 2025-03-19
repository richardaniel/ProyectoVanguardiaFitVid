const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importar rutas
const ejerciciosRoutes = require('./routes/ejercicios');
const recetasRoutes = require('./routes/recetas');
const comentariosRoutes = require('./routes/comentarios');

// Inicializar express
const app = express();
const PORT = process.env.PORT || 8000;

// Configuración CORS
const corsOptions = {
  origin: ['http://localhost:5000', 'https://172.31.128.47:5000', '*'],
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://abijef2022:2Bfl2ARCG1kS51Zw@cluster0.kgwen.mongodb.net/fitvid';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conexión a MongoDB establecida con éxito');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

// Rutas API
app.use('/api/ejercicios', ejerciciosRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Servir frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor FitVid ejecutándose en el puerto ${PORT}`);
});
