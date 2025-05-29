'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

const CamiDevCase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Inicializar con valores por defecto para evitar errores de hidratación
  const [scrollProps, setScrollProps] = useState({
    opacity: 1,
    y: 0,
    scale: 1,
  });

  // Solo configurar el scroll y las transformaciones en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simplificamos los efectos de scroll para evitar problemas de caché
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    // Función simplificada para actualizar el scroll
    const updateScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Simplificamos el cálculo de visibilidad
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      // Valores simplificados
      setScrollProps({
        opacity: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20,
        scale: isVisible ? 1 : 0.95,
      });
    };

    // Configurar el listener de scroll
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);

    // Llamar inicialmente para establecer los valores
    updateScroll();

    // Limpiar al desmontar
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [isMounted]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return (
      <section
        id='camidev'
        className={`py-20 ${isDarkMode ? 'bg-gradient-to-br from-cyan-950 via-gray-900 to-cyan-950' : 'bg-gradient-to-br from-cyan-50 via-white to-cyan-100'} relative overflow-hidden`}
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='h-[1200px]'></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id='camidev'
      className={`py-20 ${isDarkMode ? 'bg-gradient-to-br from-cyan-950 via-gray-900 to-cyan-950' : 'bg-gradient-to-br from-cyan-50 via-white to-cyan-100'} relative overflow-hidden`}
    >
      {/* Elementos decorativos */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 ${isDarkMode ? 'bg-cyan-700' : 'bg-cyan-200'} rounded-full ${isDarkMode ? 'opacity-10' : 'opacity-20'} blur-3xl -translate-y-1/2 translate-x-1/4`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-80 h-80 ${isDarkMode ? 'bg-cyan-700' : 'bg-cyan-200'} rounded-full ${isDarkMode ? 'opacity-10' : 'opacity-20'} blur-3xl translate-y-1/2 -translate-x-1/4`}
      ></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <SectionHeading
          title={
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold'>
              CamiDevAI
            </span>
          }
          subtitle={
            <span
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}
            >
              De 156 a 290,000 seguidores: Una historia de crecimiento
              exponencial
            </span>
          }
          centered
        />

        <motion.div
          ref={ref}
          style={{
            opacity: scrollProps.opacity,
            y: scrollProps.y,
            scale: scrollProps.scale,
          }}
          className='max-w-6xl mx-auto'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='order-2 lg:order-1'>
              <h3
                className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'} mb-6`}
              >
                El Desafío
              </h3>
              <p
                className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} mb-6`}
              >
                CamiDevAI, una talentosa desarrolladora y creadora de contenido
                sobre inteligencia artificial, comenzó su viaje subiendo
                contenido educativo para sí misma con 156 seguidores en
                Instagram. Al ver el interés que despertó en algunas personas,
                decidió utilizar el enfoque Informatik-AI para escalar su
                presencia. A pesar de contar con conocimiento valioso y
                contenido de calidad, enfrentaba el desafío de destacar en un
                espacio digital saturado y alcanzar a una audiencia más amplia
                interesada en IA y tecnología.
              </p>

              <h3
                className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'} mb-6`}
              >
                Nuestra Solución
              </h3>
              <p
                className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} mb-6`}
              >
                Desarrollamos una estrategia integral que combinó:
              </p>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-start'>
                  <svg
                    className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mr-2 flex-shrink-0`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  <span
                    className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                  >
                    <span
                      className={`font-semibold ${isDarkMode ? 'text-cyan-300' : ''}`}
                    >
                      Análisis de audiencia avanzado
                    </span>{' '}
                    para identificar nichos específicos interesados en IA
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mr-2 flex-shrink-0`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  <span
                    className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                  >
                    <span
                      className={`font-semibold ${isDarkMode ? 'text-cyan-300' : ''}`}
                    >
                      Creación de agentes GPT personalizados
                    </span>{' '}
                    que generaban ideas de contenido viral
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mr-2 flex-shrink-0`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  <span
                    className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                  >
                    <span
                      className={`font-semibold ${isDarkMode ? 'text-cyan-300' : ''}`}
                    >
                      Desarrollo de chatbots interactivos
                    </span>{' '}
                    para aumentar el engagement con la audiencia
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mr-2 flex-shrink-0`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  <span
                    className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                  >
                    <span
                      className={`font-semibold ${isDarkMode ? 'text-cyan-300' : ''}`}
                    >
                      Optimización algorítmica
                    </span>{' '}
                    para maximizar el alcance orgánico
                  </span>
                </li>
              </ul>

              <h3
                className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'} mb-6`}
              >
                Resultados Extraordinarios
              </h3>
              <div
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl ${isDarkMode ? 'shadow-lg shadow-cyan-900/10' : 'shadow-sm'} ${isDarkMode ? 'border-cyan-800/30' : 'border-cyan-100'} border mb-8`}
              >
                <div className='flex items-center justify-between mb-4'>
                  <span
                    className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                  >
                    Crecimiento de seguidores
                  </span>
                  <span
                    className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
                  >
                    +290,000
                  </span>
                </div>
                <div
                  className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-cyan-100'} rounded-full h-4 mb-6`}
                >
                  <div
                    className='bg-gradient-to-r from-cyan-500 to-blue-400 h-4 rounded-full'
                    style={{ width: '99%' }}
                  ></div>
                </div>
                <p
                  className={`${isDarkMode ? 'text-gray-400' : 'text-slate-600'} italic`}
                >
                  "Como desarrolladora, siempre tuve pasión por compartir
                  conocimiento sobre IA, pero fue en el trabajo colaborativo con
                  Informatik-AI donde encontramos la fórmula perfecta.
                  Trabajando codo a codo, combinamos mi experiencia técnica con
                  su visión estratégica para impulsar un crecimiento que nunca
                  imaginé posible. Juntos creamos herramientas y contenido que
                  realmente resonó con la comunidad tech, demostrando que la
                  colaboración genuina puede lograr resultados extraordinarios."
                </p>
                <div className='flex items-center mt-4'>
                  <div
                    className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-cyan-800/50' : 'bg-cyan-200'} flex items-center justify-center mr-3`}
                  >
                    <span
                      className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'} font-bold`}
                    >
                      C
                    </span>
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}
                    >
                      Camila Bañares
                    </p>
                    <p
                      className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
                    >
                      CamiDevAI
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='order-1 lg:order-2 relative'>
              <div className='relative aspect-[9/16] w-full max-w-[300px] mx-auto'>
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-3xl transform rotate-3 scale-95 ${isDarkMode ? 'opacity-30' : 'opacity-20'} blur-lg`}
                ></div>
                <div
                  className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl border-8 ${isDarkMode ? 'border-gray-800' : 'border-white'} shadow-xl overflow-hidden`}
                >
                  {/* Simulación de perfil de Instagram */}
                  <div className='bg-gradient-to-br from-cyan-600 to-blue-500 p-3 flex items-center'>
                    <div
                      className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center mr-2`}
                    >
                      <span
                        className={`${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'} font-bold text-xs`}
                      >
                        C
                      </span>
                    </div>
                    <span className='text-white font-semibold'>camidevai</span>
                    <svg
                      className='w-4 h-4 text-white ml-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : ''}`}>
                    <div className='mb-4'>
                      <div
                        className={`w-full aspect-square overflow-hidden rounded-full border-2 ${isDarkMode ? 'border-cyan-600' : 'border-cyan-300'} mb-4`}
                      >
                        <Image
                          src='/images/camidev-profile.png'
                          alt='Camila Bañares - CamiDevAI'
                          width={300}
                          height={300}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex justify-between items-center mb-4'>
                        <div className='text-center'>
                          <p
                            className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}
                          >
                            890
                          </p>
                          <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
                          >
                            Posts
                          </p>
                        </div>
                        <div className='text-center'>
                          <p
                            className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}
                          >
                            290K
                          </p>
                          <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
                          >
                            Followers
                          </p>
                        </div>
                        <div className='text-center'>
                          <p
                            className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}
                          >
                            87
                          </p>
                          <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
                          >
                            Following
                          </p>
                        </div>
                      </div>
                      <p
                        className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}
                      >
                        Camila Bañares
                      </p>
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
                      >
                        Desarrolladora & Creadora de Contenido IA
                      </p>
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'} mt-1`}
                      >
                        Compartiendo conocimiento sobre #InteligenciaArtificial
                        #Programación #IA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de crecimiento */}
              <motion.div
                className={`absolute -bottom-10 -right-10 w-40 h-40 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full ${isDarkMode ? 'shadow-lg shadow-cyan-900/20' : 'shadow-lg'} flex items-center justify-center`}
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
              >
                <svg
                  className='w-24 h-24'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10,70 Q20,60 30,65 T50,55 T70,40 T90,20'
                    fill='none'
                    stroke={isDarkMode ? '#22D3EE' : '#0891B2'}
                    strokeWidth='3'
                  />
                  <circle
                    cx='10'
                    cy='70'
                    r='3'
                    fill={isDarkMode ? '#22D3EE' : '#0891B2'}
                  />
                  <circle
                    cx='90'
                    cy='20'
                    r='5'
                    fill={isDarkMode ? '#22D3EE' : '#0891B2'}
                  >
                    <animate
                      attributeName='r'
                      values='4;6;4'
                      dur='2s'
                      repeatCount='indefinite'
                    />
                  </circle>
                  <text
                    x='50'
                    y='90'
                    textAnchor='middle'
                    fontSize='12'
                    fontWeight='bold'
                    fill={isDarkMode ? '#E5E7EB' : '#4B5563'}
                  >
                    +290K
                  </text>
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Timeline de crecimiento */}
          <motion.div
            className='mt-20'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className={`text-2xl font-bold text-center ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'} mb-10`}
            >
              Evolución del Crecimiento
            </h3>
            <div className='relative'>
              {/* Línea de tiempo */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${isDarkMode ? 'bg-cyan-800' : 'bg-cyan-200'}`}
              ></div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='md:col-start-2 relative'>
                  <div className='absolute left-0 md:left-auto md:right-full top-6 transform translate-x-0 md:-translate-x-8 flex items-center'>
                    <div
                      className={`w-4 h-4 rounded-full bg-cyan-500 border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} ${isDarkMode ? 'shadow-cyan-900/20' : 'shadow-sm'}`}
                    ></div>
                    <div
                      className={`h-0.5 w-6 ${isDarkMode ? 'bg-cyan-800' : 'bg-cyan-200'}`}
                    ></div>
                  </div>
                  <div
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl ${isDarkMode ? 'shadow-lg shadow-cyan-900/10' : 'shadow-sm'} ${isDarkMode ? 'border-cyan-800/30' : 'border-cyan-100'} border`}
                  >
                    <span
                      className={`inline-block px-3 py-1 ${isDarkMode ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-100 text-cyan-700'} rounded-full text-sm font-medium mb-3`}
                    >
                      Mes 1
                    </span>
                    <h4
                      className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'} mb-2`}
                    >
                      Análisis y Estrategia
                    </h4>
                    <p
                      className={`${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}
                    >
                      Implementación de análisis de audiencia y desarrollo de
                      estrategia de contenido personalizada.
                    </p>
                    <div className='mt-3 flex items-center'>
                      <span
                        className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                      >
                        Seguidores:
                      </span>
                      <span
                        className={`ml-2 text-sm font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
                      >
                        500+
                      </span>
                    </div>
                  </div>
                </div>

                <div className='md:col-start-1 relative'>
                  <div className='absolute right-0 md:right-auto md:left-full top-6 transform -translate-x-0 md:translate-x-8 flex items-center'>
                    <div
                      className={`h-0.5 w-6 ${isDarkMode ? 'bg-cyan-800' : 'bg-cyan-200'}`}
                    ></div>
                    <div
                      className={`w-4 h-4 rounded-full bg-cyan-500 border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} ${isDarkMode ? 'shadow-cyan-900/20' : 'shadow-sm'}`}
                    ></div>
                  </div>
                  <div
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl ${isDarkMode ? 'shadow-lg shadow-cyan-900/10' : 'shadow-sm'} ${isDarkMode ? 'border-cyan-800/30' : 'border-cyan-100'} border`}
                  >
                    <span
                      className={`inline-block px-3 py-1 ${isDarkMode ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-100 text-cyan-700'} rounded-full text-sm font-medium mb-3`}
                    >
                      Mes 3
                    </span>
                    <h4
                      className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'} mb-2`}
                    >
                      Implementación de Chatbots
                    </h4>
                    <p
                      className={`${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}
                    >
                      Desarrollo de chatbots interactivos para aumentar el
                      engagement y responder consultas de la audiencia.
                    </p>
                    <div className='mt-3 flex items-center'>
                      <span
                        className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                      >
                        Seguidores:
                      </span>
                      <span
                        className={`ml-2 text-sm font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
                      >
                        25,000+
                      </span>
                    </div>
                  </div>
                </div>

                <div className='md:col-start-2 relative'>
                  <div className='absolute left-0 md:left-auto md:right-full top-6 transform translate-x-0 md:-translate-x-8 flex items-center'>
                    <div
                      className={`w-4 h-4 rounded-full bg-cyan-500 border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} ${isDarkMode ? 'shadow-cyan-900/20' : 'shadow-sm'}`}
                    ></div>
                    <div
                      className={`h-0.5 w-6 ${isDarkMode ? 'bg-cyan-800' : 'bg-cyan-200'}`}
                    ></div>
                  </div>
                  <div
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl ${isDarkMode ? 'shadow-lg shadow-cyan-900/10' : 'shadow-sm'} ${isDarkMode ? 'border-cyan-800/30' : 'border-cyan-100'} border`}
                  >
                    <span
                      className={`inline-block px-3 py-1 ${isDarkMode ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-100 text-cyan-700'} rounded-full text-sm font-medium mb-3`}
                    >
                      Mes 6
                    </span>
                    <h4
                      className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'} mb-2`}
                    >
                      Agentes GPT Personalizados
                    </h4>
                    <p
                      className={`${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}
                    >
                      Creación de agentes GPT para generar ideas de contenido
                      viral y optimizar la estrategia de publicación.
                    </p>
                    <div className='mt-3 flex items-center'>
                      <span
                        className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                      >
                        Seguidores:
                      </span>
                      <span
                        className={`ml-2 text-sm font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
                      >
                        100,000+
                      </span>
                    </div>
                  </div>
                </div>

                <div className='md:col-start-1 relative'>
                  <div className='absolute right-0 md:right-auto md:left-full top-6 transform -translate-x-0 md:translate-x-8 flex items-center'>
                    <div
                      className={`h-0.5 w-6 ${isDarkMode ? 'bg-cyan-800' : 'bg-cyan-200'}`}
                    ></div>
                    <div
                      className={`w-4 h-4 rounded-full bg-cyan-500 border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} ${isDarkMode ? 'shadow-cyan-900/20' : 'shadow-sm'}`}
                    ></div>
                  </div>
                  <div
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl ${isDarkMode ? 'shadow-lg shadow-cyan-900/10' : 'shadow-sm'} ${isDarkMode ? 'border-cyan-800/30' : 'border-cyan-100'} border`}
                  >
                    <span
                      className={`inline-block px-3 py-1 ${isDarkMode ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-100 text-cyan-700'} rounded-full text-sm font-medium mb-3`}
                    >
                      Mes 12
                    </span>
                    <h4
                      className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-slate-800'} mb-2`}
                    >
                      Crecimiento Exponencial
                    </h4>
                    <p
                      className={`${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}
                    >
                      Optimización continua y escalamiento de la estrategia para
                      alcanzar una audiencia global.
                    </p>
                    <div className='mt-3 flex items-center'>
                      <span
                        className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
                      >
                        Seguidores:
                      </span>
                      <span
                        className={`ml-2 text-sm font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
                      >
                        290,000+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CamiDevCase;
