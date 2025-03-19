// Servidor HTTP extremadamente simple para servir archivos estáticos
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const STATIC_DIR = path.join(__dirname, 'static-test');

// Función para determinar el tipo de contenido
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
  };
  return types[ext] || 'text/plain';
}

// Crear el servidor
const server = http.createServer((req, res) => {
  console.log(`📝 Solicitud: ${req.method} ${req.url}`);
  
  // Manejar la ruta raíz
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Ruta completa al archivo
  const fullPath = path.join(STATIC_DIR, filePath);
  console.log(`🔍 Intentando servir: ${fullPath}`);
  
  // Verificar si el archivo existe
  fs.exists(fullPath, (exists) => {
    if (!exists) {
      console.log(`❌ Archivo no encontrado: ${fullPath}`);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Error 404</h1><p>Archivo no encontrado</p>');
      return;
    }
    
    // Leer el archivo
    fs.readFile(fullPath, (err, content) => {
      if (err) {
        console.error(`❌ Error al leer el archivo: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Error 500</h1><p>Error interno del servidor</p>');
        return;
      }
      
      // Enviar el archivo
      res.writeHead(200, { 'Content-Type': getContentType(fullPath) });
      res.end(content);
      console.log(`✅ Archivo servido: ${fullPath}`);
    });
  });
});

// Verificar la carpeta estática
console.log(`\n📂 Verificando directorio: ${STATIC_DIR}`);
if (!fs.existsSync(STATIC_DIR)) {
  console.error(`❌ ERROR: El directorio ${STATIC_DIR} no existe`);
  process.exit(1);
}

// Listar archivos en la carpeta
console.log('📋 Archivos disponibles:');
fs.readdirSync(STATIC_DIR).forEach(file => {
  console.log(`   - ${file}`);
});

// Iniciar el servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor HTTP en ejecución en http://0.0.0.0:${PORT}`);
});