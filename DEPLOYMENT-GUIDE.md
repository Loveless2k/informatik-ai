# 🚀 GUÍA DE DEPLOYMENT - INFORMATIK-AI

## 📋 **CHECKLIST PRE-PRODUCCIÓN**

### ✅ **Completado:**
- [x] Sistema de calendario público funcional
- [x] Panel de administración con autenticación Google OAuth
- [x] Validaciones de fechas pasadas
- [x] Modales elegantes (sin alerts)
- [x] Integración con Make.com
- [x] Limpieza automática de datos
- [x] Seguridad: Solo camidevai@gmail.com puede administrar
- [x] Responsive design
- [x] Manejo de errores robusto

### ⚠️ **Pendiente de Configuración:**
- [ ] Variables de entorno de producción
- [ ] Configuración de Google Cloud Console
- [ ] Configuración de EmailJS
- [ ] Configuración de Make.com webhook
- [ ] Dominio y hosting

---

## 🔧 **CONFIGURACIÓN DE PRODUCCIÓN**

### **1. Variables de Entorno**
```bash
# Copiar .env.production.example como .env.local
cp .env.production.example .env.local

# Actualizar las siguientes variables:
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_real
GOOGLE_CLIENT_SECRET=tu_client_secret_real
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=https://tu-dominio.com/admin-calendario
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_emailjs_key_real
NEXT_PUBLIC_MAKE_WEBHOOK_URL=tu_webhook_real
```

### **2. Google Cloud Console**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Navega a APIs & Services → Credentials
3. Edita tu OAuth 2.0 Client ID
4. Agrega a "Authorized redirect URIs":
   ```
   https://tu-dominio.com/admin-calendario
   ```

### **3. Build y Deploy**
```bash
# Instalar dependencias
npm install

# Build para producción
npm run build

# Iniciar en producción
npm start
```

---

## 🎯 **FUNCIONALIDADES PRINCIPALES**

### **Calendario Público** (`/calendario`)
- ✅ Visualización de horarios disponibles
- ✅ Formulario de reserva con validaciones
- ✅ Integración con Make.com
- ✅ Selección de servicios (dropdown)
- ✅ Validación de "Otro tema"

### **Panel Admin** (`/admin-calendario`)
- ✅ Autenticación Google OAuth real
- ✅ Restricción a camidevai@gmail.com únicamente
- ✅ Creación/edición de horarios
- ✅ Validación de fechas pasadas
- ✅ Limpieza automática de datos obsoletos
- ✅ Botón manual de limpieza

### **APIs**
- ✅ `/api/calendar-data` - CRUD de horarios
- ✅ `/api/auth/google` - Autenticación OAuth
- ✅ Validación de permisos en backend

---

## 🔐 **SEGURIDAD IMPLEMENTADA**

### **Autenticación**
- ✅ Google OAuth real (no simulado)
- ✅ Verificación de email en frontend y backend
- ✅ Solo camidevai@gmail.com puede administrar

### **Validaciones**
- ✅ Fechas pasadas no permitidas
- ✅ Duración mínima de 15 minutos
- ✅ Validación de formularios
- ✅ Sanitización de datos

### **APIs**
- ✅ Verificación de permisos en todas las rutas
- ✅ Manejo de errores robusto
- ✅ Validación de datos de entrada

---

## 📱 **RUTAS PRINCIPALES**

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Página principal | ✅ |
| `/calendario` | Calendario público | ✅ |
| `/admin-calendario` | Panel administración | ✅ |
| `/about` | Sobre nosotros | ✅ |
| `/services` | Servicios | ✅ |
| `/contact` | Contacto | ✅ |

---

## 🚨 **CONSIDERACIONES IMPORTANTES**

### **Antes del Deploy:**
1. ⚠️ Actualizar TODAS las variables de entorno
2. ⚠️ Configurar Google Cloud Console con dominio real
3. ⚠️ Probar autenticación en entorno de producción
4. ⚠️ Verificar que Make.com webhook funcione
5. ⚠️ Cambiar `PRENDER_Y_APAGAR_PAGINA=ON`

### **Después del Deploy:**
1. ✅ Probar flujo completo de reserva
2. ✅ Probar autenticación de admin
3. ✅ Verificar que lleguen emails
4. ✅ Probar en diferentes dispositivos

---

## 🎉 **ESTADO ACTUAL: LISTO PARA PRODUCCIÓN**

El sistema está técnicamente completo y listo para deployment. Solo faltan las configuraciones específicas de producción (variables de entorno, dominios, etc.).
