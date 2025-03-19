const express = require('express');
const path = require('path');

// Configuramos el entorno para desarrollo
process.env.NODE_ENV = 'development';

// Creamos la aplicación
const app = express();
const PORT = process.env.PORT || 5000;

console.log('Iniciando servidor frontend...');

// En desarrollo, redirigimos todas las peticiones a Vite
if (process.env.NODE_ENV === 'development') {
  console.log('Modo desarrollo: redirigiendo peticiones a Vite Dev Server');
  // Usamos módulo child_process para ejecutar Vite en paralelo
  const { exec } = require('child_process');
  
  // Iniciamos Vite en un proceso separado
  const viteServer = exec('npx vite --host 0.0.0.0 --port 5173');
  
  viteServer.stdout.on('data', (data) => {
    console.log(`Vite: ${data}`);
  });
  
  viteServer.stderr.on('data', (data) => {
    console.error(`Error Vite: ${data}`);
  });
  
  // Proxy para redirigir peticiones a Vite
  app.all('*', (req, res) => {
    const proxyUrl = `http://localhost:5173${req.url}`;
    console.log(`Redirigiendo ${req.url} a ${proxyUrl}`);
    
    // Realizamos una redirección HTTP
    res.redirect(307, proxyUrl);
  });
} else {
  // En producción, servimos los archivos estáticos de la carpeta dist
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Todas las rutas no encontradas se dirigen a index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Iniciamos el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express para FitVid Frontend ejecutándose en http://0.0.0.0:${PORT}`);
});