# InformatiK-AI Website

Este es el sitio web oficial de InformatiK-AI, una empresa especializada en soluciones de inteligencia artificial para empresas.

## 🚀 Estado de Refactorización

### FASE 1 - LIMPIEZA Y CONFIGURACIÓN ⏳ (EN PROGRESO)
- [ ] Eliminar código del widget fallido de Botsonic
- [ ] Configurar TypeScript en modo estricto
- [ ] Instalar y configurar ESLint y Prettier
- [ ] Limpiar imports no utilizados y código muerto

### FASE 2 - REFACTORIZACIÓN DE COMPONENTES CRÍTICOS 📋 (PENDIENTE)
- [ ] Refactorizar HeroSection.tsx
- [ ] Centralizar lógica de tema
- [ ] Unificar sistema de botones
- [ ] Implementar tests básicos

### FASE 3 - OPTIMIZACIÓN Y ESTRUCTURA 🎯 (PENDIENTE)
- [ ] Migrar a estructura features-based
- [ ] Implementar optimizaciones de rendimiento
- [ ] Configurar Storybook
- [ ] Establecer métricas de calidad

## 📊 Métricas Actuales

### Antes de la Refactorización
- Líneas de código duplicado: ~15%
- Componentes con >200 líneas: 3
- Cobertura de tests: 0%
- TypeScript strict: ❌

### Objetivos Post-Refactorización
- Líneas de código duplicado: <5%
- Componentes con >200 líneas: 0
- Cobertura de tests: >80%
- TypeScript strict: ✅

## 🛠️ Tecnologías

- **Framework**: Next.js 15.3.1
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Animaciones**: Framer Motion
- **Hosting**: Hostinger (Static)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
├── components/             # Componentes organizados por funcionalidad
│   ├── home/              # Componentes de la página principal
│   ├── layout/            # Componentes de layout (Header, Footer)
│   ├── ui/                # Componentes reutilizables
│   └── ...
├── context/               # Context providers
├── hooks/                 # Custom hooks
├── styles/                # Archivos CSS modulares
└── utils/                 # Utilidades
```

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Servir build estático
npm run start

# Linting (cuando esté configurado)
npm run lint

# Tests (cuando estén implementados)
npm run test
```

## 📝 Notas de Desarrollo

### Funcionalidad Crítica a Preservar
- **Chatbot en `/chatbot`**: Implementación funcional con iframe de Botsonic que debe mantenerse intacta
- **Configuración CSP**: Headers de seguridad para permitir Botsonic en `public/security-headers.js`

### Archivos Identificados para Eliminación
- `out/botsonic-test/` - Directorio de widget fallido
- `backup/` - Archivos de respaldo obsoletos
- Código comentado y imports no utilizados

## 🔧 Configuración de Desarrollo

### TypeScript
- Configuración actual: Modo permisivo
- Objetivo: Modo estricto con verificación completa de tipos

### ESLint & Prettier
- Estado: No configurado
- Objetivo: Configuración estricta con reglas para React/TypeScript

## 📈 Plan de Implementación

1. **Semana 1-2**: Limpieza y configuración básica
2. **Semana 3-4**: Refactorización de componentes críticos
3. **Semana 5-8**: Optimización y nueva estructura

## 🤝 Contribución

Este proyecto está en proceso de refactorización siguiendo las mejores prácticas de desarrollo moderno con React/TypeScript.
