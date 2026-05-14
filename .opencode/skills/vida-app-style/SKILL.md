---
name: vida-app-style
description: Usar cuando se requiera aplicar el estilo visual del proyecto vida-app: colores, bordes redondeados, sombras, gradientes, tipografía Poppins, animaciones y convenciones de código con comentarios descriptivos en español.
---

# Estilo Visual - vida-app

## Variables CSS (en `:root`)

```css
:root {
    /* Colores principales */
    --primary: #1a1a2e;           /* Fondo oscuro base */
    --secondary: #16213e;         /* Tono secundario más claro */
    --accent: #e94560;            /* Rosa-rojo para acentos y CTAs */
    --accent-secondary: #0f3460;  /* Azul oscuro para gradientes */
    --text-light: #eaeaea;        /* Texto principal claro */
    --text-dim: #a0a0a0;          /* Texto secundario apagado */
    --card-bg: #1f1f3a;           /* Fondo de tarjetas */

    /* Gradientes */
    --gradient-1: linear-gradient(135deg, #e94560, #0f3460);  /* Rosa a azul */
    --gradient-2: linear-gradient(135deg, #0f3460, #1a1a2e); /* Azul a oscuro */

    /* Sombras */
    --shadow: 0 10px 40px rgba(0, 0, 0, 0.3);              /* Sombra suave */
    --shadow-hover: 0 20px 60px rgba(233, 69, 96, 0.2);    /* Sombra hover con tinte rosa */
}
```

## Bordes y Radios

- **Tarjetas y paneles**: `border-radius: 20px;`
- **Botones primarios**: `border-radius: 12px;`
- **Checkboxes y elementos pequeños**: `border-radius: 6px;`
- **Íconos circulares en tarjetas**: `border-radius: 50%;` (aspecto circular)

## Espaciado

- Padding estándar de tarjetas: `2rem 1.5rem`
- Padding de secciones internas: `1.5rem`
- Gap entre elementos de grid: `1.5rem`
- Padding de inputs: `0.75rem 1rem`

## Tipografía

- **Fuente principal**: `Poppins` (Google Fonts)
- Pesos: `400` (normal), `600` (semi-bold), `700` (bold)
- Tamaños de títulos: `2.5rem` (h1), `1.5rem` (h2), `1.4rem` (card-title)
- Subtítulos: `1rem`
- Descripciones: `0.85rem` - `0.9rem`

## Estructura de Tarjetas (.life-card)

```css
.life-card {
    background: var(--card-bg);
    border: none;
    border-radius: 20px;
    padding: 2rem 1.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.life-card::before {
    /* Línea superior decorativa */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
}

.life-card:hover::before {
    transform: scaleX(1);
}

.life-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: var(--shadow-hover);
}
```

## Íconos de Tarjeta

```css
.card-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--gradient-1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    margin-bottom: 1rem;
    box-shadow: 0 8px 20px rgba(233, 69, 96, 0.3);
}

.life-card:hover .card-icon {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 12px 30px rgba(233, 69, 96, 0.5);
}
```

## Barras de Progreso

```css
.card-progress {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: var(--gradient-1);
    border-radius: 3px;
    width: var(--width);  /* Variable personalizada: --width: 75% */
    transition: width 0.8s ease;
}
```

## Panel de Contenido

```css
.content-panel {
    background: var(--card-bg);
    border-radius: 20px;
    border: 2px solid rgba(233, 69, 96, 0.3);  /* Borde con tinte del accent */
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: fadeInUp 0.5s ease-out;
}
```

## Tareas (Task Items)

```css
.task-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.task-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.task-checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid var(--accent);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.task-checkbox.checked {
    background: var(--accent);
}

.task-item.completed .task-text {
    text-decoration: line-through;
    color: var(--text-dim);
}
```

## Formularios de Entrada

```css
.add-task-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.add-task-form input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-light);
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
}

.add-task-form input:focus {
    outline: none;
    border-color: var(--accent);
}
```

## Botones

```css
.add-task-form button,
.more-info-btn {
    padding: 0.75rem 1.5rem;
    background: var(--gradient-1);
    border: none;
    border-radius: 10px;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(233, 69, 96, 0.4);
}
```

## Animaciones

```css
@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Animaciones escalonadas en tarjetas */
.life-card:nth-child(1) { animation-delay: 0.1s; }
.life-card:nth-child(2) { animation-delay: 0.2s; }
.life-card:nth-child(3) { animation-delay: 0.3s; }
.life-card:nth-child(4) { animation-delay: 0.4s; }
.life-card:nth-child(5) { animation-delay: 0.5s; }
```

## Efectos de Fondo

```css
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(circle at 20% 80%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(15, 52, 96, 0.2) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}
```

## Convenciones de Código

### Comentarios en Funciones

Todas las funciones deben incluir comentarios que describan:
1. Propósito de la función
2. Parámetros esperados
3. Valor de retorno o efecto secundario

```javascript
/**
 * Carga todas las tareas desde la API y actualiza las categorías locales.
 * No recibe parámetros.
 * Actualiza el objeto 'categories' y re-renderiza el panel si está activo.
 */
async function loadAllData() { ... }

/**
 * Guarda una nueva tarea en la base de datos.
 * @param {string} category - Nombre de la categoría (ej: 'casa', 'gimnasio')
 * @param {string|null} subcategory - Subcategoría si existe, null si no
 * @param {string} text - Texto de la tarea a guardar
 */
async function saveTask(category, subcategory, text) { ... }
```

### Estructura de JavaScript

1. **Constantes al inicio**: APIs, selectores de DOM
2. **Variables de estado**: currentCategory, currentSubcategory
3. **Event listeners**: setup al inicio
4. **Funciones de carga**: loadAllData, fetch inicial
5. **Funciones de utilidad**: showPanel, toggleTask, etc.
6. **Handlers**: submit, click handlers

### Nomenclatura

- Funciones: camelCase con verbo descriptivo (`loadAllData`, `saveTask`, `toggleTask`)
- Variables de estado: nombres descriptivos (`currentCategory`, `currentSubcategory`)
- IDs de elementos: camelCase en JS, kebab-case en HTML
- Constantes: UPPER_SNAKE_CASE para valores que no cambian

### Estructura de HTML

```html
<!-- Contenedor principal de la aplicación -->
<div class="app-container">
    <!-- Encabezado con título y subtítulo -->
    <header class="header">...</header>

    <!-- Grid principal de tarjetas de categorías -->
    <main class="main-grid">
        <!-- Tarjeta individual de categoría -->
        <button class="life-card" data-category="casa">...</button>
    </main>

    <!-- Panel de contenido derecho (tareas y estadísticas) -->
    <section class="content-panel" id="contentPanel">...</section>

    <!-- Pie de página -->
    <footer class="footer">...</footer>
</div>
```

### Patrones Reutilizables

**Template para tarea:**
```javascript
const taskHTML = `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <div class="task-checkbox ${task.completed ? 'checked' : ''}">
            <i class="fas fa-check"></i>
        </div>
        <span class="task-text">${task.text}</span>
        <button class="task-delete" onclick="deleteTask(${task.id})">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;
```

**Template para estadísticas:**
```javascript
const statsHTML = `
    <div class="stats-section">
        <h3><i class="fas fa-chart-line"></i> Estadísticas</h3>
        ${Object.entries(data.stats).map(([label, value]) => `
            <div class="stat-row">
                <span class="stat-label">${label}</span>
                <span class="stat-value">${value}</span>
            </div>
        `).join('')}
    </div>
`;
```

## Responsive Design

```css
@media (max-width: 600px) {
    .app-container { padding: 1rem; }
    .header h1 { font-size: 1.8rem; }
    .main-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .card-icon { width: 60px; height: 60px; font-size: 1.5rem; }
}
```

## Uso del Skill

Cuando el usuario pida:
- Aplicar el estilo de vida-app a otros componentes
- Crear nuevas tarjetas o paneles
- Mantener consistencia visual con el proyecto
- Agregar animaciones o transiciones
- Crear formularios de entrada de datos

Siempre usar las variables CSS definidas, los radios especificados, y seguir las convenciones de comentarios.