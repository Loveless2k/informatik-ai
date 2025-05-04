'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="servicios" className="py-20 bg-white relative">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[length:20px_20px] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Nuestros Servicios"
          subtitle="Soluciones tecnológicas avanzadas diseñadas para impulsar la innovación y el crecimiento de tu empresa"
          centered
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`rounded-xl overflow-hidden border ${service.borderColor} ${service.bgColor} hover:shadow-xl transition-all duration-500 group`}
            >
              <div className="p-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`h-1 w-full bg-gradient-to-r ${service.color}`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesList;
