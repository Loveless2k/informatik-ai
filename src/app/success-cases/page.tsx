import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casos de Éxito | Informatik-AI',
  description:
    'Descubre cómo hemos ayudado a nuestros clientes a alcanzar resultados extraordinarios con nuestras soluciones de IA y tecnología.',
  keywords:
    'casos de éxito, CamiDevAI, crecimiento en redes sociales, inteligencia artificial, chatbots, agentes GPT',
  alternates: {
    languages: {
      'en-US': '/en/success-cases',
      'es-ES': '/success-cases',
    },
  },
};

// Importamos el componente cliente que contendrá toda la página
import SuccessCasesContent from '@/components/success-cases/SuccessCasesContent';

export default function SuccessCasesPage() {
  return <SuccessCasesContent />;
}
