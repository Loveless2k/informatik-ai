import type { Metadata } from 'next';
import { generateMetadata } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Aviso Legal',
    description: 'Aviso legal de Informatik-AI. Información sobre términos de uso, responsabilidades y condiciones legales.',
    canonical: '/aviso-legal',
    noIndex: true,
  }),
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Aviso Legal
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              
              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Información General</h2>
                <p>
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
                  de la Información y de Comercio Electrónico, se informa que el presente sitio web es titularidad de:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li><strong>Denominación social:</strong> Informatik-AI</li>
                  <li><strong>Actividad:</strong> Soluciones de Inteligencia Artificial para empresas</li>
                  <li><strong>Sitio web:</strong> informatik-ai.com</li>
                  <li><strong>Email de contacto:</strong> info@informatik-ai.com</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Objeto y Condiciones de Uso</h2>
                <p>
                  El presente aviso legal regula el uso del sitio web informatik-ai.com. La navegación por el sitio web 
                  atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas las 
                  disposiciones incluidas en este Aviso Legal.
                </p>
                <p className="mt-4">
                  El usuario se compromete a hacer un uso correcto del sitio web de conformidad con las leyes, la buena fe, 
                  el orden público, los usos del tráfico y el presente Aviso Legal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. Responsabilidad</h2>
                <p>
                  Informatik-AI no se hace responsable de la información y contenidos almacenados en foros, chats, 
                  generadores de blogs, comentarios, redes sociales o cualquier otro medio que permita a terceros 
                  publicar contenidos de forma independiente en la página web del prestador.
                </p>
                <p className="mt-4">
                  Sin embargo, y en cumplimiento de lo dispuesto en los artículos 11 y 16 de la LSSI-CE, se pone a 
                  disposición de todos los usuarios, autoridades y fuerzas de seguridad, colaborando de forma activa 
                  en la retirada o en su caso bloqueo de todos aquellos contenidos que puedan afectar o contravenir 
                  la legislación nacional o internacional, derechos de terceros o la moral y el orden público.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Propiedad Intelectual e Industrial</h2>
                <p>
                  El sitio web, incluyendo a título enunciativo pero no limitativo su programación, edición, compilación 
                  y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos, son 
                  propiedad del prestador o, en su caso, dispone de licencia o autorización expresa por parte de los 
                  autores.
                </p>
                <p className="mt-4">
                  Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad 
                  intelectual e industrial, así como inscritos en los registros públicos correspondientes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Legislación Aplicable y Jurisdicción</h2>
                <p>
                  Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o 
                  de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se 
                  someten expresamente las partes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Modificaciones</h2>
                <p>
                  Informatik-AI se reserva el derecho de efectuar sin previo aviso las modificaciones que considere 
                  oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se 
                  presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Enlaces</h2>
                <p>
                  En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, 
                  Informatik-AI no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
                </p>
                <p className="mt-4">
                  En ningún caso Informatik-AI asumirá responsabilidad alguna por los contenidos de algún enlace 
                  perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, 
                  exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información 
                  contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
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
