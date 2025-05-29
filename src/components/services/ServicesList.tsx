'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

interface Servicio {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  caracteristicas: string[];
}

const services: Servicio[] = [
  {
    title: 'Formación In Company',
    description:
      'Programas de capacitación personalizados en IA y tecnologías emergentes, diseñados específicamente para las necesidades de tu empresa y equipo.',
    icon: (
      <div className='w-16 h-16 rounded-lg bg-gradient-to-br from-[#48D1CC]/20 to-[#00B4DB]/20 flex items-center justify-center mx-auto group-hover:from-[#48D1CC]/30 group-hover:to-[#00B4DB]/30 transition-all duration-300 backdrop-blur-sm border border-[#48D1CC]/20'>
        <svg
          className='w-8 h-8 text-[#48D1CC]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
          />
        </svg>
      </div>
    ),
    href: '/services#formacion-in-company',
    color: 'teal',
    caracteristicas: [
      'Programas adaptados a las necesidades específicas',
      'Formación práctica y aplicable',
      'Instructores expertos en IA y tecnologías emergentes',
      'Seguimiento y soporte post-formación',
    ],
  },
  {
    title: 'Asesoría Estratégica',
    description:
      'Consultoría especializada para implementar soluciones tecnológicas y de IA adaptadas a los objetivos y necesidades específicas de tu negocio.',
    icon: (
      <div className='w-16 h-16 rounded-lg bg-gradient-to-br from-[#00B4DB]/20 to-[#00BFFF]/20 flex items-center justify-center mx-auto group-hover:from-[#00B4DB]/30 group-hover:to-[#00BFFF]/30 transition-all duration-300 backdrop-blur-sm border border-[#00B4DB]/20'>
        <svg
          className='w-8 h-8 text-[#00B4DB]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
          />
        </svg>
      </div>
    ),
    href: '/services#asesoria-estrategica',
    color: 'blue',
    caracteristicas: [
      'Análisis de necesidades tecnológicas',
      'Planificación estratégica de implementación',
      'Optimización de procesos existentes',
      'Medición de resultados e impacto',
    ],
  },
  {
    title: 'Desarrollo de Cursos',
    description:
      'Creación de programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e inteligencia artificial.',
    icon: (
      <div className='w-16 h-16 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#48D1CC]/20 flex items-center justify-center mx-auto group-hover:from-[#00BFFF]/30 group-hover:to-[#48D1CC]/30 transition-all duration-300 backdrop-blur-sm border border-[#00BFFF]/20'>
        <svg
          className='w-8 h-8 text-[#00BFFF]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
          />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-cursos',
    color: 'sky',
    caracteristicas: [
      'Contenido actualizado y relevante',
      'Materiales didácticos interactivos',
      'Adaptación a diferentes niveles',
      'Enfoque práctico y aplicable',
    ],
  },
  {
    title: 'Automatizaciones',
    description:
      'Optimización de operaciones y reducción de costos mediante la automatización inteligente de procesos y tareas repetitivas.',
    icon: (
      <div className='w-16 h-16 rounded-lg bg-gradient-to-br from-[#00B4DB]/20 to-[#0083B0]/20 flex items-center justify-center mx-auto group-hover:from-[#00B4DB]/30 group-hover:to-[#0083B0]/30 transition-all duration-300 backdrop-blur-sm border border-[#00B4DB]/20'>
        <svg
          className='w-8 h-8 text-[#00B4DB]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
          />
        </svg>
      </div>
    ),
    href: '/services#automatizaciones',
    color: 'indigo',
    caracteristicas: [
      'Flujos de trabajo automatizados',
      'Integración con sistemas existentes',
      'Reducción de tareas repetitivas',
      'Análisis de datos inteligente',
    ],
  },
  {
    title: 'Desarrollo a Medida',
    description:
      'Creación de sitios web, aplicaciones y soluciones IT personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.',
    icon: (
      <div className='w-16 h-16 rounded-lg bg-gradient-to-br from-[#48D1CC]/20 to-[#00B4DB]/20 flex items-center justify-center mx-auto group-hover:from-[#48D1CC]/30 group-hover:to-[#00B4DB]/30 transition-all duration-300 backdrop-blur-sm border border-[#48D1CC]/20'>
        <svg
          className='w-8 h-8 text-[#48D1CC]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
          />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-medida',
    color: 'blue',
    caracteristicas: [
      'Diseño personalizado y único',
      'Experiencia de usuario intuitiva',
      'Optimización para dispositivos móviles',
      'Integración con sistemas existentes',
    ],
  },
];
const ServicesList = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' });
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
    hover: {
      y: -6,
      scale: 1.015,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 18,
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <section
      id='servicios'
      className={`py-20 md:py-28 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'}`}
    >
      <div
        className={`absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] ${isDarkMode ? 'opacity-[0.05]' : 'opacity-[0.1]'}`}
      ></div>
      <motion.div
        ref={sectionRef}
        className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <SectionHeading
            title={
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold'>
                Nuestros Servicios
              </span>
            }
            subtitle={
              <span
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto text-base md:text-lg`}
              >
                Soluciones prácticas que puedes explorar al detalle
              </span>
            }
            centered
            className='mb-12'
          />
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover='hover'
              whileTap='tap'
              className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/95 border-gray-200/70'} p-6 rounded-xl shadow-md border transition-all group relative overflow-hidden`}
            >
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center border border-blue-800/30'>
                  {service.icon}
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
              <div className='mt-4'>
                <Button
                  href={service.href}
                  variant='outline'
                  className='text-sm px-4 py-2 rounded-full border-blue-700/30 text-blue-300 hover:bg-blue-900/30'
                >
                  Ver más detalles
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesList;
