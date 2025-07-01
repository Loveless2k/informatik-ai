'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  { id: 'predictive-analysis', label: 'Análisis Predictivo' },
  { id: 'report-automation', label: 'Automatización de Reportes' },
  { id: 'ecommerce-ai', label: 'IA para E-commerce' },
  { id: 'other', label: 'Otro' }
];

export default function ComingSoonPage() {
  const form = useRef<HTMLFormElement>(null);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-2xl mx-auto">

        {/* Estado Inicial */}
        {currentStep === 'initial' && (
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ¿Listo para cultivar tu{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                inteligencia?
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Hablemos de cómo Informatik-AI puede transformar tu negocio.
            </p>
            <button
              onClick={handleStartConversation}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Iniciar Conversación</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        )}

        {/* Formulario Conversacional */}
        {currentStep !== 'initial' && currentStep !== 'success' && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 animate-slide-up">
            {/* Indicador de Progreso */}
            <div className="mb-8">
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
                <h2 className="text-2xl font-semibold text-white mb-6">
                  <span className="text-cyan-400">1/5</span> ¡Hola! Empecemos por tu nombre.
                </h2>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tu nombre completo"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
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
                <h2 className="text-2xl font-semibold text-white mb-6">
                  <span className="text-cyan-400">3/5</span> Entendido. ¿Dónde podemos contactarte?
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    value={inputValue.split('|')[0] || ''}
                    onChange={(e) => {
                      const phone = inputValue.split('|')[1] || '';
                      setInputValue(`${e.target.value}|${phone}`);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400"
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
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400"
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.split('|')[0]?.trim()}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* Paso 4: Empresa */}
            {currentStep === 'company' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  <span className="text-cyan-400">4/5</span> ¿Para qué empresa sería?
                </h2>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    placeholder="Nombre de tu empresa"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              </div>
            )}

            {/* Paso 5: Mensaje */}
            {currentStep === 'message' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  <span className="text-cyan-400">5/5</span> Genial. Por último, cuéntanos un poco sobre tu proyecto o desafío.
                </h2>
                <div className="space-y-4">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe tu proyecto, desafío o cómo podemos ayudarte..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 resize-none"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim() || isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Consulta →'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado de Éxito */}
        {currentStep === 'success' && (
          <div className="text-center animate-fade-in">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  ✅ ¡Gracias, {formData.name}!
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Hemos recibido tu consulta sobre <span className="text-cyan-400 font-semibold">{formData.service}</span>.
                  Un especialista se pondrá en contacto contigo en{' '}
                  <span className="text-cyan-400 font-semibold">{formData.email}</span> muy pronto.
                </p>
                <p className="text-gray-400 mt-6">
                  El equipo de <span className="text-white font-semibold">Informatik-AI</span>.
                </p>
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
