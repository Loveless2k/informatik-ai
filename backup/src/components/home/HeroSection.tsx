import React from 'react';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-24 md:py-36 overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-sky-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px] opacity-20"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Transformando Negocios Con Soluciones de IA Inteligentes
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Potenciando tu transformación digital con tecnologías de inteligencia artificial y aprendizaje automático de vanguardia.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              href="/services"
              size="lg"
              className="hover-lift hover-shadow bg-gradient-to-r from-blue-600 to-blue-500 border-0 px-8 py-4 text-lg"
            >
              Explorar Nuestros Servicios
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="hover-lift hover-shadow bg-transparent text-white border-2 border-white/70 hover:bg-white/10 px-8 py-4 text-lg"
            >
              Contáctanos
            </Button>
          </div>
        </div>

        {/* Floating tech icons */}
        <div className="absolute -bottom-16 left-10 w-32 h-32 opacity-20 animate-float hidden md:block">
          <div className="relative w-full h-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full opacity-60"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full opacity-70"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-7 h-7 bg-white rounded-full opacity-50"></div>
          </div>
        </div>

        <div className="absolute -bottom-10 right-10 w-24 h-24 opacity-20 animate-float-delay hidden md:block">
          <div className="relative w-full h-full animate-spin-slow-reverse">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full opacity-80"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-white rounded-full opacity-50"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
