<template>
  <div>
    <div v-for="comentario in comentarios" :key="comentario._id" class="mb-6">
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
              {{ getInitials(comentario.nombre) }}
            </div>
            <div>
              <h4 class="font-semibold">{{ comentario.nombre }}</h4>
              <div class="text-sm text-gray-500">
                {{ formatDate(comentario.fecha) }}
              </div>
            </div>
          </div>
          <div>
            <button 
              @click="showDeleteConfirmation(comentario._id)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-300"
            >
              <i data-feather="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        
        <p class="text-gray-700 whitespace-pre-line">{{ comentario.contenido }}</p>
        
        <div class="mt-4 flex items-center space-x-4">
          <button 
            @click="toggleLike(comentario._id)"
            class="flex items-center text-sm text-gray-500 hover:text-blue-600"
            :class="{ 'text-blue-600': comentario.liked }"
          >
            <i 
              data-feather="thumbs-up" 
              class="w-4 h-4 mr-1"
              :class="{ 'fill-current': comentario.liked }"
            ></i>
            Me gusta ({{ comentario.likes || 0 }})
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal de confirmación para eliminar -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold mb-4">Confirmar eliminación</h3>
        <p class="mb-6">¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button 
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

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
      return name.charAt(0).toUpperCase()
    }
    
    const toggleLike = (id) => {
      const comentario = props.comentarios.find(c => c._id === id)
      if (comentario) {
        comentario.liked = !comentario.liked
        comentario.likes = (comentario.likes || 0) + (comentario.liked ? 1 : -1)
      }
      setTimeout(() => {
        feather.replace()
      }, 0)
    }
    
    const showDeleteConfirmation = (id) => {
      comentarioToDelete.value = id
      showDeleteModal.value = true
    }
    
    const confirmDelete = () => {
      emit('delete-comment', comentarioToDelete.value)
      showDeleteModal.value = false
      comentarioToDelete.value = null
    }
    
    onMounted(() => {
      feather.replace()
    })
    
    watch(props.comentarios, () => {
      setTimeout(() => {
        feather.replace()
      }, 0)
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
.fill-current {
  fill: currentColor;
}
</style>
