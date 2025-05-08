import React from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Informatik-AI',
  description: 'Learn about Informatik-AI, our mission, vision, and the team behind our innovative AI solutions for businesses.',
};

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white dark:bg-gray-900">
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00B4DB]/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#48D1CC]/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        </div>

        <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white w-full text-center mb-2">
          Sobre Informatik-AI
          </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nuestra misión es transformar empresas a través del poder de la inteligencia artificial.
            </p>
          </div>
        </div>


      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
                    Nuestra Historia
                  </span>
                </h2>
                <p className="text-[#00B4DB] dark:text-[#48D1CC] text-xl">
                  Cómo comenzó Informatik-AI y hacia dónde nos dirigimos
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Fundada en 2020, Informatik-AI nació de la visión de hacer que las tecnologías avanzadas de IA fueran accesibles para empresas de todos los tamaños. Nuestros fundadores, un equipo de investigadores de IA y veteranos de la industria, reconocieron que, si bien la inteligencia artificial estaba revolucionando muchos sectores, muchas empresas carecían de la experiencia para implementar estas soluciones de manera efectiva.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Comenzamos con un pequeño equipo dedicado a desarrollar soluciones personalizadas de IA para un puñado de clientes. A medida que nuestra reputación por ofrecer resultados impactantes creció, también lo hizo nuestra empresa. Hoy, Informatik-AI es un proveedor líder de soluciones de IA, que atiende a clientes en diversas industrias en todo el mundo.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro viaje está impulsado por la innovación continua y el compromiso de ayudar a las empresas a aprovechar el poder transformador de la IA para lograr sus objetivos.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg group">
              {/* Imagen del equipo */}
              <div className="absolute inset-0">
                <Image
                  src="/images/nosotros/fotoEquipo.jpg"
                  alt="Equipo de Informatik-AI"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Efecto de escaneo */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Decoración en esquina */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/50 rounded-tl-lg z-20"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/50 rounded-br-lg z-20"></div>

              {/* Texto descriptivo */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-30">
                <h3 className="text-xl font-bold text-white mb-2">Nuestro Equipo Fundador</h3>
                <p className="text-gray-200 text-sm">
                  Un grupo de visionarios comprometidos con la democratización de la IA para empresas de todos los tamaños.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
                Misión y Visión
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nuestros principios fundamentales que guían cada decisión y acción
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Nuestra Misión</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Empoderar a las empresas con soluciones inteligentes de IA que impulsen la innovación, la eficiencia y el crecimiento. Nos esforzamos por hacer que las tecnologías avanzadas de IA sean accesibles y prácticas para organizaciones de todos los tamaños.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Nuestra Visión</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Ser el líder global en soluciones de IA enfocadas en negocios, reconocidos por nuestra innovación, experiencia y el valor medible que creamos para nuestros clientes. Visualizamos un futuro donde la IA mejora las capacidades humanas en todas las industrias.
                </p>
              </div>
            </div>
          </div>

          {/* Imagen del equipo en acción */}
          <div className="mt-16 relative rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-[300px] w-full">
              <Image
                src="/images/nosotros/fotoEquipo.jpg"
                alt="Equipo de Informatik-AI en acción"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Trabajando juntos hacia el futuro</h3>
                <p className="text-gray-200 max-w-2xl">
                  Nuestro equipo colabora diariamente para crear soluciones innovadoras que transforman la manera en que las empresas utilizan la inteligencia artificial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
                Nuestro Equipo
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Conoce a los expertos detrás de Informatik-AI
            </p>
          </div>

          {/* Imagen del equipo completo */}
          <div className="mb-16 relative rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/nosotros/fotoEquipo.jpg"
                alt="Equipo de Informatik-AI"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Nuestro Equipo Completo</h3>
                <p className="text-gray-200 max-w-2xl">
                  Un equipo multidisciplinario de expertos en IA, desarrollo de software, análisis de datos y estrategia empresarial.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative">
              <div className="relative h-64 overflow-hidden">
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Imagen del miembro del equipo */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 flex items-center justify-center">
                  <Image
                    src="/images/nosotros/camidevai.jpg"
                    alt="Dr. Alex Martinez"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Efecto de escaneo */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 relative">
                {/* Decoración de fondo */}
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">Dr. Alex Martinez</h3>
                  <p className="text-[#00B4DB] dark:text-[#48D1CC] mb-4">CEO & Co-Fundador</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Investigador de IA con más de 15 años de experiencia en machine learning y estrategia empresarial.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative">
              <div className="relative h-64 overflow-hidden">
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Imagen del miembro del equipo */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 flex items-center justify-center">
                  <Image
                    src="/images/nosotros/fotoEquipo.jpg"
                    alt="Dra. Sarah Kim"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Efecto de escaneo */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 relative">
                {/* Decoración de fondo */}
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">Dra. Sarah Kim</h3>
                  <p className="text-[#00B4DB] dark:text-[#48D1CC] mb-4">CTO & Co-Fundadora</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ex investigadora principal de IA en Tech University con experiencia en deep learning y redes neuronales.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative">
              <div className="relative h-64 overflow-hidden">
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Imagen del miembro del equipo */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 flex items-center justify-center">
                  <Image
                    src="/images/nosotros/fotoEquipo.jpg"
                    alt="Michael Johnson"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Efecto de escaneo */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 relative">
                {/* Decoración de fondo */}
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">Michael Johnson</h3>
                  <p className="text-[#00B4DB] dark:text-[#48D1CC] mb-4">Director de Desarrollo de Negocios</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Más de 20 años de experiencia en consultoría tecnológica y soluciones empresariales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
                Nuestros Valores
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los principios que guían nuestro trabajo y relaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Value 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Integridad</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Actuamos con honestidad y transparencia en todas nuestras interacciones, manteniendo los más altos estándares éticos.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Innovación</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Buscamos constantemente nuevas ideas y soluciones, desafiando el status quo para crear valor excepcional.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Colaboración</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Trabajamos juntos, combinando nuestras fortalezas y perspectivas para lograr resultados extraordinarios.
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Excelencia</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Nos esforzamos por alcanzar los más altos estándares en todo lo que hacemos, superando expectativas.
                </p>
              </div>
            </div>

            {/* Value 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Responsabilidad</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Asumimos la responsabilidad de nuestras acciones y decisiones, cumpliendo nuestros compromisos.
                </p>
              </div>
            </div>

            {/* Value 6 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8">
              {/* Decoración de fondo */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Adaptabilidad</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Nos adaptamos rápidamente a los cambios, evolucionando constantemente para mantenernos a la vanguardia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
