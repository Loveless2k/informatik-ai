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

  // Función para validar formato de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

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
            {/* Logo de Informatik-AI */}
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <div className="relative inline-block">
                <img
                  src="/images/logos/logoInformatik-ai2.png"
                  alt="Informatik-AI Logo"
                  className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20 rounded-lg blur-xl opacity-50"></div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              ¿Listo para cultivar tu{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                inteligencia?
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Hablemos de cómo <span className="text-cyan-400 font-semibold">Informatik-AI</span> puede transformar tu negocio.
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
            {/* Header con logo pequeño */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <img
                src="/images/logos/logoInformatik-ai2.png"
                alt="Informatik-AI"
                className="h-6 sm:h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

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
                      // Solo permitir caracteres válidos para email: letras, números, @, ., -, _
                      const emailValue = e.target.value.replace(/[^a-zA-Z0-9@.\-_]/g, '');
                      const phone = inputValue.split('|')[1] || '';
                      setInputValue(`${emailValue}|${phone}`);
                    }}
                    onKeyPress={(e) => {
                      // Permitir solo caracteres válidos para email y teclas de control
                      const allowedKeys = /[a-zA-Z0-9@.\-_]/;
                      const isControlKey = e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';

                      if (!allowedKeys.test(e.key) && !isControlKey) {
                        e.preventDefault();
                      }

                      // Mantener funcionalidad original para Enter
                      if (e.key === 'Enter') {
                        handleKeyPress(e);
                      }
                    }}
                    placeholder="tu@email.com"
                    className={`w-full px-3 sm:px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white placeholder-gray-400 text-sm sm:text-base ${
                      inputValue.split('|')[0]?.trim() && !isValidEmail(inputValue.split('|')[0]?.trim())
                        ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                        : 'border-gray-600 focus:ring-cyan-400 focus:border-cyan-400'
                    }`}
                    autoFocus
                  />
                  {inputValue.split('|')[0]?.trim() && !isValidEmail(inputValue.split('|')[0]?.trim()) && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      Por favor, ingresa un email válido
                    </p>
                  )}
                  <input
                    type="tel"
                    value={inputValue.split('|')[1] || ''}
                    onChange={(e) => {
                      // Solo permitir números, espacios, guiones y paréntesis
                      const phoneValue = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
                      const email = inputValue.split('|')[0] || '';
                      setInputValue(`${email}|${phoneValue}`);
                    }}
                    onKeyPress={(e) => {
                      // Permitir solo números, espacios, guiones, paréntesis, + y teclas de control
                      const allowedKeys = /[0-9\s\-\(\)\+]/;
                      const isControlKey = e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';

                      if (!allowedKeys.test(e.key) && !isControlKey) {
                        e.preventDefault();
                      }

                      // Mantener funcionalidad original para Enter
                      if (e.key === 'Enter') {
                        handleKeyPress(e);
                      }
                    }}
                    placeholder="Teléfono (opcional) - ej: +56 9 1234 5678"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.split('|')[0]?.trim() || !isValidEmail(inputValue.split('|')[0]?.trim())}
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
              <div className="animate-fade-in">
                {/* Icono de éxito simple */}
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Título principal */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    ¡Gracias, {formData.name}!
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                    Tu consulta ha sido enviada exitosamente.
                  </p>
                </div>

                {/* Información del mensaje */}
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div className="bg-gray-700/30 rounded-xl p-4 sm:p-6 border border-gray-600/30">
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                      Hemos recibido tu consulta sobre{' '}
                      <span className="text-cyan-400 font-semibold">{formData.service}</span>.
                    </p>
                    <p className="text-sm sm:text-base text-gray-300">
                      Un especialista se pondrá en contacto contigo en{' '}
                      <span className="text-cyan-400 font-semibold break-all">{formData.email}</span>{' '}
                      en las próximas 24-48 horas.
                    </p>
                  </div>
                </div>

                {/* Próximos pasos */}
                <div className="bg-cyan-500/10 rounded-xl p-4 sm:p-6 border border-cyan-500/20 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    ¿Qué sigue?
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                      <span>Revisaremos tu consulta en detalle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                      <span>Un especialista te contactará para agendar una reunión</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                      <span>Desarrollaremos una propuesta personalizada</span>
                    </li>
                  </ul>
                </div>

                {/* Firma del equipo mejorada */}
                <div className="relative border-t border-gradient-to-r from-transparent via-gray-600/40 to-transparent pt-4 sm:pt-6 md:pt-8">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed">
                      Con cariño y dedicación,
                    </p>
                    <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">el equipo de</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img
                          src="/images/logos/logoInformatik-ai2.png"
                          alt="Informatik-AI"
                          className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto drop-shadow-lg"
                        />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                          
                        </span>
                      </div>
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
