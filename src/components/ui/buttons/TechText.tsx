'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TechTextProps {
  children: React.ReactNode;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  glowColor?: string;
  textColor?: string;
}

const TechText = ({
  children,
  className = '',
  glitchIntensity = 'medium',
  glowColor = '#14b8a6', // Color secundario por defecto
  textColor = 'white',
}: TechTextProps) => {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Efecto para establecer que estamos en el cliente después del montaje
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Configuración de intensidad del glitch
  const glitchConfig = {
    low: {
      frequency: 10, // Segundos entre glitches
      duration: 0.1, // Duración del glitch
      intensity: 1, // Intensidad del efecto
    },
    medium: {
      frequency: 5,
      duration: 0.2,
      intensity: 2,
    },
    high: {
      frequency: 3,
      duration: 0.3,
      intensity: 3,
    },
  }[glitchIntensity];

  // Variantes para la animación del texto
  const textVariants = {
    initial: {
      textShadow: `0 0 0px ${glowColor}`,
    },
    animate: {
      textShadow: [
        `0 0 2px ${glowColor}`,
        `0 0 8px ${glowColor}`,
        `0 0 4px ${glowColor}`,
        `0 0 2px ${glowColor}`,
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    hover: {
      textShadow: `0 0 12px ${glowColor}, 0 0 20px ${glowColor}`,
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Efecto de glitch predeterminado en lugar de aleatorio
  const staticGlitchEffect = {
    x: [0, -2, 3, -1, 0],
    y: [0, 1, -1, 0],
    filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
    opacity: [1, 0.8, 1],
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Capa de texto principal con efecto de neón - Condicional para animaciones */}
      <span
        className={`relative inline-block font-bold tracking-wider text-${textColor} truncate max-w-full`}
      >
        {isClient ? (
          <motion.span
            className='w-full'
            initial='initial'
            animate='animate'
            whileHover='hover'
            variants={textVariants}
          >
            {children}
          </motion.span>
        ) : (
          children
        )}
      </span>

      {/* Efecto de glitch - Solo en el cliente */}
      {isClient && (
        <motion.span
          className='absolute top-0 left-0 w-full h-full flex items-center justify-start text-white font-bold tracking-wider truncate'
          animate={staticGlitchEffect}
          transition={{
            duration: glitchConfig.duration,
            repeat: Infinity,
            repeatDelay: glitchConfig.frequency,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.span>
      )}

      {/* Línea de subrayado animada - Solo en el cliente */}
      {isClient ? (
        <motion.div
          className='absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent'
          initial={{ width: '0%' }}
          animate={{
            width: ['0%', '100%', '0%'],
            left: ['0%', '0%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ) : (
        <div className='absolute bottom-0 left-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-secondary to-transparent' />
      )}
    </div>
  );
};

export default TechText;
