'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

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
    color: {
      light: 'bg-blue-50',
      dark: 'bg-blue-900/30'
    },
    borderColor: {
      light: 'border-blue-200',
      dark: 'border-blue-700/50'
    },
    iconColor: {
      light: 'text-blue-600',
      dark: 'text-blue-400'
    },
    tagBg: {
      light: 'bg-blue-100',
      dark: 'bg-blue-800/50'
    },
    tagText: {
      light: 'text-blue-700',
      dark: 'text-blue-300'
    },
    resultIcon: {
      light: 'text-green-600',
      dark: 'text-green-400'
    }
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
    color: {
      light: 'bg-teal-50',
      dark: 'bg-teal-900/30'
    },
    borderColor: {
      light: 'border-teal-200',
      dark: 'border-teal-700/50'
    },
    iconColor: {
      light: 'text-teal-600',
      dark: 'text-teal-400'
    },
    tagBg: {
      light: 'bg-teal-100',
      dark: 'bg-teal-800/50'
    },
    tagText: {
      light: 'text-teal-700',
      dark: 'text-teal-300'
    },
    resultIcon: {
      light: 'text-green-600',
      dark: 'text-green-400'
    }
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
    color: {
      light: 'bg-purple-50',
      dark: 'bg-purple-900/30'
    },
    borderColor: {
      light: 'border-purple-200',
      dark: 'border-purple-700/50'
    },
    iconColor: {
      light: 'text-purple-600',
      dark: 'text-purple-400'
    },
    tagBg: {
      light: 'bg-purple-100',
      dark: 'bg-purple-800/50'
    },
    tagText: {
      light: 'text-purple-700',
      dark: 'text-purple-300'
    },
    resultIcon: {
      light: 'text-green-600',
      dark: 'text-green-400'
    }
  }
];

const ServiceTestimonials = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <section className={`py-20 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-800'
    } relative`}>
      {/* Patrón de fondo */}
      <div className={`absolute inset-0 ${
        isDarkMode
          ? 'bg-grid-white/[0.05]'
          : 'bg-grid-slate-200/[0.3]'
      } bg-[length:20px_20px]`}></div>

      {/* Elementos decorativos adicionales para el tema claro */}
      {!isDarkMode && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full filter blur-3xl opacity-60"></div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
       

        <SectionHeading
            title={
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold">
                Casos de Éxito
              </span>
            }
            subtitle={
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Resultados reales que hemos logrado para nuestros clientes
              </span>
            }
            centered
          />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successCases.map((caseStudy, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden ${
                isDarkMode
                  ? 'border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10'
                  : `border ${caseStudy.borderColor.light} ${caseStudy.color.light} hover:shadow-lg hover:shadow-blue-100/20`
              } transition-all duration-300 group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full ${
                    isDarkMode
                      ? 'bg-blue-500/20 text-blue-300'
                      : `${caseStudy.tagBg.light} ${caseStudy.tagText.light}`
                  } text-sm font-medium`}>
                    {caseStudy.industry}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode
                    ? 'text-white group-hover:text-blue-300'
                    : `text-slate-800 group-hover:${caseStudy.iconColor.light}`
                } transition-colors duration-300`}>
                  {caseStudy.title}
                </h3>

                <p className={`${
                  isDarkMode
                    ? 'text-blue-100'
                    : 'text-slate-700'
                } mb-6 leading-relaxed`}>
                  {caseStudy.description}
                </p>

                <h4 className={`text-lg font-semibold mb-3 ${
                  isDarkMode
                    ? 'text-blue-300'
                    : caseStudy.iconColor.light
                }`}>Resultados Clave</h4>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 ${
                        isDarkMode
                          ? 'text-green-400'
                          : caseStudy.resultIcon.light
                      } mr-2 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className={`${
                        isDarkMode
                          ? 'text-blue-100'
                          : 'text-slate-700'
                      }`}>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`h-1 w-full ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500'
                  : 'bg-gradient-to-r from-blue-400 via-teal-300 to-blue-400'
              }`}></div>
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
          <p className={`text-lg ${isDarkMode ? 'text-blue-100' : 'text-slate-700'} max-w-3xl mx-auto leading-relaxed`}>
            Estos son solo algunos ejemplos de cómo nuestras soluciones han generado un impacto real y medible
            en diferentes industrias. Cada proyecto es único y adaptamos nuestro enfoque para maximizar los resultados.
          </p>

          <a
            href="/contact"
            className={`inline-block mt-8 px-6 py-3 rounded-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 shadow-md hover:shadow-lg hover:shadow-blue-200/30'
            } font-medium transition-all duration-300 transform hover:-translate-y-1`}
          >
            Hablemos de tu proyecto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
