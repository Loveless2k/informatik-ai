'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  // Estado local para manejar el caso cuando el componente se renderiza fuera del ThemeProvider
  const [mounted, setMounted] = useState(false);
  const [localTheme, setLocalTheme] = useState('light');

  // Intentar usar el contexto de tema, pero capturar el error si no está disponible
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (error) {
    // Si el contexto no está disponible, usaremos el estado local
    themeContext = null;
  }

  // Usar el contexto si está disponible, de lo contrario usar el estado local
  const theme = themeContext ? themeContext.theme : localTheme;
  const isDark = theme === 'dark';

  // Función para alternar el tema
  const toggleTheme = () => {
    if (themeContext) {
      themeContext.toggleTheme();
    } else {
      const newTheme = localTheme === 'light' ? 'dark' : 'light';
      setLocalTheme(newTheme);

      // Actualizar la clase del documento
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    }
  };

  // Efecto para inicializar el tema local si es necesario
  useEffect(() => {
    setMounted(true);

    // Solo inicializar el tema local si no hay contexto
    if (!themeContext && typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      setLocalTheme(initialTheme);

      // Actualizar la clase del documento
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [themeContext]);

  return (
    <motion.button
      className="relative w-7 sm:w-9 md:w-10 h-3.5 sm:h-4.5 md:h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 p-0.5 sm:p-1 border border-gray-300 dark:border-gray-600"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex items-center justify-center shadow-md"
        animate={{
          x: isDark ? (window.innerWidth < 640 ? 12 : window.innerWidth < 768 ? 14 : 16) : 0,
          backgroundColor: isDark ? '#fbbf24' : '#1e40af',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 text-gray-900"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
