const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Cargar datos de recetas desde el archivo JSON
const loadRecetas = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/recetas.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al cargar el archivo de recetas:', error);
    return [];
  }
};

// Obtener todas las recetas
router.get('/', (req, res) => {
  const recetas = loadRecetas();
  res.json(recetas);
});

// Obtener recetas por categoría
router.get('/:categoriaId', (req, res) => {
  const { categoriaId } = req.params;
  const recetas = loadRecetas();
  
  const recetasFiltradas = recetas.filter(
    receta => receta.categoriaId === parseInt(categoriaId)
  );
  
  res.json(recetasFiltradas);
});

module.exports = router;
