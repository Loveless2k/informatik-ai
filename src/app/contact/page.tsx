'use client';

import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import { useTheme } from '@/context/ThemeContext';

const ContactPage = () => {
  // Referencias y animaciones
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();

  // Obtener el tema actual
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (error) {
    themeContext = { theme: 'light' };
  }
  const isDarkMode = themeContext?.theme === 'dark';

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
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
    <>
      {/* Hero Section */}
      <section className="relative py-32 md:py-44 overflow-hidden code-lines-bg bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        {/* Efecto de resplandor superior */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30"></div>

        {/* Neural Network Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] bg-[length:30px_30px]"></div>
        </div>

        {/* Efecto de escaneo sutil */}
        <div className="scan-effect absolute inset-0 opacity-20"></div>

        {/* Matrix background */}
        <div className="matrix-bg absolute inset-0 opacity-10"></div>

        <motion.div
          ref={sectionRef}
          className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Título con efecto de resplandor */}
            <div className="relative mb-8">
              <motion.div
                className="absolute inset-0 rounded-full filter blur-[80px] -z-10 bg-blue-900/20"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white text-glow"
                variants={itemVariants}
              >
                Contáctanos
              </motion.h1>
            </div>
            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-8"
              variants={itemVariants}
            >
              ¿Tienes preguntas o estás listo para comenzar tu viaje con IA? Estamos aquí para ayudarte.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Efecto de resplandor */}
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/20"></div>

        {/* Patrón de fondo */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border border-gray-700"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300">Ponte en Contacto</h2>

                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center group-hover:bg-blue-800/70 transition-colors duration-300">
                        <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1 text-white">Dirección</h3>
                      <address className="not-italic text-gray-300">
                        Calle IA 123<br />
                        Ciudad Tech, 12345<br />
                        España
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center group-hover:bg-blue-800/70 transition-colors duration-300">
                        <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1 text-white">Teléfono</h3>
                      <p className="text-gray-300">+34 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center group-hover:bg-blue-800/70 transition-colors duration-300">
                        <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                      <p className="text-gray-300">info@informatik-ai.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4 text-white">Síguenos</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-gray-800 shadow-lg flex items-center justify-center hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="w-10 h-10 rounded-full bg-gray-800 shadow-lg flex items-center justify-center hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-full bg-gray-800 shadow-lg flex items-center justify-center hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300">Envíanos un Mensaje</h2>
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Efecto de resplandor */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/20"></div>

        {/* Patrón de fondo */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300">
                Visita Nuestra Oficina
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Estamos ubicados en el corazón de Ciudad Tech
              </p>
            </div>

            <motion.div
              className="mt-10 bg-gray-800 h-96 rounded-xl shadow-lg overflow-hidden border border-gray-700"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Placeholder for Google Maps or other map integration */}
              <div className="relative w-full h-full bg-gray-900">
                {/* Map placeholder with design elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>

                {/* Digital circuit lines */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,50 L1000,50" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10,15" opacity="0.3" />
                    <path d="M0,150 L1000,150" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10,15" opacity="0.3" />
                    <path d="M0,250 L1000,250" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10,15" opacity="0.3" />
                    <path d="M50,0 L50,1000" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10,15" opacity="0.3" />
                    <path d="M150,0 L150,1000" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10,15" opacity="0.3" />
                    <path d="M250,0 L250,1000" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10,15" opacity="0.3" />
                  </svg>
                </div>

                {/* Map pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ animationDuration: '2s' }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-400 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700">
                  <p className="text-gray-300 text-center">
                    [El mapa de Google se integrará aquí]
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Efecto de resplandor */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/20"></div>

        {/* Patrón de fondo */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300">
                Preguntas Frecuentes
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Encuentra respuestas a preguntas comunes sobre nuestros servicios
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-12 space-y-8">
              <motion.div
                className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">¿Cómo puedo empezar con Informatik-AI?</h3>
                <p className="text-gray-300 leading-relaxed">
                  ¡Comenzar es fácil! Simplemente completa el formulario de contacto anterior o llámanos. Programaremos una consulta inicial para comprender tus necesidades y discutir cómo nuestras soluciones de IA pueden ayudar a tu empresa.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">¿Ofrecen soluciones de IA personalizadas?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Sí, nos especializamos en desarrollar soluciones de IA personalizadas adaptadas a las necesidades específicas de tu negocio. Nuestro equipo trabaja estrechamente contigo para comprender tus desafíos y crear soluciones que los aborden de manera efectiva.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">¿Cuánto tiempo tarda en implementarse una solución de IA?</h3>
                <p className="text-gray-300 leading-relaxed">
                  El tiempo varía según la complejidad de la solución y tus requisitos específicos. Las implementaciones simples pueden tomar algunas semanas, mientras que los proyectos más complejos podrían tomar varios meses. Proporcionaremos un cronograma detallado durante nuestra consulta inicial.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
