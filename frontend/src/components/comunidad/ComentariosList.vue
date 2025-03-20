<template>
  <div>
    <div v-for="comentario in comentarios" :key="comentario._id" class="mb-6">
      <div class="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-lg">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">
              {{ getInitials(comentario.nombre) }}
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">{{ comentario.nombre }}</h4>
              <div class="text-sm text-gray-500">
                {{ formatDate(comentario.fecha) }}
              </div>
            </div>
          </div>
          <div>
            <button 
              @click="showDeleteConfirmation(comentario._id)"
              class="text-gray-400 hover:text-red-500 transition duration-200"
            >
              <i class="fas fa-trash-alt text-lg"></i>
            </button>
          </div>
        </div>
        
        <p class="text-gray-700 whitespace-pre-line">{{ comentario.contenido }}</p>
        
        <div class="mt-4 flex items-center space-x-4">
          <button 
            @click="toggleLike(comentario._id)"
            class="flex items-center text-sm text-gray-500 hover:text-blue-600 transition duration-200"
            :class="{ 'text-blue-600': comentario.liked }"
          >
            <i class="fas fa-thumbs-up text-lg mr-1" :class="{ 'text-blue-600': comentario.liked }"></i>
            Me gusta ({{ comentario.likes || 0 }})
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal de confirmación para eliminar -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-4 text-gray-900">Confirmar eliminación</h3>
        <p class="mb-6 text-gray-700">¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            Cancelar
          </button>
          <button 
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'ComentariosList',
  props: {
    comentarios: {
      type: Array,
      required: true
    }
  },
  emits: ['delete-comment'],
  setup(props, { emit }) {
    const showDeleteModal = ref(false)
    const comentarioToDelete = ref(null)
    
    const formatDate = (dateString) => {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString('es-ES', options)
    }
    
    const getInitials = (name) => {
      if (!name) return 'A'
      const words = name.trim().split(' ')
      return words.map(w => w[0].toUpperCase()).join('').slice(0, 2)
    }
    
    const toggleLike = async (id) => {
      try {
        const comentario = props.comentarios.find(c => c._id === id)
        if (!comentario) return

        // Cambiar estado de "Me gusta" y actualizar el backend
        const nuevoEstado = !comentario.liked
        comentario.liked = nuevoEstado
        comentario.likes = (comentario.likes || 0) + (nuevoEstado ? 1 : -1)

        await axios.patch(`http://localhost:5000/api/comentarios/${id}/like`, { liked: nuevoEstado })
      } catch (error) {
        console.error('Error al actualizar "Me gusta":', error)
      }
    }
    
    const showDeleteConfirmation = (id) => {
      comentarioToDelete.value = id
      showDeleteModal.value = true
    }
    
    const confirmDelete = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/comentarios/${comentarioToDelete.value}`)
        emit('delete-comment', comentarioToDelete.value)
        showDeleteModal.value = false
        comentarioToDelete.value = null
      } catch (error) {
        console.error('Error al eliminar comentario:', error)
      }
    }
    
    onMounted(() => {
      console.log('Componente ComentarioList montado')
    })
    
    return {
      formatDate,
      getInitials,
      toggleLike,
      showDeleteModal,
      showDeleteConfirmation,
      confirmDelete
    }
  }
}
</script>

<style scoped>
/* Animación de entrada/salida del modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
