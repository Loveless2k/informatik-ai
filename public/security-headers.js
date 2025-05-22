// Este script se carga en el head del documento para establecer encabezados de seguridad
// y políticas de seguridad de contenido (CSP) para proteger el sitio web

(function() {
  // Función para establecer una meta etiqueta CSP
  function setCSP() {
    // Crear el elemento meta para CSP
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';

    // Definir la política CSP
    const cspContent = [
      // Fuentes por defecto - permitir desde el mismo origen y algunos externos
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:",

      // Scripts - permitir desde el mismo origen, inline, eval y servicios externos
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",

      // Estilos - permitir desde el mismo origen, inline y servicios externos
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

      // Imágenes - permitir desde el mismo origen, data URLs y sitios confiables
      "img-src 'self' data: blob: https://www.google-analytics.com https://*.cloudfront.net https://gnews.io",

      // Fuentes - permitir desde el mismo origen y Google Fonts
      "font-src 'self' data: https://fonts.gstatic.com",

      // Conectar - permitir conexiones a APIs y servicios necesarios
      "connect-src 'self' https://www.google-analytics.com https://gnews.io",

      // Frames - permitir mismo origen y algunos externos
      "frame-src 'self' https://www.youtube.com",

      // Objetos - restringir pero no bloquear completamente
      "object-src 'self'",

      // Media - permitir desde el mismo origen y algunos externos
      "media-src 'self' data: blob:",

      // Manifiestos - permitir desde el mismo origen
      "manifest-src 'self'"
    ].join('; ');

    meta.content = cspContent;
    document.head.appendChild(meta);
  }

  // Función para establecer encabezados de seguridad adicionales mediante meta etiquetas
  function setSecurityHeaders() {
    // X-XSS-Protection
    const xssProtection = document.createElement('meta');
    xssProtection.httpEquiv = 'X-XSS-Protection';
    xssProtection.content = '1; mode=block';
    document.head.appendChild(xssProtection);

    // X-Content-Type-Options
    const contentTypeOptions = document.createElement('meta');
    contentTypeOptions.httpEquiv = 'X-Content-Type-Options';
    contentTypeOptions.content = 'nosniff';
    document.head.appendChild(contentTypeOptions);

    // Referrer-Policy
    const referrerPolicy = document.createElement('meta');
    referrerPolicy.httpEquiv = 'Referrer-Policy';
    referrerPolicy.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrerPolicy);

    // Permissions-Policy (anteriormente Feature-Policy)
    const permissionsPolicy = document.createElement('meta');
    permissionsPolicy.httpEquiv = 'Permissions-Policy';
    permissionsPolicy.content = 'camera=(), microphone=(), geolocation=()';
    document.head.appendChild(permissionsPolicy);
  }

  // Ejecutar las funciones cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setCSP();
      setSecurityHeaders();
    });
  } else {
    setCSP();
    setSecurityHeaders();
  }
})();
