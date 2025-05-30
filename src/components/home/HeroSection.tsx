'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ButtonWithEffect from '@/components/ui/ButtonWithEffect';
import { motion, useAnimation } from 'framer-motion';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';
import { useTheme } from '@/context/ThemeContext';

/**
 * Hero Section component with typing animation and responsive design
 * @returns JSX.Element
 */
const HeroSection: React.FC = () => {
  // Animation controls
  const controls = useAnimation();

  // Component state
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Typing animation state
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Refs
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Theme context
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Responsive phrases configuration
  const phrases = isMobile
    ? ['Formación', 'Asesoría', 'Cursos', 'Automatización', 'Desarrollo']
    : [
        'Formación In Company',
        'Asesoría Estratégica',
        'Desarrollo de Cursos',
        'Automatizaciones',
        'Desarrollo a Medida',
      ];

  // Optimized resize handler
  const handleResize = useCallback(() => {
    const isMobileNow = window.innerWidth < 640;
    if (isMobile !== isMobileNow) {
      setIsMobile(isMobileNow);
      setText('');
      setIsDeleting(false);
      setPhraseIndex(0);
    }
  }, [isMobile]);

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 640);
    controls.start('visible');
  }, [controls]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Typing animation effect
  useEffect(() => {
    if (!isMounted) return;

    const currentPhrase = phrases[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting && text === currentPhrase) {
        // Pause before starting to delete
        typingTimeout.current = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else if (isDeleting && text === '') {
        // Move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        // Type or delete character
        const speed = isDeleting ? 80 : 150;
        typingTimeout.current = setTimeout(() => {
          setText(prev => {
            if (isDeleting) {
              return prev.substring(0, prev.length - 1);
            } else {
              return currentPhrase.substring(0, prev.length + 1);
            }
          });
        }, speed);
      }
    };

    handleTyping();

    // Cleanup timeout
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [isMounted, text, isDeleting, phraseIndex, phrases]);

  // Animation variants with accessibility support
  const animationVariants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    },
    glowEffect: {
      initial: { opacity: 0.3 },
      animate: {
        opacity: [0.3, 0.6, 0.3],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <section className='relative py-24 sm:py-28 md:py-36 lg:py-44 overflow-hidden bg-gray-900 code-lines-bg'>
      {/* Efecto de resplandor superior */}
      <div className='absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-[#00B4DB]/20'></div>

      {/* Círculos decorativos */}
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-[150px] bg-[#48D1CC]/15'></div>

      {/* Neural Network Background con opacidad ajustada */}
      <NeuralNetworkBackground />

      {/* Grid pattern overlay más sutil */}
      <div className='absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]'></div>

      {/* Content */}
      <motion.div
        className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'
        initial='hidden'
        animate={controls}
        variants={animationVariants.staggerContainer}
      >
        <div className='max-w-5xl mx-auto text-center'>
          {/* Title with glow effect */}
          <div className='relative mb-6 sm:mb-8'>
            <motion.div
              className={`absolute inset-0 rounded-full filter blur-[80px] -z-10 ${
                isDarkMode ? 'bg-blue-900/20' : 'bg-blue-800/10'
              }`}
              variants={animationVariants.glowEffect}
              initial='initial'
              animate='animate'
            />

            <motion.div variants={animationVariants.fadeInUp}>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white w-full text-center mb-2 text-glow'>
                Impulsando negocios con{' '}
                <span className='text-white'>Inteligencia Artificial</span>
              </h1>
              <div className='relative min-h-[1.2em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold w-full text-center'>
                <div className='flex justify-center items-center relative'>
                  <div className='relative overflow-hidden max-w-[95%] sm:max-w-full'>
                    <span
                      className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 h-[1.2em] inline-block text-glow'
                      aria-live="polite"
                      aria-label={`Servicio actual: ${text}`}
                    >
                      {text || '\u00A0'}
                    </span>
                    <span
                      className='inline-block h-[1em] border-r-4 border-blue-300 animate-blink ml-1 absolute top-1/2 -translate-y-1/2'
                      style={{ left: `calc(${text.length}ch)` }}
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            className='text-base sm:text-lg md:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto'
            variants={animationVariants.fadeInUp}
          >
            Domina la IA. Lidera la transformación empresarial.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center'
            variants={animationVariants.fadeInUp}
          >
            {/* Botón principal con efecto de partículas */}
            <motion.div
              className='w-full sm:w-auto'
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <ButtonWithEffect
                href='/services'
                size='lg'
                effectType='particles'
                tooltip='Descubre nuestros servicios de IA'
                className='bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] border-0 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold w-full sm:w-auto text-white'
              >
                Explorar Nuestros Servicios
              </ButtonWithEffect>
            </motion.div>

            {/* Botón secundario con efecto de ripple */}
            <ButtonWithEffect
              href='/contact'
              variant='secondary'
              size='lg'
              effectType='ripple'
              tooltip='Hablemos sobre tu proyecto'
              className='bg-white text-[#0f172a] border-0 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold w-full sm:w-auto transition-all duration-300 hover:bg-opacity-90 hover:scale-105 shadow-md hover:shadow-lg'
            >
              Contáctanos
            </ButtonWithEffect>
          </motion.div>
        </div>

        {/* Elementos decorativos mejorados */}
        <div
          className='absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 border border-[#00B4DB]/30 rounded-full animate-pulse'
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className='absolute top-10 sm:top-20 right-5 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 border border-[#48D1CC]/20 rounded-full animate-pulse'
          style={{ animationDuration: '12s' }}
        ></div>

        {/* Patrón de puntos decorativo */}
        <div className='absolute -right-8 bottom-32 w-24 h-48 opacity-40'>
          <div className='w-2 h-2 rounded-full bg-[#00BFFF]/60 absolute top-0 left-0'></div>
          <div className='w-2 h-2 rounded-full bg-[#48D1CC]/60 absolute top-8 left-8'></div>
          <div className='w-2 h-2 rounded-full bg-[#00B4DB]/60 absolute top-16 left-0'></div>
          <div className='w-2 h-2 rounded-full bg-[#48D1CC]/60 absolute top-24 left-8'></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
