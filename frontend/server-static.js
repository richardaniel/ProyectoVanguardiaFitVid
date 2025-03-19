import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Puerto en el que se ejecutará el servidor
const PORT = 5000;

// Mapa de extensiones de archivo a tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Solicitud recibida: ${req.url}`);
  
  // Configurar encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Manejar solicitudes OPTIONS (preflight) para CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Obtener la ruta de la URL
  let url = req.url;
  
  // Manejar rutas específicas
  if (url === '/rutinas' || url === '/rutinas/') {
    url = '/rutinas.html';
  } else if (url === '/recetas' || url === '/recetas/') {
    url = '/recetas.html';
  } else if (url === '/comunidad' || url === '/comunidad/') {
    url = '/comunidad.html';
  } else if (url === '/' || url === '') {
    url = '/index.html';
  }
  
  // Construir la ruta del archivo
  const filePath = path.join(__dirname, 'static', url);
  console.log(`Intentando servir archivo: ${filePath}`);
  
  // Obtener la extensión del archivo
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, servir index.html por defecto
      console.log(`Archivo no encontrado: ${filePath}, redirigiendo a index.html`);
      fs.readFile(path.join(__dirname, 'static', 'index.html'), (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error interno del servidor');
          return;
        }
        
        res.writeHead(200, { 
          'Content-Type': 'text/html',
          'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        });
        res.end(content, 'utf-8');
      });
      return;
    }
    
    // Leer y servir el archivo
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error interno del servidor: ${err.code}`);
        return;
      }
      
      // Agregar encabezados de Content Security Policy
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      });
      res.end(content, 'utf-8');
      console.log(`Archivo servido con éxito: ${filePath}`);
    });
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor frontend ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Archivos estáticos servidos desde: ${path.join(__dirname, 'static')}`);
});