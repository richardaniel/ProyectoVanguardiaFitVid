<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <div class="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
        <h3 class="text-2xl font-bold">{{ receta.nombre }}</h3>
        <button @click="$emit('close')" class="p-1 hover:bg-green-700 rounded-full">
          <i data-feather="x" class="w-6 h-6"></i>
        </button>
      </div>
      
      <div class="flex-grow overflow-y-auto">
        <div class="p-6">
          <div class="mb-6 flex flex-wrap gap-3">
            <div class="flex items-center text-gray-600 bg-gray-100 rounded-full px-3 py-1">
              <i data-feather="clock" class="w-4 h-4 mr-1"></i>
              <span>{{ receta.tiempo }} minutos</span>
            </div>
            <div class="flex items-center text-gray-600 bg-gray-100 rounded-full px-3 py-1">
              <i data-feather="bar-chart-2" class="w-4 h-4 mr-1"></i>
              <span>{{ receta.dificultad }}</span>
            </div>
            <div class="flex items-center text-gray-600 bg-gray-100 rounded-full px-3 py-1">
              <i data-feather="users" class="w-4 h-4 mr-1"></i>
              <span>{{ receta.porciones }} porciones</span>
            </div>
          </div>
          
          <div class="mb-6">
            <h4 class="text-xl font-semibold mb-3">Ingredientes</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li v-for="(ingrediente, index) in receta.ingredientes" :key="index">
                {{ ingrediente }}
              </li>
            </ul>
          </div>
          
          <div class="mb-6">
            <h4 class="text-xl font-semibold mb-3">Preparación</h4>
            <ol class="list-decimal list-inside space-y-4 text-gray-700">
              <li 
                v-for="(paso, index) in receta.preparacion" 
                :key="index"
                class="pl-2"
              >
                <span class="font-medium text-gray-900">Paso {{ index + 1 }}:</span>
                <p class="mt-1 pl-6">{{ paso }}</p>
              </li>
            </ol>
          </div>
          
          <div v-if="receta.video" class="mb-6">
            <h4 class="text-xl font-semibold mb-3">Video Tutorial</h4>
            <a 
              :href="receta.video" 
              target="_blank" 
              class="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-300"
            >
              <i data-feather="youtube" class="w-5 h-5 mr-2"></i>
              Ver en YouTube
            </a>
          </div>
          
          <div class="mb-6">
            <h4 class="text-xl font-semibold mb-3">Información Nutricional</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gray-100 p-3 rounded-lg text-center">
                <div class="text-gray-500 text-sm">Calorías</div>
                <div class="font-bold text-lg">{{ receta.nutricion?.calorias || 'N/A' }}</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg text-center">
                <div class="text-gray-500 text-sm">Proteínas</div>
                <div class="font-bold text-lg">{{ receta.nutricion?.proteinas || 'N/A' }}</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg text-center">
                <div class="text-gray-500 text-sm">Carbohidratos</div>
                <div class="font-bold text-lg">{{ receta.nutricion?.carbohidratos || 'N/A' }}</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg text-center">
                <div class="text-gray-500 text-sm">Grasas</div>
                <div class="font-bold text-lg">{{ receta.nutricion?.grasas || 'N/A' }}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-xl font-semibold mb-3">Consejos</h4>
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 text-gray-700">
              <p>{{ receta.consejos || 'No hay consejos disponibles para esta receta.' }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t bg-gray-50 flex justify-end">
        <button @click="$emit('close')" class="btn-tertiary mr-3">
          Cerrar
        </button>
        <button 
          @click="printReceta"
          class="btn-primary"
        >
          <i data-feather="printer" class="w-4 h-4 mr-2"></i>
          Imprimir Receta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'RecetaDetalle',
  props: {
    receta: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup() {
    const printReceta = () => {
      window.print()
    }
    
    onMounted(() => {
      feather.replace()
    })
    
    return {
      printReceta
    }
  }
}
</script>

<style scoped>
@media print {
  .fixed {
    position: static;
    overflow: visible;
  }
  
  button {
    display: none;
  }
}
</style>
