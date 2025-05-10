'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

const serviceDetails = [
  {
    id: 'formacion-in-company',
    title: 'Formación In Company',
    description: 'Potencia las habilidades de tu equipo con programas de formación personalizados en IA y tecnologías emergentes.',
    content: 'Nuestros programas de formación in-company están diseñados para proporcionar a tu equipo las habilidades y conocimientos necesarios para aprovechar al máximo las tecnologías de IA. Adaptamos cada programa a las necesidades específicas de tu empresa, asegurando que el contenido sea relevante y aplicable a tu contexto empresarial.',
    image: '/images/services/formacion.jpg',
    benefits: [
      'Mejora de la productividad y eficiencia del equipo',
      'Desarrollo de habilidades técnicas y no técnicas',
      'Reducción de la curva de aprendizaje en nuevas tecnologías',
      'Mayor retención del talento',
      'Aplicación inmediata de conocimientos en proyectos reales'
    ],
    color: 'from-teal-500 to-emerald-400',
    textColor: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    id: 'asesoria-estrategica',
    title: 'Asesoría Estratégica',
    description: 'Guiamos a tu empresa en la implementación estratégica de soluciones tecnológicas y de IA para maximizar su impacto.',
    content: 'Nuestra asesoría estratégica te ayuda a identificar oportunidades para implementar IA y tecnologías avanzadas en tu negocio. Trabajamos contigo para desarrollar un plan de acción claro que alinee la tecnología con tus objetivos empresariales, asegurando un retorno de inversión óptimo.',
    image: '/images/services/asesoria.jpg',
    benefits: [
      'Identificación de oportunidades de innovación tecnológica',
      'Alineación de la estrategia tecnológica con los objetivos de negocio',
      'Reducción de riesgos en la implementación de nuevas tecnologías',
      'Optimización de la inversión en tecnología',
      'Ventaja competitiva a través de la innovación'
    ],
    color: 'from-blue-500 to-indigo-400',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'desarrollo-cursos',
    title: 'Desarrollo de Cursos',
    description: 'Creamos programas formativos completos y materiales educativos de alta calidad en tecnologías avanzadas e IA.',
    content: 'Desarrollamos cursos y materiales formativos completos sobre IA y tecnologías emergentes, adaptados a diferentes niveles de conocimiento y formatos de aprendizaje. Nuestros contenidos combinan teoría y práctica, asegurando una experiencia de aprendizaje efectiva y atractiva.',
    image: '/images/services/cursos.jpg',
    benefits: [
      'Contenido actualizado y relevante sobre las últimas tecnologías',
      'Materiales adaptados a diferentes estilos de aprendizaje',
      'Enfoque práctico con casos de uso reales',
      'Flexibilidad en formatos (presencial, online, híbrido)',
      'Evaluación continua y feedback personalizado'
    ],
    color: 'from-purple-500 to-pink-400',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones',
    description: 'Optimizamos tus operaciones mediante la automatización inteligente de procesos y tareas repetitivas.',
    content: 'Identificamos y automatizamos procesos repetitivos y tareas manuales en tu empresa, liberando tiempo y recursos para actividades de mayor valor. Utilizamos tecnologías de RPA e IA para crear soluciones de automatización inteligentes que se adaptan a tus necesidades específicas.',
    image: '/images/services/automatizacion.jpg',
    benefits: [
      'Reducción de costos operativos',
      'Eliminación de errores humanos',
      'Mayor velocidad y eficiencia en procesos',
      'Liberación de recursos para tareas de mayor valor',
      'Escalabilidad de operaciones sin incremento proporcional de costos'
    ],
    color: 'from-orange-500 to-amber-400',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'desarrollo-medida',
    title: 'Desarrollo a Medida',
    description: 'Creamos soluciones tecnológicas personalizadas que se adaptan perfectamente a las necesidades de tu empresa.',
    content: 'Desarrollamos aplicaciones web, móviles y soluciones IT completamente personalizadas que responden exactamente a las necesidades de tu negocio. Nuestro enfoque centrado en el usuario y nuestras metodologías ágiles aseguran resultados de alta calidad y alineados con tus objetivos.',
    image: '/images/services/desarrollo.jpg',
    benefits: [
      'Soluciones adaptadas exactamente a tus necesidades',
      'Integración perfecta con sistemas existentes',
      'Escalabilidad y flexibilidad para crecer con tu negocio',
      'Experiencia de usuario optimizada',
      'Soporte y mantenimiento continuo'
    ],
    color: 'from-indigo-500 to-blue-400',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

const ServiceDetails = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       

        <SectionHeading
            title={
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold">
                Servicios en Detalle
              </span>
            }
            subtitle={
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
             Conoce en profundidad cómo nuestros servicios pueden transformar tu empresa              </span>
            }
            centered
          />

        <div className="space-y-32">
          {serviceDetails.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              <motion.div
                className={`rounded-2xl overflow-hidden ${isDarkMode ? 'shadow-2xl shadow-blue-900/20 border border-gray-700/50' : 'shadow-xl'} ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="lg:w-1/2 relative h-80 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 z-10"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-600 to-teal-600' : 'from-indigo-600 to-purple-600'}`}></div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-xl text-white/90">{service.description}</p>
                    </div>
                  </div>
                </div>

                <div className={`lg:w-1/2 p-8 md:p-12 ${isDarkMode ? 'bg-gray-800' : service.bgColor}`}>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} mb-8 text-lg`}>{service.content}</p>

                  <h4 className={`text-xl font-semibold mb-4 ${service.textColor}`}>Beneficios</h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg className={`w-5 h-5 ${service.textColor} mr-2 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`h-1 w-24 bg-gradient-to-r ${service.color} mt-8 rounded-full`}></div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
