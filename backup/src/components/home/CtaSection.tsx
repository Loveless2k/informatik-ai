"use client";

import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

const CtaSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Efecto para manejar el movimiento del mouse para el efecto parallax - solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        setMousePosition({ x, y });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Efecto para detectar cuando la sección está en el viewport - solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    } else {
      // Fallback para navegadores que no soportan IntersectionObserver
      setIsInView(true);
    }
  }, []);

  // Efecto para la animación del botón - solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined' && isInView) {
      const interval = setInterval(() => {
        setIsButtonAnimating(true);
        setTimeout(() => {
          setIsButtonAnimating(false);
        }, 700);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        perspective: '1000px',
        backgroundColor: '#f8f9fa' // Fondo claro en contraste con la sección azul anterior
      }}
    >
      {/* Fondo con efecto de glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-gray-200"></div>

      {/* Patrones geométricos 3D */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formas 3D que se mueven con el mouse - movimiento más suave */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-3xl bg-gradient-to-br from-teal-300/30 to-blue-300/30 backdrop-blur-xl border border-white/20 shadow-xl"
          style={{
            transform: `translateX(${mousePosition.x * 12}px) translateY(${mousePosition.y * 12}px) rotateX(${mousePosition.y * 6}deg) rotateY(${-mousePosition.x * 6}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        ></div>

        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-300/20 to-pink-300/20 backdrop-blur-xl border border-white/20 shadow-xl"
          style={{
            transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px) rotateX(${-mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg)`,
            transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        ></div>

        {/* Elementos decorativos con neomorfismo */}
        <div className="absolute top-1/3 left-10 w-20 h-20 bg-white rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)] animate-float"></div>
        <div className="absolute bottom-1/3 right-10 w-16 h-16 bg-white rounded-full shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)] animate-float-delay"></div>

        {/* Partículas flotantes - posiciones fijas para evitar errores de hidratación */}
        <div className="absolute inset-0">
          {[
            { top: '10%', left: '15%', duration: '8s', delay: '0s' },
            { top: '20%', left: '85%', duration: '12s', delay: '1s' },
            { top: '35%', left: '25%', duration: '9s', delay: '2s' },
            { top: '45%', left: '75%', duration: '11s', delay: '0.5s' },
            { top: '65%', left: '35%', duration: '10s', delay: '1.5s' },
            { top: '75%', left: '65%', duration: '13s', delay: '0.7s' },
            { top: '85%', left: '45%', duration: '9.5s', delay: '2.2s' },
            { top: '15%', left: '55%', duration: '10.5s', delay: '1.2s' },
            { top: '25%', left: '5%', duration: '11.5s', delay: '0.3s' },
            { top: '55%', left: '95%', duration: '9.2s', delay: '1.8s' },
            { top: '5%', left: '35%', duration: '12.5s', delay: '0.9s' },
            { top: '95%', left: '25%', duration: '10.2s', delay: '1.3s' }
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 animate-float"
              style={{
                top: particle.top,
                left: particle.left,
                opacity: 0.6,
                animationDuration: particle.duration,
                animationDelay: particle.delay
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Líneas decorativas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      </div>

      {/* Contenido principal con efecto 3D */}
      <div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          transform: isInView ? 'translateZ(0) rotateX(0)' : 'translateZ(-100px) rotateX(10deg)',
          opacity: isInView ? 1 : 0,
          transition: 'transform 1s ease-out, opacity 1s ease-out'
        }}
      >
        <div
          className="max-w-4xl mx-auto"
          style={{
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          {/* Tarjeta principal con efecto de glassmorphism */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-700 hover:shadow-[0_20px_50px_rgba(8,112,184,0.3)]">
            {/* Elementos decorativos dentro de la tarjeta */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/10 rounded-full"></div>

            {/* Contenido de texto */}
            <div className="relative z-10 text-center">
              <div
                className={`inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-full text-blue-800 font-medium mb-8 transform transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                style={{ transitionDelay: '0.2s' }}
              >
                ¿Listo para dar el siguiente paso?
              </div>

              <h2
                className={`text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-transparent bg-clip-text transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                style={{ transitionDelay: '0.4s' }}
              >
                ¿Listo para transformar tu negocio con IA?
              </h2>

              <p
                className={`text-xl mb-12 text-gray-700 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                style={{ transitionDelay: '0.6s' }}
              >
                Contáctanos hoy para programar una consulta y descubrir cómo nuestras soluciones de IA pueden ayudar a tu empresa a prosperar en la era digital.
              </p>

              {/* Botón CTA con animaciones disruptivas */}
              <div
                className={`transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                style={{ transitionDelay: '0.8s' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative inline-block">
                  {/* Efecto de resplandor detrás del botón */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full blur-xl transition-all duration-500 ${isHovering || isButtonAnimating ? 'opacity-70 scale-110' : 'opacity-0 scale-100'}`}
                  ></div>

                  {/* Partículas mejoradas que salen del botón al hacer hover - posicionamiento corregido */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 shadow-sm transition-all duration-700 ease-out-cubic"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${isHovering || isButtonAnimating ? '70px' : '0px'})`,
                          opacity: isHovering || isButtonAnimating ? '0.8' : '0',
                          transitionDelay: `${i * 0.03}s`,
                          boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
                        }}
                      />
                    ))}
                  </div>

                  {/* Efecto de ondas concéntricas - corregido el posicionamiento */}
                  {(isHovering || isButtonAnimating) && (
                    <div className="absolute inset-0 overflow-visible pointer-events-none">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="absolute inset-0 rounded-full bg-blue-400/10 pointer-events-none"
                          style={{
                            animation: `ripple 1.5s ease-out ${i * 0.3}s infinite`,
                            opacity: 1 - (i * 0.3)
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <Button
                    href="/contact"
                    size="lg"
                    className={`relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-500 ${isHovering || isButtonAnimating ? 'scale-105 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)]' : 'scale-100'}`}
                  >
                    <span className="relative z-10 flex items-center">
                      Comienza Hoy
                      <svg
                        className={`ml-2 w-6 h-6 transition-transform duration-500 ${isHovering || isButtonAnimating ? 'translate-x-2' : 'translate-x-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos decorativos 3D debajo de la tarjeta */}
          <div
            className={`mt-16 flex justify-center space-x-4 transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '1s' }}
          >
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{ animationDuration: '2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" style={{ animationDuration: '2.5s' }}></div>
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
