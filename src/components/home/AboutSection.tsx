'use client';

import React, { useRef } from 'react';
import Button from '@/components/ui/Button';
import { motion, useInView } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-[#f8fdff] to-[#E0FBFF]/50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Fondo minimalista con patrón más visible */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] sm:bg-[length:60px_60px] opacity-[0.05] dark:opacity-[0.07]"></div>

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00B4DB]/30 to-transparent"></div>

      {/* Elementos decorativos minimalistas con mayor presencia */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#00B4DB]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#00B4DB]/10 to-transparent rounded-full blur-3xl"></div>

      {/* Animated particles con mayor intensidad */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-[#00B4DB]/15 rounded-full filter blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-[#48D1CC]/15 rounded-full filter blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        ref={sectionRef}
        className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#00B4DB]/10 text-[#00B4DB] dark:text-[#48D1CC] rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm border border-[#00B4DB]/20 dark:border-[#48D1CC]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              NUESTRA VISIÓN
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white leading-tight">
              Transformamos Empresas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#48D1CC]">Soluciones Tecnológicas</span> Innovadoras
            </h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed"
              variants={itemVariants}
            >
              En InformatiK-AI, fusionamos tecnología de vanguardia con experiencia sectorial para crear soluciones que generan resultados empresariales excepcionales.
            </motion.p>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-10 leading-relaxed"
              variants={itemVariants}
            >
              Nuestro equipo multidisciplinar trabaja para entender tus desafíos específicos y desarrollar estrategias personalizadas que aportan valor medible y sostenible.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
              variants={itemVariants}
            >
              <Button
                href="/about"
                variant="gradient"
                size="lg"
                className="rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] hover:from-[#00a0c2] hover:to-[#3ec0c0] shadow-lg hover:shadow-[#00B4DB]/20 transition-all duration-300 w-full sm:w-auto neural-cursor-hover"
              >
                Conoce Nuestra Historia
              </Button>
              <Button
                href="/case-studies"
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-[#00B4DB]/30 dark:border-[#48D1CC]/30 text-[#00B4DB] dark:text-[#48D1CC] hover:bg-[#00B4DB]/10 dark:hover:bg-[#48D1CC]/10 w-full sm:w-auto neural-cursor-hover"
              >
                Casos de Éxito
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mt-8 sm:mt-0"
            variants={imageVariants}
            animate={isInView ? floatingAnimation : {}}
          >
            {/* Modern illustration with updated design */}
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-[#00B4DB]/20 dark:border-[#48D1CC]/20">
              {/* Main background with updated gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fdff] to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"></div>

              {/* Dynamic geometric elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-5 dark:opacity-10"></div>
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-[#00B4DB]/30 dark:bg-[#00B4DB]/40 rounded-full mix-blend-multiply filter blur-xl opacity-40"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div
                  className="absolute top-0 -left-10 w-40 h-40 bg-[#48D1CC]/30 dark:bg-[#48D1CC]/40 rounded-full mix-blend-multiply filter blur-xl opacity-40"
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute -bottom-10 left-20 w-40 h-40 bg-[#00BFFF]/30 dark:bg-[#00BFFF]/40 rounded-full mix-blend-multiply filter blur-xl opacity-40"
                  animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 15, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2
                  }}
                />
              </div>

              {/* Content overlay with improved visual hierarchy */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 dark:from-[#00B4DB]/30 dark:to-[#48D1CC]/30 flex items-center justify-center mb-8 backdrop-blur-md border border-[#00B4DB]/20 dark:border-[#48D1CC]/20 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg className="w-12 h-12 text-[#00B4DB] dark:text-[#48D1CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.div>
                <motion.h3
                  className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Innovación Tecnológica
                </motion.h3>
                <motion.p
                  className="text-center text-gray-600 dark:text-gray-300 text-xl max-w-md leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  Transformamos ideas en soluciones tecnológicas que potencian la eficiencia y competitividad de tu negocio.
                </motion.p>
              </div>
            </div>

            {/* Decorative elements with improved depth */}
            <motion.div
              className="absolute -bottom-8 -left-8 w-20 h-20 rounded-lg bg-[#00B4DB]/20 dark:bg-[#00B4DB]/30 backdrop-blur-md -z-10 border border-[#00B4DB]/20 dark:border-[#00B4DB]/30 shadow-lg"
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#48D1CC]/20 dark:bg-[#48D1CC]/30 backdrop-blur-md -z-10 border border-[#48D1CC]/20 dark:border-[#48D1CC]/30 shadow-lg"
              animate={{
                rotate: [0, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
