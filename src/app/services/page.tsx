import React from 'react';
import type { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServicesList from '@/components/services/ServicesList';
import ServiceDetails from '@/components/services/ServiceDetails';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceTestimonials from '@/components/services/ServiceTestimonials';
import ServiceFaq from '@/components/services/ServiceFaq';
import CtaSection from '@/components/home/CtaSection';
import { generateMetadata } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Servicios de IA y Tecnología',
    description: 'Descubre nuestros servicios especializados en IA, formación, consultoría estratégica, automatización y desarrollo a medida para empresas.',
    keywords: ['servicios de IA', 'formación in company', 'asesoría estratégica', 'automatización', 'desarrollo a medida', 'consultoría tecnológica'],
    canonical: '/services',
    ogType: 'website',
  }),
  alternates: {
    languages: {
      'en-US': '/en/services',
      'es-ES': '/services',
    },
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServicesList />
      <ServiceDetails />
      <ServiceProcess />
      <ServiceTestimonials />
      <ServiceFaq />
      <CtaSection />
    </>
  );
}
