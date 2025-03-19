const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Servir archivos estáticos desde el directorio 'static'
app.use(express.static(path.join(__dirname, 'static')));

// Rutas específicas
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'static', 'index.html');
  console.log(`Intentando servir: ${filePath}`);
  
  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    console.log(`Archivo servido con éxito: ${filePath}`);
  } else {
    console.log(`Archivo no encontrado: ${filePath}`);
    res.status(404).send('Archivo no encontrado');
  }
});

app.get('/rutinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'comunidad.html'));
});

// Manejo de errores 404
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.url}`);
  res.status(404).send('La página que busca no existe');
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`Sirviendo archivos estáticos desde: ${path.join(__dirname, 'static')}`);
  
  // Listar archivos para depuración
  const staticPath = path.join(__dirname, 'static');
  if (fs.existsSync(staticPath)) {
    console.log('Contenido del directorio static:');
    fs.readdirSync(staticPath).forEach(file => {
      console.log(`- ${file}`);
    });
    
    const indexPath = path.join(staticPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log(`✓ index.html existe en la ruta: ${indexPath}`);
    } else {
      console.log(`✗ index.html NO existe en la ruta: ${indexPath}`);
    }
  } else {
    console.log(`✗ El directorio ${staticPath} NO existe`);
  }
});