# Configuración de Google Calendar API para Informatik-AI

## Paso 1: Configurar Google Cloud Console

### 1.1 Crear/Seleccionar Proyecto
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el ID del proyecto

### 1.2 Habilitar Google Calendar API
1. En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
2. Busca "Google Calendar API"
3. Haz clic en "Google Calendar API" y luego en "HABILITAR"

### 1.3 Configurar Pantalla de Consentimiento OAuth
1. Ve a "APIs y servicios" > "Pantalla de consentimiento de OAuth"
2. Selecciona "Externo" (para uso público) o "Interno" (solo para tu organización)
3. Completa la información requerida:
   - Nombre de la aplicación: "Informatik-AI Calendar"
   - Email de soporte del usuario: tu email
   - Logotipo de la aplicación: (opcional)
   - Dominios autorizados: tu dominio de producción
   - Email de contacto del desarrollador: tu email

### 1.4 Configurar Credenciales OAuth 2.0
1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "ID de cliente de OAuth 2.0"
3. Selecciona "Aplicación web"
4. Configura:
   - **Nombre**: Informatik-AI Calendar Client
   - **Orígenes de JavaScript autorizados**:
     - `http://localhost:3007` (desarrollo)
     - `https://tu-dominio.com` (producción)
   - **URIs de redirección autorizados**:
     - `http://localhost:3007/calendario-informatik-ai` (desarrollo)
     - `https://tu-dominio.com/calendario-informatik-ai` (producción)

5. Guarda las credenciales:
   - **Client ID**: Cópialo para usar en `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - **Client Secret**: Cópialo para usar en `GOOGLE_CLIENT_SECRET`

## Paso 2: Configurar Variables de Entorno

Actualiza tu archivo `.env.local`:

```env
# Google Calendar API Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3007/calendario-informatik-ai
```

**Para producción**, cambia la URI de redirección:
```env
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=https://tu-dominio.com/calendario-informatik-ai
```

## Paso 3: Configurar Scopes y Permisos

Los scopes configurados en la aplicación son:
- `https://www.googleapis.com/auth/calendar` - Acceso completo al calendario

### Permisos Requeridos
La aplicación necesita:
- Leer eventos existentes para verificar disponibilidad
- Crear nuevos eventos para las reservas
- Enviar invitaciones por email a los participantes

## Paso 4: Testing y Validación

### 4.1 Probar en Desarrollo
1. Inicia el servidor: `npm run dev -- -p 3007`
2. Ve a: `http://localhost:3007/calendario-informatik-ai`
3. Haz clic en "Conectar con Google Calendar"
4. Autoriza la aplicación
5. Prueba reservar un slot de tiempo

### 4.2 Verificar Funcionalidades
- ✅ Autenticación con Google
- ✅ Visualización de slots disponibles (19:00-21:00)
- ✅ Reserva de slots de 30 minutos
- ✅ Creación de eventos en Google Calendar
- ✅ Envío de invitaciones por email
- ✅ Verificación de disponibilidad en tiempo real

## Paso 5: Configuración de Producción

### 5.1 Actualizar Credenciales
1. En Google Cloud Console, actualiza las URIs autorizadas
2. Agrega tu dominio de producción
3. Actualiza las variables de entorno en tu servidor

### 5.2 Configurar HTTPS
- Google OAuth requiere HTTPS en producción
- Asegúrate de que tu dominio tenga SSL configurado

### 5.3 Verificación de Dominio
- Verifica la propiedad de tu dominio en Google Search Console
- Esto es requerido para aplicaciones OAuth públicas

## Características del Calendario

### Horarios Disponibles
- **Días**: Lunes a Viernes (días laborales)
- **Horario**: 19:00 - 21:00 hrs (Chile/Santiago)
- **Duración**: Slots de 30 minutos
- **Slots por día**: 4 slots máximo

### Funcionalidades
- Selección de fecha (próximos 14 días laborales)
- Visualización de slots disponibles/ocupados
- Formulario de reserva con validaciones
- Integración automática con Google Calendar
- Notificaciones por email (24h y 30min antes)
- Responsive design para móviles

### Datos Recopilados
- Nombre completo
- Email (requerido para invitación)
- Teléfono (opcional)
- Empresa (opcional)
- Tema de la reunión
- Mensaje adicional

## Solución de Problemas

### Error: "Invalid client"
- Verifica que el Client ID sea correcto
- Asegúrate de que el dominio esté autorizado

### Error: "Redirect URI mismatch"
- Verifica que la URI de redirección coincida exactamente
- Incluye el protocolo (http/https)

### Error: "Access denied"
- El usuario canceló la autorización
- Verifica los scopes solicitados

### Error: "Calendar API not enabled"
- Habilita la Google Calendar API en Cloud Console
- Espera unos minutos para que se propague

## Seguridad

### Mejores Prácticas
- Nunca expongas el Client Secret en el frontend
- Usa HTTPS en producción
- Implementa rate limiting en las APIs
- Valida todos los datos de entrada
- Maneja errores de manera segura

### Tokens de Acceso
- Los tokens se almacenan en localStorage
- Se renuevan automáticamente cuando expiran
- Se pueden revocar desde la configuración de Google

## Mantenimiento

### Monitoreo
- Revisa los logs de Google Cloud Console
- Monitorea las cuotas de API
- Verifica el estado de los servicios

### Actualizaciones
- Mantén las dependencias actualizadas
- Revisa cambios en la API de Google Calendar
- Prueba regularmente la funcionalidad

---

## Contacto y Soporte

Para problemas técnicos o preguntas sobre la implementación, contacta al equipo de desarrollo de Informatik-AI.
