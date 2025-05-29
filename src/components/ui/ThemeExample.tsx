'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeExample = () => {
  // Obtener el tema actual
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className='w-full py-16 px-4 font-outfit'>
      <div
        className={`max-w-6xl mx-auto rounded-2xl p-8 md:p-12 ${
          isDarkMode ? 'bg-black text-white' : 'bg-[#E0FBFF] text-[#111111]'
        } transition-all duration-300`}
      >
        {/* Encabezado */}
        <h1 className='text-5xl font-semibold mb-4 text-center'>
          {isDarkMode ? 'Tema Oscuro' : 'Tema Claro'}
        </h1>

        <p className='subtitle mb-12'>
          {isDarkMode
            ? 'Diseño moderno con fondo negro y elementos calipso vibrante'
            : 'Diseño fresco con fondo calipso claro y elementos destacados'}
        </p>

        {/* Sección de colores */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          <div className='space-y-6'>
            <h2 className='text-3xl font-semibold mb-6'>Colores Primarios</h2>

            <div className='space-y-4'>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode
                    ? 'bg-[#00F0FF] text-black'
                    : 'bg-[#007D84] text-white'
                }`}
              >
                Color Principal
              </div>

              <div className='p-4 rounded-lg bg-[#00B4DB] text-white'>
                Color Secundario
              </div>

              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-white text-black' : 'bg-[#111111] text-white'
                }`}
              >
                Texto Principal
              </div>

              <div
                className={`p-4 rounded-lg ${
                  isDarkMode
                    ? 'bg-[#A0A0A0] text-black'
                    : 'bg-[#444444] text-white'
                }`}
              >
                Subtítulos
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <h2 className='text-3xl font-semibold mb-6'>Elementos UI</h2>

            <div className='space-y-4'>
              {/* Botón primario */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? 'bg-[#00F0FF] text-black hover:bg-[#00D6E4]'
                    : 'bg-[#007D84] text-white hover:bg-[#006A70]'
                }`}
              >
                Botón Primario
              </button>

              {/* Botón secundario */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium border-2 transition-all ${
                  isDarkMode
                    ? 'border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10'
                    : 'border-[#007D84] text-[#007D84] hover:bg-[#007D84]/10'
                }`}
              >
                Botón Secundario
              </button>

              {/* Tarjeta */}
              <div
                className={`p-4 rounded-lg shadow-md ${
                  isDarkMode ? 'bg-[#111111]' : 'bg-white'
                }`}
              >
                <h3 className='text-xl font-medium mb-2'>Tarjeta de ejemplo</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-[#A0A0A0]' : 'text-[#444444]'
                  }`}
                >
                  Este es un ejemplo de tarjeta con el nuevo sistema de temas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tipografía */}
        <div className='mb-12'>
          <h2 className='text-3xl font-semibold mb-6'>Tipografía Outfit</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h1 className='text-4xl mb-2'>Título H1</h1>
              <h2 className='text-3xl mb-2'>Título H2</h2>
              <h3 className='text-2xl mb-2'>Título H3</h3>
              <h4 className='text-xl mb-2'>Título H4</h4>
            </div>

            <div>
              <p className='font-light mb-2'>Texto ligero (300)</p>
              <p className='font-normal mb-2'>Texto normal (400)</p>
              <p className='font-medium mb-2'>Texto medio (500)</p>
              <p className='font-semibold mb-2'>Texto semi-negrita (600)</p>
              <p className='font-bold mb-2'>Texto negrita (700)</p>
              <p className='font-extrabold mb-2'>Texto extra-negrita (800)</p>
              <p className='subtitle'>Este es un subtítulo de ejemplo</p>
            </div>
          </div>
        </div>

        {/* Botón para cambiar tema */}
        <div className='flex justify-center'>
          <motion.button
            onClick={toggleTheme}
            className={`py-3 px-8 rounded-full font-medium transition-all ${
              isDarkMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cambiar a tema {isDarkMode ? 'claro' : 'oscuro'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ThemeExample;
