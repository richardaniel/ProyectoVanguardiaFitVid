// Servidor Express simplificado diseñado específicamente para resolver
// el problema de "Cannot GET /"
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Log de todas las solicitudes
app.use((req, res, next) => {
  console.log(`📝 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'static')));

// Rutas específicas - con manejo de errores explícito
app.get('/', (req, res) => {
  console.log('👉 Solicitud a la ruta raíz /');
  const indexPath = path.join(__dirname, 'static', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('✅ Sirviendo index.html');
    return res.sendFile(indexPath);
  } else {
    console.log('❌ index.html no encontrado, verificando test.html');
    const testPath = path.join(__dirname, 'static', 'test.html');
    
    if (fs.existsSync(testPath)) {
      console.log('✅ Sirviendo test.html');
      return res.sendFile(testPath);
    } else {
      console.log('❌ test.html tampoco encontrado');
      return res.status(404).send('No se encontró ni index.html ni test.html');
    }
  }
});

// Rutas específicas para otras páginas
['/test', '/rutinas', '/recetas', '/comunidad'].forEach(route => {
  app.get(route, (req, res) => {
    const pageName = route.substring(1); // quitar el slash inicial
    const filePath = path.join(__dirname, 'static', `${pageName}.html`);
    
    console.log(`👉 Solicitud a la ruta ${route}`);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Sirviendo ${pageName}.html`);
      return res.sendFile(filePath);
    } else {
      console.log(`❌ ${pageName}.html no encontrado`);
      return res.status(404).send(`No se encontró ${pageName}.html`);
    }
  });
});

// Manejador para 404 - redirigir a test.html
app.use((req, res) => {
  console.log(`👉 Ruta no encontrada: ${req.url}`);
  const testPath = path.join(__dirname, 'static', 'test.html');
  
  if (fs.existsSync(testPath)) {
    console.log('✅ Sirviendo test.html como fallback');
    return res.sendFile(testPath);
  } else {
    console.log('❌ test.html no encontrado para fallback');
    return res.status(404).send('Página no encontrada y no hay fallback disponible');
  }
});

// Iniciar servidor con verificación previa
const staticDir = path.join(__dirname, 'static');
console.log(`\n📂 Verificando directorio: ${staticDir}`);

if (!fs.existsSync(staticDir)) {
  console.error(`❌ ERROR CRÍTICO: El directorio ${staticDir} NO EXISTE`);
  process.exit(1);
} else {
  console.log(`✅ Directorio ${staticDir} encontrado`);
  
  // Listar todos los archivos
  console.log('\n📋 Archivos disponibles:');
  fs.readdirSync(staticDir).forEach(file => {
    console.log(`   - ${file}`);
  });
  
  // Verificar archivos HTML específicos
  console.log('\n🔍 Verificando archivos HTML principales:');
  ['index.html', 'test.html', 'rutinas.html', 'recetas.html', 'comunidad.html'].forEach(file => {
    const filePath = path.join(staticDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`   ✅ ${file} - ENCONTRADO`);
    } else {
      console.log(`   ❌ ${file} - NO ENCONTRADO`);
    }
  });
}

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});