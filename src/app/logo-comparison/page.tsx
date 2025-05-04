'use client';

import React from 'react';
import Image from 'next/image';

const LogoComparison = () => {
  const logos = [
    {
      name: 'Original',
      path: '/images/informatik-ai-logo-final.svg',
      description: 'Logo original con la cabeza de robot y el cerebro/trébol.'
    },
    {
      name: 'Mejorado',
      path: '/images/informatik-ai-logo-improved.svg',
      description: 'Versión mejorada con mejor espaciado entre el ícono y el texto, y mejor alineación del cerebro/trébol.'
    },
    {
      name: 'Moderno',
      path: '/images/informatik-ai-logo-modern.svg',
      description: 'Diseño más moderno con un cerebro de circuito y un ojo tecnológico.'
    },
    {
      name: 'Minimalista',
      path: '/images/informatik-ai-logo-minimal.svg',
      description: 'Versión minimalista con un diseño limpio y geométrico.'
    },
    {
      name: 'Profesional',
      path: '/images/informatik-ai-logo-professional.svg',
      description: 'Versión profesional con un patrón de circuito más corporativo y detallado.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Comparación de Logos Informatik-AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {logos.map((logo, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-50">
              <Image
                src={logo.path}
                alt={`Logo ${logo.name}`}
                width={500}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">Versión: {logo.name}</h2>
              <p className="text-gray-700">{logo.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Análisis y Recomendaciones</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>El logo <strong>original</strong> tiene problemas de espaciado y alineación.</li>
          <li>La versión <strong>mejorada</strong> corrige estos problemas manteniendo la identidad original.</li>
          <li>La versión <strong>moderna</strong> ofrece un diseño más contemporáneo con elementos tecnológicos.</li>
          <li>La versión <strong>minimalista</strong> es limpia y simple, ideal para aplicaciones donde se necesita claridad.</li>
          <li>La versión <strong>profesional</strong> tiene un aspecto más corporativo y detallado, ideal para una empresa de tecnología.</li>
        </ul>
        <p className="mt-4">
          <strong>Recomendación:</strong> La versión profesional o moderna ofrecen el mejor equilibrio entre identidad de marca, 
          profesionalismo y atractivo visual para una empresa de soluciones de IA.
        </p>
      </div>
    </div>
  );
};

export default LogoComparison;
