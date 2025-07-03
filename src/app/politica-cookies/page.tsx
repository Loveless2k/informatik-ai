import type { Metadata } from 'next';
import { generateMetadata } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Política de Cookies',
    description: 'Política de cookies de Informatik-AI. Información sobre el uso de cookies y tecnologías similares.',
    canonical: '/politica-cookies',
    noIndex: true,
  }),
};

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Política de Cookies
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              
              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. ¿Qué son las Cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. 
                  Permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo, por lo que 
                  no tiene que volver a configurarlas cada vez que regrese al sitio o navegue de una página a otra.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. ¿Cómo Utilizamos las Cookies?</h2>
                <p>
                  En informatik-ai.com utilizamos cookies para mejorar su experiencia de navegación y proporcionar 
                  funcionalidades personalizadas. Las cookies nos ayudan a:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Recordar sus preferencias y configuraciones</li>
                  <li>Mejorar la funcionalidad del sitio web</li>
                  <li>Analizar el tráfico y uso del sitio web</li>
                  <li>Personalizar el contenido y los anuncios</li>
                  <li>Proporcionar funciones de redes sociales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. Tipos de Cookies que Utilizamos</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cookies Técnicas (Necesarias)</h3>
                    <p>
                      Son esenciales para el funcionamiento del sitio web. Sin estas cookies, el sitio web no puede 
                      funcionar correctamente. No se pueden desactivar.
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Cookies de sesión</li>
                      <li>Cookies de seguridad</li>
                      <li>Cookies de funcionalidad básica</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cookies de Preferencias</h3>
                    <p>
                      Permiten recordar información que cambia la forma en que se comporta o se ve el sitio web, 
                      como su idioma preferido o la región en la que se encuentra.
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Configuración de idioma</li>
                      <li>Preferencias de tema (claro/oscuro)</li>
                      <li>Configuraciones de accesibilidad</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cookies Analíticas</h3>
                    <p>
                      Nos ayudan a entender cómo los visitantes interactúan con el sitio web, proporcionando 
                      información sobre las páginas visitadas, el tiempo de permanencia y otros datos analíticos.
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Google Analytics</li>
                      <li>Métricas de rendimiento</li>
                      <li>Análisis de comportamiento</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cookies de Marketing</h3>
                    <p>
                      Se utilizan para rastrear a los visitantes en los sitios web con la intención de mostrar 
                      anuncios que sean relevantes y atractivos para el usuario individual.
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Cookies de redes sociales</li>
                      <li>Cookies de publicidad personalizada</li>
                      <li>Cookies de remarketing</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Cookies de Terceros</h2>
                <p>
                  Algunos de nuestros socios pueden establecer cookies en su dispositivo cuando visita nuestro sitio web. 
                  Estas cookies de terceros incluyen:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
                  <li><strong>Redes Sociales:</strong> Para funciones de compartir en redes sociales</li>
                  <li><strong>Servicios de Chat:</strong> Para soporte al cliente en línea</li>
                  <li><strong>Mapas:</strong> Para mostrar ubicaciones y mapas interactivos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Duración de las Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Cookies de Sesión</h3>
                    <p>Se eliminan automáticamente cuando cierra su navegador.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Cookies Persistentes</h3>
                    <p>Permanecen en su dispositivo durante un período específico o hasta que las elimine manualmente.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Gestión de Cookies</h2>
                <p>
                  Puede controlar y gestionar las cookies de varias maneras:
                </p>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Configuración del Navegador</h3>
                    <p>
                      La mayoría de los navegadores web permiten controlar las cookies a través de su configuración. 
                      Puede configurar su navegador para:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Bloquear todas las cookies</li>
                      <li>Permitir solo cookies de sitios web específicos</li>
                      <li>Eliminar cookies cuando cierre el navegador</li>
                      <li>Recibir notificaciones antes de que se establezcan las cookies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Enlaces de Configuración por Navegador</h3>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                      <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                      <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                      <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Consecuencias de Desactivar las Cookies</h2>
                <p>
                  Si decide desactivar las cookies, algunas funciones de nuestro sitio web pueden no funcionar correctamente:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Pérdida de preferencias personalizadas</li>
                  <li>Necesidad de volver a iniciar sesión frecuentemente</li>
                  <li>Funcionalidades limitadas en formularios</li>
                  <li>Experiencia de usuario menos personalizada</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">8. Actualizaciones de la Política</h2>
                <p>
                  Esta Política de Cookies puede actualizarse periódicamente para reflejar cambios en nuestras 
                  prácticas o por otros motivos operativos, legales o reglamentarios. Le recomendamos que revise 
                  esta página regularmente para mantenerse informado sobre nuestro uso de cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">9. Contacto</h2>
                <p>
                  Si tiene preguntas sobre nuestra Política de Cookies o sobre el uso de cookies en nuestro sitio web, 
                  puede contactarnos en:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> info@informatik-ai.com
                </p>
              </section>

            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
