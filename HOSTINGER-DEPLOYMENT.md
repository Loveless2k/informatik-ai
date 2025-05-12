# Guía de Despliegue en Hostinger

Esta guía proporciona instrucciones paso a paso para desplegar el sitio estático de Informatik-AI en Hostinger.

## Requisitos Previos

- Una cuenta de Hostinger con un plan de hosting
- Acceso FTP o al Administrador de Archivos de Hostinger
- El sitio estático generado (carpeta `out`)

## Paso 1: Generar el Sitio Estático

1. Clona el repositorio:
   ```
   git clone https://github.com/Loveless2k/informatik-ai.git
   cd informatik-ai
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Genera el sitio estático:
   ```
   npm run build
   ```
   
   O utiliza el script de despliegue proporcionado:
   ```
   deploy-static.bat
   ```

4. El sitio estático se generará en la carpeta `out`.

## Paso 2: Preparar los Archivos para Hostinger

1. Asegúrate de que el archivo `.htaccess` esté incluido en la carpeta `out`. Este archivo es crucial para el enrutamiento correcto en Hostinger.

2. Verifica que todos los archivos estáticos (HTML, CSS, JS, imágenes) estén presentes en la carpeta `out`.

## Paso 3: Subir los Archivos a Hostinger

### Opción 1: Usando el Administrador de Archivos de Hostinger

1. Inicia sesión en tu panel de control de Hostinger.

2. Navega a "Hosting" > Tu dominio > "Administrador de Archivos".

3. Navega a la carpeta `public_html` (o la carpeta donde quieras alojar tu sitio).

4. Si hay archivos existentes que quieres reemplazar, considera hacer una copia de seguridad primero.

5. Haz clic en "Subir" y selecciona todos los archivos y carpetas de la carpeta `out` de tu proyecto.

6. Espera a que se completen todas las subidas.

### Opción 2: Usando FTP

1. Utiliza un cliente FTP como FileZilla, WinSCP o similar.

2. Conéctate a tu servidor de Hostinger usando las credenciales FTP proporcionadas en tu panel de control.

3. Navega a la carpeta `public_html` en el servidor.

4. Arrastra y suelta todos los archivos y carpetas de la carpeta `out` de tu proyecto a la carpeta `public_html` del servidor.

5. Espera a que se completen todas las transferencias.

## Paso 4: Configurar el Dominio (si es necesario)

1. Si aún no has configurado tu dominio, ve a "Dominios" en tu panel de control de Hostinger.

2. Sigue las instrucciones para apuntar tu dominio a tu hosting.

## Paso 5: Verificar la Configuración

1. Asegúrate de que el archivo `.htaccess` se haya subido correctamente. Este archivo es crucial para el enrutamiento de la aplicación.

2. Verifica que todos los archivos y carpetas se hayan subido correctamente.

## Paso 6: Probar el Sitio

1. Visita tu sitio web usando tu dominio.

2. Prueba la navegación entre páginas para asegurarte de que el enrutamiento funciona correctamente.

3. Verifica que todos los recursos (imágenes, estilos, scripts) se carguen correctamente.

4. Prueba el formulario de contacto y otras funcionalidades interactivas.

## Solución de Problemas Comunes

### Problema: Errores 404 al Refrescar Páginas

**Solución**: Verifica que el archivo `.htaccess` se haya subido correctamente y que el módulo `mod_rewrite` esté habilitado en tu hosting de Hostinger. El archivo `.htaccess` incluido en este proyecto está configurado para redirigir todas las solicitudes a `index.html`, lo que permite que el enrutamiento del lado del cliente funcione correctamente.

### Problema: Recursos No Encontrados (CSS, JS, Imágenes)

**Solución**: Verifica que todas las carpetas y archivos se hayan subido correctamente. Comprueba las rutas en el código HTML para asegurarte de que sean correctas.

### Problema: El Formulario de Contacto No Funciona

**Solución**: Como este es un sitio estático, el formulario de contacto necesita un servicio externo para funcionar. Considera usar:

1. **Formspree**: Un servicio gratuito para formularios estáticos.
   - Regístrate en [Formspree](https://formspree.io/)
   - Actualiza la acción del formulario con tu endpoint de Formspree

2. **Script PHP en Hostinger**: Crea un script PHP simple para manejar el envío del formulario.
   ```php
   <?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $name = strip_tags(trim($_POST["name"]));
       $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
       $message = trim($_POST["message"]);
       
       // Configura el destinatario y el asunto
       $recipient = "tu@email.com";
       $subject = "Nuevo mensaje de contacto de $name";
       
       // Construye el cuerpo del email
       $email_content = "Nombre: $name\n";
       $email_content .= "Email: $email\n\n";
       $email_content .= "Mensaje:\n$message\n";
       
       // Construye los encabezados del email
       $email_headers = "From: $name <$email>";
       
       // Envía el email
       mail($recipient, $subject, $email_content, $email_headers);
       
       // Redirige a una página de agradecimiento
       header("Location: /gracias.html");
       exit;
   }
   ?>
   ```

## Mantenimiento y Actualizaciones

Para actualizar tu sitio:

1. Realiza los cambios necesarios en el código fuente.
2. Genera una nueva versión estática con `npm run build`.
3. Sube los archivos actualizados a Hostinger siguiendo los pasos anteriores.

## Optimización Adicional

1. **Habilita GZIP**: Asegúrate de que la compresión GZIP esté habilitada en tu hosting de Hostinger para mejorar el rendimiento.

2. **Configura el Caché del Navegador**: El archivo `.htaccess` incluido ya contiene reglas para el caché del navegador, pero puedes ajustarlas según tus necesidades.

3. **Optimiza Imágenes**: Considera usar herramientas como [TinyPNG](https://tinypng.com/) para optimizar aún más tus imágenes.

4. **Configura SSL**: Habilita HTTPS en tu sitio a través del panel de control de Hostinger para mejorar la seguridad y el SEO.

## Recursos Adicionales

- [Documentación de Hostinger](https://www.hostinger.es/tutoriales/)
- [Guía de Solución de Problemas de Hostinger](https://www.hostinger.es/base-de-conocimiento)
- [Optimización de Sitios Web en Hostinger](https://www.hostinger.es/tutoriales/optimizar-sitio-web)
