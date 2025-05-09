'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

const InformatikCase = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className={`py-20 ${isDarkMode
      ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white'
      : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-800'} relative`}>
      {/* Patrón de fondo */}
      <div className={`absolute inset-0 ${isDarkMode
        ? 'bg-grid-white/[0.05]'
        : 'bg-grid-slate-200/[0.3]'} bg-[length:20px_20px]`}></div>

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
                Informatik-AI: Nuestro Propio Caso de Éxito
              </span>
            }
            subtitle={
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Aplicando nuestra experiencia y conocimiento para crear una empresa innovadora.
              </span>
            }
            centered
          />

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <p className={`text-lg ${isDarkMode ? 'text-blue-100' : 'text-slate-700'} mb-6 leading-relaxed`}>
              En Informatik-AI, no solo ayudamos a nuestros clientes a alcanzar el éxito;
              también somos nuestro propio caso de éxito. Nuestra empresa nació de la aplicación
              de los mismos principios y tecnologías que ofrecemos a nuestros clientes.
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-blue-100' : 'text-slate-700'} leading-relaxed`}>
              Nuestra historia demuestra cómo la combinación de conocimiento técnico,
              visión estratégica y soluciones de IA puede transformar una idea en una
              empresa innovadora con impacto real.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={itemVariants}
          >
            <div className={`${isDarkMode
              ? 'bg-white/10 backdrop-blur-sm border-white/10'
              : 'bg-white/80 backdrop-blur-sm border-blue-200/50 shadow-lg shadow-blue-100/20'}
              p-8 rounded-xl border transition-all duration-300 hover:shadow-xl`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} mb-6`}>Nuestra Visión</h3>
              <p className={`${isDarkMode ? 'text-blue-50' : 'text-slate-700'} mb-6 leading-relaxed`}>
                Informatik-AI nació con la visión de democratizar el acceso a la inteligencia artificial
                y ayudar a empresas y creadores a aprovechar todo su potencial. Identificamos una
                oportunidad en el mercado: muchas empresas querían implementar soluciones de IA pero
                carecían del conocimiento técnico necesario.
              </p>
              <p className={`${isDarkMode ? 'text-blue-50' : 'text-slate-700'} leading-relaxed`}>
                Aplicando nuestro propio análisis de mercado y utilizando las mismas herramientas de IA
                que desarrollamos para nuestros clientes, definimos un modelo de negocio innovador que
                combina consultoría, desarrollo y formación.
              </p>
            </div>

            <div className={`${isDarkMode
              ? 'bg-white/10 backdrop-blur-sm border-white/10'
              : 'bg-white/80 backdrop-blur-sm border-blue-200/50 shadow-lg shadow-blue-100/20'}
              p-8 rounded-xl border transition-all duration-300 hover:shadow-xl`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} mb-6`}>Implementación</h3>
              <p className={`${isDarkMode ? 'text-blue-50' : 'text-slate-700'} mb-6 leading-relaxed`}>
                Utilizamos nuestro propio framework de desarrollo para crear soluciones internas que
                optimizaran nuestros procesos. Implementamos agentes GPT para análisis de mercado,
                chatbots para atención al cliente y sistemas automatizados para la generación de
                propuestas personalizadas.
              </p>
              <p className={`${isDarkMode ? 'text-blue-50' : 'text-slate-700'} leading-relaxed`}>
                Estas mismas herramientas nos permitieron escalar rápidamente, atender a más clientes
                y ofrecer soluciones cada vez más sofisticadas, demostrando en la práctica el valor
                de nuestros servicios.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${isDarkMode
              ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30'
              : 'bg-gradient-to-r from-blue-100/80 to-indigo-100/80 border-blue-300/50 shadow-lg shadow-blue-100/30'}
              p-8 rounded-xl border mb-16 backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
            variants={itemVariants}
          >
            <h3 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} mb-6`}>Resultados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <svg className={`w-10 h-10 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-2`}>+50</h4>
                <p className={`${isDarkMode ? 'text-blue-200' : 'text-slate-600'}`}>Clientes Satisfechos</p>
              </div>

              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <svg className={`w-10 h-10 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-2`}>100%</h4>
                <p className={`${isDarkMode ? 'text-blue-200' : 'text-slate-600'}`}>Proyectos Exitosos</p>
              </div>

              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <svg className={`w-10 h-10 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-2`}>300%</h4>
                <p className={`${isDarkMode ? 'text-blue-200' : 'text-slate-600'}`}>Crecimiento Anual</p>
              </div>

              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <svg className={`w-10 h-10 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-2`}>+25</h4>
                <p className={`${isDarkMode ? 'text-blue-200' : 'text-slate-600'}`}>Soluciones Innovadoras</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} mb-6`}>Lecciones Aprendidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${isDarkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white/80 border-blue-200/50 shadow-lg shadow-blue-100/20'}
                p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>1</span>
                </div>
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-3`}>Innovación Constante</h4>
                <p className={`${isDarkMode ? 'text-blue-100' : 'text-slate-700'} leading-relaxed`}>
                  La tecnología evoluciona rápidamente. Mantenerse a la vanguardia es esencial para ofrecer soluciones relevantes.
                </p>
              </div>

              <div className={`${isDarkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white/80 border-blue-200/50 shadow-lg shadow-blue-100/20'}
                p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>2</span>
                </div>
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-3`}>Enfoque Personalizado</h4>
                <p className={`${isDarkMode ? 'text-blue-100' : 'text-slate-700'} leading-relaxed`}>
                  Cada cliente es único. Las soluciones estandarizadas no generan los mismos resultados que las personalizadas.
                </p>
              </div>

              <div className={`${isDarkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white/80 border-blue-200/50 shadow-lg shadow-blue-100/20'}
                p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-full ${isDarkMode
                  ? 'bg-blue-500/20'
                  : 'bg-blue-500/10 shadow-md shadow-blue-200/30'}
                  flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105`}>
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>3</span>
                </div>
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-3`}>Resultados Medibles</h4>
                <p className={`${isDarkMode ? 'text-blue-100' : 'text-slate-700'} leading-relaxed`}>
                  El éxito debe ser cuantificable. Establecer métricas claras y hacer seguimiento constante es fundamental.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InformatikCase;
