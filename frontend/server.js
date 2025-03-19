import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar CORS para desarrollo
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Crear una página HTML básica para probar
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitVid - Fitness en Español</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fa;
        color: #333;
      }
      header {
        background: linear-gradient(135deg, #6e48aa 0%, #9e48cd 100%);
        color: white;
        padding: 1rem;
        text-align: center;
      }
      nav {
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 0.5rem;
      }
      nav a {
        color: #6e48aa;
        text-decoration: none;
        margin: 0 1rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      nav a:hover {
        background-color: #f0e6ff;
      }
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      .hero {
        text-align: center;
        margin-bottom: 3rem;
      }
      .hero h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #6e48aa;
      }
      .hero p {
        font-size: 1.2rem;
        color: #666;
        max-width: 800px;
        margin: 0 auto;
      }
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      .feature-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: transform 0.3s;
      }
      .feature-card:hover {
        transform: translateY(-10px);
      }
      .feature-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .feature-card h2 {
        padding: 1rem;
        margin: 0;
        color: #6e48aa;
      }
      .feature-card p {
        padding: 0 1rem 1rem;
        color: #666;
      }
      footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 2rem;
        margin-top: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>FitVid</h1>
      <p>Tu comunidad de fitness en español</p>
    </header>
    
    <nav>
      <a href="/">Inicio</a>
      <a href="/rutinas">Rutinas</a>
      <a href="/recetas">Recetas</a>
      <a href="/comunidad">Comunidad</a>
    </nav>
    
    <main>
      <section class="hero">
        <h1>Transforma tu cuerpo, mejora tu vida</h1>
        <p>FitVid es tu plataforma de fitness en español con rutinas de ejercicios, recetas saludables y una comunidad que te apoya en cada paso de tu viaje hacia un estilo de vida más saludable.</p>
      </section>
      
      <section class="features">
        <div class="feature-card">
          <div style="background-color: #ffc107; height: 200px; display: flex; justify-content: center; align-items: center;">
            <span style="font-size: 4rem; color: white;">💪</span>
          </div>
          <h2>Rutinas de Ejercicios</h2>
          <p>Descubre rutinas personalizadas para todos los niveles, desde principiantes hasta avanzados.</p>
        </div>
        
        <div class="feature-card">
          <div style="background-color: #4caf50; height: 200px; display: flex; justify-content: center; align-items: center;">
            <span style="font-size: 4rem; color: white;">🥗</span>
          </div>
          <h2>Recetas Saludables</h2>
          <p>Explora deliciosas recetas nutritivas que complementan tu entrenamiento y ayudan a alcanzar tus metas.</p>
        </div>
        
        <div class="feature-card">
          <div style="background-color: #2196f3; height: 200px; display: flex; justify-content: center; align-items: center;">
            <span style="font-size: 4rem; color: white;">👥</span>
          </div>
          <h2>Comunidad Activa</h2>
          <p>Únete a una comunidad motivada que comparte experiencias, consejos y celebra los logros juntos.</p>
        </div>
      </section>
    </main>
    
    <footer>
      <p>&copy; 2025 FitVid - Todos los derechos reservados</p>
    </footer>
  </body>
  </html>
  `);
});

// Crear rutas básicas para las secciones principales
app.get('/rutinas', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rutinas - FitVid</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fa;
        color: #333;
      }
      header {
        background: linear-gradient(135deg, #6e48aa 0%, #9e48cd 100%);
        color: white;
        padding: 1rem;
        text-align: center;
      }
      nav {
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 0.5rem;
      }
      nav a {
        color: #6e48aa;
        text-decoration: none;
        margin: 0 1rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      nav a:hover {
        background-color: #f0e6ff;
      }
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      h1 {
        color: #6e48aa;
        margin-bottom: 2rem;
      }
      .rutinas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }
      .rutina-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .rutina-card img, .rutina-card div.placeholder {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .rutina-card div.placeholder {
        background-color: #ffc107;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .rutina-card h2 {
        padding: 1rem;
        margin: 0;
        color: #6e48aa;
      }
      .rutina-card p {
        padding: 0 1rem 1rem;
        color: #666;
      }
      .rutina-card .meta {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem 1rem;
        color: #888;
        font-size: 0.9rem;
      }
      footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 2rem;
        margin-top: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>FitVid</h1>
      <p>Tu comunidad de fitness en español</p>
    </header>
    
    <nav>
      <a href="/">Inicio</a>
      <a href="/rutinas">Rutinas</a>
      <a href="/recetas">Recetas</a>
      <a href="/comunidad">Comunidad</a>
    </nav>
    
    <main>
      <h1>Rutinas de Ejercicios</h1>
      
      <div class="rutinas-grid">
        <div class="rutina-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🏃</span>
          </div>
          <h2>HIIT para principiantes</h2>
          <p>Una rutina de alta intensidad de 20 minutos perfecta para quienes comienzan.</p>
          <div class="meta">
            <span>Dificultad: Principiante</span>
            <span>20 min</span>
          </div>
        </div>
        
        <div class="rutina-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🏋️</span>
          </div>
          <h2>Entrenamiento de fuerza</h2>
          <p>Desarrolla músculo y aumenta tu fuerza con esta rutina completa.</p>
          <div class="meta">
            <span>Dificultad: Intermedio</span>
            <span>45 min</span>
          </div>
        </div>
        
        <div class="rutina-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🧘</span>
          </div>
          <h2>Yoga para flexibilidad</h2>
          <p>Mejora tu flexibilidad y reduce el estrés con esta sesión de yoga.</p>
          <div class="meta">
            <span>Dificultad: Todos los niveles</span>
            <span>30 min</span>
          </div>
        </div>
        
        <div class="rutina-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🤸</span>
          </div>
          <h2>Entrenamiento de core</h2>
          <p>Fortalece tu core y mejora tu postura con estos ejercicios específicos.</p>
          <div class="meta">
            <span>Dificultad: Intermedio</span>
            <span>25 min</span>
          </div>
        </div>
      </div>
    </main>
    
    <footer>
      <p>&copy; 2025 FitVid - Todos los derechos reservados</p>
    </footer>
  </body>
  </html>
  `);
});

app.get('/recetas', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recetas - FitVid</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fa;
        color: #333;
      }
      header {
        background: linear-gradient(135deg, #6e48aa 0%, #9e48cd 100%);
        color: white;
        padding: 1rem;
        text-align: center;
      }
      nav {
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 0.5rem;
      }
      nav a {
        color: #6e48aa;
        text-decoration: none;
        margin: 0 1rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      nav a:hover {
        background-color: #f0e6ff;
      }
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      h1 {
        color: #6e48aa;
        margin-bottom: 2rem;
      }
      .recetas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }
      .receta-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .receta-card img, .receta-card div.placeholder {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .receta-card div.placeholder {
        background-color: #4caf50;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .receta-card h2 {
        padding: 1rem;
        margin: 0;
        color: #6e48aa;
      }
      .receta-card p {
        padding: 0 1rem 1rem;
        color: #666;
      }
      .receta-card .meta {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem 1rem;
        color: #888;
        font-size: 0.9rem;
      }
      .tag {
        background-color: #f0e6ff;
        color: #6e48aa;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
      }
      footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 2rem;
        margin-top: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>FitVid</h1>
      <p>Tu comunidad de fitness en español</p>
    </header>
    
    <nav>
      <a href="/">Inicio</a>
      <a href="/rutinas">Rutinas</a>
      <a href="/recetas">Recetas</a>
      <a href="/comunidad">Comunidad</a>
    </nav>
    
    <main>
      <h1>Recetas Saludables</h1>
      
      <div class="recetas-grid">
        <div class="receta-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🥗</span>
          </div>
          <h2>Bowl de proteínas vegetarianas</h2>
          <p>Un delicioso bowl completo con garbanzos, quinoa y verduras de temporada.</p>
          <div class="meta">
            <span class="tag">Vegetariano</span>
            <span>30 min</span>
          </div>
        </div>
        
        <div class="receta-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🍲</span>
          </div>
          <h2>Sopa de pollo y verduras</h2>
          <p>Una reconfortante sopa rica en proteínas y con bajo contenido calórico.</p>
          <div class="meta">
            <span class="tag">Alto en proteínas</span>
            <span>45 min</span>
          </div>
        </div>
        
        <div class="receta-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🥞</span>
          </div>
          <h2>Pancakes de avena y plátano</h2>
          <p>Un desayuno nutritivo y energético para comenzar el día con fuerza.</p>
          <div class="meta">
            <span class="tag">Desayuno</span>
            <span>15 min</span>
          </div>
        </div>
        
        <div class="receta-card">
          <div class="placeholder">
            <span style="font-size: 4rem; color: white;">🥤</span>
          </div>
          <h2>Batido verde detox</h2>
          <p>Un batido refrescante lleno de nutrientes para depurar tu organismo.</p>
          <div class="meta">
            <span class="tag">Bebida</span>
            <span>5 min</span>
          </div>
        </div>
      </div>
    </main>
    
    <footer>
      <p>&copy; 2025 FitVid - Todos los derechos reservados</p>
    </footer>
  </body>
  </html>
  `);
});

app.get('/comunidad', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comunidad - FitVid</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fa;
        color: #333;
      }
      header {
        background: linear-gradient(135deg, #6e48aa 0%, #9e48cd 100%);
        color: white;
        padding: 1rem;
        text-align: center;
      }
      nav {
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 0.5rem;
      }
      nav a {
        color: #6e48aa;
        text-decoration: none;
        margin: 0 1rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      nav a:hover {
        background-color: #f0e6ff;
      }
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      h1 {
        color: #6e48aa;
        margin-bottom: 2rem;
      }
      .comunidad-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
      }
      @media (max-width: 768px) {
        .comunidad-grid {
          grid-template-columns: 1fr;
        }
      }
      .post {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        margin-bottom: 2rem;
        padding: 1.5rem;
      }
      .post-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #6e48aa;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        margin-right: 1rem;
      }
      .post-meta {
        display: flex;
        flex-direction: column;
      }
      .post-author {
        font-weight: bold;
        color: #333;
      }
      .post-date {
        color: #888;
        font-size: 0.8rem;
      }
      .post-content {
        margin-bottom: 1rem;
      }
      .post-actions {
        display: flex;
        gap: 1rem;
        color: #888;
      }
      .post-actions span {
        cursor: pointer;
      }
      .post-actions span:hover {
        color: #6e48aa;
      }
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .sidebar-section {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        padding: 1.5rem;
      }
      .sidebar-section h2 {
        color: #6e48aa;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.3rem;
      }
      .trending-item {
        margin-bottom: 1rem;
      }
      .trending-title {
        font-weight: bold;
        color: #333;
        margin-bottom: 0.3rem;
      }
      .trending-stats {
        color: #888;
        font-size: 0.8rem;
      }
      footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 2rem;
        margin-top: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>FitVid</h1>
      <p>Tu comunidad de fitness en español</p>
    </header>
    
    <nav>
      <a href="/">Inicio</a>
      <a href="/rutinas">Rutinas</a>
      <a href="/recetas">Recetas</a>
      <a href="/comunidad">Comunidad</a>
    </nav>
    
    <main>
      <h1>Comunidad FitVid</h1>
      
      <div class="comunidad-grid">
        <div class="posts">
          <div class="post">
            <div class="post-header">
              <div class="avatar">MS</div>
              <div class="post-meta">
                <span class="post-author">María Sánchez</span>
                <span class="post-date">Hace 2 horas</span>
              </div>
            </div>
            <div class="post-content">
              <p>¡Acabo de completar mi primer mes de entrenamiento HIIT! Me siento con más energía y he notado grandes cambios en mi resistencia. ¿Alguien más ha tenido buenos resultados con HIIT?</p>
            </div>
            <div class="post-actions">
              <span>👍 24 Me gusta</span>
              <span>💬 8 Comentarios</span>
              <span>🔗 Compartir</span>
            </div>
          </div>
          
          <div class="post">
            <div class="post-header">
              <div class="avatar">JL</div>
              <div class="post-meta">
                <span class="post-author">Jorge López</span>
                <span class="post-date">Hace 5 horas</span>
              </div>
            </div>
            <div class="post-content">
              <p>Probé la receta del bowl de proteínas vegetarianas y quedó increíble. Le añadí un poco de aguacate y semillas de chía para darle un toque extra de nutrientes. ¡Muy recomendado!</p>
            </div>
            <div class="post-actions">
              <span>👍 18 Me gusta</span>
              <span>💬 5 Comentarios</span>
              <span>🔗 Compartir</span>
            </div>
          </div>
          
          <div class="post">
            <div class="post-header">
              <div class="avatar">CM</div>
              <div class="post-meta">
                <span class="post-author">Carlos Martínez</span>
                <span class="post-date">Ayer</span>
              </div>
            </div>
            <div class="post-content">
              <p>Después de 3 meses siguiendo las rutinas de fuerza de FitVid, he aumentado mi masa muscular y mejorado mi técnica. La clave ha sido la consistencia y seguir los videos paso a paso. ¡Gracias por todo el contenido de calidad!</p>
            </div>
            <div class="post-actions">
              <span>👍 42 Me gusta</span>
              <span>💬 12 Comentarios</span>
              <span>🔗 Compartir</span>
            </div>
          </div>
        </div>
        
        <div class="sidebar">
          <div class="sidebar-section">
            <h2>Tendencias</h2>
            <div class="trending-item">
              <div class="trending-title">Reto 30 días abdominales</div>
              <div class="trending-stats">324 participantes</div>
            </div>
            <div class="trending-item">
              <div class="trending-title">Recetas con proteína vegetal</div>
              <div class="trending-stats">189 publicaciones</div>
            </div>
            <div class="trending-item">
              <div class="trending-title">Yoga para principiantes</div>
              <div class="trending-stats">156 participantes</div>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h2>Próximos eventos</h2>
            <div class="trending-item">
              <div class="trending-title">Clase en vivo: HIIT intensivo</div>
              <div class="trending-stats">Mañana - 18:00h</div>
            </div>
            <div class="trending-item">
              <div class="trending-title">Charla: Nutrición deportiva</div>
              <div class="trending-stats">Jueves - 20:00h</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <footer>
      <p>&copy; 2025 FitVid - Todos los derechos reservados</p>
    </footer>
  </body>
  </html>
  `);
});

// Crear el directorio public si no existe
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor frontend ejecutándose en http://0.0.0.0:${port}`);
});