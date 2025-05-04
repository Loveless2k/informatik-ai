import React from 'react';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-400/20 via-slate-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>

      {/* Animated particles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-teal-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-block mb-4 px-4 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
              NUESTRA VISIÓN
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight">
              Transformamos Empresas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Soluciones Tecnológicas</span> Innovadoras
            </h2>
            <p className="text-xl text-slate-300 mb-6 leading-relaxed">
              En Informatik-AI, fusionamos tecnología de vanguardia con experiencia sectorial para crear soluciones que generan resultados empresariales excepcionales.
            </p>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Nuestro equipo multidisciplinar trabaja para entender tus desafíos específicos y desarrollar estrategias personalizadas que aportan valor medible y sostenible.
            </p>
            <div className="flex flex-wrap gap-5">
              <Button
                href="/about"
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-1 text-lg font-medium"
              >
                Conoce Nuestra Historia
              </Button>
              <Button
                href="/case-studies"
                variant="outline"
                className="border-2 border-teal-500/50 text-teal-300 hover:bg-teal-500/10 px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 text-lg font-medium backdrop-blur-sm"
              >
                Casos de Éxito
              </Button>
            </div>
          </div>
          <div className="relative animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
            {/* Modern 3D illustration */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm">
              {/* Main background with more vibrant gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500"></div>

              {/* Dynamic geometric elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-20"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 left-20 w-40 h-40 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              </div>

              {/* Content overlay with improved visual hierarchy */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md border border-white/20 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-center text-white drop-shadow-md">Innovación Tecnológica</h3>
                <p className="text-center text-white text-xl max-w-md leading-relaxed font-medium drop-shadow-md">
                  Transformamos ideas en soluciones tecnológicas que potencian la eficiencia y competitividad de tu negocio.
                </p>
              </div>
            </div>

            {/* Decorative elements with improved depth */}
            <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-lg bg-teal-400/30 backdrop-blur-md -z-10 border border-teal-400/30 shadow-lg"></div>
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-blue-400/20 backdrop-blur-md -z-10 border border-blue-400/20 shadow-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
