// Servidor Express simple para archivos estáticos (sin dependencias complejas)
const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Configurar middleware para servir archivos estáticos desde múltiples ubicaciones
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname));

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Configurar CORS simple sin usar el paquete cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rutas específicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/rutinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'comunidad.html'));
});

// Manejador para rutas no encontradas
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor estático ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Sirviendo archivos desde: ${path.join(__dirname, 'static')}`);
});