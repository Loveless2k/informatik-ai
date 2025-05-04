"use client";

import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

const CtaSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Efecto para manejar el movimiento del mouse para el efecto parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
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
      boxShadow: "0 10px 25px -5px rgba(59,130,246,0.5)",
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
      boxShadow: ["0 5px 15px -5px rgba(59,130,246,0.3)", "0 15px 30px -5px rgba(59,130,246,0.6)", "0 5px 15px -5px rgba(59,130,246,0.3)"],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ perspective: '1000px' }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Fondo con efecto de glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

      {/* Subtle tech pattern */}
      <div className="absolute inset-0 opacity-5 circuit-pattern"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-gray-300/[0.2] bg-[length:30px_30px]"></div>

      {/* Patrones geométricos 3D */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formas 3D que se mueven con el mouse */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-3xl bg-gradient-to-br from-blue-200/40 to-blue-300/40 backdrop-blur-xl border border-blue-300/30 shadow-xl"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
            rotateX: mousePosition.y * 10,
            rotateY: -mousePosition.x * 10,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 50
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-200/40 to-teal-300/40 backdrop-blur-xl border border-teal-300/30 shadow-xl"
          animate={{
            x: mousePosition.x * -25,
            y: mousePosition.y * -25,
            rotateX: -mousePosition.y * 15,
            rotateY: mousePosition.x * 15,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 40
          }}
        />

        {/* Elementos decorativos con estilo mejorado */}
        <motion.div
          className="absolute top-1/3 left-10 w-24 h-24 bg-blue-50/80 rounded-2xl shadow-lg border border-blue-200/40 backdrop-blur-sm"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-10 w-20 h-20 bg-teal-50/80 rounded-full shadow-lg border border-teal-200/40 backdrop-blur-sm"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[
            { top: '10%', left: '15%', duration: 7, delay: 0 },
            { top: '20%', left: '85%', duration: 8, delay: 1 },
            { top: '35%', left: '25%', duration: 6, delay: 2 },
            { top: '45%', left: '75%', duration: 9, delay: 0.5 },
            { top: '65%', left: '35%', duration: 7.5, delay: 1.5 },
            { top: '75%', left: '65%', duration: 8.5, delay: 2.5 },
            { top: '85%', left: '45%', duration: 6.5, delay: 3 },
            { top: '15%', left: '55%', duration: 7.2, delay: 0.8 },
            { top: '25%', left: '5%', duration: 8.8, delay: 1.2 },
            { top: '55%', left: '95%', duration: 6.8, delay: 2.2 },
            { top: '5%', left: '35%', duration: 9.2, delay: 0.2 },
            { top: '95%', left: '25%', duration: 7.8, delay: 1.8 }
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
              style={{
                top: particle.top,
                left: particle.left,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-400/30 rounded-full animate-pulse"
             style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-20 left-10 w-32 h-32 border border-teal-400/30 rounded-full animate-pulse"
             style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Líneas decorativas */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          animate={{
            x: mousePosition.x * -15,
            y: mousePosition.y * -15
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50
          }}
        >
          {/* Tarjeta principal con efecto de glassmorphism mejorado */}
          <motion.div
            className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-blue-300/30 overflow-hidden"
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
            }}
            transition={{
              duration: 0.5
            }}
          >
            {/* Elementos decorativos dentro de la tarjeta */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/30 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-200/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -10, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Contenido de texto */}
            <div className="relative z-10 text-center">
              <motion.div
                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-md rounded-full text-blue-700 font-medium mb-8 border border-blue-300/30"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                ¿Listo para dar el siguiente paso?
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 text-transparent bg-clip-text"
                variants={itemVariants}
              >
                ¿Listo para transformar tu negocio con IA?
              </motion.h2>

              <motion.p
                className="text-xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Contáctanos hoy para programar una consulta y descubrir cómo nuestras soluciones de IA pueden ayudar a tu empresa a prosperar en la era digital.
              </motion.p>

              {/* Botón CTA con animaciones disruptivas */}
              <motion.div
                variants={itemVariants}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative inline-block">
                  {/* Efecto de resplandor detrás del botón */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 rounded-full blur-xl"
                    animate={isHovering || isButtonAnimating ? { opacity: 0.7, scale: 1.1 } : { opacity: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Partículas que salen del botón */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-sm"
                        style={{
                          top: '50%',
                          left: '50%',
                          translateX: '-50%',
                          translateY: '-50%',
                          rotate: `${angle}deg`,
                        }}
                        animate={isHovering || isButtonAnimating ?
                          {
                            x: `calc(cos(${angle}deg) * 80px)`,
                            y: `calc(sin(${angle}deg) * 80px)`,
                            opacity: 0.8,
                            scale: 1
                          } :
                          {
                            x: 0,
                            y: 0,
                            opacity: 0,
                            scale: 0.5
                          }
                        }
                        transition={{
                          duration: 0.5,
                          delay: i * 0.03
                        }}
                      />
                    ))}
                  </div>

                  {/* Efecto de ondas concéntricas */}
                  <AnimatePresence>
                    {(isHovering || isButtonAnimating) && (
                      <>
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full bg-blue-700/20 pointer-events-none"
                            initial={{ scale: 1, opacity: 0.8 - (i * 0.2) }}
                            animate={{ scale: 1.5 + (i * 0.5), opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.3,
                              repeat: Infinity,
                              repeatDelay: 0
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={isButtonAnimating ? "pulse" : "visible"}
                  >
                    <Button
                      href="/contact"
                      variant="gradient"
                      size="xl"
                      icon={
                        <motion.svg
                          className="ml-2 w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          animate={isHovering || isButtonAnimating ? { x: 5 } : { x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      }
                      iconPosition="right"
                      className="rounded-full px-10 py-5 text-xl font-bold data-button bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg"
                    >
                      Comienza Hoy
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Elementos decorativos debajo de la tarjeta */}
          <motion.div
            className="mt-16 flex justify-center space-x-4"
            variants={itemVariants}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-blue-600"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-blue-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-teal-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CtaSection;
