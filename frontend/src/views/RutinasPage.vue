<template>
  <div class="rutinas-page page-container py-10">
    <h1 class="section-title">Rutinas de Ejercicio</h1>

    <div v-if="!selectedBodyPart">
      <p class="text-center text-lg mb-8">
        Selecciona una parte del cuerpo para ver ejercicios específicos
      </p>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        <div 
          v-for="part in bodyParts" 
          :key="part.id" 
          class="body-part-card card cursor-pointer text-center transition-transform duration-300 transform hover:scale-105"
          @click="selectBodyPart(part)"
        >
          <div class="mb-4 h-32 flex items-center justify-center">
            <i :data-feather="part.icon" class="w-16 h-16 text-blue-600"></i>
          </div>
          <h3 class="text-xl font-semibold">{{ part.nombre }}</h3>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-8">
        <button @click="backToBodyParts" class="btn-tertiary flex items-center">
          <i data-feather="arrow-left" class="mr-2"></i> Volver
        </button>
        <h2 class="text-2xl font-bold">Ejercicios para {{ selectedBodyPart.nombre }}</h2>
        <button 
          v-if="selectedExercises.length > 0" 
          @click="showResumen = true" 
          class="btn-primary flex items-center"
        >
          Ver Resumen ({{ selectedExercises.length }})
          <i data-feather="clipboard" class="ml-2"></i>
        </button>
      </div>

      <div v-if="loading" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Cargando ejercicios...</p>
      </div>

      <div v-else-if="exercises.length === 0" class="text-center py-10">
        <p>No se encontraron ejercicios para esta parte del cuerpo.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EjercicioCard 
          v-for="ejercicio in exercises" 
          :key="ejercicio.id" 
          :ejercicio="ejercicio"
          :isSelected="isExerciseSelected(ejercicio.id)"
          @toggle="toggleExercise(ejercicio)"
        />
      </div>
    </div>

    <!-- Modal de Resumen -->
    <transition name="fade">
      <ResumenRutina 
        v-if="showResumen" 
        :exercises="selectedExercises"
        @close="showResumen = false"
        @remove="removeFromResumen"
      />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { ejerciciosService } from '../services/api'
import feather from 'feather-icons'
import EjercicioCard from '../components/rutinas/EjercicioCard.vue'
import ResumenRutina from '../components/rutinas/ResumenRutina.vue'

export default {
  name: 'RutinasPage',
  components: {
    EjercicioCard,
    ResumenRutina
  },
  setup() {
    const bodyParts = ref([
      { id: 1, nombre: 'Pecho', icon: 'shield' },
      { id: 2, nombre: 'Espalda', icon: 'columns' },
      { id: 3, nombre: 'Hombro', icon: 'triangle' },
      { id: 4, nombre: 'Tríceps', icon: 'chevrons-down' },
      { id: 5, nombre: 'Bíceps', icon: 'chevrons-up' },
      { id: 6, nombre: 'Glúteos', icon: 'square' },
      { id: 7, nombre: 'Abdomen', icon: 'grid' },
      { id: 8, nombre: 'Piernas', icon: 'clipboard' },
      { id: 9, nombre: 'Antebrazo', icon: 'edit-2' },
      { id: 10, nombre: 'Pantorrillas', icon: 'anchor' }
    ])
    
    const selectedBodyPart = ref(null)
    const exercises = ref([])
    const selectedExercises = ref([])
    const showResumen = ref(false)
    const loading = ref(false)

    const fetchExercises = async (bodyPartId) => {
      loading.value = true
      try {
        const response = await ejerciciosService.getByBodyPart(bodyPartId)
        exercises.value = response.data
        console.log('Ejercicios cargados:', response.data)
      } catch (error) {
        console.error('Error al cargar ejercicios:', error)
        exercises.value = []
      } finally {
        loading.value = false
      }
    }

    const selectBodyPart = (part) => {
      selectedBodyPart.value = part
      fetchExercises(part.id)
    }

    const backToBodyParts = () => {
      selectedBodyPart.value = null
      exercises.value = []
    }

    const toggleExercise = (ejercicio) => {
      const index = selectedExercises.value.findIndex(ex => ex.id === ejercicio.id)
      if (index === -1) {
        selectedExercises.value.push(ejercicio)
      } else {
        selectedExercises.value.splice(index, 1)
      }
    }

    const isExerciseSelected = (id) => {
      return selectedExercises.value.some(ex => ex.id === id)
    }

    const removeFromResumen = (ejercicioId) => {
      const index = selectedExercises.value.findIndex(ex => ex.id === ejercicioId)
      if (index !== -1) {
        selectedExercises.value.splice(index, 1)
      }
    }

    onMounted(() => {
      feather.replace()
    })

    watch([selectedBodyPart, showResumen], () => {
      setTimeout(() => {
        feather.replace()
      }, 100)
    })

    return {
      bodyParts,
      selectedBodyPart,
      exercises,
      selectedExercises,
      showResumen,
      loading,
      selectBodyPart,
      backToBodyParts,
      toggleExercise,
      isExerciseSelected,
      removeFromResumen
    }
  }
}
</script>

<style scoped>
.body-part-card:hover {
  border-color: #3b82f6;
}
</style>
