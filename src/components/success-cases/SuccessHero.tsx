'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';

const SuccessHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMounted, setIsMounted] = useState(false);

  // Asegurarse de que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setIsMounted(true);

    // Iniciar animaciones cuando el componente esté montado
    if (isMounted && isInView) {
      controls.start('visible');
    }
  }, [controls, isInView, isMounted]);

  // Renderizado unificado con visibilidad condicional para las animaciones
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 code-lines-bg">
      {/* Efecto de resplandor superior */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30"></div>

      {/* Neural Network Background - solo en cliente */}
      {isMounted && <NeuralNetworkBackground />}

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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Contenido principal - visible siempre pero con animaciones solo en cliente */}
          <div ref={ref}>
            {isMounted ? (
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-glow"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                >
                  Historias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">Transformación</span> Digital
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto tech-text"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                >
                  Descubre cómo nuestras soluciones de IA han impulsado el crecimiento exponencial
                  de nuestros clientes y transformado su presencia digital.
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                >
                  <Button
                    href="#camidev"
                    size="lg"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 data-button"
                  >
                    Ver Casos de Éxito
                  </Button>
                  <Button
                    href="/contact"
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-blue-700/30 text-blue-300 hover:bg-blue-900/30 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glow-border"
                  >
                    Sé el Próximo Caso
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              // Versión sin animaciones para SSR
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Historias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">Transformación</span> Digital
                </h1>

                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                  Descubre cómo nuestras soluciones de IA han impulsado el crecimiento exponencial
                  de nuestros clientes y transformado su presencia digital.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    href="#camidev"
                    size="lg"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Ver Casos de Éxito
                  </Button>
                  <Button
                    href="/contact"
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-blue-700/30 text-blue-300 hover:bg-blue-900/30 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Sé el Próximo Caso
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Gráfico animado de crecimiento - visible siempre pero con animaciones solo en cliente */}
          <div className="mt-16 relative h-40 md:h-60">
            {isMounted ? (
              <motion.svg
                className="w-full h-full"
                viewBox="0 0 1000 300"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Eje X e Y */}
                <line x1="50" y1="250" x2="950" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="50" y1="50" x2="50" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                {/* Línea de crecimiento */}
                <motion.path
                  d="M50,250 Q200,240 300,200 T500,150 T700,80 T950,30"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Gradiente para la línea */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>

                {/* Puntos en la línea */}
                <motion.circle
                  cx="50" cy="250" r="6"
                  fill="#1E40AF"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                />
                <motion.circle
                  cx="300" cy="200" r="6"
                  fill="#1E40AF"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                />
                <motion.circle
                  cx="500" cy="150" r="6"
                  fill="#2563EB"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                />
                <motion.circle
                  cx="700" cy="80" r="6"
                  fill="#3B82F6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                />
                <motion.circle
                  cx="950" cy="30" r="8"
                  fill="#60A5FA"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                >
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </motion.circle>

                {/* Etiquetas */}
                <motion.text x="30" y="270" fill="white" fontSize="12" textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >Inicio</motion.text>
                <motion.text x="950" y="15" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                >+290K</motion.text>
              </motion.svg>
            ) : (
              // Versión estática para SSR
              <svg className="w-full h-full" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
                {/* Eje X e Y */}
                <line x1="50" y1="250" x2="950" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="50" y1="50" x2="50" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                {/* Línea de crecimiento estática */}
                <path
                  d="M50,250 Q200,240 300,200 T500,150 T700,80 T950,30"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="4"
                />

                {/* Puntos en la línea */}
                <circle cx="50" cy="250" r="6" fill="#1E40AF" />
                <circle cx="300" cy="200" r="6" fill="#1E40AF" />
                <circle cx="500" cy="150" r="6" fill="#2563EB" />
                <circle cx="700" cy="80" r="6" fill="#3B82F6" />
                <circle cx="950" cy="30" r="8" fill="#60A5FA" />

                {/* Etiquetas */}
                <text x="30" y="270" fill="white" fontSize="12" textAnchor="middle">Inicio</text>
                <text x="950" y="15" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">+290K</text>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Forma decorativa */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700/50 via-blue-800/50 to-blue-700/50"></div>
    </section>
  );
};

export default SuccessHero;
