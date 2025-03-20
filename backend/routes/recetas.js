const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');

let recetasCache = null;

// Cargar y cachear los datos de recetas al iniciar el servidor
const loadRecetas = () => {
  const filePath = path.join(__dirname, '../data/recetas.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    recetasCache = JSON.parse(data);
    console.log('✅ Datos de recetas cargados correctamente');
  } catch (error) {
    console.error('❌ Error al cargar el archivo de recetas:', error);
    recetasCache = [];
  }
};

// Cargar los datos al inicio
loadRecetas();

// Obtener todas las recetas
router.get('/', asyncHandler(async (req, res) => {
  if (!recetasCache || recetasCache.length === 0) {
    return res.status(500).json({ message: 'No hay datos de recetas disponibles' });
  }
  res.json(recetasCache);
}));

// Obtener recetas por categoría
router.get('/:categoriaId', asyncHandler(async (req, res) => {
  const { categoriaId } = req.params;
  
  if (!recetasCache || recetasCache.length === 0) {
    return res.status(500).json({ message: 'No hay datos de recetas disponibles' });
  }

  // Filtrar por categoría, manejando IDs numéricos y strings
  const recetasFiltradas = recetasCache.filter(
    receta => String(receta.categoriaId) === String(categoriaId)
  );

  if (recetasFiltradas.length === 0) {
    return res.status(404).json({ message: `No se encontraron recetas para la categoría: ${categoriaId}` });
  }

  res.json(recetasFiltradas);
}));

module.exports = router;
