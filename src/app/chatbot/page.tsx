import type { Metadata } from 'next';
import { generateMetadata } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Chatbot de IA - Asistente Virtual',
    description: 'Interactúa con nuestro chatbot de inteligencia artificial. Obtén respuestas instantáneas sobre nuestros servicios, consultoría de IA y soluciones tecnológicas.',
    keywords: ['chatbot', 'asistente virtual', 'IA conversacional', 'inteligencia artificial', 'soporte automatizado', 'consultas instantáneas'],
    canonical: '/chatbot',
    ogType: 'website',
  }),
  alternates: {
    languages: {
      'en-US': '/en/chatbot',
      'es-ES': '/chatbot',
    },
  },
};

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Asistente Virtual de IA
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Conversa con nuestro chatbot inteligente para obtener información sobre nuestros servicios
            </p>
          </div>
        </div>
      </div>

      {/* Chatbot Container */}
      <div className="relative w-full" style={{ height: 'calc(100vh - 140px)' }}>
        <iframe 
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
            borderRadius: '0'
          }}
          frameBorder="0" 
          src="https://widget.botsonic.com/CDN/index.html?service-base-url=https%3A%2F%2Fapi-azure.botsonic.ai&token=6df02642-8ccb-43ec-917a-b38926279ed3&base-origin=https%3A%2F%2Fbot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https%3A%2F%2Fbot.writesonic.com%2Fbots%2F4008a2de-8e9e-4028-aff0-16dd219cbfab%2Fconnect%3Ftab%3Dembeddings"
          title="Chatbot de IA - Informatik-AI"
          allow="microphone; camera"
          loading="lazy"
        />
      </div>

      {/* Loading fallback */}
      <noscript>
        <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              JavaScript Requerido
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Para usar nuestro chatbot, por favor habilita JavaScript en tu navegador.
            </p>
          </div>
        </div>
      </noscript>
    </div>
  );
}
