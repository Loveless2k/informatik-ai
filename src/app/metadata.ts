import type { Metadata } from 'next';

// Default metadata (will be overridden by page-specific metadata)
export const metadata: Metadata = {
  title: 'Informatik-AI | Soluciones Inteligentes de IA para Empresas',
  description:
    'Informatik-AI ofrece soluciones de IA de vanguardia para empresas, incluyendo consultoría de IA, machine learning, analítica de datos y desarrollo personalizado de IA.',
  keywords:
    'soluciones de IA, inteligencia artificial, machine learning, analítica de datos, inteligencia empresarial, transformación digital',
  authors: [{ name: 'Informatik-AI Team' }],
  creator: 'Informatik-AI',
  publisher: 'Informatik-AI',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://informatik-ai.com'),
  alternates: {
    languages: {
      'en-US': '/en',
      'es-ES': '/',
    },
    canonical: '/',
  },
  openGraph: {
    title: 'Informatik-AI | Soluciones Inteligentes de IA para Empresas',
    description:
      'Soluciones de IA de vanguardia para impulsar la transformación digital de tu empresa',
    url: 'https://informatik-ai.com',
    siteName: 'Informatik-AI',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Informatik-AI | Soluciones de IA para Empresas',
    description:
      'Soluciones de IA de vanguardia para impulsar la transformación digital de tu empresa',
    creator: '@informatik_ai',
  },
  robots: {
    index: true,
    follow: true,
  },
};
