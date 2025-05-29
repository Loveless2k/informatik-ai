'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar si el usuario ha activado la preferencia de reducción de movimiento
 * @returns {boolean} - true si el usuario prefiere reducción de movimiento, false en caso contrario
 */
export function useReducedMotion(): boolean {
  // Valor predeterminado conservador (asumir que se prefiere reducción de movimiento)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    // Comprobar si el navegador soporta la media query de preferencia de reducción de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Actualizar el estado con el valor actual
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
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;
