'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

const ContactForm = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: 'error',
        message: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }

    // In a real application, you would send the form data to your backend
    // For now, we'll just simulate a successful submission

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        service: '',
      });
    }, 1000);
  };

  return (
    <div id="contact-form">
      {formStatus.type === 'success' ? (
        <div className="bg-green-900/30 border border-green-700 text-green-300 px-6 py-4 rounded-lg mb-6 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{formStatus.message}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {formStatus.type === 'error' && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-6 py-4 rounded-lg mb-6 animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{formStatus.message}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="company" className="block text-gray-300 font-medium mb-2">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                placeholder="Nombre de tu empresa"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                placeholder="+34 XXX XXX XXX"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="service" className="block text-gray-300 font-medium mb-2">
              Servicio de Interés
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white"
            >
              <option value="" className="bg-gray-800">Selecciona un servicio</option>
              <option value="ai-consulting" className="bg-gray-800">Consultoría de IA</option>
              <option value="machine-learning" className="bg-gray-800">Soluciones de Machine Learning</option>
              <option value="data-analytics" className="bg-gray-800">Analítica de Datos</option>
              <option value="process-automation" className="bg-gray-800">Automatización de Procesos</option>
              <option value="custom-ai" className="bg-gray-800">Desarrollo de IA Personalizada</option>
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
              Mensaje <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-gray-400"
              placeholder="¿En qué podemos ayudarte?"
              required
            ></textarea>
          </div>

          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              Enviar Mensaje
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
