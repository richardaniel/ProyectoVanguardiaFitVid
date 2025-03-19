import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'

// Configurar axios con la URL base del backend
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.withCredentials = false

// Configuración de la aplicación
const app = createApp(App)

// Proporcionar axios globalmente
app.config.globalProperties.$axios = axios

// Configurar router
app.use(router)

// Montar la aplicación
app.mount('#app')

// Para depuración
console.log('Aplicación Vue montada correctamente')
