'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DualToneTextProps {
  firstPart: string;
  secondPart: string;
  className?: string;
  firstPartColor?: string;
  secondPartColor?: string;
  glowColor?: string;
  letterSpacing?: string;
}

const DualToneText = ({
  firstPart,
  secondPart,
  className = '',
  firstPartColor = 'text-white',
  secondPartColor = 'text-secondary-light', // Color secundario más brillante
  glowColor = '#14b8a6',
  letterSpacing = 'widest'
}: DualToneTextProps) => {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Efecto para establecer que estamos en el cliente después del montaje
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Variantes para la animación del texto principal
  const firstPartVariants = {
    initial: {
      textShadow: `0 0 0px ${glowColor}`
    },
    animate: {
      textShadow: [
        `0 0 1px ${glowColor}`,
        `0 0 3px ${glowColor}`,
        `0 0 1px ${glowColor}`
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Variantes para la animación del texto destacado
  const secondPartVariants = {
    initial: {
      textShadow: `0 0 2px ${glowColor}`
    },
    animate: {
      textShadow: [
        `0 0 3px ${glowColor}`,
        `0 0 10px ${glowColor}`,
        `0 0 5px ${glowColor}`,
        `0 0 3px ${glowColor}`
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Mapear los valores de letterSpacing a clases de Tailwind
  const getTrackingClass = () => {
    switch (letterSpacing) {
      case 'tighter':
        return 'tracking-tighter';
      case 'tight':
        return 'tracking-tight';
      case 'normal':
        return 'tracking-normal';
      case 'wide':
        return 'tracking-wide';
      case 'wider':
        return 'tracking-wider';
      case 'widest':
        return 'tracking-widest';
      default:
        return `tracking-${letterSpacing}`;
    }
  };

  // Manejar el caso especial para letterSpacing que incluye breakpoints
  const getResponsiveTrackingClass = () => {
    if (letterSpacing.includes(' ')) {
      // Si contiene espacios, asumimos que es un valor responsive como "tighter sm:normal md:normal lg:wide"
      return letterSpacing.split(' ').map(spacing => {
        if (spacing.includes(':')) {
          const [breakpoint, value] = spacing.split(':');
          return `${breakpoint}:${getTrackingClass(value)}`;
        }
        return getTrackingClass(spacing);
      }).join(' ');
    }
    return getTrackingClass();
  };

  return (
    <div className={`inline-flex items-center ${getResponsiveTrackingClass()} font-medium ${className} whitespace-nowrap`}>
      {/* Primera parte del texto */}
      <span className="relative">
        {isClient ? (
          <motion.span
            className={`${firstPartColor}`}
            initial="initial"
            animate="animate"
            variants={firstPartVariants}
          >
            {firstPart}
          </motion.span>
        ) : (
          <span className={`${firstPartColor}`}>{firstPart}</span>
        )}
      </span>

      {/* Segunda parte del texto con mayor énfasis */}
      <span className="relative ml-[1px]">
        {isClient ? (
          <motion.span
            className={`${secondPartColor} font-bold`}
            initial="initial"
            animate="animate"
            variants={secondPartVariants}
          >
            {secondPart}
          </motion.span>
        ) : (
          <span className={`${secondPartColor} font-bold`}>{secondPart}</span>
        )}
      </span>
    </div>
  );
};

export default DualToneText;
