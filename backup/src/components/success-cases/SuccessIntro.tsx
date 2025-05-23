'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const SuccessIntro = () => {
  return (
    <section className="py-20 bg-white relative">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[length:20px_20px] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Nuestro Enfoque para el Éxito"
          subtitle="Combinamos estrategia, tecnología y creatividad para impulsar resultados extraordinarios"
          centered
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-slate-700 mb-6">
              En Informatik-AI, no solo desarrollamos soluciones tecnológicas; creamos historias de éxito. 
              Nuestro enfoque se basa en un profundo entendimiento de las necesidades de cada cliente, 
              combinado con nuestra experiencia en inteligencia artificial y desarrollo tecnológico.
            </p>
            <p className="text-lg text-slate-700">
              Los casos que presentamos a continuación son testimonio de cómo nuestras estrategias 
              personalizadas y soluciones innovadoras pueden transformar radicalmente la presencia 
              digital y el crecimiento de una marca o empresa.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-800">Análisis Estratégico</h3>
              <p className="text-slate-700">
                Estudiamos a fondo cada caso para identificar oportunidades únicas y desarrollar estrategias personalizadas que maximicen el potencial de crecimiento.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-800">Tecnología Avanzada</h3>
              <p className="text-slate-700">
                Implementamos soluciones de IA de vanguardia, chatbots inteligentes y agentes GPT personalizados que automatizan procesos y potencian la interacción con la audiencia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100 shadow-sm">
              <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-pink-800">Resultados Medibles</h3>
              <p className="text-slate-700">
                Nos enfocamos en generar resultados tangibles y medibles, como el crecimiento exponencial de seguidores, aumento de engagement y conversiones.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessIntro;
