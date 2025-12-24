# 🎵 INDIEC - Plataforma de Música Independiente

Frontend del proyecto INDIEC, diseñado bajo una **arquitectura avanzada de Micro-Frontends**, aplicando **Clean Architecture** como patrón de organización interna en cada módulo.

### Decisión Arquitectónica

Se adopta **Micro-Frontends** como arquitectura del frontend para permitir
la división del sistema por dominios funcionales, facilitando el trabajo en equipo,
la escalabilidad y el desacoplamiento entre módulos.

Dentro de cada micro-frontend se aplica **Clean Architecture** como patrón
de organización del código, sin afectar la arquitectura general del sistema.

---

## 🏗️ Arquitectura

### Micro-Frontends

El frontend está organizado en micro-frontends independientes, donde cada dominio funcional es autónomo:

- **Admin**: Panel de administración
- **Client**: Aplicación del usuario final

Cada micro-frontend aplica internamente **Clean Architecture**, garantizando:
- ✅ Escalabilidad
- ✅ Mantenibilidad
- ✅ Trabajo colaborativo sin conflictos
- ✅ Separación de responsabilidades

### Clean Architecture (por módulo)

```
songs/
├─ domain/          # Entidades y reglas de negocio
├─ application/     # Casos de uso
├─ infrastructure/  # Implementaciones (API, DB)
└─ presentation/    # UI (pages, components)
```

---

## 📁 Estructura del Proyecto

```
indiec-frontend/
├─ src/
│  ├─ apps/
│  │  ├─ shell/              # App contenedora
│  │  ├─ admin/              # Micro-frontend Admin
│  │  │  ├─ artists/         # Gestión de artistas
│  │  │  ├─ songs/           # Gestión de canciones
│  │  │  ├─ events/          # Gestión de eventos
│  │  │  ├─ store/           # Gestión de tienda
│  │  │  ├─ users/           # Usuarios y roles
│  │  │  └─ dashboard/       # Dashboard
│  │  └─ client/             # Micro-frontend Cliente
│  │     ├─ home/            # Página principal
│  │     ├─ artists/         # Catálogo de artistas
│  │     ├─ songs/           # Catálogo de canciones
│  │     └─ store/           # Tienda
│  │
│  └─ shared/                # Recursos compartidos
│     ├─ ui/                 # Componentes reutilizables
│     ├─ theme/              # Paleta de colores
│     ├─ styles/             # Estilos globales
│     └─ services/           # Servicios HTTP
```

---

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPO>
cd indiec-frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Variables de entorno

Crear archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 👥 División de Módulos

| Integrante | Módulo | Ruta |
|------------|--------|------|
| Ariana Villegas | Gestión de Artistas (Admin) | `/admin/artists` |
| Jean Carlos Coavoy | Gestión de Canciones (Admin) | `/admin/songs` |
| Josue Guallisaca | Gestión de Eventos (Admin) | `/admin/events` |
| Dillan Alvarez | Gestión de Tienda + Catálogos (Admin) | `/admin/store`, `/admin/catalogs` |
| Michael Sarche | Usuarios y Roles (Admin) | `/admin/users` |
| Jhonatan Valencia | Dashboard (Admin) | `/admin/dashboard` |
| Dennis Villacis | Configuraciones (Admin) | `/admin/settings` |
| Jorge Minda | Home + Búsqueda (Cliente) | `/client/home`, `/client/search` |
| Jonathan Chicaiza | Artistas (Cliente) | `/client/artists` |
| Matías Alcívar | Canciones (Cliente) | `/client/songs` |
| Santiago Alomoto | Tienda (Cliente) | `/client/store` |

---

## 🔀 Flujo de Trabajo con Git

### Crear tu rama

```bash
# Formato: feature/modulo-nombre
git checkout -b feature/songs-client-matias
```

### Convenciones de commits

```bash
# Formato: tipo(módulo): descripción
git commit -m "feat(songs): add song list page"
git commit -m "fix(songs): correct filter logic"
git commit -m "style(songs): improve card design"
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de error
- `style`: Cambios de diseño/estilo
- `refactor`: Refactorización de código
- `docs`: Documentación

### Integrar cambios

```bash
git add .
git commit -m "feat(songs): implement song catalog with filters"
git push origin feature/songs-client-matias
```

---

## 🎨 Guía de Diseño

### Paleta de Colores

```typescript
primary: '#8B5CF6'      // Púrpura vibrante
secondary: '#EC4899'    // Rosa indie
accent: '#10B981'       // Verde
background: '#0F172A'   // Fondo oscuro
text: '#F1F5F9'         // Texto claro
```

### Componentes Compartidos

```typescript
import { Button, Card, Input, Modal } from '@/shared/ui';

// Uso
<Button variant="primary" size="md">Click me</Button>
<Card>Contenido</Card>
<Input label="Email" placeholder="email@example.com" />
```

---

## 📦 Tecnologías

- **React 18** + TypeScript
- **Vite** (build tool)
- **React Router** (navegación)
- **Clean Architecture** (organización)
- **Micro-Frontends** (arquitectura)

---

## 📖 Recursos

- [Documentación de React](https://react.dev)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Micro-Frontends](https://micro-frontends.org/)

---

## 🤝 Contribuir

1. Crea tu rama desde `main`
2. Desarrolla tu módulo siguiendo Clean Architecture
3. Usa componentes compartidos de `shared/ui`
4. Haz commit con convenciones
5. Crea un Pull Request

---

## 📝 Notas Importantes

- ⚠️ **NO modificar** carpetas de otros módulos
- ⚠️ **Usar componentes compartidos** de `shared/ui`
- ⚠️ **Seguir la paleta de colores** definida
- ⚠️ **Aplicar Clean Architecture** en tu módulo
- ⚠️ **Probar localmente** antes de hacer push

---

