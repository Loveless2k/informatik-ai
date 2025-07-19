# 🔗 Configuración de Make.com para Google Calendar

## 🎯 Objetivo
Configurar Make.com para que cuando alguien haga una reserva en el calendario público:
1. Se cree automáticamente un evento en tu Google Calendar
2. Se envíe un email de confirmación al cliente
3. Se te notifique por email de la nueva reserva

## 📋 Pasos de Configuración

### 1. Crear Cuenta en Make.com
1. Ve a: https://make.com
2. Crea una cuenta gratuita (si no tienes)
3. Verifica tu email

### 2. Crear Nuevo Escenario
1. En el dashboard, haz clic en **"Create a new scenario"**
2. Nombra el escenario: `Informatik-AI Calendar Integration`

### 3. Configurar Webhook (Trigger)

#### Paso 3.1: Agregar Webhook
1. Busca **"Webhooks"** en la lista de apps
2. Selecciona **"Custom webhook"**
3. Haz clic en **"Add"**
4. Copia la URL del webhook (algo como: `https://hook.make.com/abc123...`)

#### Paso 3.2: Configurar el Webhook
1. **Name**: `Informatik Calendar Booking`
2. **Data structure**: Dejar en automático
3. Guardar

### 4. Conectar Google Calendar

#### Paso 4.1: Agregar Módulo de Google Calendar
1. Haz clic en el **"+"** después del webhook
2. Busca **"Google Calendar"**
3. Selecciona **"Create an Event"**

#### Paso 4.2: Conectar tu Cuenta de Google
1. Haz clic en **"Add"** junto a Connection
2. Autoriza el acceso a tu Google Calendar
3. Selecciona tu cuenta `camidevai@gmail.com`

#### Paso 4.3: Configurar el Evento
Mapea los campos así:

```
Calendar ID: primary (tu calendario principal)
Summary: {{client.name}} - {{meeting.topic}}
Description: 
Reunión con {{client.name}} de {{client.company}}

Tema: {{meeting.topic}}
Email: {{client.email}}
Teléfono: {{client.phone}}
Mensaje: {{meeting.message}}

---
Reserva realizada desde: informatik-ai.com
```

```
Start Date: {{meeting.startDateTime}}
End Date: {{meeting.endDateTime}}
Time Zone: America/Santiago
```

```
Attendees: {{client.email}}
```

### 5. Configurar Email al Cliente

#### Paso 5.1: Agregar Módulo de Email
1. Haz clic en **"+"** después de Google Calendar
2. Busca **"Email"**
3. Selecciona **"Send an Email"**

#### Paso 5.2: Configurar Email de Confirmación
```
To: {{client.email}}
Subject: ✅ Confirmación de Reunión - Informatik-AI - {{meeting.dateFormatted}}

Body:
Hola {{client.name}},

¡Gracias por reservar una reunión con Informatik-AI!

📅 DETALLES DE TU REUNIÓN:
• Fecha: {{meeting.dateFormatted}}
• Hora: {{meeting.startTime}} - {{meeting.endTime}} (Chile)
• Tema: {{meeting.topic}}
• Duración: 30 minutos

🔔 PRÓXIMOS PASOS:
• Recibirás una invitación de Google Calendar
• Te contactaremos 24 horas antes para confirmar
• Si necesitas cambios, responde a este email

📞 CONTACTO:
• Email: info@informatik-ai.com
• Web: https://informatik-ai.com

¡Esperamos conocerte pronto!

Saludos,
Equipo Informatik-AI

---
Esta es una confirmación automática. Si no solicitaste esta reunión, por favor ignora este mensaje.
```

### 6. Configurar Email de Notificación (Para Ti)

#### Paso 6.1: Agregar Otro Módulo de Email
1. Haz clic en **"+"** después del email anterior
2. Busca **"Email"**
3. Selecciona **"Send an Email"**

#### Paso 6.2: Configurar Notificación para Ti
```
To: camidevai@gmail.com
Subject: 🗓️ Nueva Reserva - {{client.name}} - {{meeting.dateFormatted}}

Body:
🎉 NUEVA RESERVA EN CALENDARIO INFORMATIK-AI

👤 INFORMACIÓN DEL CLIENTE:
• Nombre: {{client.name}}
• Email: {{client.email}}
• Teléfono: {{client.phone}}
• Empresa: {{client.company}}

📅 DETALLES DE LA REUNIÓN:
• Fecha: {{meeting.dateFormatted}}
• Hora: {{meeting.startTime}} - {{meeting.endTime}}
• Tema: {{meeting.topic}}
• Mensaje: {{meeting.message}}

✅ ACCIONES REALIZADAS:
• Evento creado en Google Calendar
• Email de confirmación enviado al cliente

🔗 GESTIONAR:
• Ve a tu Google Calendar para más detalles
• Panel admin: https://informatik-ai.com/admin-calendario

---
Generado automáticamente desde: informatik-ai.com/calendario
```

### 7. Probar el Escenario

#### Paso 7.1: Activar el Escenario
1. Haz clic en el botón **"ON"** en la esquina inferior izquierda
2. El escenario debe estar activo (verde)

#### Paso 7.2: Obtener URL del Webhook
1. Haz clic en el módulo webhook
2. Copia la URL completa
3. Pégala en tu archivo `.env.local`:

```env
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.make.com/tu-url-real-aqui
```

### 8. Configurar Variables de Entorno

En tu archivo `.env.local`, actualiza:

```env
# Make.com Integration
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.make.com/abc123def456...
```

### 9. Probar la Integración

#### Paso 9.1: Prueba desde el Calendario
1. Ve a: `http://localhost:3000/calendario`
2. Haz una reserva de prueba
3. Verifica que:
   - ✅ Aparece el evento en tu Google Calendar
   - ✅ Recibes email de notificación
   - ✅ El cliente recibe email de confirmación

#### Paso 9.2: Monitorear en Make
1. Ve a tu escenario en Make.com
2. Revisa el historial de ejecuciones
3. Verifica que no hay errores

## 🔧 Solución de Problemas

### Error: "Webhook URL not configured"
- Verifica que la URL esté en `.env.local`
- Reinicia el servidor de desarrollo

### Error: "Google Calendar connection failed"
- Reconecta tu cuenta de Google en Make
- Verifica permisos de calendario

### Emails no llegan
- Revisa la carpeta de spam
- Verifica las direcciones de email en Make

### Evento no se crea en Google Calendar
- Verifica que el calendario esté seleccionado
- Revisa el formato de fechas en Make

## 📊 Monitoreo

### En Make.com:
- Ve al historial de ejecuciones
- Revisa logs de errores
- Monitorea uso mensual

### En Google Calendar:
- Verifica que los eventos se crean correctamente
- Revisa que las invitaciones se envían

## 🚀 Próximos Pasos

Una vez funcionando, puedes agregar:
- Recordatorios automáticos 24h antes
- Encuestas post-reunión
- Integración con CRM
- Métricas de reservas

## 💡 Tips

- **Prueba primero** con datos de prueba
- **Usa filtros** en Make para validar datos
- **Configura alertas** para errores
- **Documenta** cualquier personalización
