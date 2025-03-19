// Servidor para FitVid
const express = require('express');
const path = require('path');

// Crear la app
const app = express();
const PORT = 5000;

// Habilitar el middleware para archivos estáticos
app.use('/', express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    console.log('🏠 Solicitud a la ruta principal');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Otras rutas específicas
app.get('/rutinas', (req, res) => {
    console.log('🏋️ Solicitud a la ruta rutinas');
    res.sendFile(path.join(__dirname, 'public', 'rutinas.html'));
});

app.get('/recetas', (req, res) => {
    console.log('🍲 Solicitud a la ruta recetas');
    res.sendFile(path.join(__dirname, 'public', 'recetas.html'));
});

app.get('/comunidad', (req, res) => {
    console.log('👥 Solicitud a la ruta comunidad');
    res.sendFile(path.join(__dirname, 'public', 'comunidad.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
✅ Servidor FitVid iniciado
🌐 URL: http://0.0.0.0:${PORT}
📂 Sirviendo archivos desde: ${path.join(__dirname, 'public')}
    `);
});