import React from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Informatik-AI',
  description: 'Learn about Informatik-AI, our mission, vision, and the team behind our innovative AI solutions for businesses.',
};

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 code-lines-bg">
        {/* Efecto de resplandor superior */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30"></div>

        {/* Efecto de escaneo sutil */}
        <div className="scan-effect absolute inset-0 opacity-20"></div>

        {/* Matrix background */}
        <div className="matrix-bg absolute inset-0 opacity-10"></div>

        {/* Patrón de fondo */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"
             style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/10 rounded-full animate-pulse"
             style={{ animationDuration: '15s' }}></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-glow">Sobre Informatik-AI</h1>
            <p className="text-xl text-gray-300 tech-text">
              Nuestra misión es transformar empresas a través del poder de la inteligencia artificial.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative code-lines-bg">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow">Nuestra Historia</h2>
                <p className="text-xl text-blue-300">Cómo comenzó Informatik-AI y hacia dónde nos dirigimos</p>
              </div>
              <p className="text-gray-300 mb-4 tech-text">
                Fundada en 2020, Informatik-AI nació de la visión de hacer que las tecnologías avanzadas de IA fueran accesibles para empresas de todos los tamaños. Nuestros fundadores, un equipo de investigadores de IA y veteranos de la industria, reconocieron que, si bien la inteligencia artificial estaba revolucionando muchos sectores, muchas empresas carecían de la experiencia para implementar estas soluciones de manera efectiva.
              </p>
              <p className="text-gray-300 mb-4 tech-text">
                Comenzamos con un pequeño equipo dedicado a desarrollar soluciones personalizadas de IA para un puñado de clientes. A medida que nuestra reputación por ofrecer resultados impactantes creció, también lo hizo nuestra empresa. Hoy, Informatik-AI es un proveedor líder de soluciones de IA, que atiende a clientes en diversas industrias en todo el mundo.
              </p>
              <p className="text-gray-300 tech-text">
                Nuestro viaje está impulsado por la innovación continua y el compromiso de ayudar a las empresas a aprovechar el poder transformador de la IA para lograr sus objetivos.
              </p>
            </div>
            <div className="bg-gray-800 h-96 rounded-lg flex items-center justify-center border border-blue-900/30 shadow-lg shadow-blue-900/20 glow-effect">
              {/* Placeholder for an image */}
              <div className="text-blue-300 text-center p-4 tech-text">
                [Imagen de la historia de la empresa]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative">
        {/* Efecto de escaneo sutil */}
        <div className="scan-effect absolute inset-0 opacity-20"></div>

        {/* Matrix background */}
        <div className="matrix-bg absolute inset-0 opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800/80 p-8 rounded-lg shadow-lg border border-blue-900/30 backdrop-blur-sm glow-effect">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Nuestra Misión</h3>
              <p className="text-gray-300 tech-text">
                Empoderar a las empresas con soluciones inteligentes de IA que impulsen la innovación, la eficiencia y el crecimiento. Nos esforzamos por hacer que las tecnologías avanzadas de IA sean accesibles y prácticas para organizaciones de todos los tamaños.
              </p>
            </div>
            <div className="bg-gray-800/80 p-8 rounded-lg shadow-lg border border-blue-900/30 backdrop-blur-sm glow-effect">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Nuestra Visión</h3>
              <p className="text-gray-300 tech-text">
                Ser el líder global en soluciones de IA enfocadas en negocios, reconocidos por nuestra innovación, experiencia y el valor medible que creamos para nuestros clientes. Visualizamos un futuro donde la IA mejora las capacidades humanas en todas las industrias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative code-lines-bg">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow">Nuestro Equipo</h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">Conoce a los expertos detrás de Informatik-AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Team Member 1 */}
            <div className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gray-700 h-64 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for team member photo */}
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-blue-300 text-center p-4 tech-text relative z-10">
                  [Foto del miembro del equipo]
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-blue-200">Dr. Alex Martinez</h3>
                <p className="text-blue-400 mb-4">CEO & Co-Fundador</p>
                <p className="text-gray-300 tech-text">
                  Investigador de IA con más de 15 años de experiencia en machine learning y estrategia empresarial.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gray-700 h-64 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for team member photo */}
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-blue-300 text-center p-4 tech-text relative z-10">
                  [Foto del miembro del equipo]
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-blue-200">Dra. Sarah Kim</h3>
                <p className="text-blue-400 mb-4">CTO & Co-Fundadora</p>
                <p className="text-gray-300 tech-text">
                  Ex investigadora principal de IA en Tech University con experiencia en deep learning y redes neuronales.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gray-700 h-64 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for team member photo */}
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-blue-300 text-center p-4 tech-text relative z-10">
                  [Foto del miembro del equipo]
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-blue-200">Michael Johnson</h3>
                <p className="text-blue-400 mb-4">Director de Desarrollo de Negocios</p>
                <p className="text-gray-300 tech-text">
                  Más de 20 años de experiencia en consultoría tecnológica y soluciones empresariales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative">
        {/* Efecto de escaneo sutil */}
        <div className="scan-effect absolute inset-0 opacity-20"></div>

        {/* Matrix background */}
        <div className="matrix-bg absolute inset-0 opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow">Nuestros Valores</h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">Los principios que guían todo lo que hacemos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg text-center border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-700/50 group-hover:border-blue-500/50 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-200">Integridad</h3>
              <p className="text-gray-300 tech-text">
                Mantenemos los más altos estándares éticos en todas nuestras interacciones y decisiones.
              </p>
            </div>
            <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg text-center border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-700/50 group-hover:border-blue-500/50 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-200">Innovación</h3>
              <p className="text-gray-300 tech-text">
                Exploramos continuamente nuevas ideas y tecnologías para ofrecer soluciones de vanguardia.
              </p>
            </div>
            <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg text-center border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-700/50 group-hover:border-blue-500/50 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-200">Colaboración</h3>
              <p className="text-gray-300 tech-text">
                Trabajamos estrechamente con nuestros clientes y socios para lograr un éxito compartido.
              </p>
            </div>
            <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg text-center border border-blue-900/30 backdrop-blur-sm glow-effect group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-700/50 group-hover:border-blue-500/50 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-200">Excelencia</h3>
              <p className="text-gray-300 tech-text">
                Nos esforzamos por la más alta calidad en todo lo que hacemos, desde el código hasta el servicio al cliente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
