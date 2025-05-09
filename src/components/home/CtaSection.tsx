"use client";

import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

const CtaSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Efecto para detectar montaje en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto para manejar el movimiento del mouse para el efecto parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Iniciar animaciones cuando la sección está en el viewport
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  // Efecto para la animación periódica del botón
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isInView) {
      const interval = setInterval(() => {
        setIsButtonAnimating(true);
        setTimeout(() => {
          setIsButtonAnimating(false);
        }, 700);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0,180,219,0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: ["0 5px 15px -5px rgba(0,180,219,0.3)", "0 15px 30px -5px rgba(0,180,219,0.5)", "0 5px 15px -5px rgba(0,180,219,0.3)"],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Fondo minimalista */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

      {/* Formas abstractas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formas que se mueven con el mouse */}
        <div
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-3xl bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 backdrop-blur-xl border border-[#00B4DB]/10 shadow-xl dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 dark:border-[#00B4DB]/20"
          style={{
            transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px) rotateX(${mousePosition.y * 10}deg) rotateY(${-mousePosition.x * 10}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />

        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-[#48D1CC]/10 to-[#00BFFF]/10 backdrop-blur-xl border border-[#48D1CC]/10 shadow-xl dark:from-[#48D1CC]/20 dark:to-[#00BFFF]/20 dark:border-[#48D1CC]/20"
          style={{
            transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px) rotateX(${-mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
            transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />

        {/* Elementos decorativos simplificados */}
        <div
          className="absolute top-1/3 left-10 w-24 h-24 bg-[#00B4DB]/10 rounded-2xl shadow-lg border border-[#00B4DB]/10 backdrop-blur-sm dark:bg-[#00B4DB]/20 dark:border-[#00B4DB]/20 animate-float"
        />

        <div
          className="absolute bottom-1/3 right-10 w-20 h-20 bg-[#48D1CC]/10 rounded-full shadow-lg border border-[#48D1CC]/10 backdrop-blur-sm dark:bg-[#48D1CC]/20 dark:border-[#48D1CC]/20 animate-float-delay"
        />

        {/* Partículas flotantes reducidas */}
        <div className="absolute inset-0">
          {[
            { top: '10%', left: '15%', duration: 7, delay: 0 },
            { top: '20%', left: '85%', duration: 8, delay: 1 },
            { top: '65%', left: '35%', duration: 7.5, delay: 1.5 },
            { top: '75%', left: '65%', duration: 8.5, delay: 2.5 },
            { top: '15%', left: '55%', duration: 7.2, delay: 0.8 },
            { top: '55%', left: '95%', duration: 6.8, delay: 2.2 }
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC]"
              style={{
                top: particle.top,
                left: particle.left,
                opacity: 0.4,
                animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div
        className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6"
      >
        <div
          className="max-w-4xl mx-auto"
          style={{
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
            transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        >
          {/* Tarjeta principal con diseño moderno */}
          <div
            className="relative bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 overflow-hidden"
          >
            {/* Elementos decorativos dentro de la tarjeta */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 bg-[#00B4DB]/10 dark:bg-[#00B4DB]/20 rounded-full animate-blob"
              style={{ animationDuration: '8s' }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#48D1CC]/10 dark:bg-[#48D1CC]/20 rounded-full animate-blob animation-delay-2000"
              style={{ animationDuration: '10s' }}
            />

            {/* Contenido de texto */}
            <div className="relative z-10 text-center">
              <div
                className="inline-block px-6 py-2 bg-[#00B4DB]/10 dark:bg-[#00B4DB]/20 rounded-full text-[#00B4DB] dark:text-[#48D1CC] font-medium mb-8 border border-[#00B4DB]/20 dark:border-[#48D1CC]/30 hover:scale-105 transition-transform duration-300"
              >
                ¿Listo para dar el siguiente paso?
              </div>

              <h2
                className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text"
              >
                ¿Listo para transformar tu negocio con IA?
              </h2>

              <p
                className="text-xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Contáctanos hoy para programar una consulta y descubrir cómo nuestras soluciones de IA pueden ayudar a tu empresa a prosperar en la era digital.
              </p>

              {/* Botón CTA simplificado pero con efectos atractivos */}
              <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative inline-block">
                  {/* Efecto de resplandor detrás del botón */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] rounded-lg blur-xl"
                    animate={isHovering || isButtonAnimating ? { opacity: 0.5, scale: 1.1 } : { opacity: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Efecto de ondas concéntricas */}
                  <AnimatePresence>
                    {(isHovering || isButtonAnimating) && (
                      <>
                        {[0, 1].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 rounded-lg bg-[#00B4DB]/20 pointer-events-none"
                            initial={{ scale: 1, opacity: 0.8 - (i * 0.2) }}
                            animate={{ scale: 1.3 + (i * 0.3), opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.3,
                              repeat: 1,
                              repeatDelay: 0
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  <div
                    className={`transition-all duration-300 ${isButtonAnimating ? 'scale-105 shadow-lg shadow-[#00B4DB]/20' : 'scale-100'}`}
                  >
                    <Button
                      href="/contact"
                      variant="gradient"
                      size="xl"
                      icon={
                        <svg
                          className={`ml-2 w-6 h-6 transition-transform duration-300 ${isHovering || isButtonAnimating ? 'translate-x-1' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      }
                      iconPosition="right"
                      className="rounded-lg shadow-lg hover:shadow-[#00B4DB]/20"
                    >
                      Comienza Hoy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos decorativos debajo de la tarjeta */}
          <div
            className="mt-16 flex justify-center space-x-4"
          >
            <div
              className="w-3 h-3 rounded-full bg-[#00B4DB] animate-pulse"
              style={{ animationDuration: '2s' }}
            />
            <div
              className="w-3 h-3 rounded-full bg-[#48D1CC] animate-pulse"
              style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
            />
            <div
              className="w-3 h-3 rounded-full bg-[#00BFFF] animate-pulse"
              style={{ animationDuration: '3s', animationDelay: '1s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
