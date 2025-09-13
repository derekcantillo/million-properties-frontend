# Million Properties Frontend

Un proyecto de prueba técnica desarrollado con Next.js 15, React 19, y TypeScript. Esta aplicación de bienes raíces demuestra mejores prácticas de desarrollo frontend con una arquitectura robusta, testing integral, y configuraciones listas para producción.

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 con App Router y Turbopack
- **Lenguaje**: TypeScript con configuración estricta
- **Estilos**: Tailwind CSS 4
- **Gestión de Estado**: Zustand
- **Fetching de Datos**: TanStack Query (React Query)
- **Formularios**: React Hook Form + Zod para validación
- **Testing**: Vitest + Testing Library + Playwright
- **Calidad de Código**: ESLint + Prettier + Husky
- **Internacionalización**: next-intl
- **Animaciones**: GSAP
- **Utilidades**: date-fns, lodash-es, axios

### Estructura del Proyecto

```
/
├── commitlint.config.js    # Configuración de commits convencionales
├── eslint.config.js        # Configuración de ESLint
├── next.config.ts          # Configuración de Next.js
├── package.json           # Dependencias y scripts
├── playwright.config.ts   # Configuración de Playwright
├── tsconfig.json          # Configuración de TypeScript
├── vitest.config.ts       # Configuración de Vitest
├── messages/              # Archivos de traducción
│   ├── en.json           # Traducciones en inglés
│   └── es.json           # Traducciones en español
├── public/               # Archivos estáticos
│   ├── assets/          # Assets multimedia
│   │   └── videos/      # Videos (hero.mp4)
│   └── fonts/           # Fuentes personalizadas (Cairo, Cinzel)
└── src/
    ├── middleware.ts         # Middleware de Next.js
    ├── api/                 # Cliente API y queries
    │   ├── client.ts        # Cliente HTTP (axios)
    │   ├── endpoints.ts     # URLs de endpoints
    │   ├── queryClient.ts   # Configuración de React Query
    │   ├── queryKeys.ts     # Claves de queries
    │   └── properties/      # API específica de propiedades
    ├── app/                 # App Router de Next.js
    │   ├── globals.css      # Estilos globales
    │   ├── layout.tsx       # Layout raíz
    │   └── [lang]/          # Rutas internacionalizadas
    │       ├── layout.tsx   # Layout con idioma
    │       ├── page.tsx     # Página principal
    │       └── property/    # Páginas de propiedades
    │           └── [slug]/  # Detalle de propiedad
    ├── components/          # Componentes reutilizables
    │   ├── ErrorBoundary.tsx
    │   ├── ThemeInitializer.tsx
    │   ├── layout/          # Componentes de layout
    │   │   ├── DynamicHeaderFilter/
    │   │   ├── FilterBar/
    │   │   ├── Footer/
    │   │   ├── Header/
    │   │   ├── MobileFilterModal/
    │   │   ├── Properties/
    │   │   └── PropertyDetail/
    │   ├── ui/              # Sistema de diseño
    │   │   ├── Button/
    │   │   ├── ErrorMessage/
    │   │   ├── ImageCarousel/
    │   │   ├── ImageCarouselModal/
    │   │   ├── ImageCollage/
    │   │   ├── Input/
    │   │   ├── SettingsDropdown/
    │   │   └── Typography/
    │   └── tests/           # Tests de componentes
    ├── hooks/               # Custom hooks
    │   ├── useInfiniteScroll/
    │   └── useIsMobile/
    ├── i18n/                # Configuración de internacionalización
    ├── lib/                 # Utilidades y configuraciones
    │   ├── i18n.ts          # Setup de i18n
    │   ├── theme-script.ts  # Script de tema
    │   ├── utils/           # Funciones utilitarias
    │   └── *.json           # Datos mock
    ├── providers/           # Context providers
    │   ├── QueryProvider.tsx
    │   └── ThemeProvider.tsx
    ├── stores/              # Stores de Zustand
    │   ├── usePropertiesStore.ts
    │   └── useThemeStore.ts
    ├── styles/              # Estilos adicionales
    │   ├── fonts.css
    │   └── components/
    └── test/                # Configuración de testing
```

## 🚀 Comenzar

### Prerequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

1. Clonar el repositorio

```bash
git clone <repository-url>
cd million-properties-frontend
```

2. Instalar dependencias

```bash
pnpm install
```

3. Variables de entorno

El proyecto incluye un archivo `.env` con las variables necesarias. **Nota**: Este archivo está incluido temporalmente en el repositorio únicamente para facilitar la evaluación de la prueba técnica. En un entorno real, este archivo no debería estar versionado.

4. Ejecutar el servidor de desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 🧪 Testing

### Tests Unitarios

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en modo watch
pnpm test:ui

# Ejecutar tests con coverage
pnpm test:coverage
```

### Tests E2E

```bash
# Ejecutar tests de Playwright
pnpm test:e2e

# Ejecutar tests E2E con UI
pnpm test:e2e:ui
```

## 🔧 Desarrollo

### Calidad de Código

```bash
# Lintear código
pnpm lint

# Formatear código
pnpm format

# Verificar tipos
pnpm type-check
```

### Git Hooks

Este proyecto usa Husky para git hooks:

- **pre-commit**: Ejecuta linting y formatting
- **commit-msg**: Valida mensajes de commit (conventional commits)

## 📦 Build & Deploy

### Build de Producción

```bash
pnpm build
pnpm start
```

### Despliegue

Este proyecto está desplegado y disponible en:

- **Frontend**: [https://million-properties-frontend-lfw9.vercel.app/es](https://million-properties-frontend-lfw9.vercel.app/es) (Vercel)
- **Backend API**: [https://api.derekcantillo.com/api/](https://api.derekcantillo.com/api/) (AWS)

## 🎨 Características del Proyecto

### Sistema de Diseño

- Componentes reutilizables con API consistente
- Soporte completo para TypeScript
- Características de accesibilidad
- Soporte para tema oscuro/claro
- Diseño responsive

### Funcionalidades Implementadas

- 🌐 Internacionalización (Español/Inglés)
- 🔍 Sistema de filtros avanzado
- 📱 Diseño responsive y mobile-first
- 🖼️ Carrusel de imágenes interactivo
- ♾️ Scroll infinito para propiedades
- 📊 Gestión de estado eficiente con Zustand
- ⚡ Optimizaciones de rendimiento con React Query

## 🔒 Seguridad y Rendimiento

- Validación de formularios con Zod
- Error boundaries para manejo graceful de errores
- Modo estricto de TypeScript habilitado
- Optimizaciones de Next.js 15 con Turbopack
- Optimización de imágenes automática
- Lazy loading de componentes

**Nota sobre variables de entorno**: El archivo `.env` está incluido en el repositorio únicamente para facilitar la evaluación de esta prueba técnica. En un proyecto real, las variables de entorno sensibles deben manejarse de forma segura y nunca versionarse.

## 🌟 Sobre esta Prueba Técnica

Este proyecto demuestra:

- **Arquitectura escalable**: Organización clara de código y separación de responsabilidades
- **Mejores prácticas**: Uso de TypeScript, testing, y herramientas de calidad
- **UX moderna**: Interfaz responsive con animaciones y feedback visual
- **Rendimiento**: Optimizaciones de carga y manejo eficiente de datos
- **Mantenibilidad**: Código limpio, documentado y bien estructurado

### 🚀 Demo en Vivo

- **Aplicación**: [https://million-properties-frontend-lfw9.vercel.app/es](https://million-properties-frontend-lfw9.vercel.app/es)
- **API Backend**: [https://api.derekcantillo.com/api/](https://api.derekcantillo.com/api/)

La aplicación está completamente funcional con datos reales y desplegada en infraestructura de producción.

## 📄 Licencia

Este proyecto es privado y está desarrollado para fines de evaluación técnica.
