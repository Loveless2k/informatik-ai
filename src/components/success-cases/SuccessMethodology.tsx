'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

const methodologySteps = [
  {
    id: 'analysis',
    title: 'Análisis Estratégico',
    description: 'Estudiamos a fondo tu situación actual, objetivos y desafíos para identificar oportunidades de crecimiento.',
    details: [
      'Análisis de mercado y competencia',
      'Evaluación de presencia digital actual',
      'Identificación de audiencia objetivo',
      'Definición de KPIs y métricas de éxito',
      'Análisis de tendencias y oportunidades'
    ],
    icon: (
      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
    ),
    color: 'from-teal-500 to-emerald-400',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-800'
  },
  {
    id: 'strategy',
    title: 'Diseño de Estrategia',
    description: 'Desarrollamos un plan personalizado que combina tecnología, contenido y tácticas de crecimiento.',
    details: [
      'Definición de estrategia de contenido',
      'Selección de canales y plataformas',
      'Planificación de implementación tecnológica',
      'Diseño de flujos de automatización',
      'Establecimiento de cronograma y recursos'
    ],
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
    ),
    color: 'from-blue-500 to-indigo-400',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800'
  },
  {
    id: 'implementation',
    title: 'Implementación Tecnológica',
    description: 'Desarrollamos e implementamos soluciones de IA personalizadas para potenciar tu crecimiento.',
    details: [
      'Desarrollo de agentes GPT personalizados',
      'Creación de chatbots inteligentes',
      'Implementación de sistemas de automatización',
      'Integración con plataformas existentes',
      'Configuración de analíticas avanzadas'
    ],
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    ),
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800'
  },
  {
    id: 'optimization',
    title: 'Optimización Continua',
    description: 'Monitorizamos, analizamos y optimizamos constantemente para maximizar resultados.',
    details: [
      'Análisis de datos y métricas',
      'Identificación de oportunidades de mejora',
      'Ajustes basados en resultados',
      'Pruebas A/B y experimentación',
      'Adaptación a cambios en algoritmos y tendencias'
    ],
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    ),
    color: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800'
  },
  {
    id: 'scaling',
    title: 'Escalamiento',
    description: 'Ampliamos el alcance y el impacto de las estrategias exitosas para maximizar el crecimiento.',
    details: [
      'Expansión a nuevos canales y plataformas',
      'Escalamiento de automatizaciones',
      'Desarrollo de nuevas funcionalidades',
      'Ampliación de audiencia objetivo',
      'Implementación de estrategias avanzadas'
    ],
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
      </svg>
    ),
    color: 'from-indigo-500 to-blue-400',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-800'
  }
];

const SuccessMethodology = () => {
  const [activeStep, setActiveStep] = useState('analysis');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Definir colores para el tema oscuro
  const getDarkModeColors = (step: { id: string }) => {
    const darkModeColors = {
      analysis: {
        bgColor: 'bg-teal-900/30',
        borderColor: 'border-teal-700/50',
        textColor: 'text-teal-300'
      },
      strategy: {
        bgColor: 'bg-blue-900/30',
        borderColor: 'border-blue-700/50',
        textColor: 'text-blue-300'
      },
      implementation: {
        bgColor: 'bg-purple-900/30',
        borderColor: 'border-purple-700/50',
        textColor: 'text-purple-300'
      },
      optimization: {
        bgColor: 'bg-orange-900/30',
        borderColor: 'border-orange-700/50',
        textColor: 'text-orange-300'
      },
      scaling: {
        bgColor: 'bg-indigo-900/30',
        borderColor: 'border-indigo-700/50',
        textColor: 'text-indigo-300'
      }
    };

    return darkModeColors[step.id];
  };

  const activeStepData = methodologySteps.find(step => step.id === activeStep);
  const darkModeColors = activeStepData ? getDarkModeColors(activeStepData) : null;

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} relative`}>
      {/* Patrón de fondo sutil */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-grid-gray-800' : 'bg-grid-slate-100'} bg-[length:20px_20px] ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}></div>

      {/* Elementos decorativos adicionales para el tema oscuro */}
      {isDarkMode && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Nuestra Metodología"
          subtitle="Un enfoque sistemático y probado para impulsar el crecimiento exponencial"
          centered
          className={`mb-16 ${isDarkMode ? 'text-white' : ''}`}
          subtitleClassName={isDarkMode ? 'text-gray-300' : ''}
        />

        <div className="max-w-6xl mx-auto">
          {/* Pasos de la metodología */}
          <div className="flex flex-wrap justify-center mb-12">
            {methodologySteps.map((step, index) => (
              <motion.button
                key={step.id}
                className={`flex items-center px-4 py-3 m-2 rounded-lg transition-all duration-300 ${
                  activeStep === step.id
                    ? `bg-gradient-to-r ${step.color} text-white shadow-md`
                    : isDarkMode
                      ? `bg-gray-800 border ${getDarkModeColors(step).borderColor} ${getDarkModeColors(step).textColor} hover:shadow-sm hover:bg-gray-800/80`
                      : `bg-white border ${step.borderColor} ${step.textColor} hover:shadow-sm`
                }`}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`w-8 h-8 rounded-full ${
                  activeStep === step.id
                    ? 'bg-white/20'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } flex items-center justify-center mr-3`}>
                  {index + 1}
                </span>
                <span className="font-medium">{step.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Detalle del paso activo */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-2xl ${isDarkMode ? 'shadow-xl shadow-black/20' : 'shadow-lg'} ${
              isDarkMode ? darkModeColors.bgColor : activeStepData?.bgColor
            } border ${
              isDarkMode ? darkModeColors.borderColor : activeStepData?.borderColor
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${activeStepData?.color} flex items-center justify-center mb-4 md:mb-0 md:mr-6 ${isDarkMode ? 'shadow-lg shadow-black/30' : 'shadow-md'}`}>
                {activeStepData?.icon}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? darkModeColors.textColor : activeStepData?.textColor
                } mb-2`}>{activeStepData?.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} text-lg`}>{activeStepData?.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`text-xl font-semibold ${
                  isDarkMode ? darkModeColors.textColor : activeStepData?.textColor
                } mb-4`}>Actividades Clave</h4>
                <ul className="space-y-3">
                  {activeStepData?.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 ${
                        isDarkMode ? darkModeColors.textColor : activeStepData?.textColor
                      } mr-2 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} p-6 rounded-xl ${isDarkMode ? 'shadow-inner shadow-black/30' : 'shadow-inner'}`}>
                <h4 className={`text-xl font-semibold ${
                  isDarkMode ? darkModeColors.textColor : activeStepData?.textColor
                } mb-4`}>Beneficios</h4>
                <div className="space-y-4">
                  {activeStep === 'analysis' && (
                    <>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Un análisis profundo nos permite identificar oportunidades únicas y desarrollar
                        estrategias altamente efectivas basadas en datos reales, no en suposiciones.
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Este enfoque ha permitido a nuestros clientes como CamiDevAI identificar nichos
                        específicos y oportunidades de crecimiento que otros habían pasado por alto.
                      </p>
                    </>
                  )}

                  {activeStep === 'strategy' && (
                    <>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Una estrategia bien diseñada proporciona una hoja de ruta clara para el crecimiento,
                        optimizando recursos y maximizando el impacto de cada acción.
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Nuestras estrategias personalizadas han permitido a clientes como CamiDevAI
                        multiplicar su audiencia de forma exponencial en tiempo récord.
                      </p>
                    </>
                  )}

                  {activeStep === 'implementation' && (
                    <>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        La implementación de soluciones tecnológicas avanzadas permite automatizar procesos,
                        escalar operaciones y generar interacciones más relevantes con la audiencia.
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Los agentes GPT y chatbots que desarrollamos para CamiDevAI permitieron una interacción
                        constante y personalizada con su audiencia, aumentando significativamente el engagement.
                      </p>
                    </>
                  )}

                  {activeStep === 'optimization' && (
                    <>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        La optimización continua basada en datos permite adaptar rápidamente las estrategias
                        a los cambios en el mercado y maximizar el retorno de inversión.
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Nuestro enfoque de mejora continua permitió a CamiDevAI mantener un crecimiento
                        sostenido incluso cuando los algoritmos de las plataformas cambiaron.
                      </p>
                    </>
                  )}

                  {activeStep === 'scaling' && (
                    <>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        El escalamiento estratégico permite multiplicar el impacto de las acciones exitosas,
                        expandiendo el alcance y acelerando el crecimiento de forma sostenible.
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} leading-relaxed`}>
                        Aplicando técnicas de escalamiento, ayudamos a CamiDevAI a pasar de un crecimiento
                        lineal a uno exponencial, alcanzando los 290,000 seguidores en tiempo récord.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessMethodology;
