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
    "Soluciones de IA",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "NLP Avanzado"
  ];

  // Referencia para cancelar el timeout
  const typingTimeout = useRef(null);

  // Obtener el tema actual
  let themeContext: { theme: string } = { theme: 'light' };
  try {
    themeContext = useTheme();
  } catch (error) {
    // Mantener el valor por defecto
  }
  const isDarkMode = themeContext.theme === 'dark';

  // Controles de animación
  const controls = useAnimation();

  // Efecto para iniciar animaciones después del montaje
  useEffect(() => {
    setIsMounted(true);
    controls.start('visible');
  }, [controls]);

  // Efecto para el texto rotativo
  useEffect(() => {
    // Inicializar con la primera frase si el texto está vacío
    if (text === '' && !isDeleting) {
      setText(phrases[0].charAt(0));
      return;
    }

    // Función para manejar el efecto de escritura
    const handleTyping = () => {
      // Obtener la frase actual
      const currentPhrase = phrases[phraseIndex];

      // Si está borrando, eliminar un carácter
      if (isDeleting) {
        setText((prevText) => prevText.substring(0, prevText.length - 1));
        setTypingSpeed(50); // Más rápido al borrar
      } else {
        // Si está escribiendo, añadir un carácter
        setText((prevText) => currentPhrase.substring(0, prevText.length + 1));
        setTypingSpeed(150); // Más lento al escribir
      }

      // Lógica para cambiar entre escribir y borrar
      if (!isDeleting && text === currentPhrase) {
        // Pausa antes de empezar a borrar
        setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return;
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        // Cambiar a la siguiente frase
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        // No programar el siguiente paso aquí, esperar a que el efecto se ejecute de nuevo
        return;
      }

      // Programar la próxima actualización
      const nextTimeout = setTimeout(
        handleTyping,
        isDeleting ? 50 : text.length === 0 ? 500 : 150
      );

      // Guardar la referencia del timeout
      typingTimeout.current = nextTimeout;
    };

    // Iniciar el efecto de escritura
    const timeout = setTimeout(handleTyping, typingSpeed);
    typingTimeout.current = timeout;

    // Limpiar el timeout al desmontar o cuando cambian las dependencias
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [text, isDeleting, phraseIndex, phrases]);

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
    <section className="relative py-32 md:py-44 overflow-hidden bg-gray-900">
      {/* Efecto de resplandor superior */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-[#00B4DB]/20"></div>

      {/* Círculos decorativos */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-[150px] bg-[#48D1CC]/15"></div>

      {/* Neural Network Background con opacidad ajustada */}
      <NeuralNetworkBackground />

      {/* Grid pattern overlay más sutil */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

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
            <motion.div
              className="flex flex-col items-center"
              variants={fadeInUp}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white w-full text-center mb-2">
                Transformando los Negocios con
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
            className="text-lg md:text-xl mt-8 mb-10 text-gray-300 max-w-4xl mx-auto"
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
                variant="primary"
                size="lg"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
                iconPosition="right"
                className="rounded-lg shadow-lg bg-gradient-to-r from-[#00B4DB] to-[#0083B0] hover:from-[#00C4EB] hover:to-[#0093C0] text-white font-bold transform transition-transform duration-300 hover:scale-105"
              >
                Explorar Nuestros Servicios
              </Button>
            </motion.div>

            {/* Botón secundario con borde brillante - Alineado verticalmente */}
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="rounded-lg border-2 border-[#48D1CC] text-[#48D1CC] hover:bg-[#48D1CC]/20 transform transition-transform duration-300 hover:scale-105"
            >
              Contáctanos
            </Button>
          </motion.div>
        </div>

        {/* Elementos decorativos mejorados */}
        <div className="absolute bottom-10 left-10 w-20 h-20 border border-[#00B4DB]/30 rounded-full animate-pulse"
             style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-20 right-10 w-32 h-32 border border-[#48D1CC]/20 rounded-full animate-pulse"
             style={{ animationDuration: '12s' }}></div>

        {/* Patrón de puntos decorativo */}
        <div className="absolute -right-8 bottom-32 w-24 h-48 opacity-40">
          <div className="w-2 h-2 rounded-full bg-[#00BFFF]/60 absolute top-0 left-0"></div>
          <div className="w-2 h-2 rounded-full bg-[#48D1CC]/60 absolute top-8 left-8"></div>
          <div className="w-2 h-2 rounded-full bg-[#00B4DB]/60 absolute top-16 left-0"></div>
          <div className="w-2 h-2 rounded-full bg-[#48D1CC]/60 absolute top-24 left-8"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
