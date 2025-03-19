<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-green-500 text-white">
      <div class="page-container py-20 text-center">
        <h1 class="text-5xl font-bold mb-4">¡Bienvenido a FitVid!</h1>
        <p class="text-xl mb-10 max-w-3xl mx-auto">
          Tu plataforma de entrenamiento y nutrición personalizada. Accede a rutinas de ejercicios,
          recetas saludables y conecta con una comunidad de fitness sin necesidad de registrarte.
        </p>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(option, index) in mainOptions" 
            :key="index"
            class="home-card bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
          >
            <div class="h-40 flex items-center justify-center" :class="option.bgColor">
              <i :data-feather="option.icon" class="w-20 h-20 text-white"></i>
            </div>
            <div class="p-6 text-gray-800">
              <h3 class="text-2xl font-bold mb-2">{{ option.title }}</h3>
              <p class="mb-4">{{ option.description }}</p>
              <router-link :to="option.link" class="btn-primary inline-block">
                Explorar {{ option.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="page-container py-16">
      <h2 class="section-title">¿Por qué elegir FitVid?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div v-for="(feature, index) in features" :key="index" class="card text-center">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" :class="feature.bgColor">
            <i :data-feather="feature.icon" class="text-white"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-100 py-16">
      <div class="page-container text-center">
        <h2 class="text-3xl font-bold mb-6">¿Listo para comenzar tu viaje fitness?</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          Explora nuestras rutinas, descubre recetas saludables y únete a nuestra comunidad fitness.
          ¡Todo completamente gratis y sin registro!
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/rutinas" class="btn-primary">Ver Rutinas</router-link>
          <router-link to="/recetas" class="btn-secondary">Explorar Recetas</router-link>
          <router-link to="/comunidad" class="btn-tertiary">Unirse a la Comunidad</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import feather from 'feather-icons'

export default {
  name: 'HomePage',
  setup() {
    const mainOptions = [
      {
        title: 'Rutinas',
        description: 'Accede a rutinas personalizadas para diferentes partes del cuerpo con guías detalladas.',
        icon: 'activity',
        bgColor: 'bg-blue-600',
        link: '/rutinas'
      },
      {
        title: 'Recetas',
        description: 'Descubre recetas saludables para desayunos, almuerzos, cenas y postres fitness.',
        icon: 'coffee',
        bgColor: 'bg-green-600',
        link: '/recetas'
      },
      {
        title: 'Comunidad',
        description: 'Conéctate con otros entusiastas del fitness, comparte tu progreso y obtén consejos.',
        icon: 'users',
        bgColor: 'bg-gray-800',
        link: '/comunidad'
      }
    ]

    const features = [
      {
        title: 'Sin Registro',
        description: 'Accede a todas las funcionalidades sin necesidad de crear una cuenta o iniciar sesión.',
        icon: 'unlock',
        bgColor: 'bg-blue-600'
      },
      {
        title: 'Contenido Premium Gratuito',
        description: 'Todas nuestras rutinas y recetas son de alta calidad y completamente gratuitas.',
        icon: 'award',
        bgColor: 'bg-green-600'
      },
      {
        title: 'Diseño Intuitivo',
        description: 'Interfaz fácil de usar, diseñada para que encuentres lo que buscas rápidamente.',
        icon: 'layout',
        bgColor: 'bg-gray-800'
      }
    ]

    onMounted(() => {
      feather.replace()
    })

    return {
      mainOptions,
      features
    }
  }
}
</script>

<style scoped>
.home-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
