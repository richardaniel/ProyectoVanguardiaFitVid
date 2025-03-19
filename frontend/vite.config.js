import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import path from 'path';

// Plugin simple para history API fallback
function historyFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          // Si la URL tiene una extensión o es un archivo estático conocido, pasa a siguiente middleware
          if (req.url.indexOf('.') !== -1 || 
              req.url.startsWith('/assets/') || 
              req.url.startsWith('/@vite/') || 
              req.url.startsWith('/@id/') || 
              req.url.startsWith('/@fs/') ||
              req.url.startsWith('/node_modules/') ||
              req.url === '/favicon.ico') {
            return next();
          }
          
          // Para cualquier otra URL, usa el index.html para manejar rutas client-side
          console.log('Historia fallback para:', req.url);
          
          // Redirigir todas las solicitudes a index.html
          req.url = '/index.html';
          next();
        });
      };
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    historyFallback()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: '0.0.0.0',
      port: 5000
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true
  }
});
