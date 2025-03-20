<template>
  <footer class="bg-gray-900 text-white py-10">
    <div class="container mx-auto px-6">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Logo y descripción -->
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
          <p class="text-gray-400 mb-4 leading-relaxed">
            Tu plataforma de entrenamiento y nutrición sin necesidad de registro.
          </p>
          
          <div class="flex space-x-4">
            <a href="#" class="social-icon" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-icon" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        
        <!-- Enlaces Rápidos -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="footer-link">Inicio</router-link>
            </li>
            <li>
              <router-link to="/rutinas" class="footer-link">Rutinas</router-link>
            </li>
            <li>
              <router-link to="/recetas" class="footer-link">Recetas</router-link>
            </li>
            <li>
              <router-link to="/comunidad" class="footer-link">Comunidad</router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contacto -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contacto</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <i class="fas fa-envelope text-gray-400 mr-2"></i>
              <span class="text-gray-400">info@fitvid.com</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone-alt text-gray-400 mr-2"></i>
              <span class="text-gray-400">+34 123 456 789</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
              <span class="text-gray-400">Madrid, España</span>
            </li>
          </ul>
        </div>
        
      </div>

      <!-- Copyright -->
      <div class="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ currentYear }} FitVid. Todos los derechos reservados.</p>
      </div>

    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    return {
      currentYear
    }
  }
}
</script>

<style scoped>
/* Estilos para los enlaces del footer */
.footer-link {
  display: inline-block;
  color: #9CA3AF;
  transition: color 0.3s ease-in-out;
}

.footer-link:hover {
  color: #ffffff;
  transform: translateX(4px);
}

/* Estilos para los iconos de redes sociales */
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}

.social-icon i {
  font-size: 18px;
  color: #ffffff;
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}
</style>
