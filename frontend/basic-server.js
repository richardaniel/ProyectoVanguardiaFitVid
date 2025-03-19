// Servidor HTTP básico ultra simple
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  
  // Redirigir a test.html para cualquier solicitud
  let filePath = '/test.html';
  
  if (req.url !== '/') {
    // Para cualquier otra ruta, intentamos servirla directamente
    filePath = req.url;
  }
  
  // Ruta completa al archivo
  const fullPath = path.join(__dirname, 'static', filePath);
  console.log(`Intentando servir: ${fullPath}`);
  
  // Verificar si el archivo existe y servirlo
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      console.log(`Error al servir ${fullPath}: ${err.message}`);
      
      // Si hay error, intentar servir test.html como fallback
      if (filePath !== '/test.html') {
        const testPath = path.join(__dirname, 'static', 'test.html');
        console.log(`Intentando servir test.html como fallback`);
        
        fs.readFile(testPath, (err2, data2) => {
          if (err2) {
            console.error(`Error al servir test.html: ${err2.message}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>No se encontró ningún archivo.</p>');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data2);
            console.log('Sirviendo test.html como fallback');
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>No se encontró test.html.</p>');
      }
      return;
    }
    
    // Enviar el archivo
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'text/javascript';
    if (filePath.endsWith('.json')) contentType = 'application/json';
    if (filePath.endsWith('.png')) contentType = 'image/png';
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    console.log(`Archivo servido con éxito: ${fullPath}`);
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor básico ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Sirviendo desde: ${path.join(__dirname, 'static')}`);
});