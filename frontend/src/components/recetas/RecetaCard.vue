<template>
  <div 
    class="receta-card card cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg p-4 rounded-xl bg-white"
    @click="$emit('click')"
  >
    <!-- Imagen o icono -->
    <div class="h-48 flex items-center justify-center rounded-lg overflow-hidden bg-green-50 mb-4">
      <img 
        v-if="receta.imagen" 
        :src="receta.imagen" 
        :alt="receta.nombre" 
        class="w-full h-full object-cover"
      />
      <i v-else class="fas fa-utensils text-green-500 text-5xl"></i>
    </div>
    
    <!-- Nombre de la receta -->
    <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ receta.nombre }}</h3>
    
    <!-- Detalles de tiempo y dificultad -->
    <div class="flex items-center mb-2 text-gray-600">
      <i class="fas fa-clock w-4 h-4 mr-2"></i>
      <span class="text-sm">{{ receta.tiempo }} minutos</span>
    </div>
    
    <div class="flex items-center mb-4 text-gray-600">
      <i class="fas fa-signal w-4 h-4 mr-2"></i>
      <span class="text-sm">Dificultad: {{ receta.dificultad }}</span>
    </div>
    
    <!-- Etiquetas de la receta -->
    <div class="flex flex-wrap gap-2 mt-auto">
      <span 
        v-for="(tag, index) in receta.tags" 
        :key="index"
        class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-semibold"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecetaCard',
  props: {
    receta: {
      type: Object,
      required: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.receta-card {
  opacity: 0;
  animation: fade-in 0.6s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 100ms);
}

@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(20px) scale(0.98); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.hover\:shadow-lg:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
