'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { motion, useAnimation } from 'framer-motion';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';
import { useTheme } from '@/context/ThemeContext';

const HeroSection = () => {
  // Estado para controlar la animación del botón
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Obtener el tema actual
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (error) {
    themeContext = { theme: 'light' };
  }
  const isDarkMode = themeContext?.theme === 'dark';

  // Controles de animación
  const controls = useAnimation();

  // Efecto para iniciar animaciones después del montaje
  useEffect(() => {
    setIsMounted(true);
    controls.start('visible');
  }, [controls]);

  // Variantes de animación mejoradas
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Variantes para el efecto de destello del título
  const glowVariants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={`relative py-32 md:py-44 overflow-hidden code-lines-bg ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
    }`}>
      {/* Efecto de resplandor superior */}
      <div className={`absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] ${
        isDarkMode ? 'bg-blue-900/30' : 'bg-blue-800/20'
      }`}></div>

      {/* Neural Network Background con opacidad ajustada */}
      <NeuralNetworkBackground />

      {/* Grid pattern overlay más sutil */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]"></div>

      {/* Efecto de escaneo sutil */}
      <div className="scan-effect absolute inset-0 opacity-30"></div>

      {/* Content */}
      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Título con efecto de resplandor */}
          <div className="relative mb-8">
            <motion.div
              className={`absolute inset-0 rounded-full filter blur-[80px] -z-10 ${
                isDarkMode ? 'bg-blue-900/20' : 'bg-blue-800/10'
              }`}
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white text-glow"
              variants={fadeInUp}
            >
              Transformando Negocios con{' '}
              <span className={`text-transparent bg-clip-text ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300'
                  : 'bg-gradient-to-r from-blue-300 via-blue-200 to-teal-200'
              }`}>
                Soluciones de IA
              </span>{' '}
              Inteligentes
            </motion.h1>
          </div>

          <motion.p
            className="text-xl md:text-2xl mb-14 text-gray-300 max-w-3xl mx-auto tech-text"
            variants={fadeInUp}
          >
            Potenciando tu transformación digital con tecnologías de inteligencia artificial
            y aprendizaje automático de vanguardia.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={fadeInUp}
          >
            {/* Botón principal con efecto de datos - Más grande */}
            <motion.div
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <Button
                href="/services"
                variant="gradient"
                size="xl"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
                iconPosition="right"
                className={`rounded-full shadow-xl data-button h-[64px] flex items-center text-2xl font-bold px-12 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700'
                    : 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800'
                }`}
              >
                Explorar Nuestros Servicios
              </Button>
            </motion.div>

            {/* Botón secundario con borde brillante - Alineado verticalmente */}
            <Button
              href="/contact"
              variant="outline"
              size="xl"
              className={`rounded-full border-2 glow-border h-[56px] flex items-center self-center ${
                isDarkMode
                  ? 'border-blue-400/50 text-blue-300 hover:bg-blue-900/30'
                  : 'border-blue-300/50 text-blue-200 hover:bg-blue-800/20'
              }`}
            >
              Contáctanos
            </Button>
          </motion.div>
        </div>

        {/* Elementos decorativos mejorados */}
        <div className="absolute bottom-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
             style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-20 right-10 w-32 h-32 border border-teal-500/10 rounded-full animate-pulse"
             style={{ animationDuration: '12s' }}></div>

        {/* Elementos de matriz adicionales */}
        <div className="matrix-bg absolute inset-0 opacity-10"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
