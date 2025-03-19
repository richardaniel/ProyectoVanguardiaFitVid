import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'

// Configurar axios con la URL base del backend
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.withCredentials = false

// Proporcionar axios globalmente
const app = createApp(App)
app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
