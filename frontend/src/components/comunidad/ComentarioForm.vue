<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Comparte tu experiencia</h3>
    
    <form @submit.prevent="submitComentario">
      <div class="mb-4">
        <label for="nombre" class="block text-gray-700 font-medium">Nombre (opcional)</label>
        <input 
          id="nombre" 
          v-model="nombre" 
          type="text" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Tu nombre"
        >
      </div>
      
      <div class="mb-4">
        <label for="comentario" class="block text-gray-700 font-medium">Comentario</label>
        <textarea 
          id="comentario" 
          v-model="comentario" 
          rows="4" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
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
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          :disabled="isSubmitting || !comentario.trim()"
          :class="{ 'opacity-50 cursor-not-allowed': isSubmitting || !comentario.trim() }"
        >
          <svg v-if="isSubmitting" class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span v-if="isSubmitting">Enviando...</span>
          <span v-else>Publicar Comentario</span>
        </button>
      </div>
    </form>
    
    <transition name="fade">
      <div 
        v-if="errorMessage" 
        class="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm"
      >
        {{ errorMessage }}
      </div>
    </transition>
    
    <transition name="fade">
      <div 
        v-if="successMessage" 
        class="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg text-sm"
      >
        {{ successMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import feather from 'feather-icons'

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
        const response = await axios.post('http://localhost:5000/api/comentarios', {  // <-- Se corrige la URL de la API
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

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
