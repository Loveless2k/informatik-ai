'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const InformatikCase = () => {
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Informatik-AI: Nuestro Propio Caso de Éxito"
          subtitle="Aplicando nuestra experiencia y conocimiento para crear una empresa innovadora"
          centered
          className="mb-16 text-white"
          subtitleClassName="text-blue-100"
        />

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <p className="text-lg text-blue-100 mb-6">
              En Informatik-AI, no solo ayudamos a nuestros clientes a alcanzar el éxito; 
              también somos nuestro propio caso de éxito. Nuestra empresa nació de la aplicación 
              de los mismos principios y tecnologías que ofrecemos a nuestros clientes.
            </p>
            <p className="text-lg text-blue-100">
              Nuestra historia demuestra cómo la combinación de conocimiento técnico, 
              visión estratégica y soluciones de IA puede transformar una idea en una 
              empresa innovadora con impacto real.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={itemVariants}
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-blue-300 mb-6">Nuestra Visión</h3>
              <p className="text-blue-50 mb-6">
                Informatik-AI nació con la visión de democratizar el acceso a la inteligencia artificial 
                y ayudar a empresas y creadores a aprovechar todo su potencial. Identificamos una 
                oportunidad en el mercado: muchas empresas querían implementar soluciones de IA pero 
                carecían del conocimiento técnico necesario.
              </p>
              <p className="text-blue-50">
                Aplicando nuestro propio análisis de mercado y utilizando las mismas herramientas de IA 
                que desarrollamos para nuestros clientes, definimos un modelo de negocio innovador que 
                combina consultoría, desarrollo y formación.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-blue-300 mb-6">Implementación</h3>
              <p className="text-blue-50 mb-6">
                Utilizamos nuestro propio framework de desarrollo para crear soluciones internas que 
                optimizaran nuestros procesos. Implementamos agentes GPT para análisis de mercado, 
                chatbots para atención al cliente y sistemas automatizados para la generación de 
                propuestas personalizadas.
              </p>
              <p className="text-blue-50">
                Estas mismas herramientas nos permitieron escalar rápidamente, atender a más clientes 
                y ofrecer soluciones cada vez más sofisticadas, demostrando en la práctica el valor 
                de nuestros servicios.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 rounded-xl border border-blue-500/30 mb-16"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-center text-blue-300 mb-6">Resultados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">+50</h4>
                <p className="text-blue-200">Clientes Satisfechos</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">100%</h4>
                <p className="text-blue-200">Proyectos Exitosos</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">300%</h4>
                <p className="text-blue-200">Crecimiento Anual</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">+25</h4>
                <p className="text-blue-200">Soluciones Innovadoras</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-blue-300 mb-6">Lecciones Aprendidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-300">1</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Innovación Constante</h4>
                <p className="text-blue-100">
                  La tecnología evoluciona rápidamente. Mantenerse a la vanguardia es esencial para ofrecer soluciones relevantes.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-300">2</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Enfoque Personalizado</h4>
                <p className="text-blue-100">
                  Cada cliente es único. Las soluciones estandarizadas no generan los mismos resultados que las personalizadas.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-300">3</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Resultados Medibles</h4>
                <p className="text-blue-100">
                  El éxito debe ser cuantificable. Establecer métricas claras y hacer seguimiento constante es fundamental.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InformatikCase;
