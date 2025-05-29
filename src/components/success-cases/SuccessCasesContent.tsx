'use client';

import React from 'react';
import SuccessHero from '@/components/success-cases/SuccessHero';
import SuccessIntro from '@/components/success-cases/SuccessIntro';
import CamiDevCase from '@/components/success-cases/CamiDevCase';
import InformatikCase from '@/components/success-cases/InformatikCase';
import SuccessMethodology from '@/components/success-cases/SuccessMethodology';
import CtaSection from '@/components/home/CtaSection';

const SuccessCasesContent = () => {
  return (
    <div className="min-h-screen">
      <SuccessHero />
      <SuccessIntro />
      <CamiDevCase />
      <InformatikCase />
      <SuccessMethodology />
      <CtaSection />
    </div>
  );
};

export default SuccessCasesContent;
