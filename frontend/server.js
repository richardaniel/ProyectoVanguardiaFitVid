// Servidor Express para servir los archivos estáticos
const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'static')));

// Rutas explícitas para las páginas principales
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

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express ejecutándose en http://0.0.0.0:${PORT}`);
});