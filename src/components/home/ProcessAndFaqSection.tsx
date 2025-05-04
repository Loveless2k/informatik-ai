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
    question: '¿Qué tipos de empresas pueden beneficiarse de vuestros servicios?',
    answer: 'Nuestras soluciones son adaptables a empresas de todos los tamaños y sectores. Trabajamos con startups, pymes y grandes corporaciones, personalizando cada proyecto según las necesidades específicas del cliente.'
  },
  {
    question: '¿Cuánto tiempo lleva implementar una solución de IA?',
    answer: 'El tiempo de implementación varía según la complejidad del proyecto. Un proyecto típico puede tomar entre 2-6 meses desde la consulta inicial hasta la implementación completa, aunque ofrecemos soluciones más rápidas para necesidades urgentes.'
  },
  {
    question: '¿Qué nivel de personalización ofrecéis en vuestras soluciones?',
    answer: 'Todas nuestras soluciones son 100% personalizadas. Comenzamos entendiendo a fondo los desafíos y objetivos específicos de tu negocio, y desarrollamos soluciones a medida que se integran perfectamente con tus sistemas y procesos existentes.'
  },
  {
    question: '¿Ofrecéis soporte después de la implementación?',
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
      className="py-24 md:py-32 relative overflow-hidden code-lines-bg"
    >
      {/* Background gradient - Slightly lighter dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"></div>

      {/* Efecto de escaneo sutil */}
      <div className="scan-effect absolute inset-0 opacity-20"></div>

      {/* Matrix background */}
      <div className="matrix-bg absolute inset-0 opacity-10"></div>

      {/* Formas abstractas animadas - Colores más vibrantes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-700/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-600/25 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-blue-500/20 rounded-full filter blur-2xl animate-float" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-teal-500/20 rounded-full filter blur-2xl animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECCIÓN 1: PROCESO DE TRABAJO */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-3 drop-shadow-md text-glow">
            Nuestro Proceso
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto drop-shadow tech-text">
            Cómo transformamos tus desafíos en soluciones efectivas
          </p>
        </div>

        {/* Timeline de proceso */}
        <div className="relative mt-20 pb-12">
          {/* Línea conectora */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-teal-500"></div>

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
                bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center
                text-white text-2xl font-bold border-2 border-blue-500/50 z-10 shadow-lg
                glow-effect">
                {step.icon}
              </div>

              {/* Contenido con estilo mejorado */}
              <div className={`md:w-5/12 p-6 bg-gray-700/60 backdrop-blur-md rounded-xl shadow-xl
                border border-blue-600/30 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} w-full
                transform transition-all duration-500 hover:bg-gray-600/60 hover:shadow-2xl hover:-translate-y-1
                hover:border-teal-500/40`}>
                <h3 className="text-2xl font-bold text-blue-100 mb-3 tech-text">{step.title}</h3>
                <p className="text-gray-200 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN 2: PREGUNTAS FRECUENTES */}
        <div className="mt-32 mb-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 drop-shadow-md text-glow">Preguntas Frecuentes</h3>
          <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 rounded-full mx-auto"></div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => { faqsRef.current[index] = el }}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-6 glow-effect"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className="p-6 rounded-xl shadow-lg border border-blue-600/30 bg-gray-700/60 backdrop-blur-md overflow-hidden
                  transform transition-all duration-300 hover:shadow-xl hover:border-teal-500/40"
              >
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <h3 className="text-xl font-bold text-blue-100 tech-text">{faq.question}</h3>
                  <span className="text-teal-300 text-2xl transform transition-transform duration-300">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`mt-4 text-gray-200 overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-lg">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a href="/contacto"
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800
              rounded-full text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300
              transform hover:-translate-y-1 cursor-pointer border border-blue-600/30 data-button">
            ¿Tienes Más Preguntas? Contáctanos
          </a>
        </div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
             style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/10 rounded-full animate-pulse"
             style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Líneas decorativas animadas */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700"></div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
    </section>
  );
};

export default ProcessAndFaqSection;
