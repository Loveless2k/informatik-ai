'use client';

import React, { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, useInView } from 'framer-motion';

const services = [
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
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

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
    <section className="py-24 md:py-32 bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Background pattern - Modern tech grid */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] opacity-[0.07]"></div>

      {/* Circuit board pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.06]"></div>

      {/* Decorative elements - Aligned with HeroSection colors */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#48D1CC]/15 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#00B4DB]/15 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-[#00B4DB]/10 via-[#48D1CC]/10 to-[#00BFFF]/10 rounded-full blur-3xl"></div>

      {/* Neural network nodes - Subtle tech effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="neural-node absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#48D1CC]/30"></div>
        <div className="neural-node absolute top-3/4 left-1/3 w-3 h-3 rounded-full bg-[#00B4DB]/30"></div>
        <div className="neural-node absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#00BFFF]/30"></div>
        <div className="neural-node absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-[#48D1CC]/30"></div>
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
              <span className="text-gray-300 max-w-3xl mx-auto">
                Descubre cómo nuestras soluciones tecnológicas y formativas pueden transformar tu empresa e impulsar su crecimiento.
              </span>
            }
            centered
          />
        </motion.div>

        {/* Modern card grid layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className="glow-effect h-full"
            >
              <Card
                title={service.title}
                description={service.description}
                href={service.href}
                className={`h-full flex flex-col group transition-all duration-300 bg-slate-800/80 backdrop-blur-sm border border-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/20 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/30`}
              >
                <div className="flex flex-col items-center pt-6 pb-4 relative">
                  {/* Fondo decorativo para el icono */}
                  <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/10 to-transparent opacity-70`}></div>

                  {/* Icono con animación mejorada */}
                  <motion.div
                    className="flex items-center justify-center relative z-10"
                    variants={iconVariants}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Línea decorativa moderna */}
                  <div className={`w-16 h-0.5 bg-gradient-to-r from-transparent via-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/40 to-transparent my-3`}></div>
                </div>

                <div className="px-5 py-4 flex-grow">
                  <h3 className={`text-lg font-bold mb-2 text-white group-hover:text-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} transition-colors duration-300`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Flecha indicadora */}
                <div className="px-5 pb-4 flex justify-end">
                  <motion.div
                    className={`w-6 h-6 rounded-full flex items-center justify-center bg-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'}/20 text-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} group-hover:bg-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} group-hover:text-white transition-all duration-300`}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      times: [0, 0.6, 1]
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </Card>
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
          className="absolute bottom-10 right-10 w-20 h-20 border border-[#48D1CC]/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-[#00B4DB]/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 border border-[#00BFFF]/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
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
