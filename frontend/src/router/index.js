import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RutinasPage from '../views/RutinasPage.vue'
import RecetasPage from '../views/RecetasPage.vue'
import ComunidadPage from '../views/ComunidadPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/rutinas',
      name: 'rutinas',
      component: RutinasPage
    },
    {
      path: '/recetas',
      name: 'recetas',
      component: RecetasPage
    },
    {
      path: '/comunidad',
      name: 'comunidad',
      component: ComunidadPage
    },
    // Ruta para manejar rutas no encontradas
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    // Siempre vuelve al inicio cuando se navega
    return { top: 0 }
  }
})

export default router
