'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

const SuccessIntro = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <section
      className={`py-24 md:py-32 ${isDarkMode ? 'bg-gray-950' : 'bg-gradient-to-b from-white to-blue-50'} relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 ${isDarkMode ? 'bg-grid-white/[0.05]' : 'bg-grid-slate-100/[0.3]'} bg-[length:20px_20px] pointer-events-none`}
      ></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <SectionHeading
          title={
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold'>
              Nuestro Enfoque para el Éxito
            </span>
          }
          subtitle={
            <span
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto text-base md:text-lg`}
            >
              Combinamos estrategia, tecnología y creatividad para impulsar
              resultados extraordinarios
            </span>
          }
          centered
        />

        <div className='max-w-5xl mx-auto'>
          <motion.div
            className='text-center mb-14'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} mb-6 leading-relaxed`}
            >
              En Informatik-AI, no solo desarrollamos soluciones tecnológicas;
              creamos historias de éxito. Nuestro enfoque se basa en un profundo
              entendimiento de las necesidades de cada cliente, combinado con
              nuestra experiencia en inteligencia artificial y desarrollo
              tecnológico.
            </p>
            <p
              className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}
            >
              Los casos que presentamos a continuación son testimonio de cómo
              nuestras estrategias personalizadas y soluciones innovadoras
              pueden transformar radicalmente la presencia digital y el
              crecimiento de una marca o empresa.
            </p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                color: 'purple',
                title: 'Análisis Estratégico',
                desc: 'Estudiamos a fondo cada caso para identificar oportunidades únicas y desarrollar estrategias personalizadas que maximicen el potencial de crecimiento.',
                icon: (
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                ),
              },
              {
                color: 'blue',
                title: 'Tecnología Avanzada',
                desc: 'Implementamos soluciones de IA de vanguardia, chatbots inteligentes y agentes GPT personalizados que automatizan procesos y potencian la interacción con la audiencia.',
                icon: (
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                    />
                  </svg>
                ),
              },
              {
                color: 'pink',
                title: 'Resultados Medibles',
                desc: 'Nos enfocamos en generar resultados tangibles y medibles, como el crecimiento exponencial de seguidores, aumento de engagement y conversiones.',
                icon: (
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                ),
              },
            ].map((item, i) => {
              // Define static classes to avoid Tailwind purging issues
              const getItemClasses = (color: string, isDark: boolean) => {
                const baseClasses = 'p-6 rounded-xl border transition-all duration-300 shadow-md';
                if (color === 'purple') {
                  return isDark
                    ? `${baseClasses} bg-purple-900/30 border-purple-800/30 shadow-purple-900/10`
                    : `${baseClasses} bg-purple-50 border-purple-100`;
                } else if (color === 'blue') {
                  return isDark
                    ? `${baseClasses} bg-blue-900/30 border-blue-800/30 shadow-blue-900/10`
                    : `${baseClasses} bg-blue-50 border-blue-100`;
                } else if (color === 'pink') {
                  return isDark
                    ? `${baseClasses} bg-pink-900/30 border-pink-800/30 shadow-pink-900/10`
                    : `${baseClasses} bg-pink-50 border-pink-100`;
                }
                return baseClasses;
              };

              const getIconClasses = (color: string, isDark: boolean) => {
                const baseClasses = 'w-14 h-14 rounded-lg mb-4 flex items-center justify-center';
                if (color === 'purple') {
                  return isDark
                    ? `${baseClasses} bg-purple-800/30 text-purple-400`
                    : `${baseClasses} bg-purple-100 text-purple-600`;
                } else if (color === 'blue') {
                  return isDark
                    ? `${baseClasses} bg-blue-800/30 text-blue-400`
                    : `${baseClasses} bg-blue-100 text-blue-600`;
                } else if (color === 'pink') {
                  return isDark
                    ? `${baseClasses} bg-pink-800/30 text-pink-400`
                    : `${baseClasses} bg-pink-100 text-pink-600`;
                }
                return baseClasses;
              };

              const getTitleClasses = (color: string, isDark: boolean) => {
                const baseClasses = 'text-xl font-bold mb-3';
                if (color === 'purple') {
                  return isDark
                    ? `${baseClasses} text-purple-300`
                    : `${baseClasses} text-purple-800`;
                } else if (color === 'blue') {
                  return isDark
                    ? `${baseClasses} text-blue-300`
                    : `${baseClasses} text-blue-800`;
                } else if (color === 'pink') {
                  return isDark
                    ? `${baseClasses} text-pink-300`
                    : `${baseClasses} text-pink-800`;
                }
                return baseClasses;
              };

              return (
                <div
                  key={i}
                  className={getItemClasses(item.color, isDarkMode)}
                >
                  <div className={getIconClasses(item.color, isDarkMode)}>
                    {item.icon}
                  </div>
                  <h3 className={getTitleClasses(item.color, isDarkMode)}>
                    {item.title}
                  </h3>
                  <p
                    className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessIntro;
