'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button';

const SuccessHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMounted, setIsMounted] = useState(false);

  // Asegurarse de que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setIsMounted(true);
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Renderizado del lado del servidor - versión simplificada
  if (!isMounted) {
    return (
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div ref={ref}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Historias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Transformación</span> Digital
              </h1>

              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                Descubre cómo nuestras soluciones de IA han impulsado el crecimiento exponencial
                de nuestros clientes y transformado su presencia digital.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#camidev"
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Casos de Éxito
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Sé el Próximo Caso
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Renderizado del lado del cliente - versión completa con animaciones
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      {/* Partículas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          // Usar valores deterministas basados en el índice en lugar de Math.random()
          const size = 5 + (i % 10);
          const top = (i * 3.33) % 100;
          const left = (i * 7.77) % 100;
          const animationDuration = 10 + (i % 10);
          const opacity = 0.3 + (i % 5) * 0.1;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500/10"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                animation: `float ${animationDuration}s linear infinite`,
                opacity: opacity,
              }}
            />
          );
        })}
      </div>

      {/* Líneas de conexión animadas */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(129, 140, 248, 0.1)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0.1)" />
            </linearGradient>
          </defs>
          <g stroke="url(#grad1)" strokeWidth="1">
            <line x1="0%" y1="20%" x2="100%" y2="80%" className="animate-draw-line-1" />
            <line x1="80%" y1="0%" x2="20%" y2="100%" className="animate-draw-line-2" />
            <line x1="30%" y1="10%" x2="70%" y2="90%" className="animate-draw-line-3" />
            <line x1="90%" y1="30%" x2="10%" y2="70%" className="animate-draw-line-4" />
          </g>
        </svg>
      </div>

      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            ref={ref}
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              Historias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Transformación</span> Digital
            </motion.h1>

            <motion.p
              className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto"
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
                className="bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Ver Casos de Éxito
              </Button>
              <Button
                href="/contact"
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Sé el Próximo Caso
              </Button>
            </motion.div>
          </motion.div>

          {/* Gráfico animado de crecimiento */}
          <motion.div
            className="mt-16 relative h-40 md:h-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <svg className="w-full h-full" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
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
                transition={{ duration: 2, delay: 1 }}
              />

              {/* Gradiente para la línea */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>

              {/* Puntos en la línea */}
              <motion.circle
                cx="50" cy="250" r="6"
                fill="#8B5CF6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              <motion.circle
                cx="300" cy="200" r="6"
                fill="#8B5CF6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              />
              <motion.circle
                cx="500" cy="150" r="6"
                fill="#A855F7"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              />
              <motion.circle
                cx="700" cy="80" r="6"
                fill="#D946EF"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1, duration: 0.5 }}
              />
              <motion.circle
                cx="950" cy="30" r="8"
                fill="#EC4899"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </motion.circle>

              {/* Etiquetas */}
              <motion.text x="30" y="270" fill="white" fontSize="12" textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >Inicio</motion.text>
              <motion.text x="950" y="15" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >+290K</motion.text>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Forma decorativa */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 via-pink-400/50 to-purple-500/50"></div>
    </section>
  );
};

export default SuccessHero;
