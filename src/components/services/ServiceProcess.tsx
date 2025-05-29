'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

const processSteps = [
  {
    number: '01',
    title: 'Consulta Inicial',
    description:
      'Comenzamos con una reunión para entender tus necesidades, objetivos y desafíos específicos.',
    icon: (
      <svg
        className='w-8 h-8 text-blue-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
        ></path>
      </svg>
    ),
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    number: '02',
    title: 'Análisis y Propuesta',
    description:
      'Analizamos tu situación actual y desarrollamos una propuesta personalizada con soluciones adaptadas a tus necesidades.',
    icon: (
      <svg
        className='w-8 h-8 text-purple-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
        ></path>
      </svg>
    ),
    color: 'bg-purple-100',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    number: '03',
    title: 'Planificación',
    description:
      'Definimos juntos un plan de acción detallado con objetivos claros, plazos y entregables.',
    icon: (
      <svg
        className='w-8 h-8 text-teal-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
        ></path>
      </svg>
    ),
    color: 'bg-teal-100',
    textColor: 'text-teal-600',
    borderColor: 'border-teal-200',
  },
  {
    number: '04',
    title: 'Implementación',
    description:
      'Ejecutamos el plan utilizando metodologías ágiles, con comunicación constante y adaptándonos a tus necesidades.',
    icon: (
      <svg
        className='w-8 h-8 text-orange-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
        ></path>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        ></path>
      </svg>
    ),
    color: 'bg-orange-100',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200',
  },
  {
    number: '05',
    title: 'Evaluación y Mejora',
    description:
      'Medimos resultados, recopilamos feedback y realizamos ajustes para optimizar el impacto de nuestras soluciones.',
    icon: (
      <svg
        className='w-8 h-8 text-indigo-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        ></path>
      </svg>
    ),
    color: 'bg-indigo-100',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
  },
  {
    number: '06',
    title: 'Soporte Continuo',
    description:
      'Ofrecemos soporte y acompañamiento continuo para asegurar el éxito a largo plazo de nuestras soluciones.',
    icon: (
      <svg
        className='w-8 h-8 text-green-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        ></path>
      </svg>
    ),
    color: 'bg-green-100',
    textColor: 'text-green-600',
    borderColor: 'border-green-200',
  },
];

const ServiceProcess = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Definir colores alternativos para modo oscuro
  const getDarkModeColors = (step: string): string => {
    const darkModeColors: { [key: string]: string } = {
      'bg-blue-100': 'bg-blue-900/30',
      'bg-purple-100': 'bg-purple-900/30',
      'bg-teal-100': 'bg-teal-900/30',
      'bg-orange-100': 'bg-orange-900/30',
      'bg-indigo-100': 'bg-indigo-900/30',
      'bg-green-100': 'bg-green-900/30',
      'border-blue-200': 'border-blue-700',
      'border-purple-200': 'border-purple-700',
      'border-teal-200': 'border-teal-700',
      'border-orange-200': 'border-orange-700',
      'border-indigo-200': 'border-indigo-700',
      'border-green-200': 'border-green-700',
    };

    return isDarkMode ? darkModeColors[step] || step : step;
  };

  return (
    <section
      className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} relative`}
    >
      {/* Patrón de fondo */}
      <div
        className={`absolute inset-0 ${isDarkMode ? 'bg-grid-slate-800' : 'bg-grid-slate-100'} bg-[length:20px_20px] ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}
      ></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <SectionHeading
          title={
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold'>
              Nuestro Proceso de Trabajo
            </span>
          }
          subtitle={
            <span
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}
            >
              Un enfoque estructurado y colaborativo para garantizar resultados
              excepcionales
            </span>
          }
          centered
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`border ${getDarkModeColors(step.borderColor)} rounded-xl p-6 ${getDarkModeColors(step.color)} relative overflow-hidden group ${isDarkMode ? 'hover:shadow-lg hover:shadow-blue-900/20' : 'hover:shadow-lg'} transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`absolute -right-4 -top-4 w-24 h-24 ${isDarkMode ? 'bg-blue-500/10' : 'bg-white/20'} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
              ></div>

              <div className='flex items-start mb-4'>
                <div
                  className={`mr-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-5xl font-bold ${step.textColor} ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}
                >
                  {step.number}
                </span>
              </div>

              <h3 className={`text-xl font-bold mb-3 ${step.textColor}`}>
                {step.title}
              </h3>
              <p
                className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}
              >
                {step.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${isDarkMode ? 'via-blue-700/30' : 'via-white'} to-transparent opacity-30`}
              ></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className='mt-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p
            className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-700'} max-w-3xl mx-auto`}
          >
            Nuestro proceso está diseñado para ser flexible y adaptarse a las
            necesidades específicas de cada cliente, asegurando una colaboración
            efectiva y resultados de alta calidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceProcess;
