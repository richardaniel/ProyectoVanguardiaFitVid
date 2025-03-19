// Servidor Express para la aplicación FitVid
const express = require('express');
const path = require('path');
const fs = require('fs');

// Crear la aplicación Express
const app = express();
const PORT = 5000;

// Verificar directorio y archivos
const staticDir = path.join(__dirname, 'static-test');
console.log(`📂 Verificando directorio: ${staticDir}`);

// Mostrar los archivos disponibles
try {
  const files = fs.readdirSync(staticDir);
  console.log('📋 Archivos disponibles:');
  files.forEach(file => {
    console.log(`   - ${file}`);
  });
} catch (err) {
  console.error(`❌ Error al leer el directorio: ${err.message}`);
}

// Configurar para servir archivos estáticos desde el directorio static-test
app.use(express.static(staticDir));

// Ruta para la página principal
app.get('/', (req, res) => {
  console.log('📝 Solicitud recibida para la ruta principal');
  res.sendFile(path.join(staticDir, 'index.html'));
});

// Ruta para las páginas específicas
app.get('/rutinas', (req, res) => {
  res.sendFile(path.join(staticDir, 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(staticDir, 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  res.sendFile(path.join(staticDir, 'comunidad.html'));
});

// Ruta de respaldo para cualquier otra solicitud
app.get('*', (req, res) => {
  console.log(`📝 Solicitud para ruta no encontrada: ${req.url}`);
  res.sendFile(path.join(staticDir, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
📂 Sirviendo archivos desde: ${staticDir}
🚀 Servidor FitVid en ejecución en http://0.0.0.0:${PORT}
  `);
});