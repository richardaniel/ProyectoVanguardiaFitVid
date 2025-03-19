const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Mapeo de tipos de archivo a tipos MIME
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Solicitud: ${req.method} ${req.url}`);
  
  // Normalizar la URL solicitada
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  } else if (filePath === './rutinas') {
    filePath = './rutinas.html';
  } else if (filePath === './recetas') {
    filePath = './recetas.html';
  } else if (filePath === './comunidad') {
    filePath = './comunidad.html';
  }
  
  // Obtener la extensión del archivo
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Verificar si el archivo existe
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Archivo no encontrado
        console.error(`Archivo no encontrado: ${filePath}`);
        res.writeHead(404);
        res.end('Archivo no encontrado');
      } else {
        // Error del servidor
        console.error(`Error del servidor: ${error.code}`);
        res.writeHead(500);
        res.end(`Error del servidor: ${error.code}`);
      }
    } else {
      // Archivo encontrado, enviarlo
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; frame-src https://www.youtube.com; connect-src 'self';"
      });
      res.end(content, 'utf-8');
      console.log(`Archivo servido: ${filePath}`);
    }
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor estático ejecutándose en http://0.0.0.0:${PORT}`);
});