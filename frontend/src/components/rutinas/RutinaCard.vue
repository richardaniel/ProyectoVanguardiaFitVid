<template>
  <div class="rutina-card card">
    <h3 class="text-xl font-semibold mb-2">{{ rutina.nombre }}</h3>
    <p class="text-gray-600 mb-4">{{ rutina.descripcion }}</p>
    <div class="flex justify-between items-center">
      <span class="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
        {{ rutina.nivel }}
      </span>
      <button 
        @click="$emit('view-details', rutina)" 
        class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        Ver detalles
        <i data-feather="arrow-right" class="w-4 h-4 ml-1 inline"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'RutinaCard',
  props: {
    rutina: {
      type: Object,
      required: true
    }
  },
  emits: ['view-details'],
  setup() {
    onMounted(() => {
      feather.replace()
    })
  }
}
</script>
