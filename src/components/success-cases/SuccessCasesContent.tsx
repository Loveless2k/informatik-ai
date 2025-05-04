'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import SuccessHero from '@/components/success-cases/SuccessHero';
import SuccessIntro from '@/components/success-cases/SuccessIntro';

// Cargar componentes con hidratación compleja de forma dinámica para evitar errores de hidratación
const CamiDevCase = dynamic(() => import('@/components/success-cases/CamiDevCase'), { ssr: false });
const InformatikCase = dynamic(() => import('@/components/success-cases/InformatikCase'), { ssr: false });
const SuccessMethodology = dynamic(() => import('@/components/success-cases/SuccessMethodology'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/home/CtaSection'), { ssr: false });

const SuccessCasesContent = () => {
  return (
    <>
      <SuccessHero />
      <SuccessIntro />
      <CamiDevCase />
      <InformatikCase />
      <SuccessMethodology />
      <CtaSection />
    </>
  );
};

export default SuccessCasesContent;
