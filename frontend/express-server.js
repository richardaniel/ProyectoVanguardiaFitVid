// Simple Express server para servir archivos estáticos
const express = require('express');
const path = require('path');
const cors = require('cors');

// Crear la aplicación Express
const app = express();

// Puerto en el que se ejecutará el servidor
const PORT = 5000;

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Directorio de archivos estáticos - intentar ambas ubicaciones
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname));

// Rutas específicas
app.get('/rutinas', (req, res) => {
  console.log('Solicitud a /rutinas');
  res.sendFile(path.join(__dirname, 'static', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  console.log('Solicitud a /recetas');
  res.sendFile(path.join(__dirname, 'static', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  console.log('Solicitud a /comunidad');
  res.sendFile(path.join(__dirname, 'static', 'comunidad.html'));
});

// Ruta por defecto
app.get('/', (req, res) => {
  console.log('Solicitud a /');
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Mostrar todas las rutas disponibles
app.get('*', (req, res, next) => {
  console.log(`Ruta solicitada: ${req.originalUrl}`);
  next();
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Directorio de archivos estáticos: ${path.join(__dirname, 'static')}`);
  console.log(`Directorio actual: ${__dirname}`);
});