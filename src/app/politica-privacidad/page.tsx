import type { Metadata } from 'next';
import { generateMetadata } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Política de Privacidad',
    description: 'Política de privacidad de Informatik-AI. Información sobre el tratamiento y protección de datos personales.',
    canonical: '/politica-privacidad',
    noIndex: true,
  }),
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Política de Privacidad
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              
              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Responsable del Tratamiento</h2>
                <p>
                  El responsable del tratamiento de los datos personales recogidos en informatik-ai.com es:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li><strong>Denominación:</strong> Informatik-AI</li>
                  <li><strong>Actividad:</strong> Soluciones de Inteligencia Artificial</li>
                  <li><strong>Sitio web:</strong> informatik-ai.com</li>
                  <li><strong>Email:</strong> info@informatik-ai.com</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Finalidades del Tratamiento</h2>
                <p>Los datos personales que recogemos se utilizan para las siguientes finalidades:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Gestionar las consultas y solicitudes de información recibidas</li>
                  <li>Proporcionar los servicios solicitados</li>
                  <li>Mantener la relación comercial</li>
                  <li>Enviar comunicaciones comerciales (con su consentimiento)</li>
                  <li>Cumplir con las obligaciones legales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. Base Legal</h2>
                <p>El tratamiento de sus datos personales se basa en:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li><strong>Consentimiento:</strong> Para el envío de comunicaciones comerciales</li>
                  <li><strong>Interés legítimo:</strong> Para la gestión de consultas y relación comercial</li>
                  <li><strong>Ejecución contractual:</strong> Para la prestación de servicios</li>
                  <li><strong>Cumplimiento legal:</strong> Para cumplir obligaciones normativas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Datos que Recogemos</h2>
                <p>Los tipos de datos personales que podemos recoger incluyen:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Datos de identificación (nombre, apellidos)</li>
                  <li>Datos de contacto (email, teléfono)</li>
                  <li>Datos profesionales (empresa, cargo)</li>
                  <li>Datos de navegación (cookies, IP)</li>
                  <li>Cualquier otro dato que nos proporcione voluntariamente</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Conservación de Datos</h2>
                <p>
                  Los datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades 
                  para las que fueron recogidos y, en todo caso, durante los plazos establecidos por la legislación aplicable.
                </p>
                <p className="mt-4">
                  Una vez finalizada la relación, los datos se conservarán bloqueados durante los plazos de prescripción 
                  de las acciones que pudieran derivarse de la relación mantenida.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Destinatarios</h2>
                <p>
                  Sus datos personales no serán cedidos a terceros, salvo en los siguientes casos:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Cuando sea necesario para la prestación del servicio</li>
                  <li>Cuando exista una obligación legal</li>
                  <li>Proveedores de servicios tecnológicos (con las debidas garantías)</li>
                  <li>Autoridades competentes cuando sea requerido por ley</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Sus Derechos</h2>
                <p>Como titular de los datos, usted tiene derecho a:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre usted</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                  <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
                  <li><strong>Limitación:</strong> Restringir el tratamiento de sus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
                </ul>
                <p className="mt-4">
                  Para ejercer estos derechos, puede contactarnos en: <strong>info@informatik-ai.com</strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">8. Seguridad</h2>
                <p>
                  Hemos implementado medidas técnicas y organizativas apropiadas para proteger sus datos personales 
                  contra el acceso no autorizado, la alteración, divulgación o destrucción.
                </p>
                <p className="mt-4">
                  Estas medidas incluyen cifrado de datos, controles de acceso, auditorías regulares y formación 
                  del personal en materia de protección de datos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">9. Transferencias Internacionales</h2>
                <p>
                  En caso de realizar transferencias internacionales de datos, estas se realizarán con las debidas 
                  garantías y cumpliendo con la normativa aplicable, incluyendo la adopción de cláusulas contractuales 
                  tipo o la verificación de decisiones de adecuación.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">10. Modificaciones</h2>
                <p>
                  Nos reservamos el derecho a modificar esta Política de Privacidad. Las modificaciones serán 
                  comunicadas a través de nuestro sitio web con antelación suficiente a su entrada en vigor.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">11. Contacto y Reclamaciones</h2>
                <p>
                  Para cualquier consulta sobre esta Política de Privacidad o el tratamiento de sus datos, 
                  puede contactarnos en: <strong>info@informatik-ai.com</strong>
                </p>
                <p className="mt-4">
                  También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos 
                  (www.aepd.es) si considera que el tratamiento de sus datos no se ajusta a la normativa.
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
