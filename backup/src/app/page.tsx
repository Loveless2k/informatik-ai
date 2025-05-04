import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import ProcessAndFaqSection from '@/components/home/ProcessAndFaqSection';
import CtaSection from '@/components/home/CtaSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informatik-AI | Soluciones Inteligentes de IA para Empresas',
  description: 'Informatik-AI ofrece soluciones de IA de vanguardia para empresas, incluyendo consultoría de IA, machine learning, analítica de datos y desarrollo personalizado de IA.',
  keywords: 'soluciones de IA, inteligencia artificial, machine learning, analítica de datos, inteligencia empresarial, transformación digital',
  alternates: {
    languages: {
      'en-US': '/en',
      'es-ES': '/',
    },
  },
};

export default function Home() {
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
