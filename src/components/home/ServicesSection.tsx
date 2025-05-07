'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    title: 'Formación In Company',
    description: 'Programas de capacitación personalizados en IA y tecnologías emergentes, diseñados específicamente para las necesidades de tu empresa y equipo.',
    image: '/images/nuestrosServicios/formacion-in-company.png',
    href: '/services#formacion-in-company',
    color: 'teal',
  },
  {
    title: 'Asesoría Estratégica',
    description: 'Consultoría especializada para implementar soluciones tecnológicas y de IA adaptadas a los objetivos y necesidades específicas de tu negocio.',
    image: '/images/nuestrosServicios/asesoria-estrategica.png',
    href: '/services#asesoria-estrategica',
    color: 'blue',
  },
  {
    title: 'Desarrollo de Cursos',
    description: 'Creación de programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e inteligencia artificial.',
    image: '/images/nuestrosServicios/desarrollo-cursos.png',
    href: '/services#desarrollo-cursos',
    color: 'sky',
  },
  {
    title: 'Automatizaciones',
    description: 'Optimización de operaciones y reducción de costos mediante la automatización inteligente de procesos y tareas repetitivas.',
    image: '/images/nuestrosServicios/automatizaciones.png',
    href: '/services#automatizaciones',
    color: 'indigo',
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Creación de sitios web, aplicaciones y soluciones IT personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.',
    image: '/images/nuestrosServicios/desarrollo-medida.png',
    href: '/services#desarrollo-medida',
    color: 'blue',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Variantes de animación mejoradas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Fondo minimalista */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

      <motion.div
        ref={sectionRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestros Servicios
            </h2>
            <div className="w-20 h-1 bg-[#00B4DB] mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Descubre cómo nuestras soluciones tecnológicas y formativas pueden transformar tu empresa e impulsar su crecimiento.
            </p>
          </div>
        </motion.div>

        {/* Modern card grid layout - Minimalista */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className="h-full"
            >
              <Link href={service.href} className="block h-full">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  {/* Imagen del servicio */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={`inline-block px-3 py-1 text-xs font-semibold text-white bg-${service.color === 'blue' ? '[#00B4DB]' : service.color === 'teal' ? '[#48D1CC]' : service.color === 'sky' ? '[#00BFFF]' : service.color === 'indigo' ? '[#00B4DB]' : '[#48D1CC]'} rounded-full`}>
                        Ver más
                      </span>
                    </motion.div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-[#00B4DB] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="w-10 h-1 bg-[#00B4DB] mb-3 transition-all duration-300 group-hover:w-16"></div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Flecha minimalista */}
                    <div className="mt-4 flex justify-end">
                      <motion.div
                        className="text-[#00B4DB]"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut"
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/services" className="inline-flex items-center px-8 py-3 bg-[#00B4DB] text-white font-medium rounded-lg shadow-md hover:bg-[#0096B7] transition-all duration-300">
              Ver Todos los Servicios
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Elemento decorativo minimalista */}
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 border border-[#00B4DB]/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

export default ServicesSection;
