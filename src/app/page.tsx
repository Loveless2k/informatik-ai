import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import ProcessAndFaqSection from '@/components/home/ProcessAndFaqSection';
import CtaSection from '@/components/home/CtaSection';
import ComingSoonPage from '@/components/ui/ComingSoonPage';
import type { Metadata } from 'next';
import { generateMetadata } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Soluciones Inteligentes de IA para Empresas',
    description:
      'Informatik-AI ofrece soluciones de IA de vanguardia para empresas, incluyendo consultoría de IA, machine learning, analítica de datos y desarrollo personalizado de IA.',
    keywords: [
      'soluciones de IA',
      'inteligencia artificial',
      'machine learning',
      'analítica de datos',
      'inteligencia empresarial',
      'transformación digital',
    ],
    canonical: '/',
  }),
  alternates: {
    languages: {
      'en-US': '/en',
      'es-ES': '/',
    },
  },
};



export default function Home() {
  // Verificar la variable de entorno
  const isPaginaEncendida = process.env.PRENDER_Y_APAGAR_PAGINA === 'ON';

  // Si la página está "apagada", mostrar la página de "Hola llegamos"
  if (!isPaginaEncendida) {
    return <ComingSoonPage />;
  }

  // Si la página está "encendida", mostrar el contenido normal
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProcessAndFaqSection />
      <CtaSection />
    </>
  );
}
