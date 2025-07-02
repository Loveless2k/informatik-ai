'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

/**
 * Componente que se muestra cuando PRENDER_Y_APAGAR_PAGINA está OFF
 * Presenta un formulario conversacional progresivo para captar leads
 */

type FormStep = 'initial' | 'name' | 'service' | 'contact' | 'company' | 'message' | 'success';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
}

const services = [
  { id: 'strategy',          label: 'Estrategia' },
  { id: 'avatars',           label: 'Avatares' },
  { id: 'training',          label: 'Formación' },
  { id: 'course-development',label: 'Desarrollo de cursos' },
  { id: 'automation',        label: 'Automatización' },
  { id: 'custom-software',   label: 'Software a medida' },
  { id: 'chatbot',           label: 'ChatBot' },
  { id:'otro',           label: 'Otro' }

];

export default function ComingSoonPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>('initial');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Inicializar EmailJS
    emailjs.init('NuEMLaMO5zEqU4ka1');
  }, []);

  const getProgressPercentage = () => {
    const stepProgress = {
      initial: 0,
      name: 20,
      service: 40,
      contact: 60,
      company: 80,
      message: 95,
      success: 100
    };
    return stepProgress[currentStep];
  };

  const handleStartConversation = () => {
    setCurrentStep('name');
  };

  const handleNext = () => {
    if (currentStep === 'name') {
      setFormData(prev => ({ ...prev, name: inputValue }));
      setInputValue('');
      setCurrentStep('service');
    } else if (currentStep === 'service') {
      setInputValue('');
      setCurrentStep('contact');
    } else if (currentStep === 'contact') {
      const [email, phone] = inputValue.split('|');
      setFormData(prev => ({ ...prev, email: email || '', phone: phone || '' }));
      setInputValue('');
      setCurrentStep('company');
    } else if (currentStep === 'company') {
      setFormData(prev => ({ ...prev, company: inputValue }));
      setInputValue('');
      setCurrentStep('message');
    } else if (currentStep === 'message') {
      setFormData(prev => ({ ...prev, message: inputValue }));
      handleSubmit();
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    const selectedService = services.find(s => s.id === serviceId);
    setFormData(prev => ({ ...prev, service: selectedService?.label || '' }));
    setTimeout(() => {
      setCurrentStep('contact');
    }, 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Crear un formulario temporal para EmailJS
      const tempForm = document.createElement('form');

      // Agregar campos ocultos con los datos
      const fields = [
        { name: 'user_name', value: formData.name },
        { name: 'user_email', value: formData.email },
        { name: 'phone', value: formData.phone },
        { name: 'company', value: formData.company },
        { name: 'service', value: formData.service },
        { name: 'message', value: inputValue }
      ];

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        tempForm.appendChild(input);
      });

      document.body.appendChild(tempForm);

      await emailjs.sendForm(
        'service_1k212a9',
        'template_93m0kce',
        tempForm,
        'NuEMLaMO5zEqU4ka1'
      );

      document.body.removeChild(tempForm);
      setCurrentStep('success');
    } catch (error) {
      console.error('Error al enviar:', error);
      // En caso de error, podrías mostrar un mensaje de error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() || currentStep === 'service') {
        handleNext();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl lg:max-w-4xl mx-auto">

        {/* Estado Inicial */}
        {currentStep === 'initial' && (
          <div className="text-center animate-fade-in px-2 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              ¿Listo para cultivar tu{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                inteligencia?
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Hablemos de cómo Informatik-AI puede transformar tu negocio.
            </p>
            <button
              onClick={handleStartConversation}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <span className="relative z-10">Iniciar Conversación</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        )}

        {/* Formulario Conversacional */}
        {currentStep !== 'initial' && currentStep !== 'success' && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up mx-2 sm:mx-0">
            {/* Indicador de Progreso */}
            <div className="mb-6 sm:mb-8">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Paso 1: Nombre */}
            {currentStep === 'name' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">
                  <span className="text-cyan-400">1/5</span> ¡Hola! Empecemos por tu nombre.
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tu nombre completo"
                    className="flex-1 px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim()}
                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                  >
                    <span className="hidden sm:inline">→</span>
                    <span className="sm:hidden">Continuar</span>
                  </button>
                </div>
              </div>
            )}

            {/* Paso 2: Servicio */}
            {currentStep === 'service' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  <span className="text-cyan-400">2/5</span> Perfecto, {formData.name}. ¿Qué servicio te interesa?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className="p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-400 hover:bg-gray-700/50 transition-all duration-300 text-left text-white hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 3: Contacto */}
            {currentStep === 'contact' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">3/5</span> Entendido. ¿Dónde podemos contactarte?
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="email"
                    value={inputValue.split('|')[0] || ''}
                    onChange={(e) => {
                      const phone = inputValue.split('|')[1] || '';
                      setInputValue(`${e.target.value}|${phone}`);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="tu@email.com"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                    autoFocus
                  />
                  <input
                    type="tel"
                    value={inputValue.split('|')[1] || ''}
                    onChange={(e) => {
                      const email = inputValue.split('|')[0] || '';
                      setInputValue(`${email}|${e.target.value}`);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Teléfono (opcional)"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.split('|')[0]?.trim()}
                    className="w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* Paso 4: Empresa */}
            {currentStep === 'company' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">4/5</span> ¿Para qué empresa sería?
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    placeholder="Nombre de tu empresa"
                    className="flex-1 px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim()}
                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium min-w-[60px] sm:min-w-[80px]"
                  >
                    <span className="hidden sm:inline">→</span>
                    <span className="sm:hidden">Continuar</span>
                  </button>
                </div>
              </div>
            )}

            {/* Paso 5: Mensaje */}
            {currentStep === 'message' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">5/5</span> Genial. Por último, cuéntanos un poco sobre tu proyecto o desafío.
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe tu proyecto, desafío o cómo podemos ayudarte..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim() || isSubmitting}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Enviando...</span>
                        <span className="sm:hidden">Enviando</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Enviar Consulta →</span>
                        <span className="sm:hidden">Enviar →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado de Éxito */}
        {currentStep === 'success' && (
          <div className="text-center animate-fade-in px-3 sm:px-6 md:px-8 lg:px-4">
            <div className="relative bg-gradient-to-br from-gray-800/70 via-gray-800/60 to-gray-900/70 backdrop-blur-lg border border-gray-600/40 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-1 sm:mx-2 md:mx-4 lg:mx-0 shadow-2xl max-w-4xl">

              {/* Efectos de fondo decorativos */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-green-500/5 rounded-2xl sm:rounded-3xl lg:rounded-[2rem]"></div>
              <div className="absolute top-4 right-4 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl"></div>

              {/* Contenido principal */}
              <div className="relative z-10">
                {/* Icono de éxito con animación mejorada */}
                <div className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25 animate-pulse">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {/* Círculos decorativos animados */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 border-2 border-green-400/20 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 border border-emerald-400/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Partículas flotantes */}
                  <div className="absolute top-0 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/4 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                </div>

                {/* Título principal responsive */}
                <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight">
                    <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>🎉</span>
                    {' '}¡Perfecto,{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {formData.name}
                    </span>!
                  </h2>
                  <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-emerald-500 mx-auto rounded-full shadow-lg shadow-cyan-400/25"></div>
                </div>

                {/* Mensaje principal con diseño mejorado */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  {/* Card principal del mensaje */}
                  <div className="relative bg-gradient-to-r from-gray-700/40 via-gray-700/30 to-gray-700/40 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-600/30 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-green-500/5 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                    <div className="relative z-10">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed font-medium">
                        Tu consulta sobre{' '}
                        <span className="inline-flex items-center px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 font-bold rounded-lg sm:rounded-xl border border-cyan-500/40 shadow-lg shadow-cyan-500/10 text-xs sm:text-sm md:text-base lg:text-lg">
                          ✨ {formData.service}
                        </span>
                        {' '}ha sido recibida exitosamente.
                      </p>
                    </div>
                  </div>

                  {/* Cards de información responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
                    {/* Card de contacto */}
                    <div className="bg-gradient-to-br from-blue-500/15 to-blue-600/10 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-blue-500/25 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 group">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-blue-300 font-semibold text-sm sm:text-base md:text-lg">Contacto</span>
                      </div>
                      <p className="text-gray-300 break-all leading-relaxed">{formData.email}</p>
                    </div>

                    {/* Card de tiempo de respuesta */}
                    <div className="bg-gradient-to-br from-green-500/15 to-emerald-600/10 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-green-500/25 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300 group">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-500/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-green-300 font-semibold text-sm sm:text-base md:text-lg">Respuesta</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">24-48 horas</p>
                    </div>

                    {/* Card de prioridad (nuevo) */}
                    <div className="bg-gradient-to-br from-purple-500/15 to-purple-600/10 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-purple-500/25 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-purple-300 font-semibold text-sm sm:text-base md:text-lg">Prioridad</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">Alta ⭐</p>
                    </div>
                  </div>
                </div>

                {/* Próximos pasos con diseño mejorado */}
                <div className="relative bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-cyan-500/25 mb-4 sm:mb-6 md:mb-8 lg:mb-10 backdrop-blur-sm overflow-hidden">
                  {/* Efectos de fondo */}
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-lg"></div>

                  <div className="relative z-10">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-cyan-300 mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                        ¿Qué sigue?
                      </span>
                    </h3>

                    <div className="space-y-3 sm:space-y-4 md:space-y-5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">
                      {[
                        {
                          number: 1,
                          text: "Revisaremos tu consulta en detalle",
                          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                          color: "from-green-500 to-emerald-500"
                        },
                        {
                          number: 2,
                          text: "Un especialista te contactará para agendar una reunión",
                          icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                          color: "from-blue-500 to-cyan-500"
                        },
                        {
                          number: 3,
                          text: "Desarrollaremos una propuesta personalizada",
                          icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                          color: "from-purple-500 to-pink-500"
                        }
                      ].map((step) => (
                        <div key={step.number} className="flex items-start gap-3 sm:gap-4 md:gap-5 group hover:transform hover:translate-x-1 transition-all duration-300">
                          <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r ${step.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                            <span className="text-white font-bold text-xs sm:text-sm md:text-base">{step.number}</span>
                          </div>
                          <div className="flex-1 pt-1 sm:pt-1.5 md:pt-2">
                            <p className="leading-relaxed group-hover:text-white transition-colors duration-300">{step.text}</p>
                          </div>
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 mt-1 sm:mt-1.5 md:mt-2">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Firma del equipo mejorada */}
                <div className="relative border-t border-gradient-to-r from-transparent via-gray-600/40 to-transparent pt-4 sm:pt-6 md:pt-8">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed">
                      Con cariño y dedicación,
                    </p>
                    <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 sm:gap-3">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">el equipo de</span>
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Informatik-AI
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl animate-bounce">🚀</span>
                    </div>
                    <div className="mt-2 sm:mt-3 flex justify-center gap-1 sm:gap-2">
                      <span className="text-lg sm:text-xl animate-bounce" style={{animationDelay: '0.1s'}}>✨</span>
                      <span className="text-lg sm:text-xl animate-bounce" style={{animationDelay: '0.2s'}}>💡</span>
                      <span className="text-lg sm:text-xl animate-bounce" style={{animationDelay: '0.3s'}}>🎯</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción mejorados */}
                <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                  <button
                    onClick={() => setCurrentStep('initial')}
                    className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-gray-700/60 to-gray-600/60 hover:from-gray-600/70 hover:to-gray-500/70 text-gray-300 hover:text-white rounded-xl sm:rounded-2xl transition-all duration-300 text-xs sm:text-sm md:text-base font-medium border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl backdrop-blur-sm overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="relative z-10">Enviar otra consulta</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span>o</span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  </div>

                  <a
                    href="mailto:info@informatik-ai.com"
                    className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 hover:text-cyan-200 rounded-xl sm:rounded-2xl transition-all duration-300 text-xs sm:text-sm md:text-base font-medium border border-cyan-500/40 hover:border-cyan-400/60 shadow-lg hover:shadow-xl backdrop-blur-sm overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 group-hover:transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="relative z-10">Contacto directo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}





        <footer className="mt-8 text-center text-gray-400 text-sm space-x-4">
          <Link href="/aviso-legal" className="hover:text-gray-200">
            Aviso Legal
          </Link>
          <span>|</span>
          <Link href="/politica-privacidad" className="hover:text-gray-200">
            Política de Privacidad
          </Link>
          <span>|</span>
          <Link href="/politica-cookies" className="hover:text-gray-200">
            Política de Cookies
          </Link>
        </footer>{/* Enlaces Legales */}

      
      </div>
    </div>
  );
}
