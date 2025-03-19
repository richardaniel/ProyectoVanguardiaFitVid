<template>
  <div 
    class="ejercicio-card card transition-all duration-300"
    :class="{'border-2 border-blue-500 bg-blue-50': isSelected}"
  >
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-semibold">{{ ejercicio.nombre }}</h3>
      <button 
        @click="$emit('toggle')" 
        class="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300"
        :class="isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'"
      >
        <i data-feather="check" class="w-4 h-4"></i>
      </button>
    </div>
    
    <p class="text-gray-600 mb-4">{{ ejercicio.descripcion }}</p>
    
    <div class="mb-4">
      <div class="flex items-center text-sm text-gray-600 mb-1">
        <i data-feather="repeat" class="w-4 h-4 mr-1"></i>
        <span>Series: {{ ejercicio.series }}</span>
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <i data-feather="activity" class="w-4 h-4 mr-1"></i>
        <span>Repeticiones: {{ ejercicio.repeticiones }}</span>
      </div>
    </div>
    
    <div v-if="ejercicio.video" class="mt-4">
      <a 
        :href="ejercicio.video" 
        target="_blank" 
        class="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <i data-feather="video" class="w-4 h-4 mr-1"></i>
        Ver video tutorial
      </a>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'EjercicioCard',
  props: {
    ejercicio: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle'],
  setup() {
    onMounted(() => {
      feather.replace()
    })
  }
}
</script>

<style scoped>
.ejercicio-card {
  opacity: 0;
  animation: fade-in 0.5s forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
