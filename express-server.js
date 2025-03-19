// Servidor Express directo para FitVid
const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// 1. Middleware para servir archivos estáticos
app.use(express.static('public'));

// 2. Rutas específicas para cada página
app.get('/', (req, res) => {
  console.log('📄 Sirviendo página de inicio...');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/rutinas', (req, res) => {
  console.log('📄 Sirviendo página de rutinas...');
  res.sendFile(path.join(__dirname, 'public', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  console.log('📄 Sirviendo página de recetas...');
  res.sendFile(path.join(__dirname, 'public', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  console.log('📄 Sirviendo página de comunidad...');
  res.sendFile(path.join(__dirname, 'public', 'comunidad.html'));
});

// 3. En caso de una ruta no encontrada
app.use((req, res) => {
  console.log(`⚠️ Ruta no encontrada: ${req.url}`);
  res.status(404).send(`
    <html>
      <head>
        <title>FitVid - Página no encontrada</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, sans-serif; 
            text-align: center;
            padding: 50px;
            background: linear-gradient(135deg, #0066cc 0%, #003366 100%);
            color: white;
          }
          h1 { font-size: 3rem; margin-bottom: 20px; }
          p { font-size: 1.2rem; margin-bottom: 30px; }
          a { 
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          a:hover { background-color: #388E3C; }
        </style>
      </head>
      <body>
        <h1>Página No Encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe en FitVid.</p>
        <a href="/">Volver a la Página Principal</a>
      </body>
    </html>
  `);
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
===========================================
✅ Servidor FitVid iniciado exitosamente
🌐 URL: http://0.0.0.0:${PORT}
📂 Directorio público: ${path.join(__dirname, 'public')}
===========================================
  `);
});