// Servidor Express básico para FitVid
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  // Verificar si el directorio public existe
  if (fs.existsSync('public')) {
    console.log('✅ Directorio public encontrado');
    
    // Listar archivos en el directorio public
    console.log('📂 Archivos en el directorio public:');
    fs.readdirSync('public').forEach(file => {
      console.log(`   - ${file}`);
    });
  } else {
    console.error('❌ ERROR: Directorio public no encontrado');
  }
  
  console.log(`🚀 Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});