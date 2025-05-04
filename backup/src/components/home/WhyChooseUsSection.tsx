import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

const features = [
  {
    title: 'Experiencia',
    description: 'Nuestro equipo está formado por especialistas en IA, científicos de datos y expertos de la industria con años de experiencia.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Soluciones Personalizadas',
    description: 'Desarrollamos soluciones de IA a medida que abordan tus desafíos empresariales específicos y objetivos de negocio.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 mx-auto group-hover:bg-indigo-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Resultados Probados',
    description: 'Nuestras soluciones han ayudado a empresas de diversas industrias a lograr mejoras medibles y significativas.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Soporte Continuo',
    description: 'Proporcionamos soporte y optimización continuos para garantizar que tus soluciones de IA evolucionen con tu negocio.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-4 mx-auto group-hover:bg-sky-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
    ),
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 opacity-70"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="¿Por qué elegir Informatik-AI?"
          subtitle="Combinamos experiencia técnica con visión empresarial para ofrecer soluciones de IA que crean valor real."
          centered
          className="animate-fade-in"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start text-center md:text-left md:flex-row md:gap-6 group animate-slide-up hover-lift"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="flex-shrink-0 mb-4 md:mb-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-50 rounded-full opacity-70 -z-10"></div>
        <div className="absolute top-1/4 -left-16 w-48 h-48 bg-indigo-50 rounded-full opacity-70 -z-10"></div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
