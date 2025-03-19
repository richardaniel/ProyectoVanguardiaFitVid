// Servidor express ultra simple
const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Registrar todas las solicitudes para depuración
app.use((req, res, next) => {
  console.log(`📝 Solicitud: ${req.method} ${req.url}`);
  console.log(`📌 Headers:`, req.headers);
  next();
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'), {
  // Opciones para mejorar la entrega de archivos
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    // Establecer encabezados para permitir estilos en línea y evitar problemas de caché
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");
  }
}));

// Manejar rutas específicas con redirección a archivos HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/rutinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'comunidad.html'));
});

// Ruta para manejar cualquier otra solicitud (404)
app.use((req, res) => {
  res.status(404).send(`
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
        <p><strong>URL solicitada:</strong> ${req.originalUrl}</p>
      </body>
    </html>
  `);
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 SERVIDOR EXPRESS FITVID INICIADO
==================================
📌 Dirección: http://0.0.0.0:${PORT}
📁 Sirviendo archivos de: ${path.join(__dirname, 'public')}
⏰ Iniciado: ${new Date().toLocaleString()}
==================================
  `);
});