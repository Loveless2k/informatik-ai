'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button';

const SuccessHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section className='relative py-32 md:py-44 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 code-lines-bg'>
      <div className='absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30'></div>
      {/* Fondo neural simplificado para evitar problemas de hidratación */}
      <div className='absolute inset-0'>
        <svg
          className='w-full h-full opacity-10'
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <radialGradient
              id='nodeGradient'
              cx='50%'
              cy='50%'
              r='50%'
              fx='50%'
              fy='50%'
            >
              <stop offset='0%' stopColor='#60A5FA' stopOpacity='0.8' />
              <stop offset='100%' stopColor='#3B82F6' stopOpacity='0' />
            </radialGradient>
          </defs>
          {/* Puntos de la red neural con posiciones fijas */}
          <circle cx='20' cy='30' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='40' cy='20' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='60' cy='40' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='80' cy='25' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='30' cy='60' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='70' cy='70' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='15' cy='80' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          <circle cx='85' cy='60' r='0.5' fill='url(#nodeGradient)' className='animate-pulse' />
          {/* Líneas de conexión */}
          <line x1='20' y1='30' x2='40' y2='20' stroke='#3B82F6' strokeWidth='0.1' strokeOpacity='0.3' />
          <line x1='40' y1='20' x2='60' y2='40' stroke='#3B82F6' strokeWidth='0.1' strokeOpacity='0.3' />
          <line x1='60' y1='40' x2='80' y2='25' stroke='#3B82F6' strokeWidth='0.1' strokeOpacity='0.3' />
          <line x1='30' y1='60' x2='70' y2='70' stroke='#3B82F6' strokeWidth='0.1' strokeOpacity='0.3' />
          <line x1='15' y1='80' x2='30' y2='60' stroke='#3B82F6' strokeWidth='0.1' strokeOpacity='0.3' />
          <line x1='70' y1='70' x2='85' y2='60' stroke='#3B82F6' strokeWidth='0.1' strokeOpacity='0.3' />
        </svg>
      </div>
      <div className='absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]'></div>
      <div className='scan-effect absolute inset-0 opacity-30'></div>
      <div className='matrix-bg absolute inset-0 opacity-10'></div>

      <div className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto text-center'>
          <div ref={ref}>
            <motion.div
              initial='hidden'
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
                <motion.h1
                  className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight text-glow'
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  Historias de{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                    Transformación
                  </span>{' '}
                  Digital
                </motion.h1>

                <motion.p
                  className='text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto tech-text'
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  Descubre cómo nuestras soluciones de IA han impulsado el
                  crecimiento exponencial de nuestros clientes y transformado su
                  presencia digital.
                </motion.p>

                <motion.div
                  className='flex flex-wrap justify-center gap-6'
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  <Button
                    href='#camidev'
                    size='lg'
                    className='hover-lift hover-shadow bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] border-0 px-8 py-4 text-xl font-bold'
                  >
                    Ver Casos de Éxito
                  </Button>
                  <Button
                    href='/contact'
                    variant='outline'
                    size='lg'
                    className='hover-lift hover-shadow bg-white text-[#0f172a] border-0 px-8 py-4 text-xl font-bold transition-all duration-300 hover:bg-opacity-90 hover:scale-105 shadow-md hover:shadow-lg'
                  >
                    Sé el Próximo Caso
                  </Button>
                </motion.div>
              </motion.div>
          </div>

          {/* Gráfico animado de crecimiento */}
          <div className='mt-16 relative h-40 md:h-60'>
            <motion.svg
                className='w-full h-full'
                viewBox='0 0 1000 300'
                xmlns='http://www.w3.org/2000/svg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <line
                  x1='50'
                  y1='250'
                  x2='950'
                  y2='250'
                  stroke='rgba(255,255,255,0.3)'
                  strokeWidth='2'
                />
                <line
                  x1='50'
                  y1='50'
                  x2='50'
                  y2='250'
                  stroke='rgba(255,255,255,0.3)'
                  strokeWidth='2'
                />

                <motion.path
                  d='M50,250 Q200,240 300,200 T500,150 T700,80 T950,30'
                  fill='none'
                  stroke='url(#gradient)'
                  strokeWidth='4'
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                <defs>
                  <linearGradient
                    id='gradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='0%'
                  >
                    <stop offset='0%' stopColor='#1E40AF' />
                    <stop offset='100%' stopColor='#3B82F6' />
                  </linearGradient>
                </defs>

                {[
                  { cx: 50, cy: 250, delay: 0.7 },
                  { cx: 300, cy: 200, delay: 1.0 },
                  { cx: 500, cy: 150, delay: 1.3 },
                  { cx: 700, cy: 80, delay: 1.6 },
                  { cx: 950, cy: 30, delay: 1.9 },
                ].map((point, index) => (
                  <motion.circle
                    key={index}
                    cx={point.cx}
                    cy={point.cy}
                    r='6'
                    fill='#3B82F6'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: point.delay, duration: 0.5 }}
                  />
                ))}

                <motion.text
                  x='30'
                  y='270'
                  fill='white'
                  fontSize='12'
                  textAnchor='middle'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  Inicio
                </motion.text>
                <motion.text
                  x='950'
                  y='15'
                  fill='white'
                  fontSize='14'
                  fontWeight='bold'
                  textAnchor='middle'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                >
                  +290K
                </motion.text>
              </motion.svg>
          </div>
        </div>
      </div>

      <div
        className='absolute bottom-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse'
        style={{ animationDuration: '8s' }}
      ></div>
      <div
        className='absolute top-20 right-10 w-32 h-32 border border-teal-500/10 rounded-full animate-pulse'
        style={{ animationDuration: '12s' }}
      ></div>
      <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/60 to-transparent'></div>
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700/50 via-blue-800/50 to-blue-700/50'></div>
    </section>
  );
};

export default SuccessHero;
