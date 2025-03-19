<template>
  <div class="comunidad-page page-container py-10">
    <h1 class="section-title">Comunidad FitVid</h1>
    
    <div class="max-w-4xl mx-auto">
      <p class="text-center text-lg mb-10">
        Comparte tus pensamientos, preguntas y logros con la comunidad fitness.
        No necesitas registrarte para participar.
      </p>
      
      <ComentarioForm @comentario-added="onComentarioAdded" />
      
      <div class="mt-12">
        <h2 class="section-subtitle">Comentarios Recientes</h2>
        
        <div v-if="loading" class="text-center py-10">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Cargando comentarios...</p>
        </div>
        
        <div v-else-if="comentarios.length === 0" class="text-center py-10">
          <p>No hay comentarios aún. ¡Sé el primero en compartir!</p>
        </div>
        
        <ComentariosList 
          v-else 
          :comentarios="comentarios" 
          @delete-comment="deleteComentario"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ComentarioForm from '../components/comunidad/ComentarioForm.vue'
import ComentariosList from '../components/comunidad/ComentariosList.vue'

export default {
  name: 'ComunidadPage',
  components: {
    ComentarioForm,
    ComentariosList
  },
  setup() {
    const comentarios = ref([])
    const loading = ref(false)

    const fetchComentarios = async () => {
      loading.value = true
      try {
        const response = await axios.get('/api/comentarios')
        comentarios.value = response.data
      } catch (error) {
        console.error('Error al cargar comentarios:', error)
        comentarios.value = []
      } finally {
        loading.value = false
      }
    }

    const onComentarioAdded = (nuevoComentario) => {
      comentarios.value.unshift(nuevoComentario)
    }

    const deleteComentario = async (comentarioId) => {
      try {
        await axios.delete(`/api/comentarios/${comentarioId}`)
        comentarios.value = comentarios.value.filter(c => c._id !== comentarioId)
      } catch (error) {
        console.error('Error al eliminar comentario:', error)
      }
    }

    onMounted(() => {
      fetchComentarios()
    })

    return {
      comentarios,
      loading,
      onComentarioAdded,
      deleteComentario
    }
  }
}
</script>
