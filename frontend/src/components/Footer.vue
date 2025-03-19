<template>
  <footer class="bg-gray-800 text-white py-10">
    <div class="page-container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full">
                <circle cx="12" cy="12" r="10" fill="#3B82F6" />
                <path d="M8 13l3 3 6-6" stroke="white" stroke-width="2" fill="none" />
              </svg>
            </div>
            <span class="text-xl font-bold">FitVid</span>
          </div>
          <p class="text-gray-400 mb-4">
            Tu plataforma de entrenamiento y nutrición sin necesidad de registro.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i data-feather="facebook" class="w-5 h-5"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i data-feather="instagram" class="w-5 h-5"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i data-feather="twitter" class="w-5 h-5"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i data-feather="youtube" class="w-5 h-5"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors duration-300">Inicio</router-link>
            </li>
            <li>
              <router-link to="/rutinas" class="text-gray-400 hover:text-white transition-colors duration-300">Rutinas</router-link>
            </li>
            <li>
              <router-link to="/recetas" class="text-gray-400 hover:text-white transition-colors duration-300">Recetas</router-link>
            </li>
            <li>
              <router-link to="/comunidad" class="text-gray-400 hover:text-white transition-colors duration-300">Comunidad</router-link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Contacto</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <i data-feather="mail" class="w-4 h-4 mr-2 text-gray-400"></i>
              <span class="text-gray-400">info@fitvid.com</span>
            </li>
            <li class="flex items-center">
              <i data-feather="phone" class="w-4 h-4 mr-2 text-gray-400"></i>
              <span class="text-gray-400">+34 123 456 789</span>
            </li>
            <li class="flex items-center">
              <i data-feather="map-pin" class="w-4 h-4 mr-2 text-gray-400"></i>
              <span class="text-gray-400">Madrid, España</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ currentYear }} FitVid. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { onMounted, computed } from 'vue'
import feather from 'feather-icons'

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    onMounted(() => {
      feather.replace()
    })
    
    return {
      currentYear
    }
  }
}
</script>
