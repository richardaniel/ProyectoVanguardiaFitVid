import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

// Servicios para ejercicios
export const ejerciciosService = {
  getByBodyPart: (bodyPartId) => api.get(`/ejercicios/${bodyPartId}`),
  getAll: () => api.get('/ejercicios')
}

// Servicios para recetas
export const recetasService = {
  getByCategory: (categoryId) => api.get(`/recetas/${categoryId}`),
  getAll: () => api.get('/recetas')
}

// Servicios para comentarios
export const comentariosService = {
  getAll: () => api.get('/comentarios'),
  create: (comentario) => api.post('/comentarios', comentario),
  delete: (id) => api.delete(`/comentarios/${id}`)
}

export default {
  ejercicios: ejerciciosService,
  recetas: recetasService,
  comentarios: comentariosService
}
