<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-lg">
      
      <!-- Encabezado -->
      <div class="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
        <h3 class="text-2xl font-bold">{{ receta.nombre }}</h3>
        <button @click="$emit('close')" class="p-2 hover:bg-green-700 rounded-full">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div class="flex-grow overflow-y-auto p-6">
        
        <!-- Imagen -->
        <div v-if="receta.imagen" class="mb-6 rounded-lg overflow-hidden">
          <img :src="receta.imagen" :alt="`Imagen de ${receta.nombre}`" class="w-full h-48 object-cover">
        </div>
        
        <!-- Detalles -->
        <div class="mb-6 flex flex-wrap gap-3">
          <span class="detalle-tag">
            <i class="fas fa-clock mr-1"></i>
            {{ receta.tiempo }} minutos
          </span>
          <span class="detalle-tag">
            <i class="fas fa-signal mr-1"></i>
            {{ receta.dificultad }}
          </span>
          <span class="detalle-tag">
            <i class="fas fa-users mr-1"></i>
            {{ receta.porciones }} porciones
          </span>
        </div>
        
        <!-- Ingredientes -->
        <div class="mb-6">
          <h4 class="text-xl font-semibold mb-3">Ingredientes</h4>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li v-for="(ingrediente, index) in receta.ingredientes" :key="index">
              {{ ingrediente }}
            </li>
          </ul>
        </div>
        
        <!-- Preparación -->
        <div class="mb-6">
          <h4 class="text-xl font-semibold mb-3">Preparación</h4>
          <ol class="list-decimal list-inside space-y-4 text-gray-700">
            <li v-for="(paso, index) in receta.preparacion" :key="index">
              <span class="font-medium text-gray-900">Paso {{ index + 1 }}:</span>
              <p class="mt-1 pl-6">{{ paso }}</p>
            </li>
          </ol>
        </div>
        
        <!-- Video -->
        <div v-if="receta.video" class="mb-6">
          <h4 class="text-xl font-semibold mb-3">Video Tutorial</h4>
          <a 
            :href="receta.video" 
            target="_blank" 
            class="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-300"
          >
            <i class="fab fa-youtube mr-2"></i>
            Ver en YouTube
          </a>
        </div>
        
        <!-- Información Nutricional -->
        <div class="mb-6">
          <h4 class="text-xl font-semibold mb-3">Información Nutricional</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="nutri-card">
              <div class="nutri-label">Calorías</div>
              <div class="nutri-value">{{ receta.nutricion?.calorias || 'N/A' }}</div>
            </div>
            <div class="nutri-card">
              <div class="nutri-label">Proteínas</div>
              <div class="nutri-value">{{ receta.nutricion?.proteinas || 'N/A' }}</div>
            </div>
            <div class="nutri-card">
              <div class="nutri-label">Carbohidratos</div>
              <div class="nutri-value">{{ receta.nutricion?.carbohidratos || 'N/A' }}</div>
            </div>
            <div class="nutri-card">
              <div class="nutri-label">Grasas</div>
              <div class="nutri-value">{{ receta.nutricion?.grasas || 'N/A' }}</div>
            </div>
          </div>
        </div>
        
        <!-- Consejos -->
        <div>
          <h4 class="text-xl font-semibold mb-3">Consejos</h4>
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 text-gray-700">
            <p>{{ receta.consejos || 'No hay consejos disponibles para esta receta.' }}</p>
          </div>
        </div>
        
      </div>

      <!-- Footer con botones -->
      <div class="p-4 border-t bg-gray-50 flex justify-end">
        <button @click="$emit('close')" class="btn-tertiary mr-3">
          Cerrar
        </button>
        <button @click="printReceta" class="btn-primary">
          <i class="fas fa-print mr-2"></i>
          Imprimir Receta
        </button>
      </div>

    </div>
  </div>
</template>

<script>
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
    
    return {
      printReceta
    }
  }
}
</script>

<style scoped>
.detalle-tag {
  display: inline-flex;
  align-items: center;
  background: #f3f4f6;
  color: #4b5563;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
}

.nutri-card {
  background: #f3f4f6;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.nutri-label {
  color: #6b7280;
  font-size: 14px;
}

.nutri-value {
  font-size: 18px;
  font-weight: bold;
}

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
