<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="page-container">
      <div class="flex justify-between items-center py-4">
        
        <!-- Logo y nombre -->
        <router-link to="/" class="flex items-center">
          <div class="w-10 h-10 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full">
              <circle cx="12" cy="12" r="10" fill="#3B82F6" />
              <path d="M8 13l3 3 6-6" stroke="white" stroke-width="2" fill="none" />
            </svg>
          </div>
          <span class="text-2xl font-bold text-blue-600">FitVid</span>
        </router-link>
        
        <!-- Menú de navegación para escritorio -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="nav-link text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
            :class="{ 'text-blue-600': isCurrentRoute(item.path) }"
          >
            {{ item.name }}
          </router-link>
        </div>
        
        <!-- Menú hamburguesa para móvil -->
        <div class="md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="text-gray-600 focus:outline-none" 
            aria-label="Abrir menú móvil"
          >
            <i data-feather="menu" v-if="!isMobileMenuOpen"></i>
            <i data-feather="x" v-else></i>
          </button>
        </div>
      </div>
      
      <!-- Menú móvil desplegable -->
      <div v-if="isMobileMenuOpen" class="md:hidden transition-all duration-300 ease-in-out transform translate-y-0">
        <div class="pt-2 pb-4 space-y-1">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="block py-2 px-4 text-base font-medium rounded-md transition-colors duration-300"
            :class="isCurrentRoute(item.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import feather from 'feather-icons'

export default {
  name: 'NavBar',
  setup() {
    const isMobileMenuOpen = ref(false)
    const route = useRoute()
    
    const navItems = [
      { name: 'Inicio', path: '/' },
      { name: 'Rutinas', path: '/rutinas' },
      { name: 'Recetas', path: '/recetas' },
      { name: 'Comunidad', path: '/comunidad' }
    ]
    
    const isCurrentRoute = (path) => {
      if (path === '/') {
        return route.path === '/'
      }
      return route.path.startsWith(path)
    }
    
    onMounted(() => {
      feather.replace()
    })
    
    return {
      isMobileMenuOpen,
      navItems,
      isCurrentRoute
    }
  }
}
</script>

<style scoped>
/* Menú de enlaces con transición */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #3B82F6;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.text-blue-600::after {
  width: 100%;
}

/* Efecto del menú móvil */
.transition-all {
  transition: transform 0.3s ease-in-out;
}

/* Diseño responsive del menú móvil */
.md:hidden {
  display: block;
}

.md:flex {
  display: none;
}
</style>
