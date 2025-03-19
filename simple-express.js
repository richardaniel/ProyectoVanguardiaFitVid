// Simple Express Server - Solo para servir archivos estáticos
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Verificar la carpeta estática
console.log(`📂 Directorio estático: ${path.join(__dirname, 'static-test')}`);

// Configurar middleware para servir archivos estáticos
app.use('/', express.static(path.join(__dirname, 'static-test')));

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Express ejecutándose en http://0.0.0.0:${PORT}`);
});