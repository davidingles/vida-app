# vida-app

Aplicación web para gestionar y organizar diferentes aspectos de la vida cotidiana: hogar, vehículos, trabajo, religión, gimnasio, familia, bancos y desarrollo personal.

## Características

- **Gestión de categorías**: 8 categorías principales con subcategorías
- **Sistema de tareas**: Agregar, completar y eliminar tareas
- **Estadísticas en tiempo real**: Progreso por categoría
- **Diseño moderno**: Interfaz oscura con gradientes y animaciones
- **Persistencia**: Datos guardados en SQLite
- **API REST**: Backend con Express.js

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Uso

```bash
npm start
```

Abre http://localhost:3000 en tu navegador.

## Estructura del Proyecto

```
vida-app/
├── index.html      # Página principal
├── app.js          # Lógica de la aplicación
├── styles.css      # Estilos CSS
├── server.js       # Backend Express con SQLite
├── package.json    # Dependencias
├── .gitignore      # Archivos ignorados
└── vida.db         # Base de datos SQLite (generada automáticamente)
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api` | Obtener todas las tareas |
| POST | `/api` | Crear nueva tarea |
| PUT | `/api/:id` | Actualizar tarea |
| DELETE | `/api/:id` | Eliminar tarea |

### Ejemplo de tarea

```json
{
  "category": "casa",
  "subcategory": null,
  "text": "Limpiar la casa"
}
```

## Estilo Visual

El proyecto usa un esquema de colores oscuro con acentos rosa-rojo:

- **Fondo principal**: `#1a1a2e`
- **Acento**: `#e94560`
- **Gradiente**: `linear-gradient(135deg, #e94560, #0f3460)`
- **Tipografía**: Poppins (Google Fonts)
- **Bordes redondeados**: 20px en tarjetas, 12px en botones

## Categorías Disponibles

1. **Casa** - Hogar y familia
2. **Vehículos** - Coche y moto (con subcategorías)
3. **Trabajo** - Devs, Portero, Auxiliar (con subcategorías)
4. **Religión** - Fe y espiritualidad
5. **Gimnasio** - Salud y fitness
6. **Familia** - Familia y seres queridos
7. **Bancos** - Finanzas y cuentas
8. **Devs** - Desarrollo y tecnología

## Desarrollo

Para modificar el proyecto:

1. Los estilos están en `styles.css`
2. La lógica de negocio está en `app.js`
3. El backend está en `server.js`
4. El skill de estilo en `.opencode/skills/vida-app-style/SKILL.md`

## Licencia

MIT