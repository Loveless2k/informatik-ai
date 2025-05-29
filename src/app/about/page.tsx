'use client';

import Image from 'next/image';
import OrgChart from '@/components/about/OrgChart';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import NeuralNetworkBackground from '@/components/ui/NeuralNetworkBackground';

const AboutPage = () => {
  const controls = useAnimation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <>
      {/* Hero Section */}
      <section className='relative py-32 md:py-44 overflow-hidden code-lines-bg bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'>
        {/* Efecto de resplandor superior */}
        <div className='absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-blue-900/30'></div>

        {/* Fondo de red neuronal */}
        <NeuralNetworkBackground />

        {/* Patrón de cuadrícula y scan */}
        <div className='absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]'></div>
        <div className='scan-effect absolute inset-0 opacity-30'></div>
        <div className='matrix-bg absolute inset-0 opacity-10'></div>

        {/* Contenido central animado */}
        <motion.div
          className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'
          initial='hidden'
          animate={controls}
          variants={staggerContainer}
        >
          <div className='max-w-5xl mx-auto text-center'>
            <motion.h1
              className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6 text-glow'
              variants={fadeInUp}
            >
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                Sobre Informatik-AI
              </span>
            </motion.h1>
            <motion.p
              className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto'
              variants={fadeInUp}
            >
              Nuestra misión es transformar empresas a través del poder de la
              inteligencia artificial.
            </motion.p>
          </div>
        </motion.div>

        {/* Elementos decorativos pulsantes */}
        <div
          className='absolute bottom-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse'
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className='absolute top-20 right-10 w-32 h-32 border border-teal-500/10 rounded-full animate-pulse'
          style={{ animationDuration: '12s' }}
        ></div>
      </section>

      {/* Our Story Section */}
      <section className='py-20 bg-white dark:bg-gray-900 relative overflow-hidden'>
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className='absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <div className='mb-8'>
                <h2 className='text-4xl font-bold mb-4 text-glow'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                    Nuestra Historia
                  </span>
                </h2>
                <p className='text-[#00B4DB] dark:text-[#48D1CC] text-xl'>
                  Cómo comenzó Informatik-AI y hacia dónde nos dirigimos
                </p>
              </div>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                Fundada en 2020, Informatik-AI nació de la visión de hacer que
                las tecnologías avanzadas de IA fueran accesibles para empresas
                de todos los tamaños. Nuestros fundadores, un equipo de
                investigadores de IA y veteranos de la industria, reconocieron
                que, si bien la inteligencia artificial estaba revolucionando
                muchos sectores, muchas empresas carecían de la experiencia para
                implementar estas soluciones de manera efectiva.
              </p>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                Comenzamos con un pequeño equipo dedicado a desarrollar
                soluciones personalizadas de IA para un puñado de clientes. A
                medida que nuestra reputación por ofrecer resultados impactantes
                creció, también lo hizo nuestra empresa. Hoy, Informatik-AI es
                un proveedor líder de soluciones de IA, que atiende a clientes
                en diversas industrias en todo el mundo.
              </p>
              <p className='text-gray-600 dark:text-gray-300'>
                Nuestro viaje está impulsado por la innovación continua y el
                compromiso de ayudar a las empresas a aprovechar el poder
                transformador de la IA para lograr sus objetivos.
              </p>
            </div>
            <div className='relative h-96 rounded-xl overflow-hidden shadow-lg group'>
              {/* Imagen del equipo */}
              <div className='absolute inset-0'>
                <Image
                  src='/images/nosotros/fotoEquipo.jpg'
                  alt='Equipo de Informatik-AI'
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-xl'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
              </div>

              {/* Overlay con gradiente */}
              <div className='absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              {/* Efecto de escaneo */}
              <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              {/* Decoración en esquina */}
              <div className='absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/50 rounded-tl-lg z-20'></div>
              <div className='absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/50 rounded-br-lg z-20'></div>

              {/* Texto descriptivo */}
              <div className='absolute bottom-0 left-0 w-full p-6 z-30'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Nuestro Equipo Fundador
                </h3>
                <p className='text-gray-200 text-sm'>
                  Un grupo de visionarios comprometidos con la democratización
                  de la IA para empresas de todos los tamaños.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className='py-20 bg-white dark:bg-gray-900 relative overflow-hidden'>
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className='absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4 text-glow'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                Misión y Visión
              </span>
            </h2>
            <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Nuestros principios fundamentales que guían cada decisión y acción
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Mission */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8'>
              {/* Decoración de fondo */}
              <div className='absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20'></div>

              <div className='relative z-10'>
                <div className='w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                </div>
                <h3 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center'>
                  Nuestra Misión
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-center'>
                  Empoderar a las empresas con soluciones inteligentes de IA que
                  impulsen la innovación, la eficiencia y el crecimiento. Nos
                  esforzamos por hacer que las tecnologías avanzadas de IA sean
                  accesibles y prácticas para organizaciones de todos los
                  tamaños.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative p-8'>
              {/* Decoración de fondo */}
              <div className='absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20'></div>

              <div className='relative z-10'>
                <div className='w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center mb-6 mx-auto'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </div>
                <h3 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center'>
                  Nuestra Visión
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-center'>
                  Ser el líder global en soluciones de IA enfocadas en negocios,
                  reconocidos por nuestra innovación, experiencia y el valor
                  medible que creamos para nuestros clientes. Visualizamos un
                  futuro donde la IA mejora las capacidades humanas en todas las
                  industrias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-white dark:bg-gray-900 relative overflow-hidden'>
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className='absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4 text-glow'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                Nuestro Equipo
              </span>
            </h2>
            <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Conoce a los expertos detrás de Informatik-AI
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            {/* Team Member 1 */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative'>
              <div className='relative h-80 overflow-hidden'>
                {/* Overlay con gradiente */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Imagen del miembro del equipo */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 flex items-center justify-center'>
                  <Image
                    src='/images/nosotros/camidevai.jpg'
                    alt=''
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                  />
                </div>

                {/* Efecto de escaneo */}
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
              <div className='p-6 relative'>
                {/* Decoración de fondo */}
                <div className='absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20'></div>

                <div className='relative z-10'>
                  <h3 className='text-xl font-bold mb-1 text-gray-800 dark:text-white'>
                    Especialista. Camila Bañares Carrasco
                  </h3>
                  <p className='text-[#00B4DB] dark:text-[#48D1CC] mb-4'>
                    CEO & Co-Fundadora de Informatik-AI
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Ingeniera en informatica con mensión en ciber seguridad y
                    divulgadora líder en Inteligencia Artificial en
                    Latinoamérica. Fundadora de <strong>CamiDevAI</strong>,
                    combina experiencia técnica con una poderosa comunidad
                    digital para acercar la IA a miles de personas y empresas.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative'>
              <div className='relative h-80 overflow-hidden'>
                {/* Overlay con gradiente */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Imagen del miembro del equipo */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 flex items-center justify-center'>
                  <Image
                    src='/images/nosotros/danielSalgado.jpg '
                    alt='Dra. Cara de'
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                  />
                </div>

                {/* Efecto de escaneo */}
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
              <div className='p-6 relative'>
                {/* Decoración de fondo */}
                <div className='absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20'></div>

                <div className='relative z-10'>
                  <h3 className='text-xl font-bold mb-1 text-gray-800 dark:text-white'>
                    Especialista. Jorge Salgado Pons
                  </h3>
                  <p className='text-[#00B4DB] dark:text-[#48D1CC] mb-4'>
                    CTO & Co-Fundador de Informatik-AI
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Ingeniero en informatica experto en automatización y
                    back-end con IA. Creador de soluciones críticas para la
                    industria financiera y líder en integración de agentes
                    conversacionales. Diseña tecnologías que transforman
                    procesos empresariales con inteligencia generativa.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-2 duration-300 overflow-hidden border border-[#00B4DB]/10 dark:border-[#48D1CC]/20 relative'>
              <div className='relative h-80 overflow-hidden'>
                {/* Overlay con gradiente */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#00B4DB]/20 to-[#48D1CC]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Imagen del miembro del equipo */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 dark:from-[#00B4DB]/20 dark:to-[#48D1CC]/20 flex items-center justify-center'>
                  <Image
                    src='/images/nosotros/gonzalofigueroa.jpg'
                    alt='Michael Johnson'
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                  />
                </div>

                {/* Efecto de escaneo */}
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#00B4DB]/10 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
              <div className='p-6 relative'>
                {/* Decoración de fondo */}
                <div className='absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#00B4DB]/10 to-[#48D1CC]/10 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 dark:opacity-20'></div>

                <div className='relative z-10'>
                  <h3 className='text-xl font-bold mb-1 text-gray-800 dark:text-white'>
                    Especialista. Gonzalo Figueroa
                  </h3>
                  <p className='text-[#00B4DB] dark:text-[#48D1CC] mb-4'>
                    CTO & Co-Fundador de Informatik-AI
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Ingeniero civil, experto en diseño y optimización de
                    procesos empresariales. Con una visión estratégica y enfoque
                    en eficiencia operativa, lidera iniciativas que conectan
                    tecnología e impacto organizacional, ayudando a las empresas
                    a escalar con inteligencia y orden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Chart Section */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden'>
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Elementos decorativos minimalistas */}
        <div className='absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4 text-glow'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                Estructura Organizacional
              </span>
            </h2>
            <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Conoce cómo está organizado nuestro equipo de liderazgo y sus
              áreas de especialización
            </p>
          </div>

          <OrgChart />
        </div>
      </section>

      {/* Values Section - Diseño Moderno */}
      <section className='py-28 bg-white dark:bg-gray-900 relative overflow-hidden'>
        {/* Fondo mejorado */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] dark:opacity-[0.05]"></div>
        <div className='absolute inset-0 bg-gradient-to-br from-[#00B4DB]/[0.02] to-[#48D1CC]/[0.02] dark:from-[#00B4DB]/[0.03] dark:to-[#48D1CC]/[0.03]'></div>

        {/* Elementos decorativos */}
        <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#00B4DB]/5 to-transparent rounded-full blur-3xl'></div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 relative z-10'>
          <div className='text-center mb-20'>
            <span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-[#00B4DB]/10 text-[#00B4DB] dark:text-[#48D1CC] dark:bg-[#48D1CC]/10'>
              NUESTROS PRINCIPIOS
            </span>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-glow'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200'>
                Valores que nos definen
              </span>
            </h2>
            <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg'>
              Los principios fundamentales que guían nuestras decisiones,
              acciones y relaciones
            </p>
          </div>

          {/* Diseño moderno de valores con líneas conectoras */}
          <div className='relative mt-20'>
            {/* Línea conectora central */}
            <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00B4DB] to-[#48D1CC] hidden lg:block'></div>

            <div className='space-y-24 lg:space-y-0 relative'>
              {/* Valor 1 - Integridad */}
              <div className='flex flex-col lg:flex-row items-center lg:items-start'>
                <div className='lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1'>
                  <div className='transform transition-all duration-500 hover:-translate-y-2'>
                    <h3 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white inline-flex items-center'>
                      <span>Integridad</span>
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 max-w-md ml-auto'>
                      Actuamos con honestidad y transparencia en todas nuestras
                      interacciones, manteniendo los más altos estándares
                      éticos.
                    </p>
                  </div>
                </div>

                <div className='lg:w-16 relative flex justify-center order-1 lg:order-2 mb-6 lg:mb-0'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center shadow-lg shadow-[#00B4DB]/20 dark:shadow-[#48D1CC]/20 z-10 transition-transform duration-300 hover:scale-110'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                      />
                    </svg>
                  </div>
                  <div className='hidden lg:block absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00B4DB] to-transparent right-full top-1/2 transform -translate-y-1/2'></div>
                </div>

                <div className='lg:w-1/2 lg:pl-16 order-3'></div>
              </div>

              {/* Valor 2 - Innovación */}
              <div className='flex flex-col lg:flex-row items-center lg:items-start'>
                <div className='lg:w-1/2 lg:pr-16 order-2 lg:order-1'></div>

                <div className='lg:w-16 relative flex justify-center order-1 lg:order-2 mb-6 lg:mb-0'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center shadow-lg shadow-[#00B4DB]/20 dark:shadow-[#48D1CC]/20 z-10 transition-transform duration-300 hover:scale-110'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 10V3L4 14h7v7l9-11h-7z'
                      />
                    </svg>
                  </div>
                  <div className='hidden lg:block absolute w-16 h-0.5 bg-gradient-to-r from-[#00B4DB] via-transparent to-transparent left-full top-1/2 transform -translate-y-1/2'></div>
                </div>

                <div className='lg:w-1/2 lg:pl-16 lg:text-left order-3'>
                  <div className='transform transition-all duration-500 hover:-translate-y-2'>
                    <h3 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white inline-flex items-center'>
                      <span>Innovación</span>
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 max-w-md'>
                      Buscamos constantemente nuevas ideas y soluciones,
                      desafiando el status quo para crear valor excepcional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Valor 3 */}
              <div className='flex flex-col lg:flex-row items-center lg:items-start'>
                <div className='lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1'>
                  <div className='transform transition-all duration-500 hover:-translate-y-2'>
                    <h3 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white inline-flex items-center'>
                      <span>Excelencia</span>
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 max-w-md ml-auto'>
                      Nos esforzamos por alcanzar los más altos estándares en
                      todo lo que hacemos, superando expectativas y entregando
                      resultados sobresalientes.
                    </p>
                  </div>
                </div>

                <div className='lg:w-16 relative flex justify-center order-1 lg:order-2 mb-6 lg:mb-0'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] flex items-center justify-center shadow-lg shadow-[#00B4DB]/20 dark:shadow-[#48D1CC]/20 z-10 transition-transform duration-300 hover:scale-110'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                      />
                    </svg>
                  </div>
                  <div className='hidden lg:block absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00B4DB] to-transparent right-full top-1/2 transform -translate-y-1/2'></div>
                </div>

                <div className='lg:w-1/2 lg:pl-16 order-3'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
