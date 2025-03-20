// src/services/axiosConfig.js
import axios from 'axios'

// Configuración global de Axios
export const configureAxios = () => {
  // Establecer la URL base del backend
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  // Establecer encabezados comunes
  axios.defaults.headers.common['Accept'] = 'application/json'

  // Configurar si se permiten cookies (ajustar según tus necesidades)
  axios.defaults.withCredentials = false

 
}
