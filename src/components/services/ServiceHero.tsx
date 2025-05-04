'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';

const ServiceHero = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Variantes de animación para elementos
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 code-lines-bg">
      {/* Efecto de resplandor superior */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30"></div>

      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Efecto de escaneo sutil */}
      <div className="scan-effect absolute inset-0 opacity-20"></div>

      {/* Matrix background */}
      <div className="matrix-bg absolute inset-0 opacity-10"></div>

      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

      {/* Contenido */}
      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6 px-5 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm border border-blue-800/50"
            variants={fadeInUp}
          >
            NUESTROS SERVICIOS
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-white leading-tight text-glow"
            variants={fadeInUp}
          >
            Servicios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">Inteligencia Artificial</span> y Tecnología
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto tech-text"
            variants={fadeInUp}
          >
            Soluciones tecnológicas avanzadas y formación especializada para impulsar
            la transformación digital de tu empresa y potenciar su crecimiento.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={fadeInUp}
          >
            <Button
              href="#servicios"
              variant="gradient"
              size="xl"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              }
              iconPosition="right"
              className="rounded-full data-button bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Explorar Servicios
            </Button>

            <Button
              href="/contact"
              variant="outline"
              size="xl"
              className="rounded-full border-2 glow-border border-blue-700/30 text-blue-300 hover:bg-blue-900/30"
            >
              Solicitar Consulta
            </Button>
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-16 text-blue-300/70"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className="text-sm font-medium mb-2">Descubre más</p>
            <motion.div
              className="w-6 h-10 border-2 border-blue-700/50 rounded-full flex justify-center p-1 glow-border"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
           style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/10 rounded-full animate-pulse"
           style={{ animationDuration: '15s' }}></div>

      {/* Forma decorativa */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700/50 via-blue-800/50 to-blue-700/50"></div>
    </section>
  );
};

export default ServiceHero;
