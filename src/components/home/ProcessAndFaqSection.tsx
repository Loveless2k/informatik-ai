"use client";

import React, { useEffect, useRef, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';

// Pasos del proceso de trabajo
const procesoSteps = [
  {
    title: 'Consulta Inicial',
    description: 'Entendemos tus necesidades específicas y objetivos de negocio',
    icon: '🔍'
  },
  {
    title: 'Análisis y Planificación',
    description: 'Diseñamos una estrategia personalizada basada en tus requerimientos',
    icon: '📊'
  },
  {
    title: 'Desarrollo de Solución',
    description: 'Implementamos la solución utilizando las tecnologías más adecuadas',
    icon: '⚙️'
  },
  {
    title: 'Pruebas y Optimización',
    description: 'Refinamos la solución para garantizar resultados óptimos',
    icon: '🔧'
  },
  {
    title: 'Implementación y Soporte',
    description: 'Desplegamos la solución y proporcionamos soporte continuo',
    icon: '🚀'
  }
];

// Preguntas frecuentes
const faqs = [
  {
    question: '¿Qué tipos de empresas pueden beneficiarse de nuestros servicios?',
    answer: 'Nuestras soluciones son adaptables a empresas de todos los tamaños y sectores. Trabajamos con startups, pymes y grandes corporaciones, personalizando cada proyecto según las necesidades específicas del cliente.'
  },
  {
    question: '¿Cuánto tiempo lleva implementar una solución de IA?',
    answer: 'El tiempo de implementación varía según la complejidad del proyecto. Un proyecto típico puede tomar entre 2-6 meses desde la consulta inicial hasta la implementación completa, aunque ofrecemos soluciones más rápidas para necesidades urgentes.'
  },
  {
    question: '¿Qué nivel de personalización ofrecemos en nuestras soluciones?',
    answer: 'Todas nuestras soluciones son 100% personalizadas. Comenzamos entendiendo a fondo los desafíos y objetivos específicos de tu negocio, y desarrollamos soluciones a medida que se integran perfectamente con tus sistemas y procesos existentes.'
  },
  {
    question: '¿Ofrecemos soporte después de la implementación?',
    answer: 'Sí, proporcionamos soporte continuo y mantenimiento para todas nuestras soluciones. Además, ofrecemos programas de formación para tu equipo y actualizaciones periódicas para mantener la tecnología al día con las últimas innovaciones.'
  },
  {
    question: '¿Cómo medís el éxito de vuestros proyectos?',
    answer: 'Definimos métricas de éxito claras al inicio de cada proyecto, alineadas con tus objetivos de negocio. Realizamos seguimiento continuo y proporcionamos informes detallados sobre el rendimiento y el ROI de las soluciones implementadas.'
  }
];

const ProcessAndFaqSection = () => {
  // Referencias para animaciones
  const sectionRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const faqsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Efecto para animaciones al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    faqsRef.current.forEach((faq) => {
      if (faq) observer.observe(faq);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
      faqsRef.current.forEach((faq) => {
        if (faq) observer.unobserve(faq);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Fondo minimalista */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

      {/* Formas abstractas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00B4DB]/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#48D1CC]/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-[#00BFFF]/10 rounded-full filter blur-2xl animate-float" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[#00B4DB]/10 rounded-full filter blur-2xl animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6">
        {/* SECCIÓN 1: PROCESO DE TRABAJO */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
              Nuestro Proceso
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cómo transformamos tus desafíos en soluciones efectivas
          </p>
        </div>

        {/* Timeline de proceso */}
        <div className="relative mt-20 pb-12">
          {/* Línea conectora */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00B4DB] to-[#48D1CC]"></div>

          {procesoSteps.map((step, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => { stepsRef.current[index] = el }}
              className={`flex items-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
              style={{
                transitionDelay: `${index * 200}ms`,
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Círculo central con efecto mejorado */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full
                bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center
                text-white text-2xl font-bold border-2 border-[#00B4DB]/20 z-10 shadow-lg">
                {step.icon}
              </div>

              {/* Contenido con estilo mejorado */}
              <div className={`md:w-5/12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md
                border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} w-full
                transform transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group`}>
                {/* Decoración de fondo */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN 2: PREGUNTAS FRECUENTES */}
        <div className="mt-32 mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
              Preguntas Frecuentes
            </span>
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] rounded-full mx-auto"></div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => { faqsRef.current[index] = el }}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-6"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className="p-6 rounded-xl shadow-sm border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 bg-white dark:bg-gray-800 overflow-hidden
                  transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative group"
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

                <div className="relative z-10">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{faq.question}</h3>
                    <span className="text-[#00B4DB] dark:text-[#48D1CC] text-2xl transform transition-transform duration-300">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`mt-4 text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a href="/contacto"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer font-bold relative overflow-hidden group"
            style={{ boxShadow: '0 10px 15px -3px rgba(0, 197, 197, 0.2), 0 4px 6px -4px rgba(0, 197, 197, 0.2)' }}
          >
            {/* Efecto de brillo en hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="text-lg">¿Tienes Más Preguntas? Contáctanos</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessAndFaqSection;
