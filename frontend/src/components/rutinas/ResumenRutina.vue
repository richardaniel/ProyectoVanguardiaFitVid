<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <div class="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h3 class="text-2xl font-bold">Resumen de tu Rutina</h3>
        <button @click="$emit('close')" class="p-1 hover:bg-blue-700 rounded-full">
          <i data-feather="x" class="w-6 h-6"></i>
        </button>
      </div>
      
      <div class="flex-grow overflow-y-auto p-6">
        <div v-if="exercises.length === 0" class="text-center py-10">
          <p class="text-gray-600">No has seleccionado ningún ejercicio todavía.</p>
          <button @click="$emit('close')" class="mt-4 btn-tertiary">
            Volver a ejercicios
          </button>
        </div>
        
        <div v-else>
          <p class="mb-6 text-gray-600">
            Has seleccionado {{ exercises.length }} ejercicio(s) para tu rutina.
          </p>
          
          <div v-for="(ejercicio, index) in exercises" :key="ejercicio.id" class="mb-4">
            <div class="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
              <div>
                <div class="flex items-center">
                  <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    {{ index + 1 }}
                  </span>
                  <h4 class="text-lg font-semibold">{{ ejercicio.nombre }}</h4>
                </div>
                <div class="ml-8 mt-2">
                  <div class="text-sm text-gray-600 mb-1">
                    Series: {{ ejercicio.series }} | Repeticiones: {{ ejercicio.repeticiones }}
                  </div>
                </div>
              </div>
              
              <button 
                @click="$emit('remove', ejercicio.id)"
                class="text-red-500 hover:text-red-700 p-1"
              >
                <i data-feather="trash-2" class="w-5 h-5"></i>
              </button>
            </div>
          </div>
          
          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-4">Instrucciones para tu Rutina</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
              <li>Realiza un calentamiento de 5-10 minutos antes de comenzar</li>
              <li>Descansa 1-2 minutos entre series</li>
              <li>Bebe agua durante el entrenamiento</li>
              <li>Estira después de finalizar todos los ejercicios</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t bg-gray-50 flex justify-end">
        <button @click="$emit('close')" class="btn-tertiary mr-3">
          Cerrar
        </button>
        <button 
          v-if="exercises.length > 0"
          @click="printResumen"
          class="btn-primary"
        >
          <i data-feather="printer" class="w-4 h-4 mr-2"></i>
          Imprimir Rutina
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'ResumenRutina',
  props: {
    exercises: {
      type: Array,
      required: true
    }
  },
  emits: ['close', 'remove'],
  setup() {
    const printResumen = () => {
      window.print()
    }
    
    onMounted(() => {
      feather.replace()
    })
    
    return {
      printResumen
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
