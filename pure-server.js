// Servidor HTTP puro para FitVid
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Tipos MIME comunes
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
}

// Crear el servidor
const server = http.createServer((req, res) => {
  console.log(`📥 Solicitud: ${req.url}`);
  
  // Normalizar la URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './frontend/index.html';
  } else if (filePath === './rutinas') {
    filePath = './frontend/rutinas.html';
  } else if (filePath === './recetas') {
    filePath = './frontend/recetas.html';
  } else if (filePath === './comunidad') {
    filePath = './frontend/comunidad.html';
  } else {
    // Para cualquier otro recurso (CSS, JS, imágenes), intentamos servir desde frontend/
    filePath = './frontend' + req.url;
  }
  
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 No Encontrado</h1><p>El archivo solicitado no existe.</p>');
      return;
    }
    
    // Leer y servir el archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`❌ Error al leer archivo: ${err}`);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Error del Servidor</h1><p>Error al procesar tu solicitud.</p>');
        return;
      }
      
      // Enviar el archivo con el tipo MIME correcto
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(data);
      console.log(`✅ Archivo servido: ${filePath}`);
    });
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor HTTP básico iniciado en http://0.0.0.0:${PORT}`);
  
  // Verificar que existen los archivos principales
  const mainFiles = [
    './frontend/index.html',
    './frontend/rutinas.html',
    './frontend/recetas.html',
    './frontend/comunidad.html'
  ];
  
  console.log('📂 Verificando archivos principales:');
  mainFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file} - OK`);
    } else {
      console.log(`   ❌ ${file} - NO EXISTE`);
    }
  });
});