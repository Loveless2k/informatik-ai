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
    <section className="py-24 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 relative overflow-hidden code-lines-bg">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-800/30 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>

      {/* Efecto de escaneo sutil */}
      <div className="scan-effect absolute inset-0 opacity-20"></div>

      {/* Animated particles */}
      <motion.div
        className="absolute top-20 right-20 w-80 h-80 bg-blue-700/40 rounded-full filter blur-[100px]"
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
        className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/30 rounded-full filter blur-[100px]"
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

      {/* Matrix background */}
      <div className="matrix-bg absolute inset-0 opacity-10"></div>

      <motion.div
        ref={sectionRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-block mb-6 px-5 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm border border-blue-800/50"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              NUESTRA VISIÓN
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight text-glow">
              Transformamos Empresas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Soluciones Tecnológicas</span> Innovadoras
            </h2>
            <motion.p
              className="text-xl text-gray-300 mb-6 leading-relaxed tech-text"
              variants={itemVariants}
            >
              En InformatiK-AI, fusionamos tecnología de vanguardia con experiencia sectorial para crear soluciones que generan resultados empresariales excepcionales.
            </motion.p>
            <motion.p
              className="text-xl text-gray-300 mb-10 leading-relaxed tech-text"
              variants={itemVariants}
            >
              Nuestro equipo multidisciplinar trabaja para entender tus desafíos específicos y desarrollar estrategias personalizadas que aportan valor medible y sostenible.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-5"
              variants={itemVariants}
            >
              <Button
                href="/about"
                variant="gradient"
                size="lg"
                className="rounded-full data-button bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg"
              >
                Conoce Nuestra Historia
              </Button>
              <Button
                href="/case-studies"
                variant="outline"
                size="lg"
                className="rounded-full border-2 glow-border border-blue-700/30 text-blue-300 hover:bg-blue-900/30"
              >
                Casos de Éxito
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={imageVariants}
            animate={isInView ? floatingAnimation : {}}
          >
            {/* Modern 3D illustration with improved design */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-blue-600/30 backdrop-blur-sm">
              {/* Main background with more professional gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-blue-800 to-gray-800"></div>

              {/* Dynamic geometric elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-15"></div>
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-40"
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
                  className="absolute top-0 -left-10 w-40 h-40 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-40"
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
                  className="absolute -bottom-10 left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-40"
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
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10">
                <motion.div
                  className="w-24 h-24 rounded-full bg-blue-900/40 flex items-center justify-center mb-8 backdrop-blur-md border border-blue-700/30 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.div>
                <motion.h3
                  className="text-4xl font-bold mb-6 text-center text-white drop-shadow-md text-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Innovación Tecnológica
                </motion.h3>
                <motion.p
                  className="text-center text-blue-100 text-xl max-w-md leading-relaxed font-medium drop-shadow-md"
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
              className="absolute -bottom-8 -left-8 w-20 h-20 rounded-lg bg-blue-700/40 backdrop-blur-md -z-10 border border-blue-600/30 shadow-lg"
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
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-teal-700/30 backdrop-blur-md -z-10 border border-teal-600/20 shadow-lg"
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
