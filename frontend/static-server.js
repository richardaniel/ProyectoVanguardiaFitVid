// Servidor Express mínimo para servir archivos estáticos
const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Servir archivos estáticos
app.use(express.static(__dirname));

// Rutas específicas
app.get('/rutinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  res.sendFile(path.join(__dirname, 'comunidad.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express minimalista ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Directorio actual: ${__dirname}`);
});