'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

// Casos de éxito en lugar de testimonios inventados
const successCases = [
  {
    title: 'Automatización de Procesos Financieros',
    industry: 'Sector Financiero',
    description: 'Implementamos una solución de automatización que redujo el tiempo de procesamiento de transacciones en un 75% y eliminó errores manuales.',
    results: [
      'Reducción del 75% en tiempo de procesamiento',
      'Eliminación de errores manuales',
      'ROI positivo en menos de 6 meses'
    ],
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Programa de Formación en IA para Ejecutivos',
    industry: 'Multinacional Tecnológica',
    description: 'Desarrollamos un programa de formación personalizado que capacitó a más de 100 ejecutivos en fundamentos y aplicaciones prácticas de IA.',
    results: [
      'Capacitación efectiva para 100+ ejecutivos',
      'Implementación de 12 proyectos de IA',
      'Mejora en la toma de decisiones basadas en datos'
    ],
    color: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconColor: 'text-teal-600'
  },
  {
    title: 'Plataforma de Análisis Predictivo',
    industry: 'Retail',
    description: 'Diseñamos e implementamos una plataforma de análisis predictivo que mejoró la precisión de las previsiones de inventario y optimizó la cadena de suministro.',
    results: [
      'Aumento del 30% en precisión de previsiones',
      'Reducción del 25% en costos de inventario',
      'Mejora en la satisfacción del cliente'
    ],
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600'
  }
];

const ServiceTestimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Casos de Éxito"
          subtitle="Resultados reales que hemos logrado para nuestros clientes"
          centered
          className="mb-16 text-white"
          subtitleClassName="text-blue-100"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successCases.map((caseStudy, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">
                    {caseStudy.industry}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {caseStudy.title}
                </h3>

                <p className="text-blue-100 mb-6">
                  {caseStudy.description}
                </p>

                <h4 className="text-lg font-semibold mb-3 text-blue-300">Resultados Clave</h4>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-blue-100">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Estos son solo algunos ejemplos de cómo nuestras soluciones han generado un impacto real y medible
            en diferentes industrias. Cada proyecto es único y adaptamos nuestro enfoque para maximizar los resultados.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
