// Servidor Express simplificado para servir archivos estáticos
const express = require('express');
const path = require('path');
const cors = require('cors');

// Crear la aplicación Express
const app = express();

// Puerto en el que se ejecutará el servidor
const PORT = 5000;

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud: ${req.method} ${req.url}`);
  next();
});

// Configurar encabezados para permitir YouTube videos e inline styles
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; frame-src https://www.youtube.com; connect-src 'self';");
  next();
});

// Servir archivos estáticos desde el directorio 'static'
app.use(express.static(path.join(__dirname, 'static')));

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

// Ruta principal
app.get('/', (req, res) => {
  console.log('Solicitud a /');
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express ejecutándose en http://0.0.0.0:${PORT}`);
});