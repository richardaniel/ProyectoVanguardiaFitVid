// Servidor Express con debugging extensivo
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware para logging de todas las solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'static'), {
  index: false, // Deshabilitar la búsqueda automática de index.html
  setHeaders: (res) => {
    // Establecer la política de seguridad de contenido para permitir everything (solo para pruebas)
    res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'");
  }
}));

// Ruta para la raíz que sirve test.html
app.get('/', (req, res) => {
  console.log('Solicitud recibida para la ruta raíz (/), redirigiendo a test.html');
  const testPath = path.join(__dirname, 'static', 'test.html');
  
  // Verificar si el archivo existe
  fs.access(testPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`Error: test.html no existe en ${testPath}`);
      res.status(404).send('<h1>Error 404</h1><p>Archivo test.html no encontrado.</p>');
    } else {
      console.log(`Sirviendo test.html desde ${testPath}`);
      res.sendFile(testPath);
    }
  });
});

// Rutas explícitas para otras páginas principales
app.get('/test', (req, res) => {
  console.log('Recibida solicitud para /test');
  res.sendFile(path.join(__dirname, 'static', 'test.html'));
});

app.get('/rutinas', (req, res) => {
  console.log('Recibida solicitud para /rutinas');
  res.sendFile(path.join(__dirname, 'static', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  console.log('Recibida solicitud para /recetas');
  res.sendFile(path.join(__dirname, 'static', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  console.log('Recibida solicitud para /comunidad');
  res.sendFile(path.join(__dirname, 'static', 'comunidad.html'));
});

// Manejador para rutas no encontradas
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.url}, redirigiendo a test.html`);
  res.sendFile(path.join(__dirname, 'static', 'test.html'));
});

// Manejar errores
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).send('<h1>Error 500</h1><p>Error interno del servidor.</p>');
});

// Verificar la existencia del directorio static y los archivos antes de iniciar
const staticDir = path.join(__dirname, 'static');
if (!fs.existsSync(staticDir)) {
  console.error(`Error crítico: El directorio ${staticDir} no existe`);
  process.exit(1);
}

// Verificar test.html
const testHtmlPath = path.join(staticDir, 'test.html');
if (!fs.existsSync(testHtmlPath)) {
  console.error(`Error: test.html no existe en ${testHtmlPath}`);
} else {
  console.log(`✓ test.html encontrado en ${testHtmlPath}`);
}

// Verificar las páginas principales
['index.html', 'rutinas.html', 'recetas.html', 'comunidad.html'].forEach(file => {
  const filePath = path.join(staticDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} encontrado`);
  } else {
    console.log(`✗ ${file} NO encontrado`);
  }
});

// Listar todos los archivos en el directorio static
console.log('Archivos en el directorio static:');
fs.readdirSync(staticDir).forEach(file => {
  console.log(`- ${file}`);
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express para debugging ejecutándose en http://0.0.0.0:${PORT}`);
});