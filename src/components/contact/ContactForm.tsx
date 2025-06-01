'use client';

import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: '',
  });

  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logMessage]);
    console.log(logMessage);
  };

  useEffect(() => {
    // Inicializar EmailJS con tu clave pública correcta
    emailjs.init('NuEMLaMO5zEqU4ka1');
    addLog('✅ EmailJS inicializado correctamente con clave pública');
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Mapear los nombres de campo para el estado interno
    const stateField = name === 'user_name' ? 'name' :
                       name === 'user_email' ? 'email' : name;

    addLog(`📝 Campo ${name} cambiado a: ${value}`);

    setFormData(prev => ({
      ...prev,
      [stateField]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addLog('📝 Formulario enviado');

    // Limpiar mensajes anteriores
    setFormStatus({ type: null, message: '' });

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      addLog('❌ Validación fallida: campos requeridos faltantes');
      setFormStatus({
        type: 'error',
        message: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }

    setIsSubmitting(true);
    addLog('📧 Iniciando envío de email con EmailJS...');
    addLog(`📋 Datos: ${JSON.stringify(formData, null, 2)}`);

    try {
      // Enviar email usando EmailJS
      const result = await emailjs.sendForm(
        'service_1k212a9',
        'template_93m0kce',
        form.current!,
        'NuEMLaMO5zEqU4ka1'
      );

      addLog('✅ Email enviado exitosamente');
      addLog(`📊 Resultado: ${JSON.stringify(result, null, 2)}`);

      setFormStatus({
        type: 'success',
        message: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
      });

      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        service: '',
      });

    } catch (error: any) {
      addLog(`❌ Error al enviar email: ${JSON.stringify(error, null, 2)}`);

      let errorMessage = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';

      if (error.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      setFormStatus({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      addLog('🏁 Proceso de envío completado');
      setIsSubmitting(false);
    }
  };

  return (
    <div id='contact-form'>
      {formStatus.type === 'success' ? (
        <div className='bg-green-900/30 border border-green-700 text-green-300 px-6 py-4 rounded-lg mb-6 animate-fade-in'>
          <div className='flex items-center'>
            <svg
              className='w-5 h-5 mr-3 text-green-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p>{formStatus.message}</p>
          </div>
        </div>
      ) : (
        <form ref={form} onSubmit={handleSubmit}>
          {/* Error message */}
          {formStatus.type === 'error' && (
            <div className='bg-red-900/30 border border-red-700 text-red-300 px-6 py-4 rounded-lg mb-6 animate-fade-in'>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 mr-3 text-red-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p>{formStatus.message}</p>
              </div>
            </div>
          )}

          {/* Form fields */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-gray-300 font-medium mb-2'
              >
                Nombre <span className='text-red-400'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='user_name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400'
                placeholder='Tu nombre completo'
                required
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-gray-300 font-medium mb-2'
              >
                Email <span className='text-red-400'>*</span>
              </label>
              <input
                type='email'
                id='email'
                name='user_email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400'
                placeholder='tu@email.com'
                required
              />
            </div>
          </div>

          {/* Rest of the form remains the same but with updated name attributes */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6'>
            <div>
              <label
                htmlFor='company'
                className='block text-gray-300 font-medium mb-2'
              >
                Empresa
              </label>
              <input
                type='text'
                id='company'
                name='company'
                value={formData.company}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400'
                placeholder='Nombre de tu empresa'
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='block text-gray-300 font-medium mb-2'
              >
                Teléfono
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400'
                placeholder='+34 XXX XXX XXX'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='service'
              className='block text-gray-300 font-medium mb-2'
            >
              Servicio de Interés
            </label>
            <select
              id='service'
              name='service'
              value={formData.service}
              onChange={handleChange}
              className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white'
            >
              <option value='' className='bg-gray-800'>
                Selecciona un servicio
              </option>
              <option value='ai-consulting' className='bg-gray-800'>
                Consultoría de IA
              </option>
              <option value='machine-learning' className='bg-gray-800'>
                Soluciones de Machine Learning
              </option>
              <option value='data-analytics' className='bg-gray-800'>
                Analítica de Datos
              </option>
              <option value='process-automation' className='bg-gray-800'>
                Automatización de Procesos
              </option>
              <option value='custom-ai' className='bg-gray-800'>
                Desarrollo de IA Personalizada
              </option>
            </select>
          </div>

          <div className='mb-8'>
            <label
              htmlFor='message'
              className='block text-gray-300 font-medium mb-2'
            >
              Mensaje <span className='text-red-400'>*</span>
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400'
              placeholder='¿En qué podemos ayudarte?'
              required
            ></textarea>
          </div>

          {/* Debug Logs Section */}
          <div className='mb-6'>
            <button
              type='button'
              onClick={() => setShowLogs(!showLogs)}
              className='text-sm text-gray-400 hover:text-gray-300 underline'
            >
              {showLogs ? 'Ocultar' : 'Mostrar'} logs de debug
            </button>

            {showLogs && (
              <div className='mt-4 p-4 bg-gray-800/50 border border-gray-600 rounded-lg max-h-60 overflow-y-auto'>
                <div className='flex justify-between items-center mb-2'>
                  <h4 className='text-sm font-medium text-gray-300'>Logs de Debug</h4>
                  <button
                    type='button'
                    onClick={() => setLogs([])}
                    className='text-xs text-red-400 hover:text-red-300'
                  >
                    Limpiar
                  </button>
                </div>
                <div className='space-y-1'>
                  {logs.length === 0 ? (
                    <p className='text-xs text-gray-500'>No hay logs aún...</p>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className='text-xs text-gray-300 font-mono'>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='flex justify-center sm:justify-start'>
            <Button
              type='submit'
              size='lg'
              disabled={isSubmitting}
              className='w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-6 sm:px-8 py-3 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

