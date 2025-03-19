// Servidor HTTP nativo simplificado
const http = require('http');
const fs = require('fs');
const path = require('path');

// Puerto en el que se ejecutará el servidor
const PORT = 5000;

// Función para servir archivos estáticos
const serveFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`Error al leer archivo: ${filePath}`, err);
      res.writeHead(500);
      res.end(`Error del servidor: ${err.code}`);
      return;
    }
    
    // Configurar encabezados para permitir estilos en línea y videos de YouTube
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; frame-src https://www.youtube.com;"
    });
    
    res.end(content, 'utf-8');
  });
};

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Solicitud: ${req.method} ${req.url}`);
  
  // Obtener la ruta de la solicitud
  let url = req.url;
  
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
  
  // Para la ruta raíz, servir index.html
  if (url === '/' || url === '') {
    url = '/index.html';
  }
  
  // Obtener la extensión del archivo
  const extname = String(path.extname(url)).toLowerCase();
  
  // Tipos MIME
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }[extname] || 'text/plain';
  
  // Construir la ruta del archivo en el sistema de archivos
  const filePath = path.join(__dirname, 'static', url);
  
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, mostrar un error 404
      console.log(`Archivo no encontrado: ${filePath}`);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Archivo no encontrado</h1><p>Lo sentimos, la página que buscas no existe.</p>');
    } else {
      // Si el archivo existe, servirlo
      serveFile(filePath, contentType, res);
    }
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP básico ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Sirviendo archivos desde: ${path.join(__dirname, 'static')}`);
});