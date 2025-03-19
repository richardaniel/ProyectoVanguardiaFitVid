<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Rutinas de Ejercicio</h1>
    
    <p class="text-center text-lg mb-12">Encuentra la rutina perfecta para alcanzar tus objetivos fitness.</p>
    
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Rutinas Populares</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tarjeta de rutina ejemplo -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <i data-feather="activity" class="text-gray-500 w-12 h-12"></i>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold">HIIT 20 minutos</h3>
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Intermedio</span>
            </div>
            <p class="text-gray-600 mb-4">Entrenamiento de alta intensidad para quemar calorías y mejorar tu resistencia.</p>
            <router-link to="/rutinas/hiit-20min" class="text-primary font-medium hover:underline">Ver detalles →</router-link>
          </div>
        </div>
        
        <!-- Más tarjetas de rutina aquí -->
      </div>
    </div>
    
    <div>
      <h2 class="text-2xl font-semibold mb-4">Categorías</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-purple-100 p-4 rounded-lg text-center hover:bg-purple-200 transition-colors cursor-pointer">
          <i data-feather="zap" class="mx-auto mb-2 text-purple-600"></i>
          <h3 class="font-medium">Pérdida de Peso</h3>
        </div>
        <div class="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition-colors cursor-pointer">
          <i data-feather="award" class="mx-auto mb-2 text-blue-600"></i>
          <h3 class="font-medium">Ganancia Muscular</h3>
        </div>
        <div class="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors cursor-pointer">
          <i data-feather="heart" class="mx-auto mb-2 text-green-600"></i>
          <h3 class="font-medium">Cardio</h3>
        </div>
        <div class="bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-colors cursor-pointer">
          <i data-feather="sunrise" class="mx-auto mb-2 text-yellow-600"></i>
          <h3 class="font-medium">Flexibilidad</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RutinasPage',
  mounted() {
    if (window.feather) {
      window.feather.replace()
    }
  }
})
</script>

<style scoped>
.text-primary {
  color: #4f46e5;
}
</style>