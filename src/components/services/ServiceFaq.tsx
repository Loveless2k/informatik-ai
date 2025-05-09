'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

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
  const faqsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Efecto para animar la entrada de los elementos FAQ
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    faqsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      faqsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'} relative`}>
      {/* Patrón de fondo sutil */}
      <div className={`absolute inset-0 ${
        isDarkMode ? 'bg-grid-gray-800' : 'bg-grid-slate-200'
      } bg-[length:20px_20px] ${
        isDarkMode ? 'opacity-20' : 'opacity-30'
      }`}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título con gradiente */}
        <div className="mt-8 mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
              Preguntas Frecuentes
            </span>
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] rounded-full mx-auto"></div>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
            Respuestas a las dudas más comunes sobre nuestros servicios
          </p>
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
                className={`p-6 rounded-xl shadow-sm border ${
                  isDarkMode
                    ? 'border-[#48D1CC]/20 bg-gray-800'
                    : 'border-[#00B4DB]/10 bg-white'
                } overflow-hidden
                  transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative group`}
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

                <div className="relative z-10">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <h3 className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{faq.question}</h3>
                    <span className={`${
                      isDarkMode ? 'text-[#48D1CC]' : 'text-[#00B4DB]'
                    } text-2xl transform transition-transform duration-300`}>
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    <div
                      className={`mt-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      } overflow-hidden transition-all duration-300 ${
                        activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a  href="/contact"

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

export default ServiceFaq;
