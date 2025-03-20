const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan'); // Para logs de solicitudes HTTP

const app = express();
const PORT = process.env.PORT || 5000;

// 🛠 Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Soporte para JSON
app.use(express.urlencoded({ extended: true })); // Soporte para formularios
app.use(morgan('dev')); // Logging de peticiones

// 📂 Servir archivos estáticos de manera segura
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath, { extensions: ['html', 'htm'] }));

// 🌐 Rutas de páginas principales
app.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));
app.get('/rutinas', (req, res) => res.sendFile(path.join(publicPath, 'rutinas.html')));
app.get('/recetas', (req, res) => res.sendFile(path.join(publicPath, 'recetas.html')));
app.get('/comunidad', (req, res) => res.sendFile(path.join(publicPath, 'comunidad.html')));

// ❌ Middleware de manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Página no encontrada',
    error: 'La ruta solicitada no existe en el servidor'
  });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor FitVid en http://localhost:${PORT}`);
});
