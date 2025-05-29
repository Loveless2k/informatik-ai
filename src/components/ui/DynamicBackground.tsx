'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DynamicBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Comprobar si el navegador soporta la media query de preferencia de reducción de movimiento
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      // Función para manejar cambios en la preferencia
      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      // Suscribirse a cambios en la preferencia
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback para navegadores más antiguos
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }

    return undefined;
  }, []);

  // No renderizar nada durante SSR
  if (!isMounted) {
    return null;
  }

  // Si el usuario prefiere reducción de movimiento, mostrar un fondo estático
  if (prefersReducedMotion) {
    return (
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full filter blur-[100px]' />
        <div className='absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-teal-500/20 rounded-full filter blur-[100px]' />
        <div className='absolute bottom-1/4 left-1/3 w-[35rem] h-[35rem] bg-accent/20 rounded-full filter blur-[100px]' />
      </div>
    );
  }

  return (
    <div className='absolute inset-0 overflow-hidden'>
      <motion.div
        className='absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full filter blur-[100px]'
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className='absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-teal-500/20 rounded-full filter blur-[100px]'
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className='absolute bottom-1/4 left-1/3 w-[35rem] h-[35rem] bg-accent/20 rounded-full filter blur-[100px]'
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
};

export default DynamicBackground;
