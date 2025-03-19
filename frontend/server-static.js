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

// Función para servir un archivo
const serveFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`Error al leer el archivo ${filePath}:`, err);
      res.writeHead(500);
      res.end('Error interno del servidor');
      return;
    }
    
    // Configurar encabezados y enviar el contenido
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self' 'unsafe-inline';"
    });
    res.end(content, 'utf-8');
    console.log(`Archivo servido con éxito: ${filePath}`);
  });
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
  
  // Probar varias rutas posibles para el archivo
  const possiblePaths = [
    path.join(__dirname, url),                // Directamente en el directorio frontend
    path.join(__dirname, 'static', url),      // En el subdirectorio static 
    path.join(__dirname, '..', url)           // En el directorio raíz del proyecto
  ];
  
  // Función para intentar servir el archivo desde diferentes ubicaciones
  const tryServePath = (index) => {
    if (index >= possiblePaths.length) {
      // Si ninguna de las rutas funciona, servir index.html
      console.log('No se encontró el archivo en ninguna ubicación, sirviendo index.html');
      serveFile(path.join(__dirname, 'index.html'), 'text/html', res);
      return;
    }
    
    const filePath = possiblePaths[index];
    console.log(`Intentando servir archivo desde: ${filePath}`);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Probar la siguiente ruta
        tryServePath(index + 1);
      } else {
        // Servir el archivo encontrado
        const extname = path.extname(filePath);
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        serveFile(filePath, contentType, res);
      }
    });
  };
  
  // Comenzar a intentar las rutas
  tryServePath(0);
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor frontend ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Buscando archivos en: ${__dirname}, ${path.join(__dirname, 'static')}, y ${path.join(__dirname, '..')}`);
});