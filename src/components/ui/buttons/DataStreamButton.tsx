'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DualToneText from './DualToneText';
import { useTheme } from '@/context/ThemeContext';

interface DataStreamButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const DataStreamButton = ({
  href,
  children,
  className = '',
}: DataStreamButtonProps) => {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Usar el contexto de tema
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Generar datos binarios estáticos para evitar diferencias entre servidor y cliente
  const staticBinaryData = [
    '01010101111100001110110110100001011011000010110',
    '10101010101010101010101010101010101010101010101',
    '00110100001000111000000010100000111010111101100',
    '11111000001110101010101010000111000011100001111',
    '00101010111010101010000111010101000111000011100',
  ];

  // Posiciones estáticas para los destellos - reducidas a solo una posición sutil
  const staticSparklePositions = [{ left: '85%', top: '50%' }];

  // Efecto para establecer que estamos en el cliente después del montaje
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      className={`relative overflow-visible rounded-full ${
        isDarkMode
          ? 'bg-gray-900 border border-secondary/30'
          : 'bg-white border border-secondary/70'
      } ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Fondo con datos en movimiento - Solo renderizado en el cliente */}
      <div className='absolute inset-0 data-stream-bg opacity-20 overflow-hidden rounded-full'>
        {staticBinaryData.map((binaryString, i) => (
          <div
            key={i}
            className={`absolute text-[8px] ${isDarkMode ? 'text-secondary/50' : 'text-secondary/70'} whitespace-nowrap font-mono`}
            style={{
              top: `${i * 20 + 5}%`,
              left: isClient ? '0%' : '100%', // Posición inicial estática en el servidor
            }}
          >
            {isClient ? (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {binaryString}
              </motion.div>
            ) : (
              binaryString
            )}
          </div>
        ))}
      </div>

      {/* Efecto de glitch - Solo animado en el cliente */}
      <div
        className={`absolute inset-0 ${isDarkMode ? 'bg-secondary/10' : 'bg-secondary/5'} overflow-hidden rounded-full`}
      >
        {isClient && (
          <motion.div
            className='absolute inset-0'
            whileHover={{
              opacity: [0, 0.1, 0, 0.05, 0],
              x: [0, -2, 1, -1, 0],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Borde con efecto de barrido - Solo animado en el cliente */}
      <div className='absolute inset-0 rounded-full border border-secondary overflow-hidden'>
        {isClient && (
          <motion.div
            className='absolute inset-0 rounded-full border border-secondary'
            animate={{
              borderColor: isDarkMode
                ? ['#0d9488', '#14b8a6', '#2dd4bf', '#14b8a6', '#0d9488']
                : ['#0d9488', '#0f766e', '#0d9488', '#0f766e', '#0d9488'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Destellos con posiciones estáticas - Solo animados en el cliente */}
      <div className='absolute inset-0 overflow-hidden rounded-full'>
        {staticSparklePositions.map((position, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white' : 'bg-secondary'} rounded-full`}
            style={position}
          >
            {isClient && (
              <motion.div
                className={`w-full h-full ${isDarkMode ? 'bg-white' : 'bg-secondary'} rounded-full`}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2 + i * 0.8, // Valor estático en lugar de aleatorio
                  ease: 'easeOut',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Contenido del botón */}
      <Link
        href={href}
        className={`relative flex items-center justify-center px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-3 ${isDarkMode ? 'text-white' : 'text-gray-800'} z-10 h-full w-full`}
      >
        <span className='inline-flex items-center justify-center w-full whitespace-nowrap'>
          {/* Renderizamos el contenido como children si no es una cadena de texto */}
          {typeof children === 'string' && children === 'Contáctanos' ? (
            <DualToneText
              firstPart='Contácta'
              secondPart='nos'
              className='text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap'
              firstPartColor={isDarkMode ? 'text-white' : 'text-gray-800'}
              secondPartColor={
                isDarkMode ? 'text-secondary-light' : 'text-secondary'
              }
              letterSpacing='normal'
            />
          ) : (
            <span
              className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-xs sm:text-sm md:text-base font-medium tracking-wider whitespace-nowrap`}
            >
              {children}
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );
};

export default DataStreamButton;
