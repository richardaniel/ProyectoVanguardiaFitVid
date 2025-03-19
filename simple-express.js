// Servidor Express muy simple para FitVid
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas específicas para cada página
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/rutinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'comunidad.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor FitVid iniciado en http://0.0.0.0:${PORT}`);
  console.log(`📂 Sirviendo archivos desde: ${path.join(__dirname, 'public')}`);
});