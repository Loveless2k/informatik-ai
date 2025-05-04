'use client';

import React, { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    title: 'Innovación Tecnológica',
    description: 'Implementamos las tecnologías más avanzadas en IA y aprendizaje automático para crear soluciones que te posicionan a la vanguardia de tu industria.',
    icon: (
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16.01L7.5 11.51L9.51 9.5L12 11.99L14.49 9.5L16.5 11.51L12 16.01Z" fill="currentColor" />
          <path d="M21 11.1V8.4L18.51 7.51L17.5 4.99L19.5 2.89L17.11 0.5L15 2.5L12.49 1.49L11.6 -1.23266e-07L8.9 -1.23266e-07L8 2.5L5.49 3.51L3.39 1.5L0.999998 3.89L3 6L1.99 8.51L-1.23266e-07 9.4L-1.23266e-07 12.1L2.5 13L3.51 15.51L1.5 17.61L3.89 20L6 18L8.51 19.01L9.4 21.5L12.1 21.5L13 19L15.51 17.99L17.61 20L20 17.61L18 15.5L19.01 12.99L21.5 12.09L21 11.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="10.75" r="2.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full animate-pulse"></div>
      </div>
    ),
  },
  {
    title: 'Soluciones Personalizadas',
    description: 'Desarrollamos soluciones de IA a medida que abordan tus desafíos empresariales específicos y objetivos de negocio.',
    icon: (
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16.0002V8.00024C20.9996 7.6471 20.9071 7.30133 20.7315 7.00021C20.556 6.69909 20.3037 6.45388 20 6.29024L13 2.29024C12.696 2.12648 12.3511 2.03979 12 2.03979C11.6489 2.03979 11.304 2.12648 11 2.29024L4 6.29024C3.69626 6.45388 3.44398 6.69909 3.26846 7.00021C3.09294 7.30133 3.00036 7.6471 3 8.00024V16.0002C3.00036 16.3534 3.09294 16.6992 3.26846 17.0003C3.44398 17.3014 3.69626 17.5466 4 17.7102L11 21.7102C11.304 21.874 11.6489 21.9607 12 21.9607C12.3511 21.9607 12.696 21.874 13 21.7102L20 17.7102C20.3037 17.5466 20.556 17.3014 20.7315 17.0003C20.9071 16.6992 20.9996 16.3534 21 16.0002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.27002 6.96021L12 12.0102L20.73 6.96021" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22.0002V12.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 4.5L16.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>
    ),
  },
  {
    title: 'Transformación Digital',
    description: 'Impulsamos la transformación de tu negocio mediante soluciones de IA que automatizan procesos, optimizan operaciones y generan nuevas oportunidades.',
    icon: (
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12V7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7.5" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
          <circle cx="16.5" cy="16.5" r="2.5" fill="currentColor" opacity="0.4" />
        </svg>
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
      </div>
    ),
  },
  {
    title: 'Soporte Continuo',
    description: 'Proporcionamos soporte y optimización continuos para garantizar que tus soluciones de IA evolucionen con tu negocio.',
    icon: (
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: "0.7s" }}></div>
      </div>
    ),
  },
];

const WhyChooseUsSection = () => {
  // Referencias y animaciones
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Ya no necesitamos el tema ya que la sección siempre es clara

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-purple-50 to-indigo-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-gray-300/[0.15] bg-[length:30px_30px]"></div>

      {/* Subtle tech pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-3"></div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-200/30 to-transparent rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-indigo-100/20 via-purple-100/10 to-blue-100/20 rounded-full blur-3xl"></div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full filter blur-[80px] bg-pink-200/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full filter blur-[80px] bg-indigo-200/30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      <motion.div
        ref={sectionRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeading
            title={
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
                ¿Por qué elegir InformatiK-AI?
              </span>
            }
            subtitle={
              <span className="text-indigo-800">
                Combinamos experiencia técnica con visión empresarial para ofrecer soluciones de IA que crean valor real.
              </span>
            }
            centered
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center md:items-start text-center md:text-left md:flex-row md:gap-6 group"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-white to-purple-50 flex items-center justify-center mb-4 mx-auto group-hover:from-white group-hover:to-purple-100 transition-all duration-300 border border-purple-200/50 shadow-lg backdrop-blur-sm relative overflow-hidden">
                  {/* Efecto de brillo en el fondo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Líneas decorativas */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent"></div>

                  {/* Contenedor del icono con efecto de elevación */}
                  <div className="relative z-10 text-indigo-600 group-hover:text-purple-700 transition-all duration-300 transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent group-hover:from-indigo-800 group-hover:to-purple-800 transition-all duration-300">{feature.title}</h3>
                <p className="text-indigo-900/80 leading-relaxed text-base">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full animate-pulse border border-pink-400/30"
             style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full animate-pulse border border-indigo-400/30"
             style={{ animationDuration: '15s' }}></div>

        {/* Partículas flotantes adicionales */}
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-pink-400/40 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-indigo-400/40 animate-float-delay"></div>

        {/* Elementos decorativos adicionales inspirados en ServicesSection */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-purple-400/20 rounded-full"
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
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-indigo-300 to-pink-300 rounded-full mx-auto mt-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;
