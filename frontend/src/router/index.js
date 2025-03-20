import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RutinasPage from '../views/RutinasPage.vue'
import RecetasPage from '../views/RecetasPage.vue'
import ComunidadPage from '../views/ComunidadPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'  // Vista para el error 404

const router = createRouter({
  history: createWebHistory('/'),
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
      name: 'not-found',
      component: NotFoundPage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Siempre vuelve al inicio cuando se navega
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { top: 0 }
    }
  }
})

export default router
