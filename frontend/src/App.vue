<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    Footer
  }
})
</script>

<style scoped>
/* Estilos generales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.5;
  background-color: #f9f9f9;
  color: #333;
}

/* Animación de transición suave */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Transición adicional para la entrada del contenido */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Ajuste para los elementos de la barra de navegación en móvil */
@media (max-width: 768px) {
  .nav-bar {
    background-color: #ffffff;
    padding: 10px;
  }
}
</style>
