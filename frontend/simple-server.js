const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Mapeo de extensiones de archivo a tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

function getContentType(filePath) {
  return mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  
  // Normalizar URL
  let filePath = req.url;
  
  // Si es la raíz o una ruta como /rutinas sin extensión, agregar .html
  if (filePath === '/') {
    filePath = '/index.html';
  } else if (filePath === '/rutinas') {
    filePath = '/rutinas.html';
  } else if (filePath === '/recetas') {
    filePath = '/recetas.html';
  } else if (filePath === '/comunidad') {
    filePath = '/comunidad.html';
  }
  
  // Ruta completa al archivo
  const fullPath = path.join(__dirname, 'static', filePath);
  console.log(`Intentando servir: ${fullPath}`);
  
  // Verificar si el archivo existe
  fs.exists(fullPath, (exists) => {
    if (!exists) {
      console.log(`Archivo no encontrado: ${fullPath}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    
    // Si existe pero es un directorio, buscar index.html
    fs.stat(fullPath, (err, stats) => {
      if (err) {
        console.error(`Error al obtener stats: ${err}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      
      if (stats.isDirectory()) {
        const indexPath = path.join(fullPath, 'index.html');
        fs.exists(indexPath, (indexExists) => {
          if (indexExists) {
            serveFile(indexPath, res);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          }
        });
      } else {
        // Es un archivo, servirlo
        serveFile(fullPath, res);
      }
    });
  });
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`Error al leer archivo: ${err}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    
    // Enviar el archivo con el tipo MIME correcto
    res.writeHead(200, { 
      'Content-Type': getContentType(filePath),
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; frame-src https://www.youtube.com; connect-src 'self';"
    });
    res.end(content);
    console.log(`Archivo servido con éxito: ${filePath}`);
  });
}

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor simple ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Directorio de archivos estáticos: ${path.join(__dirname, 'static')}`);
});