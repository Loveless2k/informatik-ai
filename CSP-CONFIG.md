# Content Security Policy Configuration

## Problema
La aplicación necesita conectarse a EmailJS (`https://api.emailjs.com`) para enviar emails, pero la Content Security Policy está bloqueando estas conexiones.

## Solución

### Para Apache (.htaccess)
Agrega esto a tu archivo `.htaccess` en la raíz del sitio web:

```apache
<IfModule mod_headers.c>
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
</IfModule>
```

### Para Nginx
Agrega esto a tu configuración de Nginx:

```nginx
server {
    # ... otras configuraciones ...
    
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" always;
}
```

### Para Netlify
Crea un archivo `_headers` en la carpeta `public/`:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```

### Para Vercel
Crea un archivo `vercel.json` en la raíz del proyecto:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
        }
      ]
    }
  ]
}
```

### Para GitHub Pages
GitHub Pages no permite configurar headers personalizados. Como alternativa, puedes:

1. **Usar un meta tag** (menos seguro pero funcional):
   Agrega esto al `<head>` de tu HTML:
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests">
   ```

2. **Usar un proxy** o **API route** en lugar de llamar directamente a EmailJS

## Explicación de las directivas CSP

- `default-src 'self'`: Por defecto, solo permite recursos del mismo origen
- `script-src 'self' 'unsafe-eval' 'unsafe-inline'`: Permite scripts del mismo origen, eval y scripts inline
- `style-src 'self' 'unsafe-inline'`: Permite estilos del mismo origen y estilos inline
- `img-src 'self' data: blob: https:`: Permite imágenes del mismo origen, data URLs, blob URLs y HTTPS
- `font-src 'self' data:`: Permite fuentes del mismo origen y data URLs
- `connect-src 'self' https://api.emailjs.com`: **CLAVE** - Permite conexiones al mismo origen y a EmailJS
- `frame-src 'self'`: Permite iframes del mismo origen
- `object-src 'none'`: No permite objetos embebidos
- `base-uri 'self'`: Solo permite base URLs del mismo origen
- `form-action 'self'`: Solo permite envío de formularios al mismo origen
- `frame-ancestors 'none'`: Previene que la página sea embebida en iframes
- `upgrade-insecure-requests`: Actualiza automáticamente HTTP a HTTPS

## Verificación

Después de aplicar la configuración:

1. Abre las herramientas de desarrollador del navegador
2. Ve a la pestaña "Console"
3. Intenta enviar un formulario
4. No deberías ver errores de CSP relacionados con EmailJS

## Nota importante

Si estás desplegando en un servicio que no permite configurar headers (como GitHub Pages), considera usar una alternativa como:
- Netlify (gratuito y permite headers personalizados)
- Vercel (gratuito y permite headers personalizados)
- Un servidor propio con Apache/Nginx
