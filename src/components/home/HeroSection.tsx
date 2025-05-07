'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { motion, useAnimation } from 'framer-motion';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';
import { useTheme } from '@/context/ThemeContext';

const HeroSection = () => {
  // Estado para controlar la animación del botón
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Estado para el texto rotativo
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Lista de frases para mostrar
  const phrases = [
    "Formación In Company",
    "Asesoría Estratégica",
    "Desarrollo de Cursos",
    "Automatizaciones",
    "Desarrollo a Medida"
  ];

  // Referencia para cancelar el timeout
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Obtener el tema actual
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (error) {
    themeContext = { theme: 'light' };
  }
  const isDarkMode = themeContext?.theme === 'dark';

  // Efecto para el texto de escritura
  useEffect(() => {
    if (!isMounted) return;

    const currentPhrase = phrases[phraseIndex];

    // Lógica para escribir y borrar texto
    if (!isDeleting && text === currentPhrase) {
      // Pausa antes de empezar a borrar
      typingTimeout.current = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(80); // Más rápido al borrar
      }, 1500);
    } else if (isDeleting && text === '') {
      // Cambiar a la siguiente frase
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
      setTypingSpeed(150); // Velocidad normal al escribir
    } else {
      // Escribir o borrar un carácter
      typingTimeout.current = setTimeout(() => {
        setText(prev => {
          if (isDeleting) {
            return prev.substring(0, prev.length - 1);
          } else {
            return currentPhrase.substring(0, prev.length + 1);
          }
        });
      }, typingSpeed);
    }

    // Limpiar timeout al desmontar
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [isMounted, text, isDeleting, phraseIndex, phrases, typingSpeed]);

  // Controles de animación
  const controls = useAnimation();

  // Efecto para iniciar animaciones después del montaje
  useEffect(() => {
    setIsMounted(true);
    controls.start('visible');
  }, [controls]);

  // Variantes de animación mejoradas
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Variantes para el efecto de destello del título
  const glowVariants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={`relative py-32 md:py-44 overflow-hidden code-lines-bg ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
    }`}>
      {/* Efecto de resplandor superior */}
      <div className={`absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] ${
        isDarkMode ? 'bg-blue-900/30' : 'bg-blue-800/20'
      }`}></div>

      {/* Neural Network Background con opacidad ajustada */}
      <NeuralNetworkBackground />

      {/* Grid pattern overlay más sutil */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]"></div>

      {/* Efecto de escaneo sutil */}
      <div className="scan-effect absolute inset-0 opacity-30"></div>

      {/* Content */}
      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Título con efecto de resplandor */}
          <div className="relative mb-8">
            <motion.div
              className={`absolute inset-0 rounded-full filter blur-[80px] -z-10 ${
                isDarkMode ? 'bg-blue-900/20' : 'bg-blue-800/10'
              }`}
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white w-full text-center mb-2">
                Impulsando negocios con inteligencia artificial
              </h1>
              <div className="relative min-h-[1.2em] text-5xl md:text-6xl lg:text-7xl font-extrabold w-full text-center">
                <div className="inline-flex justify-center items-center relative">
                  <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
                    {text || ""}
                  </span>
                  <span
                    className="inline-block h-[1em] border-r-4 border-[#48D1CC] animate-blink ml-1"
                  ></span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            className="text-xl md:text-2xl mb-14 text-gray-300 max-w-3xl mx-auto tech-text"
            variants={fadeInUp}
          >
            Potenciando tu transformación digital con tecnologías de inteligencia artificial
            y aprendizaje automático de vanguardia.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={fadeInUp}
          >
            {/* Botón principal con efecto de datos - Más grande */}
            <motion.div
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <Button
              href="/services"
              size="lg"
              className="hover-lift hover-shadow bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] border-0 px-8 py-4 text-xl font-bold"
            >
              Explorar Nuestros Servicios
            </Button>
            </motion.div>

            {/* Botón secundario con borde brillante - Alineado verticalmente */}
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="hover-lift hover-shadow bg-white text-[#0f172a] border-0 px-8 py-4 text-xl font-bold transition-all duration-300 hover:bg-opacity-90 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Contáctanos
            </Button>
          </motion.div>
        </div>

        {/* Elementos decorativos mejorados */}
        <div className="absolute bottom-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
             style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-20 right-10 w-32 h-32 border border-teal-500/10 rounded-full animate-pulse"
             style={{ animationDuration: '12s' }}></div>

        {/* Elementos de matriz adicionales */}
        <div className="matrix-bg absolute inset-0 opacity-10"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

