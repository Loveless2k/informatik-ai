'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';

const ServiceHero = () => {
  const [, setIsButtonHovered] = useState(false);
  const [, setIsMounted] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    controls.start('visible');
  }, [controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className='relative py-32 md:py-44 overflow-hidden code-lines-bg bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'>
      {/* Efecto de resplandor superior */}
      <div className='absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30'></div>

      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Grid + scan + matrix */}
      <div className='absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]'></div>
      <div className='scan-effect absolute inset-0 opacity-30'></div>
      <div className='matrix-bg absolute inset-0 opacity-10'></div>

      <motion.div
        className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'
        initial='hidden'
        animate={controls}
        variants={staggerContainer}
      >
        <div className='max-w-5xl mx-auto text-center'>
          <motion.div
            className='inline-block mb-6 px-5 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm border border-blue-800/50'
            variants={fadeInUp}
          >
            NUESTROS SERVICIOS
          </motion.div>

          <motion.h1
            className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white w-full text-center mb-4 text-glow'
            variants={fadeInUp}
          >
            Servicios de{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
              Inteligencia Artificial
            </span>
          </motion.h1>

          <motion.p
            className='text-xl md:text-2xl mb-14 text-gray-300 max-w-3xl mx-auto tech-text'
            variants={fadeInUp}
          >
            Soluciones tecnológicas avanzadas y formación especializada para
            impulsar la transformación digital de tu empresa y potenciar su
            crecimiento.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-6 justify-center items-center'
            variants={fadeInUp}
          >
            <motion.div
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <Button
                href='#servicios'
                size='lg'
                className='hover-lift hover-shadow bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] border-0 px-8 py-4 text-xl font-bold'
              >
                Explorar Servicios
              </Button>
            </motion.div>

            <Button
              href='/contact'
              variant='outline'
              size='lg'
              className='hover-lift hover-shadow bg-white text-[#0f172a] border-0 px-8 py-4 text-xl font-bold transition-all duration-300 hover:bg-opacity-90 hover:scale-105 shadow-md hover:shadow-lg'
            >
              Solicitar Consulta
            </Button>
          </motion.div>
        </div>

        {/* Decoraciones animadas */}
        <div
          className='absolute bottom-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse'
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className='absolute top-20 right-10 w-32 h-32 border border-teal-500/10 rounded-full animate-pulse'
          style={{ animationDuration: '12s' }}
        ></div>
      </motion.div>
    </section>
  );
};

export default ServiceHero;
