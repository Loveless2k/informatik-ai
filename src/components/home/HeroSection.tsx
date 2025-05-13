'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { motion, useAnimation } from 'framer-motion';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';
import { useTheme } from '@/context/ThemeContext';

const HeroSection = () => {
  // Estado para controlar animaciones
  const [, setIsButtonHovered] = useState(false); // Mantenemos el setter para los eventos
  const [isMounted, setIsMounted] = useState(false);

  // Estado para el texto rotativo
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Detectar si estamos en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(false);

  // Efecto para detectar el tamaño de la pantalla inicialmente
  useEffect(() => {
    const isMobileNow = window.innerWidth < 640; // sm breakpoint en Tailwind
    setIsMobile(isMobileNow);
  }, []);

  // Efecto para manejar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 640; // sm breakpoint en Tailwind

      if (isMobile !== isMobileNow) {
        setIsMobile(isMobileNow);
        // Reiniciar la animación cuando cambia entre móvil y desktop
        setText('');
        setIsDeleting(false);
        setPhraseIndex(0);
      }
    };

    // Añadir listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Limpiar
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, setText, setIsDeleting, setPhraseIndex]);

  // Lista de frases para mostrar (versiones para móvil y desktop)
  const phrases = isMobile
    ? [
        "Formación",
        "Asesoría",
        "Cursos",
        "Automatización",
        "Desarrollo"
      ]
    : [
        "Formación In Company",
        "Asesoría Estratégica",
        "Desarrollo de Cursos",
        "Automatizaciones",
        "Desarrollo a Medida"
      ];

  // Referencia para cancelar el timeout
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Obtener el tema actual
  let themeContext: { theme: string } = { theme: 'light' };
  try {
    themeContext = useTheme();
  } catch (error) {
    // Mantener el valor por defecto
  }
  const isDarkMode = themeContext.theme === 'dark';

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

            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white w-full text-center mb-2">
                Impulsando negocios con Inteligencia Artificial
              </h1>
              <div className="relative min-h-[1.2em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold w-full text-center">
                <div className="flex justify-center items-center relative">
                  <div className="relative overflow-hidden max-w-[90%] sm:max-w-full">
                    <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text h-[1.2em] inline-block">
                      {text || "\u00A0"}
                    </span>
                    <span
                      className="inline-block h-[1em] border-r-4 border-[#48D1CC] animate-blink ml-1 absolute top-1/2 -translate-y-1/2"
                      style={{ left: `calc(${text.length}ch)` }}
                    ></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            className="text-base sm:text-lg md:text-xl mt-6 sm:mt-8 mb-8 sm:mb-10 text-gray-300 max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            Domina la IA. Lidera la transformación empresarial.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
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
              className="hover-lift hover-shadow bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] border-0 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold"
            >
              Explorar Nuestros Servicios
            </Button>
            </motion.div>

            {/* Botón secundario con borde brillante - Alineado verticalmente */}
            <Button
              href="/contact"
              variant="outline"
              size="lg"

              className="hover-lift hover-shadow bg-white text-[#0f172a] border-0 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold transition-all duration-300 hover:bg-opacity-90 hover:scale-105 shadow-md hover:shadow-lg">
              Contáctanos
            </Button>
          </motion.div>
        </div>

        {/* Elementos decorativos mejorados */}
        <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 border border-[#00B4DB]/30 rounded-full animate-pulse"
             style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 border border-[#48D1CC]/20 rounded-full animate-pulse"
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

