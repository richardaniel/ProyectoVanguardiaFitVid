// Servidor HTTP puro sin dependencias externas
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const STATIC_DIR = path.join(__dirname, 'static');

// Mapa de tipos MIME básicos
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Obtener el tipo MIME basado en la extensión del archivo
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// Enviar un archivo al cliente
function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`❌ Error al leer el archivo ${filePath}:`, err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Error interno del servidor');
    }
    
    // Establecer el tipo de contenido apropiado
    res.writeHead(200, { 
      'Content-Type': getMimeType(filePath),
      // Política de seguridad permisiva para pruebas
      'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval'"
    });
    
    // Enviar el contenido del archivo
    res.end(data);
    console.log(`✅ Archivo servido: ${filePath}`);
  });
}

// Manejar fallback para rutas no encontradas
function serveFallback(res) {
  const testPath = path.join(STATIC_DIR, 'test.html');
  
  if (fs.existsSync(testPath)) {
    console.log('⚠️ Ruta no encontrada, usando test.html como fallback');
    serveFile(res, testPath);
  } else {
    console.log('❌ Fallback test.html no encontrado');
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Página no encontrada');
  }
}

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`📝 Solicitud: ${req.method} ${req.url}`);
  
  // Normalizar la URL solicitada
  let url = req.url;
  
  // Manejar la ruta raíz
  if (url === '/') {
    url = '/index.html';
  } 
  // Manejar rutas sin extensión (agregar .html)
  else if (!path.extname(url) && url !== '/') {
    url = `${url}.html`;
  }
  
  // Construir la ruta completa al archivo
  const filePath = path.join(STATIC_DIR, url);
  console.log(`🔍 Buscando archivo: ${filePath}`);
  
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`❌ Archivo no encontrado: ${filePath}`);
      serveFallback(res);
    } else {
      serveFile(res, filePath);
    }
  });
});

// Verificar la estructura de archivos
console.log('\n📂 Verificando directorio estático...');
if (!fs.existsSync(STATIC_DIR)) {
  console.error(`❌ ERROR CRÍTICO: Directorio ${STATIC_DIR} no existe`);
  process.exit(1);
}

console.log(`✅ Directorio estático encontrado en: ${STATIC_DIR}`);
console.log('\n📋 Archivos disponibles:');
fs.readdirSync(STATIC_DIR).forEach(file => {
  console.log(`   - ${file}`);
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor HTTP básico iniciado en http://0.0.0.0:${PORT}`);
  console.log(`💾 Sirviendo archivos desde: ${STATIC_DIR}`);
});