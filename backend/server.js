const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos desde `public`
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de las páginas principales
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/rutinas', (req, res) => res.sendFile(path.join(__dirname, '../public/rutinas.html')));
app.get('/recetas', (req, res) => res.sendFile(path.join(__dirname, '../public/recetas.html')));
app.get('/comunidad', (req, res) => res.sendFile(path.join(__dirname, '../public/comunidad.html')));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor FitVid en http://localhost:${PORT}`);
});
