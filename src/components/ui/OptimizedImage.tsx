'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  animation?: 'fade' | 'zoom' | 'slide' | 'none';
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  quality = 85,
  animation = 'fade'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Si priority es true, no necesitamos intersection observer
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    // Configurar intersection observer solo en el cliente
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Cargar imágenes cuando estén a 200px de entrar en la pantalla
    );

    // Crear un elemento div para observar
    const element = document.getElementById(`image-container-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [src, priority, isClient]);

  // Variantes de animación - Definidas de manera estática para evitar diferencias entre servidor y cliente
  const variants = {
    hidden: {
      opacity: 0,
      scale: animation === 'zoom' ? 0.9 : 1,
      y: animation === 'slide' ? 20 : 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div
      id={`image-container-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
      className={`relative overflow-hidden ${className}`}
      style={{ width: width || '100%', height: height || 'auto' }}
    >
      {(isIntersecting || priority) && (
        <>
          {/* Placeholder mientras carga la imagen */}
          {!isLoaded && (
            <div
              className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
              style={{ zIndex: 1 }}
            />
          )}

          {/* Imagen real - Renderizado condicional para animaciones */}
          {isClient ? (
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={variants}
              className="w-full h-full"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                quality={quality}
                priority={priority}
                onLoad={() => setIsLoaded(true)}
                style={{ objectFit }}
                className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                quality={quality}
                priority={priority}
                onLoad={() => setIsLoaded(true)}
                style={{ objectFit }}
                className="w-full h-full"
              />
            </div>
          )}
        </>
      )}

      {/* Placeholder cuando la imagen no está en el viewport */}
      {!isIntersecting && !priority && (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
      )}
    </div>
  );
};

export default OptimizedImage;
