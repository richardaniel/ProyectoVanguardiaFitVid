// Servidor HTTP simple sin Express
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Crear servidor
const server = http.createServer((req, res) => {
  // Obtener la URL de la solicitud
  let url = req.url;
  console.log(`📝 Solicitud recibida: ${url}`);
  console.log(`📌 Método: ${req.method}, Headers:`, req.headers);
  
  // Si es la raíz, servir index.html
  if (url === '/' || url === '') {
    url = '/index.html';
  }
  
  // Si la URL no tiene extensión, asumir .html
  if (!path.extname(url)) {
    url = `${url}.html`;
  }
  
  // Construir la ruta completa al archivo
  let filePath = path.join(__dirname, 'public', url);
  console.log(`🔍 Buscando archivo: ${filePath}`);
  
  // Verificar si el archivo existe
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`❌ Error: Archivo no encontrado - ${filePath}`);
      
      // Enviar una página 404 simple
      const headers = {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      };
      
      res.writeHead(404, headers);
      res.end(`
        <html>
          <head>
            <title>Error 404 - No encontrado</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                color: #333; 
                text-align: center; 
                padding: 50px;
                background-color: #f9f9f9;
              }
              h1 { color: #e74c3c; }
              a { 
                color: #3498db; 
                text-decoration: none;
              }
              a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <h1>Error 404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <p><a href="/">Volver a la página de inicio</a></p>
            <p><strong>URL solicitada:</strong> ${url}</p>
            <p><strong>Ruta completa:</strong> ${filePath}</p>
          </body>
        </html>
      `);
      return;
    }
    
    // Leer y servir el archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`❌ Error al leer el archivo: ${err}`);
        res.writeHead(500, { 
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*' 
        });
        res.end('<h1>Error interno del servidor</h1>');
        return;
      }
      
      // Determinar el tipo MIME según la extensión
      let contentType = 'text/html';
      const ext = path.extname(filePath);
      
      switch (ext) {
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
      }
      
      // Encabezados para resolver problemas de CSP y CORS
      const headers = {
        'Content-Type': `${contentType}; charset=utf-8`,
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      
      // Para HTML, agregar encabezados CSP para permitir estilos en línea
      if (ext === '.html') {
        headers['Content-Security-Policy'] = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;";
      }
      
      // Responder con el archivo
      res.writeHead(200, headers);
      res.end(data);
      console.log(`✅ Archivo servido: ${filePath} (${contentType})`);
    });
  });
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 SERVIDOR FITVID INICIADO
==========================
📌 Dirección: http://0.0.0.0:${PORT}
📁 Sirviendo archivos de: ${path.join(__dirname, 'public')}
⏰ Iniciado: ${new Date().toLocaleString()}
==========================

📋 Verificación de archivos principales:
`);

  // Verificar archivos principales
  const archivos = [
    '/public/index.html',
    '/public/rutinas.html',
    '/public/recetas.html',
    '/public/comunidad.html',
    '/public/images/ejercicio-brazos.svg',
    '/public/images/partes-cuerpo.svg',
    '/public/images/batido-verde.svg'
  ];
  
  archivos.forEach(archivo => {
    const ruta = path.join(__dirname, archivo);
    if (fs.existsSync(ruta)) {
      console.log(`  ✅ ${archivo} - OK`);
    } else {
      console.log(`  ❌ ${archivo} - NO EXISTE`);
    }
  });
});