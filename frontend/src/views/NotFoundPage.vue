<template>
  <div class="not-found-page text-center py-10">
    <h1 class="text-4xl font-bold text-blue-600 mb-4 animate__animated animate__fadeIn">404 - Página no encontrada</h1>
    <p class="text-gray-600 mt-4 animate__animated animate__fadeIn animate__delay-1s">
      Lo sentimos, la página que buscas no existe.
    </p>
    <div class="mt-6">
      <router-link to="/" class="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors duration-300">
        Volver al inicio
      </router-link>
    </div>
    <div class="mt-6">
      <img src="@/assets/images/404.png" alt="404 Image" class="mx-auto w-1/2 md:w-1/3" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
.not-found-page {
  padding-top: 80px;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate__fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.animate__delay-1s {
  animation-delay: 1s;
}
</style>
