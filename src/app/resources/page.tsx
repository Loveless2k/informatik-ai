import React from 'react';
import type { Metadata } from 'next';
import { generateMetadata } from '@/components/seo/Metadata';
import ResourcesHero from '@/components/resources/ResourcesHero';
import ResourcesList from '@/components/resources/ResourcesList';
import ResourcesCategories from '@/components/resources/ResourcesCategories';
import CtaSection from '@/components/home/CtaSection';

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Recursos de IA y Tecnología',
    description:
      'Accede a guías, tutoriales, plantillas y herramientas gratuitas sobre inteligencia artificial, automatización y transformación digital.',
    keywords: [
      'recursos de IA',
      'guías de inteligencia artificial',
      'tutoriales de IA',
      'plantillas de automatización',
      'herramientas gratuitas',
      'recursos tecnológicos',
    ],
    canonical: '/resources',
    ogType: 'website',
  }),
  alternates: {
    languages: {
      'en-US': '/en/resources',
      'es-ES': '/resources',
    },
  },
};

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHero />
      <ResourcesCategories />
      <ResourcesList />
      <CtaSection />
    </>
  );
}
