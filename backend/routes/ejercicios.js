const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');

let ejerciciosCache = null;

// Cargar y cachear los datos de ejercicios al iniciar el servidor
const loadEjercicios = () => {
  const filePath = path.join(__dirname, '../data/ejercicios.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    ejerciciosCache = JSON.parse(data);
    console.log('✅ Datos de ejercicios cargados correctamente');
  } catch (error) {
    console.error('❌ Error al cargar el archivo de ejercicios:', error);
    ejerciciosCache = [];
  }
};

// Cargar los datos al inicio
loadEjercicios();

// Obtener todos los ejercicios
router.get('/', asyncHandler(async (req, res) => {
  if (!ejerciciosCache || ejerciciosCache.length === 0) {
    return res.status(500).json({ message: 'No hay datos de ejercicios disponibles' });
  }
  res.json(ejerciciosCache);
}));

// Obtener ejercicios por parte del cuerpo
router.get('/:parteCuerpoId', asyncHandler(async (req, res) => {
  const { parteCuerpoId } = req.params;
  
  if (!ejerciciosCache || ejerciciosCache.length === 0) {
    return res.status(500).json({ message: 'No hay datos de ejercicios disponibles' });
  }

  // Filtrar por parte del cuerpo, manejando IDs numéricos y strings
  const ejerciciosFiltrados = ejerciciosCache.filter(
    ejercicio => String(ejercicio.parteCuerpoId) === String(parteCuerpoId)
  );

  if (ejerciciosFiltrados.length === 0) {
    return res.status(404).json({ message: `No se encontraron ejercicios para la parte del cuerpo: ${parteCuerpoId}` });
  }

  res.json(ejerciciosFiltrados);
}));

module.exports = router;
