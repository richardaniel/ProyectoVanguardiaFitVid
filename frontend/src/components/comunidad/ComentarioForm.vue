<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-xl font-semibold mb-4">Comparte tu experiencia</h3>
    
    <form @submit.prevent="submitComentario">
      <div class="mb-4">
        <label for="nombre" class="block text-gray-700 mb-2">Nombre (opcional)</label>
        <input 
          id="nombre" 
          v-model="nombre" 
          type="text" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nombre"
        >
      </div>
      
      <div class="mb-4">
        <label for="comentario" class="block text-gray-700 mb-2">Comentario</label>
        <textarea 
          id="comentario" 
          v-model="comentario" 
          rows="4" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Comparte tus pensamientos, logros, preguntas o consejos con la comunidad..."
          required
        ></textarea>
        <div class="text-right mt-1 text-sm text-gray-500">
          {{ comentario.length }}/500 caracteres
        </div>
      </div>
      
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="btn-primary"
          :disabled="isSubmitting || !comentario.trim()"
          :class="{ 'opacity-50 cursor-not-allowed': isSubmitting || !comentario.trim() }"
        >
          <span v-if="isSubmitting">
            <i data-feather="loader" class="w-4 h-4 mr-2 animate-spin"></i>
            Enviando...
          </span>
          <span v-else>
            <i data-feather="send" class="w-4 h-4 mr-2"></i>
            Publicar Comentario
          </span>
        </button>
      </div>
    </form>
    
    <div 
      v-if="errorMessage" 
      class="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
    >
      {{ errorMessage }}
    </div>
    
    <div 
      v-if="successMessage" 
      class="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded"
    >
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'ComentarioForm',
  emits: ['comentario-added'],
  setup(props, { emit }) {
    const nombre = ref('')
    const comentario = ref('')
    const isSubmitting = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    
    const submitComentario = async () => {
      if (!comentario.value.trim()) return
      
      errorMessage.value = ''
      successMessage.value = ''
      isSubmitting.value = true
      
      try {
        const response = await axios.post('/api/comentarios', {
          nombre: nombre.value || 'Anónimo',
          contenido: comentario.value,
          fecha: new Date().toISOString()
        })
        
        emit('comentario-added', response.data)
        successMessage.value = '¡Comentario publicado con éxito!'
        nombre.value = ''
        comentario.value = ''
        
        setTimeout(() => {
          successMessage.value = ''
        }, 3000)
      } catch (error) {
        console.error('Error al publicar comentario:', error)
        errorMessage.value = 'Ha ocurrido un error al publicar tu comentario. Por favor, inténtalo de nuevo.'
      } finally {
        isSubmitting.value = false
        feather.replace()
      }
    }
    
    watch(comentario, (newValue) => {
      if (newValue.length > 500) {
        comentario.value = newValue.substring(0, 500)
      }
    })
    
    onMounted(() => {
      feather.replace()
    })
    
    return {
      nombre,
      comentario,
      isSubmitting,
      errorMessage,
      successMessage,
      submitComentario
    }
  }
}
</script>
