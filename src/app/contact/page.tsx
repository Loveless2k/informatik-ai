'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import { useTheme } from '@/context/ThemeContext';

// Preguntas frecuentes
const faqs = [
  {
    question:
      '¿Qué tipos de empresas pueden beneficiarse de vuestros servicios?',
    answer:
      'Nuestras soluciones son adaptables a empresas de todos los tamaños y sectores. Trabajamos con startups, pymes y grandes corporaciones, personalizando cada proyecto según las necesidades específicas del cliente.',
  },
  {
    question: '¿Cuánto tiempo lleva implementar una solución de IA?',
    answer:
      'El tiempo de implementación varía según la complejidad del proyecto. Un proyecto típico puede tomar entre 2-6 meses desde la consulta inicial hasta la implementación completa, aunque ofrecemos soluciones más rápidas para necesidades urgentes.',
  },
  {
    question: '¿Qué nivel de personalización ofrecéis en vuestras soluciones?',
    answer:
      'Todas nuestras soluciones son 100% personalizadas. Comenzamos entendiendo a fondo los desafíos y objetivos específicos de tu negocio, y desarrollamos soluciones a medida que se integran perfectamente con tus sistemas y procesos existentes.',
  },
  {
    question: '¿Ofrecéis soporte después de la implementación?',
    answer:
      'Sí, proporcionamos soporte continuo y mantenimiento para todas nuestras soluciones. Además, ofrecemos programas de formación para tu equipo y actualizaciones periódicas para mantener la tecnología al día con las últimas innovaciones.',
  },
  {
    question: '¿Cómo medís el éxito de vuestros proyectos?',
    answer:
      'Definimos métricas de éxito claras al inicio de cada proyecto, alineadas con tus objetivos de negocio. Realizamos seguimiento continuo y proporcionamos informes detallados sobre el rendimiento y el ROI de las soluciones implementadas.',
  },
];
const ContactPage = () => {
  // Referencias y animaciones
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' });
  const faqsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Obtener el tema actual
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Efecto para mostrar las preguntas frecuentes
  useEffect(() => {
    const showFaqs = () => {
      // Mostrar las preguntas con un efecto de aparición
      faqsRef.current.forEach((el, index) => {
        if (el) {
          setTimeout(
            () => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            },
            500 + index * 150
          );
        }
      });
    };

    // Mostrar las preguntas después de un breve retraso
    const timer = setTimeout(showFaqs, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Variantes para el efecto de destello del título
  const glowVariants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className={`relative py-32 md:py-44 overflow-hidden code-lines-bg ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'
            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
        }`}
      >
        {/* Efecto de resplandor superior */}
        <div
          className={`absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-800/20'
          }`}
        ></div>

        {/* Neural Network Background */}
        <div className='absolute inset-0'>
          {/* Simulación de NeuralNetworkBackground */}
          <div className='absolute inset-0'>
            <svg
              className='w-full h-full opacity-10'
              viewBox='0 0 100 100'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <radialGradient
                  id='nodeGradient'
                  cx='50%'
                  cy='50%'
                  r='50%'
                  fx='50%'
                  fy='50%'
                >
                  <stop offset='0%' stopColor='#60A5FA' stopOpacity='0.8' />
                  <stop offset='100%' stopColor='#3B82F6' stopOpacity='0' />
                </radialGradient>
              </defs>
              {/* Puntos de la red neural */}
              {Array.from({ length: 15 }).map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 100}
                  cy={Math.random() * 100}
                  r='0.5'
                  fill='url(#nodeGradient)'
                  className='animate-pulse'
                  style={{ animationDuration: `${3 + Math.random() * 5}s` }}
                />
              ))}
              {/* Líneas de conexión */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={i}
                  x1={Math.random() * 100}
                  y1={Math.random() * 100}
                  x2={Math.random() * 100}
                  y2={Math.random() * 100}
                  stroke='#3B82F6'
                  strokeWidth='0.1'
                  strokeOpacity='0.3'
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Grid pattern overlay más sutil */}
        <div className='absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]'></div>

        {/* Efecto de escaneo sutil */}
        <div className='scan-effect absolute inset-0 opacity-30'></div>

        {/* Matrix background */}
        <div className='matrix-bg absolute inset-0 opacity-10'></div>

        {/* Elementos decorativos mejorados */}
        <div
          className='absolute bottom-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse'
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className='absolute top-20 right-10 w-32 h-32 border border-teal-500/10 rounded-full animate-pulse'
          style={{ animationDuration: '12s' }}
        ></div>

        <motion.div
          ref={sectionRef}
          className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className='max-w-5xl mx-auto text-center'>
            {/* Título con efecto de resplandor */}
            <div className='relative mb-8'>
              <motion.div
                className='absolute inset-0 rounded-full filter blur-[80px] -z-10 bg-blue-900/20'
                variants={glowVariants}
                initial='initial'
                animate='animate'
              />
              <motion.h1
                className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white w-full text-center mb-2 text-glow'
                variants={itemVariants}
              >
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                  Contáctanos
                </span>
              </motion.h1>
              <div className='bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text text-3xl md:text-4xl font-bold'>
                Estamos aquí para ayudarte
              </div>
            </div>
            <motion.p
              className='text-xl md:text-2xl mb-14 text-gray-300 max-w-3xl mx-auto tech-text'
              variants={itemVariants}
            >
              ¿Tienes preguntas o estás listo para comenzar tu viaje con IA?
              Nuestro equipo está listo para responder a todas tus consultas.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Contact Information and Form */}
      <section
        className={`py-24 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
        } relative overflow-hidden`}
      >
        {/* Efecto de resplandor */}
        <div
          className={`absolute bottom-0 right-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-500/10'
          }`}
        ></div>

        {/* Patrón de fondo */}
        <div
          className={`absolute inset-0 ${
            isDarkMode ? 'bg-grid-white/[0.03]' : 'bg-grid-slate-300/[0.2]'
          } bg-[length:30px_30px]`}
        ></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            className='grid grid-cols-1 lg:grid-cols-3 gap-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Information */}
            <div className='lg:col-span-1'>
              <motion.div
                className={`${
                  isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                } p-8 rounded-xl shadow-lg border`}
                whileHover={{
                  y: -5,
                  boxShadow: isDarkMode
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <h2 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300'>
                  Ponte en Contacto
                </h2>

                <div className='space-y-8'>
                  <div className='flex items-start group'>
                    <div className='flex-shrink-0'>
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isDarkMode
                            ? 'bg-blue-900/50 group-hover:bg-blue-800/70'
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        } flex items-center justify-center transition-colors duration-300`}
                      >
                        <svg
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        Dirección
                      </h3>
                      <address
                        className={`not-italic ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        Calle IA 123
                        <br />
                        Ciudad Tech, 12345
                        <br />
                        España
                      </address>
                    </div>
                  </div>

                  <div className='flex items-start group'>
                    <div className='flex-shrink-0'>
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isDarkMode
                            ? 'bg-blue-900/50 group-hover:bg-blue-800/70'
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        } flex items-center justify-center transition-colors duration-300`}
                      >
                        <svg
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        Teléfono
                      </h3>
                      <p
                        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        +34 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start group'>
                    <div className='flex-shrink-0'>
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isDarkMode
                            ? 'bg-blue-900/50 group-hover:bg-blue-800/70'
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        } flex items-center justify-center transition-colors duration-300`}
                      >
                        <svg
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        Email
                      </h3>
                      <p
                        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        info@informatik-ai.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-10'>
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Síguenos
                  </h3>
                  <div className='flex space-x-4'>
                    <a
                      href='https://linkedin.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='LinkedIn'
                      className={`w-10 h-10 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-800 hover:bg-blue-900/50 hover:text-blue-300'
                          : 'bg-gray-100 hover:bg-blue-100 hover:text-blue-600'
                      } shadow-lg flex items-center justify-center transition-all duration-300`}
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                      </svg>
                    </a>
                    <a
                      href='https://twitter.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Twitter'
                      className={`w-10 h-10 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-800 hover:bg-blue-900/50 hover:text-blue-300'
                          : 'bg-gray-100 hover:bg-blue-100 hover:text-blue-600'
                      } shadow-lg flex items-center justify-center transition-all duration-300`}
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                      </svg>
                    </a>
                    <a
                      href='https://facebook.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Facebook'
                      className={`w-10 h-10 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-800 hover:bg-blue-900/50 hover:text-blue-300'
                          : 'bg-gray-100 hover:bg-blue-100 hover:text-blue-600'
                      } shadow-lg flex items-center justify-center transition-all duration-300`}
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <motion.div
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-lg border`}
                whileHover={{
                  y: -5,
                  boxShadow: isDarkMode
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <h2 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300'>
                  Envíanos un Mensaje
                </h2>
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section
        className={`py-24 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
        } relative overflow-hidden`}
      >
        {/* Efecto de resplandor */}
        <div
          className={`absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-500/10'
          }`}
        ></div>

        {/* Patrón de fondo */}
        <div
          className={`absolute inset-0 ${
            isDarkMode ? 'bg-grid-white/[0.03]' : 'bg-grid-slate-300/[0.2]'
          } bg-[length:30px_30px]`}
        ></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300'>
                Visita Nuestra Oficina
              </h2>
              <p
                className={`text-xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } max-w-3xl mx-auto`}
              >
                Estamos ubicados en el corazón de Ciudad Tech
              </p>
            </div>

            <motion.div
              className={`mt-10 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              } h-96 rounded-xl shadow-lg overflow-hidden border`}
              whileHover={{
                y: -5,
                boxShadow: isDarkMode
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              {/* Placeholder for Google Maps or other map integration */}
              <div
                className={`relative w-full h-full ${
                  isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                }`}
              >
                {/* Map placeholder with design elements */}
                <div
                  className={`absolute inset-0 ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                      : 'bg-gradient-to-br from-gray-100 to-white'
                  }`}
                ></div>

                {/* Grid pattern */}
                <div
                  className={`absolute inset-0 ${
                    isDarkMode
                      ? 'bg-grid-white/[0.05]'
                      : 'bg-grid-slate-300/[0.2]'
                  } bg-[length:20px_20px]`}
                ></div>

                {/* Digital circuit lines */}
                <div className='absolute inset-0'>
                  <svg
                    width='100%'
                    height='100%'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M0,50 L1000,50'
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'}
                      strokeWidth='0.5'
                      strokeDasharray='10,15'
                      opacity={isDarkMode ? '0.3' : '0.5'}
                    />
                    <path
                      d='M0,150 L1000,150'
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'}
                      strokeWidth='0.5'
                      strokeDasharray='10,15'
                      opacity={isDarkMode ? '0.3' : '0.5'}
                    />
                    <path
                      d='M0,250 L1000,250'
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'}
                      strokeWidth='0.5'
                      strokeDasharray='10,15'
                      opacity={isDarkMode ? '0.3' : '0.5'}
                    />
                    <path
                      d='M50,0 L50,1000'
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'}
                      strokeWidth='0.5'
                      strokeDasharray='10,15'
                      opacity={isDarkMode ? '0.3' : '0.5'}
                    />
                    <path
                      d='M150,0 L150,1000'
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'}
                      strokeWidth='0.5'
                      strokeDasharray='10,15'
                      opacity={isDarkMode ? '0.3' : '0.5'}
                    />
                    <path
                      d='M250,0 L250,1000'
                      stroke={isDarkMode ? '#3b82f6' : '#60a5fa'}
                      strokeWidth='0.5'
                      strokeDasharray='10,15'
                      opacity={isDarkMode ? '0.3' : '0.5'}
                    />
                  </svg>
                </div>

                {/* Map pin */}
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div
                    className='w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg animate-pulse'
                    style={{ animationDuration: '2s' }}
                  >
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                  <div className='w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-400 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2'></div>
                </div>

                <div
                  className={`absolute bottom-4 left-4 right-4 ${
                    isDarkMode
                      ? 'bg-gray-800/90 border-gray-700'
                      : 'bg-white/90 border-gray-200'
                  } backdrop-blur-sm p-4 rounded-lg shadow-lg border`}
                >
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } text-center`}
                  >
                    [El mapa de Google se integrará aquí]
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id='faq-section'
        className={`py-24 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
        } relative overflow-hidden`}
      >
        {/* Efecto de resplandor */}
        <div
          className={`absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-500/10'
          }`}
        ></div>

        {/* Patrón de fondo */}
        <div
          className={`absolute inset-0 ${
            isDarkMode ? 'bg-grid-white/[0.03]' : 'bg-grid-slate-300/[0.2]'
          } bg-[length:30px_30px]`}
        ></div>

        {/* SECCIÓN 2: PREGUNTAS FRECUENTES */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='mt-8 mb-12 text-center'>
            <h2 className='text-4xl font-bold mb-4 text-glow'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                Preguntas Frecuentes
              </span>
            </h2>
            <div className='w-40 h-1 bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] rounded-full mx-auto'></div>
          </div>

          {/* FAQs */}
          <div className='max-w-3xl mx-auto mt-16'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  faqsRef.current[index] = el;
                }}
                className='mb-6 transition-all duration-700 ease-out'
                style={{ opacity: 1, transform: 'translateY(0)' }}
              >
                <div
                  className={`p-6 rounded-xl shadow-sm border ${
                    isDarkMode
                      ? 'border-[#48D1CC]/20 bg-gray-800'
                      : 'border-[#00B4DB]/10 bg-white'
                  } overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative group`}
                >
                  {/* Decoración de fondo */}
                  <div
                    className={`absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full ${
                      isDarkMode ? 'opacity-20' : 'opacity-10'
                    } group-hover:scale-150 transition-transform duration-500`}
                  ></div>

                  <div className='relative z-10'>
                    <button
                      className='flex justify-between items-center w-full text-left'
                      onClick={() =>
                        setActiveIndex(activeIndex === index ? null : index)
                      }
                    >
                      <h3
                        className={`text-xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <span
                        className={`${
                          isDarkMode ? 'text-[#48D1CC]' : 'text-[#00B4DB]'
                        } text-2xl transform transition-transform duration-300`}
                      >
                        {activeIndex === index ? '−' : '+'}
                      </span>
                    </button>

                    <div
                      className={`mt-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      } overflow-hidden transition-all duration-300 ${
                        activeIndex === index
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className='mt-20 text-center'>
            <a
              href='/contact'
              className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer font-bold relative overflow-hidden group'
              style={{
                boxShadow:
                  '0 10px 15px -3px rgba(0, 197, 197, 0.2), 0 4px 6px -4px rgba(0, 197, 197, 0.2)',
              }}
            >
              {/* Efecto de brillo en hover */}
              <span className='absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300'></span>
              <span className='text-lg'>
                ¿Tienes Más Preguntas? Contáctanos
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
