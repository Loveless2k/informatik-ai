'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import { useTheme } from '@/context/ThemeContext';

// Definir los recursos disponibles
const resources = [
  {
    id: 1,
    title: 'Guía: Implementación de IA en Empresas',
    description:
      'Una guía completa para implementar soluciones de IA en tu empresa, desde la planificación hasta la ejecución.',
    category: 'guias',
    image: '/images/resources/guide-ai-implementation.jpg',
    type: 'PDF',
    downloadUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Plantilla: Plan Estratégico de IA',
    description:
      'Plantilla editable para crear tu plan estratégico de implementación de IA adaptado a las necesidades de tu empresa.',
    category: 'plantillas',
    image: '/images/resources/template-ai-strategy.jpg',
    type: 'DOCX',
    downloadUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Herramienta: Calculadora de ROI para Proyectos de IA',
    description:
      'Calcula el retorno de inversión potencial de tus proyectos de IA con esta herramienta interactiva.',
    category: 'herramientas',
    image: '/images/resources/tool-roi-calculator.jpg',
    type: 'XLSX',
    downloadUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Webinar: Tendencias de IA para 2024',
    description:
      'Grabación de nuestro webinar sobre las tendencias más importantes en IA para el próximo año.',
    category: 'webinars',
    image: '/images/resources/webinar-ai-trends.jpg',
    type: 'VIDEO',
    downloadUrl: '#',
    featured: true,
  },
  {
    id: 5,
    title: 'Tutorial: Primeros pasos con Machine Learning',
    description:
      'Aprende los conceptos básicos del machine learning y cómo aplicarlos en casos prácticos.',
    category: 'guias',
    image: '/images/resources/tutorial-machine-learning.jpg',
    type: 'PDF',
    downloadUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Plantilla: Dashboard de KPIs para Proyectos de IA',
    description:
      'Plantilla de dashboard para seguimiento de KPIs en proyectos de inteligencia artificial.',
    category: 'plantillas',
    image: '/images/resources/template-kpi-dashboard.jpg',
    type: 'PPTX',
    downloadUrl: '#',
    featured: false,
  },
  {
    id: 7,
    title: 'Herramienta: Evaluador de Madurez en IA',
    description:
      'Evalúa el nivel de madurez de tu empresa en la adopción de inteligencia artificial.',
    category: 'herramientas',
    image: '/images/resources/tool-ai-maturity.jpg',
    type: 'WEB',
    downloadUrl: '#',
    featured: false,
  },
  {
    id: 8,
    title: 'Webinar: Automatización de Procesos con IA',
    description:
      'Descubre cómo automatizar procesos empresariales utilizando inteligencia artificial.',
    category: 'webinars',
    image: '/images/resources/webinar-process-automation.jpg',
    type: 'VIDEO',
    downloadUrl: '#',
    featured: false,
  },
];

// Tipo para el recurso
interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  type: string;
  downloadUrl: string;
  featured: boolean;
}

// Componente para mostrar un recurso individual
const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className='bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col'
    >
      <div className='relative h-48 w-full'>
        <div className='absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
          <svg
            className='w-12 h-12 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </div>
        {/* Nota: En un entorno real, se cargarían imágenes reales */}
        {/* <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="object-cover"
        /> */}
      </div>

      <div className='p-6 flex-grow flex flex-col'>
        <div className='flex justify-between items-start mb-3'>
          <span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full'>
            {resource.category === 'guias' && 'Guía & Tutorial'}
            {resource.category === 'plantillas' && 'Plantilla'}
            {resource.category === 'herramientas' && 'Herramienta'}
            {resource.category === 'webinars' && 'Webinar'}
          </span>
          <span className='px-2 py-1 bg-secondary/10 text-secondary dark:text-secondary-light text-xs font-bold rounded'>
            {resource.type}
          </span>
        </div>

        <h3 className='text-lg font-bold mb-2 text-gray-900 dark:text-white'>
          {resource.title}
        </h3>

        <p className='text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow'>
          {resource.description}
        </p>

        <a
          href={resource.downloadUrl}
          className='mt-auto inline-flex items-center justify-center px-4 py-2 border border-secondary text-secondary dark:text-secondary-light dark:border-secondary-light hover:bg-secondary hover:text-white dark:hover:bg-secondary-light dark:hover:text-gray-900 rounded-lg transition-colors duration-300 text-sm font-medium'
        >
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
            />
          </svg>
          Descargar Recurso
        </a>
      </div>
    </motion.div>
  );
};

const ResourcesList = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredResources =
    activeCategory === 'all'
      ? resources
      : resources.filter(resource => resource.category === activeCategory);

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'guias', label: 'Guías y Tutoriales' },
    { key: 'plantillas', label: 'Plantillas' },
    { key: 'herramientas', label: 'Herramientas' },
    { key: 'webinars', label: 'Webinars' },
  ];

  return (
    <section
      id='recursos-destacados'
      className={`py-20 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'}`}
    >
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] opacity-[0.05] pointer-events-none"></div>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <SectionHeading
          title={
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold'>
              Recursos Destacados
            </span>
          }
          subtitle={
            <span
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}
            >
              Explora nuestra colección de recursos gratuitos diseñados para
              ayudarte a implementar y aprovechar la IA en tu empresa.
            </span>
          }
          centered
          className='mb-16'
        />

        <div className='flex flex-wrap justify-center gap-3 mb-10'>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
          {sortedResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </motion.div>

        {filteredResources.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600 dark:text-gray-400'>
              No se encontraron recursos en esta categoría. Por favor, intenta
              con otra categoría.
            </p>
          </div>
        )}

        <div className='text-center mt-16'>
          <button className='px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-medium shadow-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300'>
            Cargar Más Recursos
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesList;
