// Un servidor HTTP nativo, sin dependencias externas
const http = require('http');
const fs = require('fs');
const path = require('path');

// Puerto en el que se ejecutará el servidor
const PORT = 5000;

// Mapa de tipos MIME
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Función para servir archivos estáticos
const serveFile = (filePath, res) => {
  // Obtener la extensión del archivo
  const extname = path.extname(filePath);
  // Establecer el tipo de contenido
  const contentType = MIME_TYPES[extname] || 'text/plain';

  // Leer el archivo
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Si el archivo no existe
        console.log(`Archivo no encontrado: ${filePath}`);
        fs.readFile(path.join(__dirname, 'static', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Otro error
        console.error(`Error al leer el archivo: ${err}`);
        res.writeHead(500);
        res.end(`Error del servidor: ${err.code}`);
      }
    } else {
      // Archivo leído correctamente
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content, 'utf-8');
    }
  });
};

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Solicitud: ${req.method} ${req.url}`);

  // Establecer encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar solicitudes OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Obtener la ruta de la URL
  let url = req.url;

  // Para las rutas principales, cargar el HTML correspondiente
  if (url === '/') {
    url = '/index.html';
  } else if (url === '/rutinas') {
    url = '/rutinas.html';
  } else if (url === '/recetas') {
    url = '/recetas.html';
  } else if (url === '/comunidad') {
    url = '/comunidad.html';
  }

  // Si la URL no tiene extensión y no es una de las rutas principales, asumir .html
  if (path.extname(url) === '' && !['/', '/rutinas', '/recetas', '/comunidad'].includes(req.url)) {
    url += '.html';
  }

  // Intentar servir desde 'static' primero
  let filePath = path.join(__dirname, 'static', url);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si no existe en 'static', intentar desde la raíz
      filePath = path.join(__dirname, url);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // Si no existe en ningún lugar
          console.log(`Archivo no encontrado: ${url}`);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - Archivo no encontrado');
        } else {
          // Servir desde la raíz
          serveFile(filePath, res);
        }
      });
    } else {
      // Servir desde 'static'
      serveFile(filePath, res);
    }
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor básico ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Sirviendo archivos desde: ${path.join(__dirname, 'static')} y ${__dirname}`);
});