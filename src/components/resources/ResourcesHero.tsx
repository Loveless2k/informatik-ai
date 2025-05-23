'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';

const ResourcesHero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 code-lines-bg">
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

      {/* Elementos decorativos adicionales */}
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
           style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/10 rounded-full animate-pulse"
           style={{ animationDuration: '15s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-glow">
              Recursos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">IA y Tecnología</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto tech-text">
              Accede a guías, tutoriales, plantillas y herramientas gratuitas para potenciar tu conocimiento y aplicación de la inteligencia artificial.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <motion.a
                href="#recursos-destacados"
                className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-medium text-lg data-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explorar Recursos
              </motion.a>

              <motion.a
                href="#categorias"
                className="bg-transparent border-2 border-blue-700/30 text-blue-300 hover:bg-blue-900/30 px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-medium text-lg glow-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Categorías
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
