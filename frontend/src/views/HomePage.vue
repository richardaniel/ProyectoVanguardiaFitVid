<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-8 text-center">Bienvenido a FitVid</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Tarjeta Rutinas -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
        <div class="relative h-48 bg-gradient-to-r from-purple-500 to-indigo-600">
          <div class="absolute inset-0 flex items-center justify-center">
            <i data-feather="activity" class="text-white w-16 h-16"></i>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">Rutinas de Ejercicio</h2>
          <p class="text-gray-600 mb-4">Descubre rutinas personalizadas para cada nivel y objetivo. Desde pérdida de peso hasta ganancia muscular.</p>
          <router-link to="/rutinas" class="text-primary font-medium hover:underline">Explorar rutinas →</router-link>
        </div>
      </div>
      
      <!-- Tarjeta Recetas -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
        <div class="relative h-48 bg-gradient-to-r from-green-500 to-teal-600">
          <div class="absolute inset-0 flex items-center justify-center">
            <i data-feather="coffee" class="text-white w-16 h-16"></i>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">Recetas Saludables</h2>
          <p class="text-gray-600 mb-4">Aprende a preparar comidas nutritivas y deliciosas que complementen tu estilo de vida activo.</p>
          <router-link to="/recetas" class="text-primary font-medium hover:underline">Ver recetas →</router-link>
        </div>
      </div>
      
      <!-- Tarjeta Comunidad -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
        <div class="relative h-48 bg-gradient-to-r from-yellow-500 to-orange-600">
          <div class="absolute inset-0 flex items-center justify-center">
            <i data-feather="users" class="text-white w-16 h-16"></i>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">Comunidad Fitness</h2>
          <p class="text-gray-600 mb-4">Únete a una comunidad de personas con objetivos similares. Comparte progresos y motívate.</p>
          <router-link to="/comunidad" class="text-primary font-medium hover:underline">Unirse a la comunidad →</router-link>
        </div>
      </div>
    </div>
    
    <!-- Destacados -->
    <section class="mt-16">
      <h2 class="text-2xl font-bold mb-6 text-center">Destacados de la Semana</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">Rutina</span>
          <h3 class="text-xl font-semibold mb-2">Entrenamiento HIIT de 20 minutos</h3>
          <p class="text-gray-600">Quema calorías y mejora tu resistencia con esta rutina intensiva de intervalos.</p>
          <router-link to="/rutinas/hiit-20min" class="mt-4 inline-block text-primary font-medium hover:underline">Ver rutina</router-link>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">Receta</span>
          <h3 class="text-xl font-semibold mb-2">Bowl de proteínas vegano</h3>
          <p class="text-gray-600">Delicioso y nutritivo bowl con proteínas vegetales, perfecto para después del ejercicio.</p>
          <router-link to="/recetas/bowl-proteinas" class="mt-4 inline-block text-primary font-medium hover:underline">Ver receta</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  mounted() {
    // Inicializa los iconos de Feather después de que el componente se monta
    if (window.feather) {
      window.feather.replace()
    }
  }
})
</script>

<style scoped>
.text-primary {
  color: #4f46e5;
}
</style>