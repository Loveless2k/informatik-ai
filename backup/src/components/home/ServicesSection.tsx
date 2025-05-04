import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const services = [
  {
    title: 'Formación In Company',
    description: 'Programas de capacitación personalizados en IA y tecnologías emergentes, diseñados específicamente para las necesidades de tu empresa y equipo.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto group-hover:bg-teal-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
    ),
    href: '/services#formacion-in-company',
  },
  {
    title: 'Asesoría Estratégica',
    description: 'Consultoría especializada para implementar soluciones tecnológicas y de IA adaptadas a los objetivos y necesidades específicas de tu negocio.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto group-hover:bg-slate-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    ),
    href: '/services#asesoria-estrategica',
  },
  {
    title: 'Desarrollo de Cursos',
    description: 'Creación de programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e inteligencia artificial.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto group-hover:bg-sky-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-cursos',
  },
  {
    title: 'Automatizaciones',
    description: 'Optimización de operaciones y reducción de costos mediante la automatización inteligente de procesos y tareas repetitivas.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto group-hover:bg-indigo-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    ),
    href: '/services#automatizaciones',
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Creación de sitios web, aplicaciones y soluciones IT personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.',
    icon: (
      <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto group-hover:bg-teal-200 transition-colors duration-300">
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    ),
    href: '/services#desarrollo-medida',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 opacity-50"></div>
      <div className="absolute inset-0 bg-grid-gray-200/[0.3] bg-[length:20px_20px]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nuestros Servicios"
          subtitle="Descubre cómo nuestras soluciones tecnológicas y formativas pueden transformar tu empresa e impulsar su crecimiento."
          centered
          className="animate-fade-in"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <Card
                title={service.title}
                description={service.description}
                href={service.href}
                className="text-center h-full flex flex-col group hover-lift hover-shadow transition-all duration-300 bg-white border border-gray-100 rounded-xl overflow-hidden"
              >
                <div className="flex flex-col items-center pt-8 pb-2">
                  <div className="h-24 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button
            href="/services"
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Ver Todos los Servicios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
