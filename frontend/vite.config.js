const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
const path = require('path');

// Plugin simple para history API fallback
function historyFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Si la URL tiene una extensión, es un recurso normal
        if (req.url.indexOf('.') !== -1) {
          return next();
        }
        
        // Para las SPA, redirige a index.html
        req.url = '/index.html';
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    vue(),
    historyFallback()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: '0.0.0.0',
      port: 5173
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
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
});
