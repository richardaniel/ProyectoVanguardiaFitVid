<template>
  <div 
    class="receta-card card cursor-pointer transition-transform duration-300 transform hover:scale-105"
    @click="$emit('click')"
  >
    <div class="bg-green-50 h-48 flex items-center justify-center rounded-t-lg mb-4">
      <i data-feather="coffee" class="w-16 h-16 text-green-500"></i>
    </div>
    
    <h3 class="text-xl font-semibold mb-2">{{ receta.nombre }}</h3>
    
    <div class="flex items-center mb-3 text-gray-600">
      <i data-feather="clock" class="w-4 h-4 mr-1"></i>
      <span class="text-sm">{{ receta.tiempo }} minutos</span>
    </div>
    
    <div class="flex items-center mb-4 text-gray-600">
      <i data-feather="bar-chart-2" class="w-4 h-4 mr-1"></i>
      <span class="text-sm">Dificultad: {{ receta.dificultad }}</span>
    </div>
    
    <div class="flex flex-wrap gap-2 mt-auto">
      <span 
        v-for="(tag, index) in receta.tags" 
        :key="index"
        class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'RecetaCard',
  props: {
    receta: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup() {
    onMounted(() => {
      feather.replace()
    })
  }
}
</script>

<style scoped>
.receta-card {
  opacity: 0;
  animation: fade-in 0.5s forwards;
  animation-delay: calc(var(--index, 0) * 100ms);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px) scale(1); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
