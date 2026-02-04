# INDIEC - Plataforma de Música Independiente

Frontend del proyecto INDIEC, diseñado bajo una **arquitectura avanzada de Micro-Frontends**, aplicando **Clean Architecture** como patrón de organización interna en cada módulo.

### Decisión Arquitectónica

Se adopta **Micro-Frontends** como arquitectura del frontend para permitir
la división del sistema por dominios funcionales, facilitando el trabajo en equipo,
la escalabilidad y el desacoplamiento entre módulos.

Dentro de cada micro-frontend se aplica **Clean Architecture** como patrón
de organización del código, sin afectar la arquitectura general del sistema.

---

##  Arquitectura

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

##  Estructura del Proyecto

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

##  Instalación y Ejecución

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

El proyecto necesita configurar la URL del backend para funcionar correctamente.

**Paso 1:** Copiar el archivo de ejemplo
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

**Paso 2:** Verificar que `.env` contenga:
```env
VITE_API_URL=http://localhost:9000
```

**Nota:** El archivo `.env` es personal y NO se sube a GitHub (está en `.gitignore`).

---

##  Conectar con el Backend

El frontend consume el backend de INDIEC que debe estar corriendo en `http://localhost:9000`.

### Iniciar el Backend
```bash
# En el repositorio del backend (jorgeminda-indiec)
node root/index.js
```

Deberías ver: ` API escuchando en http://localhost:9000`

### Endpoints Disponibles

El servicio API centralizado (`src/shared/services/api.ts`) permite consumir los siguientes endpoints:

| Módulo | Endpoint | Métodos |
|--------|----------|---------|
| Artistas | `/artista` | GET, POST, PUT, DELETE |
| Canciones | `/cancion` | GET, POST, PUT, DELETE |
| Álbumes | `/album` | GET, POST, PUT, DELETE |
| Eventos | `/evento` | GET, POST, PUT, DELETE |
| Tienda (Ropa) | `/ropa` | GET, POST, PUT, DELETE |
| Carrito | `/carrito` | GET, POST, PUT, DELETE |
| Clientes | `/cliente` | GET, POST, PUT, DELETE |
| Grupos Musicales | `/grupo-musical` | GET, POST, PUT, DELETE |
| Managers | `/manager` | GET, POST, PUT, DELETE |
| Autenticación | `/auth` | POST (login, register) |
| Auxiliares | `/auxiliares` | GET, POST |

### Uso del Servicio API
```typescript
import { api } from '@/shared/services/api';

// GET - Obtener todos los registros
const canciones = await api.get('/cancion');

// GET - Obtener por ID
const cancion = await api.get('/cancion/123');

// GET - Con parámetros
const filtradas = await api.get('/cancion', { genero: 'rock' });

// POST - Crear
const nueva = await api.post('/cancion', {
  titulo: 'Mi Canción',
  artista: 'Artista ID',
  duracion: 180
});

// PUT - Actualizar
const actualizada = await api.put('/cancion/123', {
  titulo: 'Título Actualizado'
});

// DELETE - Eliminar
await api.delete('/cancion/123');
```

**Importante:** Todas las llamadas manejan automáticamente:
- Headers de `Content-Type: application/json`
- Tokens de autenticación (si existen en `localStorage`)
- Manejo de errores centralizado


---

##  Flujo de Trabajo con Git

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



### Componentes Compartidos

```typescript
import { Button, Card, Input, Modal } from '@/shared/ui';

// Uso
<Button variant="primary" size="md">Click me</Button>
<Card>Contenido</Card>
<Input label="Email" placeholder="email@example.com" />
```

---

## Tecnologías

- **React 18** + TypeScript
- **Vite** (build tool)
- **React Router** (navegación)
- **Clean Architecture** (organización)
- **Micro-Frontends** (arquitectura)

---

## Recursos

- [Documentación de React](https://react.dev)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Micro-Frontends](https://micro-frontends.org/)

---

##  Contribuir

1. Crea tu rama desde `main`
2. Desarrolla tu módulo siguiendo Clean Architecture
3. Usa componentes compartidos de `shared/ui`
4. Haz commit con convenciones
5. Crea un Pull Request

---

## Notas Importantes

- **NO modificar** carpetas de otros módulos
- **Usar componentes compartidos** de `shared/ui`
- **Seguir la paleta de colores** definida
- **Aplicar Clean Architecture** en tu módulo
- **Probar localmente** antes de hacer push

---

