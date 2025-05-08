'use client';

import React, { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
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
    description: 'Programas de capacitación personalizados en IA y tecnologías emergentes, diseñados específicamente para las necesidades de tu empresa y equipo.',
    icon: (
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#48D1CC]/20 to-[#00B4DB]/20 flex items-center justify-center mx-auto group-hover:from-[#48D1CC]/30 group-hover:to-[#00B4DB]/30 transition-all duration-300 backdrop-blur-sm border border-[#48D1CC]/20">
        <svg className="w-8 h-8 text-[#48D1CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
    ),
    href: '/services#formacion-in-company',
    color: 'teal',
    caracteristicas: [
      'Programas adaptados a las necesidades específicas',
      'Formación práctica y aplicable',
      'Instructores expertos en IA y tecnologías emergentes',
      'Seguimiento y soporte post-formación'
    ]
  },
  {
    title: 'Asesoría Estratégica',
    description: 'Consultoría especializada para implementar soluciones tecnológicas y de IA adaptadas a los objetivos y necesidades específicas de tu negocio.',
    icon: (
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#00B4DB]/20 to-[#00BFFF]/20 flex items-center justify-center mx-auto group-hover:from-[#00B4DB]/30 group-hover:to-[#00BFFF]/30 transition-all duration-300 backdrop-blur-sm border border-[#00B4DB]/20">
        <svg className="w-8 h-8 text-[#00B4DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    ),
    href: '/services#asesoria-estrategica',
    color: 'blue',
    caracteristicas: [
      'Análisis de necesidades tecnológicas',
      'Planificación estratégica de implementación',
      'Optimización de procesos existentes',
      'Medición de resultados e impacto'
    ]
  },
  {
    title: 'Desarrollo de Cursos',
    description: 'Creación de programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e inteligencia artificial.',
    icon: (
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#48D1CC]/20 flex items-center justify-center mx-auto group-hover:from-[#00BFFF]/30 group-hover:to-[#48D1CC]/30 transition-all duration-300 backdrop-blur-sm border border-[#00BFFF]/20">
        <svg className="w-8 h-8 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-cursos',
    color: 'sky',
    caracteristicas: [
      'Contenido actualizado y relevante',
      'Materiales didácticos interactivos',
      'Adaptación a diferentes niveles',
      'Enfoque práctico y aplicable'
    ]
  },
  {
    title: 'Automatizaciones',
    description: 'Optimización de operaciones y reducción de costos mediante la automatización inteligente de procesos y tareas repetitivas.',
    icon: (
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#00B4DB]/20 to-[#0083B0]/20 flex items-center justify-center mx-auto group-hover:from-[#00B4DB]/30 group-hover:to-[#0083B0]/30 transition-all duration-300 backdrop-blur-sm border border-[#00B4DB]/20">
        <svg className="w-8 h-8 text-[#00B4DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    ),
    href: '/services#automatizaciones',
    color: 'indigo',
    caracteristicas: [
      'Flujos de trabajo automatizados',
      'Integración con sistemas existentes',
      'Reducción de tareas repetitivas',
      'Análisis de datos inteligente'
    ]
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Creación de sitios web, aplicaciones y soluciones IT personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.',
    icon: (
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#48D1CC]/20 to-[#00B4DB]/20 flex items-center justify-center mx-auto group-hover:from-[#48D1CC]/30 group-hover:to-[#00B4DB]/30 transition-all duration-300 backdrop-blur-sm border border-[#48D1CC]/20">
        <svg className="w-8 h-8 text-[#48D1CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-medida',
    color: 'blue',
    caracteristicas: [
      'Diseño personalizado y único',
      'Experiencia de usuario intuitiva',
      'Optimización para dispositivos móviles',
      'Integración con sistemas existentes'
    ]
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Obtener el tema actual
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Variantes de animación mejoradas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${isDarkMode
      ? 'bg-gradient-to-b from-[#0f172a] to-[#1e293b]'
      : 'bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]'}`}>
      {/* Background pattern - Modern tech grid */}
      <div className={`absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] ${isDarkMode ? 'opacity-[0.07]' : 'opacity-[0.15]'}`}></div>

      {/* Circuit board pattern overlay */}
      <div className={`absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover ${isDarkMode ? 'opacity-[0.06]' : 'opacity-[0.08]'}`}></div>

      {/* Decorative elements - Aligned with HeroSection colors */}
      <div className={`absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br ${isDarkMode ? 'from-[#48D1CC]/15' : 'from-[#48D1CC]/25'} to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3`}></div>
      <div className={`absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr ${isDarkMode ? 'from-[#00B4DB]/15' : 'from-[#00B4DB]/25'} to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3`}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r ${isDarkMode ? 'from-[#00B4DB]/10 via-[#48D1CC]/10 to-[#00BFFF]/10' : 'from-[#00B4DB]/20 via-[#48D1CC]/20 to-[#00BFFF]/20'} rounded-full blur-3xl`}></div>

      {/* Neural network nodes - Subtle tech effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`neural-node absolute top-1/4 left-1/4 w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#48D1CC]/30' : 'bg-[#48D1CC]/50'}`}></div>
        <div className={`neural-node absolute top-3/4 left-1/3 w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#00B4DB]/30' : 'bg-[#00B4DB]/50'}`}></div>
        <div className={`neural-node absolute top-1/3 right-1/4 w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#00BFFF]/30' : 'bg-[#00BFFF]/50'}`}></div>
        <div className={`neural-node absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#48D1CC]/30' : 'bg-[#48D1CC]/50'}`}></div>
      </div>

      <motion.div
        ref={sectionRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeading
            title={
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold">
                Nuestros Servicios
              </span>
            }
            subtitle={
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Descubre cómo nuestras soluciones tecnológicas y formativas pueden transformar tu empresa e impulsar su crecimiento.
              </span>
            }
            centered
          />
        </motion.div>

        {/* Modern card grid layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className={`${isDarkMode
                ? 'bg-slate-800/80 border-slate-700/50'
                : 'bg-white/90 border-slate-200/70'}
                backdrop-blur-sm rounded-xl p-8 shadow-md hover:shadow-xl transition-all group relative overflow-hidden border`}
            >
              {/* Decoración de fondo */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} to-transparent rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>

              <div className="relative z-10">
                {/* Icono con animación mejorada */}
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r from-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/20 to-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/30 flex items-center justify-center mb-6 border border-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/30`}
                  variants={iconVariants}
                >
                  {service.icon}
                </motion.div>

                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 group-hover:text-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} transition-colors duration-300`}>
                  {service.title}
                </h3>

                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  {service.description}
                </p>



                {/* Lista de características */}
                <div className="space-y-3 mb-6">
                  {service.caracteristicas.map((caracteristica, i) => (
                    <div key={i} className="flex items-start">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r from-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/20 to-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/30 flex-shrink-0 mt-1 mr-3 flex items-center justify-center border border-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/30`}>
                        <div className={`w-2 h-2 bg-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} rounded-full`}></div>
                      </div>
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caracteristica}</span>
                    </div>
                  ))}
                </div>

                {/* Botón de consulta */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center text-white px-6 py-3 rounded-full bg-gradient-to-r from-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} to-${service.color === 'blue' ? '[#0083B0]' : service.color === 'teal' ? '[#00B4DB]' : service.color === 'sky' ? '[#00B4DB]' : service.color === 'indigo' ? '[#0083B0]' : '[#00B4DB]'} hover:shadow-lg hover:shadow-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/20 transition-all duration-300 cursor-pointer font-semibold relative overflow-hidden group`}
                  onClick={() => window.location.href = service.href}
                >
                  {/* Efecto de brillo en hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

                  <span>Consultar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              href="/services"
              variant="primary"
              size="lg"
              icon={
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.6, 1]
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              }
              iconPosition="right"
              className="rounded-lg shadow-lg bg-gradient-to-r from-[#00B4DB] to-[#0083B0] hover:from-[#00C4EB] hover:to-[#0093C0] text-white font-bold transform transition-transform duration-300 px-8"
            >
              Ver Todos los Servicios
            </Button>
          </motion.div>

          {/* Efecto decorativo debajo del botón */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] rounded-full mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Elementos decorativos adicionales - Estilo moderno */}
        <motion.div
          className={`absolute bottom-10 right-10 w-20 h-20 border ${isDarkMode ? 'border-[#48D1CC]/20' : 'border-[#48D1CC]/40'} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0.4, 0.7, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute top-20 left-10 w-32 h-32 border ${isDarkMode ? 'border-[#00B4DB]/20' : 'border-[#00B4DB]/40'} rounded-full`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: isDarkMode ? [0.2, 0.5, 0.2] : [0.3, 0.6, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute top-1/2 right-1/4 w-16 h-16 border ${isDarkMode ? 'border-[#00BFFF]/20' : 'border-[#00BFFF]/40'} rounded-full`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: isDarkMode ? [0.2, 0.4, 0.2] : [0.3, 0.5, 0.3],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

export default ServicesSection;
