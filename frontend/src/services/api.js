import axios from 'axios'

// Configuración del API con URL dinámica desde las variables de entorno
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api' // Usar variable de entorno para baseURL
})

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, se retorna directamente
  (error) => {
    // Manejo de errores centralizado
    console.error('Error en la solicitud API:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

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
