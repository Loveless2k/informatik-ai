'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

/**
 * Componente que se muestra cuando PRENDER_Y_APAGAR_PAGINA está OFF
 * Presenta un formulario conversacional progresivo para captar leads
 */

type FormStep = 'initial' | 'name' | 'service' | 'contact' | 'company' | 'budget' | 'message' | 'review' | 'success';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  services: string[];
}

const serviceCategories = [
  {
    id: 'training',
    title: '🧠 Formación en IA',
    description: 'Capacitación y workshops especializados',
    services: [
      { id: 'training.executive-workshop', label: 'Workshop Ejecutivo IA' },
      { id: 'training.tech-bootcamp', label: 'Bootcamp Técnico IA' },
      { id: 'training.custom', label: 'Formación Personalizada' }
    ]
  },
  {
    id: 'strategy',
    title: '📊 Asesoría Estratégica',
    description: 'Consultoría y planificación estratégica',
    services: [
      { id: 'strategy.viability', label: 'Análisis de Viabilidad' },
      { id: 'strategy.roadmap', label: 'Estrategia y Roadmap' },
      { id: 'strategy.implementation', label: 'Implementación Guiada' },
      { id: 'strategy.optimization', label: 'Medición y Optimización' }
    ]
  },
  {
    id: 'courses',
    title: '📚 Desarrollo de Cursos',
    description: 'Creación de contenido educativo',
    services: [
      { id: 'course.basics', label: 'Fundamentos de IA' },
      { id: 'course.developers', label: 'IA para Desarrolladores' },
      { id: 'course.deep-learning', label: 'Deep Learning Avanzado' },
      { id: 'course.business', label: 'IA para Aplicaciones de Negocio' },
      { id: 'course.others', label: 'Otros cursos' }
    ]
  },
  {
    id: 'automation',
    title: '⚙️ Automatización',
    description: 'Procesos inteligentes y chatbots',
    services: [
      { id: 'automation.rpa', label: 'RPA' },
      { id: 'automation.smart-automation', label: 'Automatizaciones Inteligentes' },
      { id: 'automation.process-automation', label: 'Automatización de Procesos' },
      { id: 'automation.chatbots', label: 'Chatbots' },
      { id: 'automation.agents', label: 'Agentes Personalizados' }
    ]
  },
  {
    id: 'development',
    title: '💻 Desarrollo TI con IA',
    description: 'Aplicaciones y sistemas inteligentes',
    services: [
      { id: 'dev.websites', label: 'Sitios Web' },
      { id: 'dev.webapps', label: 'Aplicaciones Web' },
      { id: 'dev.webapps-ai', label: 'Aplicaciones Web con IA' },
      { id: 'dev.platforms', label: 'Plataformas / Productos' },
      { id: 'dev.mobile-ai', label: 'Apps Móviles Inteligentes' },
      { id: 'dev.api-microservices', label: 'APIs y Microservicios con IA' },
      { id: 'dev.data-systems', label: 'Sistemas de Datos con IA' }
    ]
  },
  {
    id: 'others',
    title: '🎭 Otros Servicios',
    description: 'Servicios especializados adicionales',
    services: [
      { id: 'avatars', label: 'Avatares' },
      { id: 'other', label: 'Otro' }
    ]
  }
];

// Lista plana para compatibilidad con el código existente
const services = serviceCategories.flatMap(category => category.services);

// Códigos de país para teléfonos
const countryCodes = [
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+1', country: 'Canadá', flag: '🇨🇦' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+33', country: 'Francia', flag: '🇫🇷' },
  { code: '+49', country: 'Alemania', flag: '🇩🇪' },
  { code: '+39', country: 'Italia', flag: '🇮🇹' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: 'custom', country: 'Otro código', flag: '🌍' }
];

export default function ComingSoonPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>('initial');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    services: [] as string[]
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isEditingFromReview, setIsEditingFromReview] = useState(false);
  const [emailValidation, setEmailValidation] = useState<{isValid: boolean, isVerifying: boolean, message: string}>({
    isValid: true,
    isVerifying: false,
    message: ''
  });
  const [phoneValidation, setPhoneValidation] = useState<{isValid: boolean, message: string}>({
    isValid: true,
    message: ''
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('+56'); // Chile por defecto

  useEffect(() => {
    // Inicializar EmailJS
    emailjs.init('NuEMLaMO5zEqU4ka1');
  }, []);

  // Función para validar formato de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Función para verificar si el email existe realmente
  const verifyEmailExists = async (email: string): Promise<boolean> => {
    try {
      // Verificación básica de dominio usando DNS lookup simulado
      const domain = email.split('@')[1];
      if (!domain) return false;

      // Lista de dominios comunes que sabemos que existen
      const commonDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
        'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com',
        'zoho.com', 'yandex.com', 'mail.ru', 'qq.com', '163.com',
        // Dominios latinoamericanos
        'terra.com.br', 'uol.com.br', 'bol.com.br', 'ig.com.br',
        'correo.com', 'latinmail.com', 'ciudad.com.ar', 'fibertel.com.ar',
        // Dominios españoles
        'telefonica.net', 'movistar.es', 'orange.es', 'vodafone.es',
        // Dominios empresariales comunes
        'company.com', 'empresa.com', 'negocio.com'
      ];

      if (commonDomains.includes(domain.toLowerCase())) {
        return true;
      }

      // Para otros dominios, hacer una verificación básica
      // En un entorno real, usarías un servicio de verificación de email
      return domain.includes('.') && domain.length > 3;
    } catch (error) {
      console.warn('Error verificando email:', error);
      return true; // En caso de error, permitir el email
    }
  };

  // Función para validar formato de teléfono internacional
  const isValidPhone = (phone: string): boolean => {
    if (!phone.trim()) return true; // Teléfono es opcional

    // Remover espacios, guiones y paréntesis para validación
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    // Debe empezar con + seguido de 1-4 dígitos (código país) y luego 6-14 dígitos más
    const phoneRegex = /^\+[1-9]\d{0,3}\d{6,14}$/;
    return phoneRegex.test(cleanPhone);
  };

  const getProgressPercentage = () => {
    const stepProgress = {
      initial: 0,
      name: 14,
      service: 28,
      contact: 42,
      company: 56,
      budget: 70,
      message: 84,
      review: 95,
      success: 100
    };
    return stepProgress[currentStep];
  };

  const handleStartConversation = () => {
    // Limpiar todos los datos al iniciar una nueva conversación
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      budget: '',
      message: '',
      services: []
    });
    setSelectedServices([]);
    setInputValue('');
    setCurrentStep('name');
  };

  // Función para navegar hacia atrás
  const handleBack = () => {
    if (currentStep === 'service') {
      setCurrentStep('name');
      setInputValue(formData.name);
    } else if (currentStep === 'contact') {
      setCurrentStep('service');
      setInputValue('');
    } else if (currentStep === 'company') {
      setCurrentStep('contact');
      setInputValue(`${formData.email}|${formData.phone}`);
    } else if (currentStep === 'budget') {
      setCurrentStep('company');
      setInputValue(formData.company);
    } else if (currentStep === 'message') {
      setCurrentStep('budget');
      setInputValue(formData.budget);
    } else if (currentStep === 'review') {
      setCurrentStep('message');
      setInputValue(formData.message);
    }
  };

  // Función para editar un campo específico desde la revisión
  const handleEditField = (field: string) => {
    setIsEditingFromReview(true);
    switch (field) {
      case 'name':
        setCurrentStep('name');
        setInputValue(formData.name);
        break;
      case 'service':
        setCurrentStep('service');
        setSelectedServices(formData.services);
        setExpandedCategories([]); // Resetear acordeones pero mantener selecciones
        setInputValue('');
        break;
      case 'contact':
        setCurrentStep('contact');
        setInputValue(`${formData.email}|${formData.phone}`);
        break;
      case 'company':
        setCurrentStep('company');
        setInputValue(formData.company);
        break;
      case 'budget':
        setCurrentStep('budget');
        setInputValue(formData.budget);
        break;
      case 'message':
        setCurrentStep('message');
        setInputValue(formData.message);
        break;
    }
  };

  // Función para volver a la revisión desde edición
  const handleBackToReview = () => {
    setIsEditingFromReview(false);
    setCurrentStep('review');
  };

  const handleNext = () => {
    // Si estamos editando desde revisión, no avanzar automáticamente
    if (isEditingFromReview) {
      return;
    }

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
      setCurrentStep('budget');
    } else if (currentStep === 'budget') {
      setFormData(prev => ({ ...prev, budget: inputValue }));
      setInputValue('');
      setCurrentStep('message');
    } else if (currentStep === 'message') {
      setFormData(prev => ({ ...prev, message: inputValue }));
      setInputValue('');
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      handleSubmit();
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(serviceId);
      if (isSelected) {
        // Deseleccionar servicio
        return prev.filter(id => id !== serviceId);
      } else {
        // Seleccionar servicio
        return [...prev, serviceId];
      }
    });
  };

  const handleServicesContinue = () => {
    if (selectedServices.length > 0) {
      setFormData(prev => ({ ...prev, services: selectedServices }));
      setCurrentStep('contact');
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        // Si está abierto, lo cerramos
        return prev.filter(id => id !== categoryId);
      } else {
        // Si está cerrado, lo abrimos y cerramos todos los demás
        return [categoryId];
      }
    });
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
        { name: 'budget', value: formData.budget },
        { name: 'services', value: formData.services.map(id => services.find(s => s.id === id)?.label).join(', ') },
        { name: 'message', value: formData.message }
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
      <div id ="margen-fuera" className="w-full max-w-2xl lg:max-w-4xl mx-auto">

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
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tu nombre completo"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                    autoFocus
                  />
                  <div className="flex gap-3 sm:gap-4">
                    {isEditingFromReview ? (
                      <button
                        onClick={handleBackToReview}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Volver a revisión
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentStep('initial')}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Inicio
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isEditingFromReview) {
                          // Actualizar el dato y volver a revisión
                          setFormData(prev => ({ ...prev, name: inputValue }));
                          handleBackToReview();
                        } else {
                          handleNext();
                        }
                      }}
                      disabled={!inputValue.trim()}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    >
                      {isEditingFromReview ? 'Guardar cambios' : 'Continuar →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Servicio */}
            {currentStep === 'service' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">
                  <span className="text-cyan-400">2/7</span> Perfecto, {formData.name}. ¿Qué servicios te interesan?
                </h2>

                <div className="space-y-4">
                  {/* Categorías de servicios */}
                  {serviceCategories.map((category) => {
                    const isExpanded = expandedCategories.includes(category.id);
                    const categoryServices = category.services.filter(service => selectedServices.includes(service.id));

                    return (
                      <div key={category.id} className="border border-gray-600/30 rounded-lg">
                        {/* Header de categoría */}
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full p-3 sm:p-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                        >
                          <div>
                            <h3 className="text-sm sm:text-base text-white font-medium">{category.title}</h3>
                            {categoryServices.length > 0 && (
                              <p className="text-cyan-400 text-xs sm:text-sm mt-1">
                                {categoryServices.length} seleccionado{categoryServices.length > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Servicios de la categoría */}
                        {isExpanded && (
                          <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
                            {category.services.map((service) => {
                              const isSelected = selectedServices.includes(service.id);
                              return (
                                <button
                                  key={service.id}
                                  onClick={() => handleServiceSelect(service.id)}
                                  className={`w-full p-2 sm:p-3 text-left rounded-lg transition-colors text-sm sm:text-base ${
                                    isSelected
                                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                      : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{service.label}</span>
                                    {isSelected && (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Botones de navegación */}
                  <div className="flex gap-3 sm:gap-4 pt-4">
                    {isEditingFromReview ? (
                      <button
                        onClick={handleBackToReview}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Volver a revisión
                      </button>
                    ) : (
                      <button
                        onClick={handleBack}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Atrás
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isEditingFromReview) {
                          // Actualizar servicios y volver a revisión
                          setFormData(prev => ({ ...prev, services: selectedServices }));
                          handleBackToReview();
                        } else {
                          handleServicesContinue();
                        }
                      }}
                      disabled={selectedServices.length === 0}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    >
                      {isEditingFromReview ? 'Guardar cambios' : 'Continuar →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Contacto */}
            {currentStep === 'contact' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">3/7</span> Entendido. ¿Dónde podemos contactarte?
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="email"
                    value={inputValue.split('|')[0] || ''}
                    onChange={async (e) => {
                      // Solo permitir caracteres válidos para email: letras, números, @, ., -, _
                      const emailValue = e.target.value.replace(/[^a-zA-Z0-9@.\-_]/g, '');
                      const phone = inputValue.split('|')[1] || '';
                      setInputValue(`${emailValue}|${phone}`);

                      // Validar email en tiempo real
                      if (emailValue.trim()) {
                        if (!isValidEmail(emailValue)) {
                          setEmailValidation({
                            isValid: false,
                            isVerifying: false,
                            message: 'Formato de email inválido'
                          });
                        } else {
                          setEmailValidation({
                            isValid: true,
                            isVerifying: true,
                            message: 'Verificando email...'
                          });

                          // Verificar si el email existe
                          const exists = await verifyEmailExists(emailValue);
                          setEmailValidation({
                            isValid: exists,
                            isVerifying: false,
                            message: exists ? '' : 'Este email no parece existir. Verifica que esté bien escrito.'
                          });
                        }
                      } else {
                        setEmailValidation({ isValid: true, isVerifying: false, message: '' });
                      }
                    }}
                    onKeyDown={(e) => {
                      // Permitir solo caracteres válidos para email y teclas de control
                      const allowedKeys = /[a-zA-Z0-9@.\-_]/;
                      const isControlKey = e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';

                      if (!allowedKeys.test(e.key) && !isControlKey) {
                        e.preventDefault();
                      }

                      // Mantener funcionalidad original para Enter
                      if (e.key === 'Enter' && emailValidation.isValid && !emailValidation.isVerifying) {
                        handleKeyPress(e);
                      }
                    }}
                    placeholder="tu@email.com"
                    className={`w-full px-3 sm:px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white placeholder-gray-400 text-sm sm:text-base ${
                      !emailValidation.isValid
                        ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                        : emailValidation.isVerifying
                        ? 'border-yellow-500 focus:ring-yellow-400 focus:border-yellow-400'
                        : 'border-gray-600 focus:ring-cyan-400 focus:border-cyan-400'
                    }`}
                    autoFocus
                  />
                  {emailValidation.message && (
                    <p className={`text-xs sm:text-sm mt-1 ${
                      emailValidation.isVerifying ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {emailValidation.isVerifying && (
                        <span className="inline-block w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin mr-1"></span>
                      )}
                      {emailValidation.message}
                    </p>
                  )}
                  {/* Selector de código de país + número de teléfono */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {/* Selector de código de país */}
                      <select
                        value={selectedCountryCode}
                        onChange={(e) => {
                          setSelectedCountryCode(e.target.value);
                          // Actualizar el teléfono con el nuevo código
                          const phoneNumber = inputValue.split('|')[1]?.replace(/^\+\d+\s*/, '') || '';
                          const email = inputValue.split('|')[0] || '';
                          if (e.target.value !== 'custom') {
                            setInputValue(`${email}|${e.target.value} ${phoneNumber}`);
                          } else {
                            setInputValue(`${email}|${phoneNumber}`);
                          }
                        }}
                        className="w-full sm:w-auto sm:min-w-[120px] sm:max-w-[140px] px-2 sm:px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white text-sm sm:text-base"
                      >
                        {countryCodes.map((country, index) => (
                          <option key={index} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>

                      {/* Campo de número de teléfono */}
                      <input
                        type="tel"
                        value={(() => {
                          const phone = inputValue.split('|')[1] || '';
                          if (selectedCountryCode === 'custom') {
                            return phone;
                          }
                          // Remover el código de país del valor mostrado
                          return phone.replace(new RegExp(`^\\${selectedCountryCode}\\s*`), '');
                        })()}
                        onChange={(e) => {
                          const email = inputValue.split('|')[0] || '';
                          let phoneValue = e.target.value.replace(/[^0-9\s\-\(\)]/g, '');

                          let fullPhone;
                          if (selectedCountryCode === 'custom') {
                            // Permitir que escriban el código completo
                            phoneValue = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
                            fullPhone = phoneValue;
                          } else {
                            // Agregar el código de país automáticamente
                            fullPhone = phoneValue ? `${selectedCountryCode} ${phoneValue}` : '';
                          }

                          setInputValue(`${email}|${fullPhone}`);

                          // Validar teléfono
                          if (fullPhone.trim()) {
                            if (selectedCountryCode === 'custom' && !fullPhone.startsWith('+')) {
                              setPhoneValidation({
                                isValid: false,
                                message: 'Debe incluir el código de país (ej: +56, +34, +1)'
                              });
                            } else if (!isValidPhone(fullPhone)) {
                              setPhoneValidation({
                                isValid: false,
                                message: 'Formato de teléfono inválido'
                              });
                            } else {
                              setPhoneValidation({ isValid: true, message: '' });
                            }
                          } else {
                            setPhoneValidation({ isValid: true, message: '' });
                          }
                        }}
                        onKeyDown={(e) => {
                          const allowedKeys = selectedCountryCode === 'custom'
                            ? /[0-9\s\-\(\)\+]/
                            : /[0-9\s\-\(\)]/;
                          const isControlKey = e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';

                          if (!allowedKeys.test(e.key) && !isControlKey) {
                            e.preventDefault();
                          }

                          if (e.key === 'Enter') {
                            handleKeyPress(e);
                          }
                        }}
                        placeholder={selectedCountryCode === 'custom' ? '+XX XXXXXXXXX' : '9 1234 5678'}
                        className={`flex-1 px-3 sm:px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white placeholder-gray-400 text-sm sm:text-base ${
                          !phoneValidation.isValid
                            ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                            : 'border-gray-600 focus:ring-cyan-400 focus:border-cyan-400'
                        }`}
                      />
                    </div>

                    {phoneValidation.message && (
                      <p className="text-red-400 text-xs sm:text-sm">
                        {phoneValidation.message}
                      </p>
                    )}

                    <p className="text-xs text-gray-400">
                      Teléfono opcional. Selecciona tu país o "Otro código" para escribir manualmente.
                    </p>
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    {isEditingFromReview ? (
                      <button
                        onClick={handleBackToReview}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Volver a revisión
                      </button>
                    ) : (
                      <button
                        onClick={handleBack}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Atrás
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isEditingFromReview) {
                          // Actualizar contacto y volver a revisión
                          const email = inputValue.split('|')[0] || '';
                          const phone = inputValue.split('|')[1] || '';
                          setFormData(prev => ({ ...prev, email, phone }));
                          handleBackToReview();
                        } else {
                          handleNext();
                        }
                      }}
                      disabled={
                        !inputValue.split('|')[0]?.trim() ||
                        !emailValidation.isValid ||
                        emailValidation.isVerifying ||
                        !phoneValidation.isValid
                      }
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    >
                      {isEditingFromReview ? 'Guardar cambios' : 'Continuar →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 4: Empresa */}
            {currentStep === 'company' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">4/7</span> ¿Para qué empresa sería?
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && handleNext()}
                    placeholder="Nombre de tu empresa"
                    className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                    autoFocus
                  />

                  {/* Botón "No aplica" */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setInputValue('No aplica');
                        setTimeout(() => handleNext(), 100);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors underline decoration-dotted underline-offset-4 hover:decoration-solid"
                    >
                      No aplica / Proyecto personal
                    </button>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    {isEditingFromReview ? (
                      <button
                        onClick={handleBackToReview}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Volver a revisión
                      </button>
                    ) : (
                      <button
                        onClick={handleBack}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Atrás
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isEditingFromReview) {
                          // Actualizar empresa y volver a revisión
                          setFormData(prev => ({ ...prev, company: inputValue }));
                          handleBackToReview();
                        } else {
                          handleNext();
                        }
                      }}
                      disabled={!inputValue.trim()}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    >
                      {isEditingFromReview ? 'Guardar cambios' : 'Continuar →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 5: Presupuesto */}
            {currentStep === 'budget' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">5/7</span> Para ofrecerte la mejor propuesta, ¿cuál es tu rango de presupuesto aproximado?
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                  Esta información nos ayuda a personalizar nuestra propuesta según tus necesidades y posibilidades.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {/* Opciones de presupuesto */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'budget-1', label: 'Menos de $1,000 USD', value: 'Menos de $1,000 USD' },
                      { id: 'budget-2', label: '$1,000 - $5,000 USD', value: '$1,000 - $5,000 USD' },
                      { id: 'budget-3', label: '$5,000 - $15,000 USD', value: '$5,000 - $15,000 USD' },
                      { id: 'budget-4', label: '$15,000 - $50,000 USD', value: '$15,000 - $50,000 USD' },
                      { id: 'budget-5', label: 'Más de $50,000 USD', value: 'Más de $50,000 USD' },
                      { id: 'budget-custom', label: 'Prefiero especificar', value: 'custom' }
                    ].map((budget) => (
                      <button
                        key={budget.id}
                        onClick={() => {
                          if (budget.value === 'custom') {
                            setInputValue('');
                          } else {
                            setInputValue(budget.value);
                            // Guardar inmediatamente en formData
                            setFormData(prev => ({ ...prev, budget: budget.value }));
                            setTimeout(() => {
                              if (!isEditingFromReview) {
                                // Avanzar al siguiente paso
                                setInputValue('');
                                setCurrentStep('message');
                              }
                            }, 300);
                          }
                        }}
                        className={`p-3 sm:p-4 border rounded-lg transition-all duration-300 text-left text-sm sm:text-base font-medium min-h-[48px] sm:min-h-[56px] flex items-center ${
                          inputValue === budget.value
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                            : 'bg-gray-700/30 border-gray-600 text-white hover:border-cyan-400 hover:bg-gray-700/50'
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>

                  {/* Campo personalizado si selecciona "Prefiero especificar" */}
                  {inputValue === '' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && handleNext()}
                        placeholder="Especifica tu rango de presupuesto"
                        className="w-full px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-gray-400 text-sm sm:text-base"
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Opción "Prefiero no especificar" */}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => {
                        const budgetValue = 'Prefiero no especificar en este momento';
                        setInputValue(budgetValue);
                        setFormData(prev => ({ ...prev, budget: budgetValue }));
                        setTimeout(() => {
                          if (!isEditingFromReview) {
                            // Avanzar al siguiente paso
                            setInputValue('');
                            setCurrentStep('message');
                          }
                        }, 100);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors underline decoration-dotted underline-offset-4 hover:decoration-solid"
                    >
                      Prefiero no especificar en este momento
                    </button>
                  </div>

                  {/* Botones de navegación */}
                  <div className="flex gap-3 sm:gap-4 pt-4">
                    {isEditingFromReview ? (
                      <button
                        onClick={handleBackToReview}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Volver a revisión
                      </button>
                    ) : (
                      <button
                        onClick={handleBack}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Atrás
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isEditingFromReview) {
                          // Actualizar presupuesto y volver a revisión
                          setFormData(prev => ({ ...prev, budget: inputValue }));
                          handleBackToReview();
                        } else {
                          handleNext();
                        }
                      }}
                      disabled={!inputValue.trim()}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    >
                      {isEditingFromReview ? 'Guardar cambios' : 'Continuar →'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 6: Mensaje */}
            {currentStep === 'message' && (
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed">
                  <span className="text-cyan-400">6/7</span> Genial. Por último, cuéntanos un poco sobre tu proyecto o desafío.
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
                  <div className="flex gap-3 sm:gap-4">
                    {isEditingFromReview ? (
                      <button
                        onClick={handleBackToReview}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Volver a revisión
                      </button>
                    ) : (
                      <button
                        onClick={handleBack}
                        className="px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                      >
                        ← Atrás
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isEditingFromReview) {
                          // Actualizar mensaje y volver a revisión
                          setFormData(prev => ({ ...prev, message: inputValue }));
                          handleBackToReview();
                        } else {
                          handleNext();
                        }
                      }}
                      disabled={!inputValue.trim()}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {isEditingFromReview ? 'Guardar cambios' : 'Continuar a Revisión →'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Paso de Revisión */}
        {currentStep === 'review' && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up mx-2 sm:mx-0">
            {/* Header con logo pequeño */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <img
                src="/images/logos/logoInformatik-ai2.png"
                alt="Informatik-AI"
                className="h-6 sm:h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <div className="animate-fade-in">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">
                <span className="text-cyan-400">7/7</span> Revisa tu información antes de enviar
              </h2>

              {/* Resumen de datos */}
              <div className="space-y-3 sm:space-y-4 mb-6">
                {/* Nombre */}
                <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-cyan-300 mb-1">Nombre</h3>
                      <p className="text-white text-sm sm:text-base break-words">{formData.name}</p>
                    </div>
                    <button
                      onClick={() => handleEditField('name')}
                      className="self-start sm:self-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors flex-shrink-0 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                {/* Servicios */}
                <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-cyan-300 mb-2">Servicios de interés</h3>
                      <div className="space-y-1.5 sm:space-y-1">
                        {formData.services.map(serviceId => {
                          const service = services.find(s => s.id === serviceId);
                          return (
                            <div key={serviceId} className="flex items-start sm:items-center gap-2">
                              <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-white text-sm sm:text-base leading-relaxed break-words">{service?.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditField('service')}
                      className="self-start px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors flex-shrink-0 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                {/* Contacto */}
                <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-cyan-300 mb-1">Información de contacto</h3>
                      <p className="text-white text-sm sm:text-base break-words">{formData.email}</p>
                      {formData.phone && (
                        <p className="text-gray-300 text-sm mt-1 break-words">Tel: {formData.phone}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleEditField('contact')}
                      className="self-start sm:self-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors flex-shrink-0 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                {/* Empresa */}
                <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-cyan-300 mb-1">Empresa</h3>
                      <p className="text-white text-sm sm:text-base break-words">{formData.company}</p>
                    </div>
                    <button
                      onClick={() => handleEditField('company')}
                      className="self-start sm:self-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors flex-shrink-0 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                {/* Presupuesto */}
                <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-cyan-300 mb-1">Presupuesto aproximado</h3>
                      <p className="text-white text-sm sm:text-base break-words">{formData.budget}</p>
                    </div>
                    <button
                      onClick={() => handleEditField('budget')}
                      className="self-start sm:self-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors flex-shrink-0 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                {/* Mensaje */}
                <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-cyan-300 mb-1">Mensaje</h3>
                      <p className="text-white text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">{formData.message}</p>
                    </div>
                    <button
                      onClick={() => handleEditField('message')}
                      className="self-start px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-md hover:bg-cyan-500/30 transition-colors flex-shrink-0 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleBack}
                  className="order-2 sm:order-1 px-4 sm:px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-medium border border-gray-600/30 hover:border-gray-500/50"
                >
                  ← Atrás
                </button>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="order-1 sm:order-2 flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Enviando...</span>
                      <span className="sm:hidden">Enviando</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="hidden sm:inline">Enviar Consulta</span>
                      <span className="sm:hidden">Enviar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
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
                      <span className="text-cyan-400 font-semibold">
                        {formData.services.map(id => services.find(s => s.id === id)?.label).join(', ')}
                      </span>.
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
