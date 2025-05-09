import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casos de Éxito | Informatik-AI',
  description: 'Descubre cómo hemos ayudado a nuestros clientes a alcanzar resultados extraordinarios con nuestras soluciones de IA y tecnología.',
  keywords: 'casos de éxito, CamiDevAI, crecimiento en redes sociales, inteligencia artificial, chatbots, agentes GPT',
  alternates: {
    languages: {
      'en-US': '/en/success-cases',
      'es-ES': '/success-cases',
    },
  },
};

export default function SuccessCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
