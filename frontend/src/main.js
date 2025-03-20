import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'

// Configurar Axios globalmente
import { configureAxios } from './services/axiosConfig'

// Configuración de la aplicación
const app = createApp(App)

// Configurar Axios
configureAxios()

// Proporcionar axios globalmente
app.config.globalProperties.$axios = axios

// Configurar router
app.use(router)

// Montar la aplicación
app.mount('#app')

// Eliminar console.log antes de producción
if (import.meta.env.MODE === 'development') {
  console.log('Aplicación Vue montada correctamente')
}
