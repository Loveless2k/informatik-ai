'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Función para cambiar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Efecto para inicializar el tema basado en las preferencias del usuario
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    // Si hay un tema guardado, usarlo
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // Si no hay tema guardado, usar la preferencia del sistema
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    setMounted(true);
  }, []);

  // Efecto para actualizar el localStorage y la clase del documento cuando cambia el tema
  useEffect(() => {
    if (!mounted) return;

    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);

    // Actualizar la clase del documento
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  // Evitar problemas de hidratación
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto del tema
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // En lugar de lanzar un error, devolvemos un valor predeterminado
  // Esto evita errores durante la hidratación o cuando se usa fuera del ThemeProvider
  if (context === undefined) {
    // Valor predeterminado que imita la interfaz ThemeContextType
    return {
      theme: 'dark' as Theme,
      setTheme: (theme: Theme) => {
        console.warn('useTheme usado fuera de ThemeProvider, setTheme no tendrá efecto');
      },
      toggleTheme: () => {
        console.warn('useTheme usado fuera de ThemeProvider, toggleTheme no tendrá efecto');
      }
    };
  }

  return context;
};
