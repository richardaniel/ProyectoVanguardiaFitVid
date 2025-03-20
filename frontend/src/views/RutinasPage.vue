<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Rutinas de Ejercicio</h1>
    
    <p class="text-center text-lg mb-12">Encuentra la rutina perfecta para alcanzar tus objetivos fitness.</p>
    
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Rutinas Populares</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tarjetas de rutina generadas dinámicamente -->
        <div 
          v-for="(rutina, index) in rutinas"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden transition-all transform hover:scale-105"
        >
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <i :data-feather="rutina.icono" class="text-gray-500 w-12 h-12"></i>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold">{{ rutina.nombre }}</h3>
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{{ rutina.dificultad }}</span>
            </div>
            <p class="text-gray-600 mb-4">{{ rutina.descripcion }}</p>
            <router-link :to="`/rutinas/${rutina.id}`" class="text-primary font-medium hover:underline">Ver detalles →</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h2 class="text-2xl font-semibold mb-4">Categorías</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Categorías generadas dinámicamente -->
        <div 
          v-for="(categoria, index) in categorias"
          :key="index"
          class="p-4 rounded-lg text-center hover:bg-opacity-80 transition-colors cursor-pointer"
          :class="categoria.bgColor"
        >
          <i :data-feather="categoria.icono" class="mx-auto mb-2"></i>
          <h3 class="font-medium">{{ categoria.nombre }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RutinasPage',
  data() {
    return {
      rutinas: [
        { id: 'hiit-20min', nombre: 'HIIT 20 minutos', icono: 'activity', dificultad: 'Intermedio', descripcion: 'Entrenamiento de alta intensidad para quemar calorías y mejorar tu resistencia.' },
        { id: 'entrenamiento-muscular', nombre: 'Entrenamiento Muscular', icono: 'zap', dificultad: 'Avanzado', descripcion: 'Desarrolla fuerza y masa muscular con este entrenamiento estructurado.' },
        // Agregar más rutinas aquí
      ],
      categorias: [
        { nombre: 'Pérdida de Peso', icono: 'zap', bgColor: 'bg-purple-100' },
        { nombre: 'Ganancia Muscular', icono: 'award', bgColor: 'bg-blue-100' },
        { nombre: 'Cardio', icono: 'heart', bgColor: 'bg-green-100' },
        { nombre: 'Flexibilidad', icono: 'sunrise', bgColor: 'bg-yellow-100' },
        // Agregar más categorías aquí
      ]
    }
  },
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

.transition-transform {
  transition: transform 0.3s ease;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.bg-opacity-80:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
