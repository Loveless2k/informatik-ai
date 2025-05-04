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
      <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto group-hover:bg-teal-200 transition-colors duration-300">
        <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
    ),
    href: '/services#formacion-in-company',
  },
  {
    title: 'Asesoría Estratégica',
    description: 'Consultoría especializada para implementar soluciones tecnológicas y de IA adaptadas a los objetivos y necesidades específicas de tu negocio.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto group-hover:bg-slate-200 transition-colors duration-300">
        <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    ),
    href: '/services#asesoria-estrategica',
  },
  {
    title: 'Desarrollo de Cursos',
    description: 'Creación de programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e inteligencia artificial.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center mx-auto group-hover:bg-sky-200 transition-colors duration-300">
        <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-cursos',
  },
  {
    title: 'Automatizaciones',
    description: 'Optimización de operaciones y reducción de costos mediante la automatización inteligente de procesos y tareas repetitivas.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto group-hover:bg-indigo-200 transition-colors duration-300">
        <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    ),
    href: '/services#automatizaciones',
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Creación de sitios web, aplicaciones y soluciones IT personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto group-hover:bg-teal-200 transition-colors duration-300">
        <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-medida',
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

  const cardHoverVariants = {
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
    <section className="py-24 md:py-32 bg-gradient-to-b from-blue-50 to-slate-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-gray-300/[0.15] bg-[length:30px_30px]"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-teal-200/30 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-sky-100/20 via-blue-100/10 to-purple-100/20 rounded-full blur-3xl"></div>

      {/* Subtle tech pattern */}
      <div className="absolute inset-0 opacity-3 circuit-pattern"></div>

      <motion.div
        ref={sectionRef}
        className="container relative z-10 mx-auto px-2 sm:px-4 lg:px-6 max-w-[1400px]"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeading
            title={
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 font-bold">
                Nuestros Servicios
              </span>
            }
            subtitle={
              <span className="text-slate-600 max-w-3xl mx-auto">
                Descubre cómo nuestras soluciones tecnológicas y formativas pueden transformar tu empresa e impulsar su crecimiento.
              </span>
            }
            centered
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-between gap-2 mt-16"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              variants={cardHoverVariants}
              className="glow-effect w-[19%] min-w-[180px]"
            >
              <Card
                title={service.title}
                description={service.description}
                href={service.href}
                className="text-center h-full flex flex-col group transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg px-1"
              >
                <div className="flex flex-col items-center pt-4 pb-2 relative">
                  {/* Fondo decorativo para el icono */}
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 to-transparent opacity-70"></div>

                  {/* Icono con animación mejorada */}
                  <motion.div
                    className="h-16 flex items-center justify-center relative z-10"
                    variants={iconVariants}
                  >
                    {/* Mantenemos los colores originales de cada servicio */}
                    {service.icon}
                  </motion.div>

                  {/* Línea decorativa */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-2"></div>
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
              className="rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg hover:shadow-indigo-300/30 px-8"
            >
              Ver Todos los Servicios
            </Button>
          </motion.div>

          {/* Efecto decorativo debajo del botón */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-indigo-300 to-teal-300 rounded-full mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Elementos decorativos adicionales */}
        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 border-2 border-teal-400/20 rounded-full"
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
          className="absolute top-20 left-10 w-32 h-32 border-2 border-indigo-400/20 rounded-full"
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
          className="absolute top-1/2 right-1/4 w-16 h-16 border border-sky-400/20 rounded-full"
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
