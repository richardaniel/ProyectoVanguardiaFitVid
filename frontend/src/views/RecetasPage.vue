<template>
  <div class="recetas-page page-container py-10">
    <h1 class="section-title">Recetas Saludables</h1>

    <div class="mb-8">
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button
          v-for="categoria in categorias"
          :key="categoria.id"
          @click="selectCategoria(categoria.id)"
          class="py-2 px-6 rounded-full text-lg font-medium transition-all duration-300"
          :class="selectedCategoria === categoria.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        >
          {{ categoria.nombre }}
        </button>
      </div>
    </div>

    <!-- Cargando -->
    <div v-if="loading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      <p class="mt-4 text-gray-600">Cargando recetas...</p>
    </div>

    <!-- No hay recetas -->
    <div v-else-if="recetas.length === 0" class="text-center py-10">
      <p>No se encontraron recetas para esta categoría.</p>
    </div>

    <!-- Recetas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <RecetaCard 
        v-for="receta in recetas" 
        :key="receta.id" 
        :receta="receta"
        @click="openRecetaDetalle(receta)"
        class="transition-transform transform hover:scale-105"
      />
    </div>

    <!-- Modal de detalle de receta -->
    <transition name="fade">
      <RecetaDetalle 
        v-if="selectedReceta" 
        :receta="selectedReceta"
        @close="closeRecetaDetalle"
      />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import RecetaCard from '../components/recetas/RecetaCard.vue'
import RecetaDetalle from '../components/recetas/RecetaDetalle.vue'

export default {
  name: 'RecetasPage',
  components: {
    RecetaCard,
    RecetaDetalle
  },
  setup() {
    const categorias = ref([
      { id: 1, nombre: 'Desayuno' },
      { id: 2, nombre: 'Almuerzo' },
      { id: 3, nombre: 'Cena' },
      { id: 4, nombre: 'Postres' }
    ])
    
    const selectedCategoria = ref(1) // Por defecto, mostrar desayunos
    const recetas = ref([])
    const selectedReceta = ref(null)
    const loading = ref(false)

    const fetchRecetas = async (categoriaId) => {
      loading.value = true
      try {
        const response = await axios.get(`/api/recetas/${categoriaId}`)
        recetas.value = response.data
      } catch (error) {
        console.error('Error al cargar recetas:', error)
        recetas.value = []
      } finally {
        loading.value = false
      }
    }

    const selectCategoria = (categoriaId) => {
      selectedCategoria.value = categoriaId
      fetchRecetas(categoriaId)
      selectedReceta.value = null // Cerrar el modal al cambiar de categoría
    }

    const openRecetaDetalle = (receta) => {
      selectedReceta.value = receta
    }

    const closeRecetaDetalle = () => {
      selectedReceta.value = null
    }

    onMounted(() => {
      fetchRecetas(selectedCategoria.value)
      feather.replace()
    })

    watch([selectedCategoria, selectedReceta], () => {
      setTimeout(() => {
        feather.replace()
      }, 100)
    })

    return {
      categorias,
      selectedCategoria,
      recetas,
      selectedReceta,
      loading,
      selectCategoria,
      openRecetaDetalle,
      closeRecetaDetalle
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>
