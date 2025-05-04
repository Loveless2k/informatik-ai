'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

// Servicios con información detallada
const services = [
  {
    id: 'formacion-in-company',
    title: 'Formación In Company',
    description: 'Programas de capacitación personalizados en IA y tecnologías emergentes, diseñados específicamente para las necesidades de tu empresa y equipo.',
    icon: (
      <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'from-teal-500 to-emerald-400',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    features: [
      'Formación personalizada para equipos técnicos y no técnicos',
      'Workshops prácticos sobre IA, Machine Learning y Data Science',
      'Capacitación en herramientas y tecnologías emergentes',
      'Programas adaptados a diferentes niveles de conocimiento',
      'Evaluación continua y seguimiento del progreso'
    ]
  },
  {
    id: 'asesoria-estrategica',
    title: 'Asesoría Estratégica',
    description: 'Consultoría especializada para implementar soluciones tecnológicas y de IA adaptadas a los objetivos y necesidades específicas de tu negocio.',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-400',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    features: [
      'Análisis de necesidades tecnológicas y oportunidades de mejora',
      'Diseño de estrategias de implementación de IA',
      'Evaluación de madurez digital y roadmap tecnológico',
      'Asesoramiento en selección de herramientas y plataformas',
      'Acompañamiento en la transformación digital'
    ]
  },
  {
    id: 'desarrollo-cursos',
    title: 'Desarrollo de Cursos',
    description: 'Creación de programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e inteligencia artificial.',
    icon: (
      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    features: [
      'Diseño curricular basado en objetivos de aprendizaje',
      'Creación de contenidos multimedia interactivos',
      'Desarrollo de ejercicios prácticos y casos de estudio',
      'Materiales adaptados a diferentes modalidades (presencial/online)',
      'Actualización continua de contenidos'
    ]
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones',
    description: 'Optimización de operaciones y reducción de costos mediante la automatización inteligente de procesos y tareas repetitivas.',
    icon: (
      <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    features: [
      'Identificación de procesos automatizables',
      'Implementación de RPA (Robotic Process Automation)',
      'Desarrollo de flujos de trabajo automatizados',
      'Integración con sistemas existentes',
      'Monitoreo y optimización continua'
    ]
  },
  {
    id: 'desarrollo-medida',
    title: 'Desarrollo a Medida',
    description: 'Creación de sitios web, aplicaciones y soluciones IT personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.',
    icon: (
      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-indigo-500 to-blue-400',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    features: [
      'Desarrollo de aplicaciones web y móviles personalizadas',
      'Creación de sitios web corporativos y e-commerce',
      'Implementación de soluciones basadas en IA',
      'Desarrollo de APIs y microservicios',
      'Mantenimiento y soporte continuo'
    ]
  },
];

const ServicesList = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  return (
    <section id="servicios" className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative code-lines-bg">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

      {/* Efecto de escaneo sutil */}
      <div className="scan-effect absolute inset-0 opacity-20"></div>

      {/* Matrix background */}
      <div className="matrix-bg absolute inset-0 opacity-10"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-900/30 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-800/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
           style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/10 rounded-full animate-pulse"
           style={{ animationDuration: '15s' }}></div>

      <motion.div
        ref={sectionRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeading
            title={<span className="text-white text-glow">Nuestros Servicios</span>}
            subtitle={<span className="text-gray-300">Soluciones tecnológicas avanzadas diseñadas para impulsar la innovación y el crecimiento de tu empresa</span>}
            centered
            className="mb-16"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-blue-900/20 hover:border-blue-700/30 transition-all duration-500 group bg-gray-800/80 backdrop-blur-sm glow-effect`}
            >
              <div className="p-8">
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gray-700 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 border border-gray-600 group-hover:border-blue-500/50`}
                  variants={iconVariants}
                >
                  <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                    {service.icon}
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-blue-200 group-hover:text-blue-100 transition-colors duration-300 tech-text">{service.title}</h3>
                <p className="text-gray-300 mb-8 text-lg">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    href={`/services#${service.id}`}
                    variant="outline"
                    className="w-full justify-center border-blue-700/30 text-blue-300 hover:bg-blue-900/30 glow-border"
                  >
                    Más información
                  </Button>
                </div>
              </div>

              <div className={`h-1 w-full bg-gradient-to-r from-blue-700 to-blue-900`}></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <Button
            href="/contact"
            variant="gradient"
            size="lg"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            iconPosition="right"
            className="rounded-full data-button bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg"
          >
            Consulta sobre nuestros servicios
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesList;
