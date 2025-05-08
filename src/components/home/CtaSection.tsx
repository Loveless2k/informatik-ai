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

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
      style={{ perspective: '1000px' }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Fondo minimalista */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

      {/* Formas abstractas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formas que se mueven con el mouse */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-3xl bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 backdrop-blur-xl border border-[#00B4DB]/10 shadow-xl dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 dark:border-[#00B4DB]/20"
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
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-[#48D1CC]/10 to-[#00BFFF]/10 backdrop-blur-xl border border-[#48D1CC]/10 shadow-xl dark:from-[#48D1CC]/20 dark:to-[#00BFFF]/20 dark:border-[#48D1CC]/20"
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

        {/* Elementos decorativos simplificados */}
        <motion.div
          className="absolute top-1/3 left-10 w-24 h-24 bg-[#00B4DB]/10 rounded-2xl shadow-lg border border-[#00B4DB]/10 backdrop-blur-sm dark:bg-[#00B4DB]/20 dark:border-[#00B4DB]/20"
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
          className="absolute bottom-1/3 right-10 w-20 h-20 bg-[#48D1CC]/10 rounded-full shadow-lg border border-[#48D1CC]/10 backdrop-blur-sm dark:bg-[#48D1CC]/20 dark:border-[#48D1CC]/20"
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
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC]"
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
      </div>

      {/* Contenido principal */}
      <motion.div
        className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6"
        variants={containerVariants}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          animate={{
            x: mousePosition.x * -10,
            y: mousePosition.y * -10
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50
          }}
        >
          {/* Tarjeta principal con diseño moderno */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm hover:shadow-md transition-all duration-300 border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 overflow-hidden"
            whileHover={{
              y: -5
            }}
            transition={{
              duration: 0.5
            }}
          >
            {/* Elementos decorativos dentro de la tarjeta */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-[#00B4DB]/10 dark:bg-[#00B4DB]/20 rounded-full"
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
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#48D1CC]/10 dark:bg-[#48D1CC]/20 rounded-full"
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
                className="inline-block px-6 py-2 bg-[#00B4DB]/10 dark:bg-[#00B4DB]/20 rounded-full text-[#00B4DB] dark:text-[#48D1CC] font-medium mb-8 border border-[#00B4DB]/20 dark:border-[#48D1CC]/30"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                ¿Listo para dar el siguiente paso?
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text"
                variants={itemVariants}
              >
                ¿Listo para transformar tu negocio con IA?
              </motion.h2>

              <motion.p
                className="text-xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Contáctanos hoy para programar una consulta y descubrir cómo nuestras soluciones de IA pueden ayudar a tu empresa a prosperar en la era digital.
              </motion.p>

              {/* Botón CTA simplificado pero con efectos atractivos */}
              <motion.div
                variants={itemVariants}
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
                      className="rounded-lg px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] hover:from-[#00a0c2] hover:to-[#3ec0c0] shadow-lg hover:shadow-[#00B4DB]/20 transition-all duration-300"
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
              className="w-3 h-3 rounded-full bg-[#00B4DB]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-[#48D1CC]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-[#00BFFF]"
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
