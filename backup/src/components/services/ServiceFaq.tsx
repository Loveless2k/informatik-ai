'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const faqs = [
  {
    question: '¿Cómo puedo saber qué servicio es el más adecuado para mi empresa?',
    answer: 'Ofrecemos una consulta inicial gratuita donde analizamos tus necesidades específicas y te recomendamos las soluciones más adecuadas. Nuestro enfoque es siempre personalizado, adaptándonos a los objetivos y desafíos particulares de cada cliente.'
  },
  {
    question: '¿Cuánto tiempo toma implementar una solución de IA en mi empresa?',
    answer: 'El tiempo de implementación varía según la complejidad del proyecto y el estado actual de tu infraestructura tecnológica. Proyectos simples pueden completarse en semanas, mientras que soluciones más complejas pueden requerir varios meses. Durante la fase de planificación, establecemos un cronograma detallado con hitos claros.'
  },
  {
    question: '¿Necesito conocimientos técnicos previos para aprovechar vuestros servicios?',
    answer: 'No es necesario. Nuestros servicios están diseñados para ser accesibles para empresas con diferentes niveles de madurez tecnológica. Proporcionamos la formación necesaria y acompañamiento continuo para asegurar que tu equipo pueda aprovechar al máximo las soluciones implementadas.'
  },
  {
    question: '¿Cómo se garantiza la calidad y efectividad de vuestros programas de formación?',
    answer: 'Nuestros programas de formación son desarrollados por expertos en la materia con amplia experiencia práctica. Utilizamos metodologías pedagógicas probadas, combinando teoría y práctica. Además, realizamos evaluaciones continuas y ajustamos el contenido según el feedback recibido para asegurar resultados óptimos.'
  },
  {
    question: '¿Qué metodologías utilizáis para el desarrollo de proyectos?',
    answer: 'Utilizamos principalmente metodologías ágiles como Scrum y Kanban, que permiten una mayor flexibilidad, transparencia y colaboración durante todo el proceso de desarrollo. Esto nos permite adaptarnos rápidamente a cambios y entregar valor de forma incremental.'
  },
  {
    question: '¿Ofrecéis soporte técnico después de finalizar un proyecto?',
    answer: 'Sí, ofrecemos diferentes planes de soporte y mantenimiento continuo para asegurar que las soluciones implementadas sigan funcionando óptimamente y puedan evolucionar según las necesidades cambiantes de tu negocio. Nuestro objetivo es establecer relaciones a largo plazo con nuestros clientes.'
  },
  {
    question: '¿Cómo medís el éxito de vuestros proyectos?',
    answer: 'Definimos métricas de éxito específicas para cada proyecto en colaboración con el cliente. Estas pueden incluir KPIs como ROI, reducción de costos, aumento de eficiencia, mejora en la satisfacción del cliente, entre otros. Realizamos evaluaciones periódicas para medir el progreso y realizar ajustes si es necesario.'
  },
  {
    question: '¿Trabajáis con empresas de todos los tamaños y sectores?',
    answer: 'Sí, trabajamos con empresas de todos los tamaños, desde startups hasta grandes corporaciones, y en diversos sectores como finanzas, salud, retail, manufactura, educación, entre otros. Adaptamos nuestras soluciones a las necesidades específicas de cada cliente, independientemente de su tamaño o industria.'
  }
];

const ServiceFaq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50 relative">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-grid-slate-200 bg-[length:20px_20px] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Preguntas Frecuentes"
          subtitle="Respuestas a las dudas más comunes sobre nuestros servicios"
          centered
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-white shadow-lg border-l-4 border-blue-500'
                    : 'bg-white/80 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium text-slate-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${
                    activeIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white border-l-4 border-blue-100 rounded-b-lg shadow-inner">
                      <p className="text-slate-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
