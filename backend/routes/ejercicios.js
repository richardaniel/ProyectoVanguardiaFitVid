const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Cargar datos de ejercicios desde el archivo JSON
const loadEjercicios = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/ejercicios.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al cargar el archivo de ejercicios:', error);
    return [];
  }
};

// Obtener todos los ejercicios
router.get('/', (req, res) => {
  const ejercicios = loadEjercicios();
  res.json(ejercicios);
});

// Obtener ejercicios por parte del cuerpo
router.get('/:parteCuerpoId', (req, res) => {
  const { parteCuerpoId } = req.params;
  const ejercicios = loadEjercicios();
  
  const ejerciciosFiltrados = ejercicios.filter(
    ejercicio => ejercicio.parteCuerpoId === parseInt(parteCuerpoId)
  );
  
  res.json(ejerciciosFiltrados);
});

module.exports = router;
