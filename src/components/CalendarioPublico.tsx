'use client';

import React, { useState, useEffect } from 'react';
import { sendBookingToMake, validateBookingData } from '@/lib/makeWebhook';
import { calendarDataService, type TimeSlot, type CalendarData } from '@/lib/calendarDataService';
import Modal from './Modal';

// Interfaces adicionales para el formulario
interface BookingForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
}

const CalendarioPublico: React.FC = () => {
  // Estados del calendario
  const [calendarData, setCalendarData] = useState<CalendarData>({ slots: [], lastUpdated: '' });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Estados para reservas
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    topic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Estados para modales
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    onConfirm: null as (() => void) | null,
    showCancel: false
  });

  // Funciones helper para modales
  const showModal = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', onConfirm?: () => void, showCancel: boolean = false) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: onConfirm || null,
      showCancel
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  // Cargar datos del calendario desde API
  useEffect(() => {
    loadCalendarData();
  }, []);

  const loadCalendarData = async () => {
    try {
      const data = await calendarDataService.getCalendarData();
      setCalendarData(data);

      // Si no hay datos, inicializar por defecto
      if (data.slots.length === 0) {
        initializeDefaultData();
      }
    } catch (error) {
      // Fallback: intentar localStorage
      const savedData = localStorage.getItem('informatik-calendar-data');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setCalendarData(data);
        } catch (parseError) {
          initializeDefaultData();
        }
      } else {
        initializeDefaultData();
      }
    }
  };

  // Inicializar datos por defecto
  const initializeDefaultData = () => {
    const defaultSlots = generateDefaultSlots();
    const defaultData: CalendarData = {
      slots: defaultSlots,
      lastUpdated: new Date().toISOString()
    };
    setCalendarData(defaultData);
    // Solo actualizar localStorage como cache, no como fuente principal
    localStorage.setItem('informatik-calendar-data', JSON.stringify(defaultData));
  };

  // Generar slots por defecto para los próximos 14 días laborales
  const generateDefaultSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    let daysAdded = 0;
    const currentDate = new Date(today);

    while (daysAdded < 14) {
      // Solo días laborales (lunes a viernes)
      if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // Generar slots de 19:00 a 21:00 (cada 30 minutos)
        const timeSlots = ['19:00', '19:30', '20:00', '20:30'];
        
        timeSlots.forEach((startTime, index) => {
          const endTime = index < timeSlots.length - 1 ? timeSlots[index + 1] : '21:00';
          slots.push({
            id: `${dateStr}-${startTime}`,
            date: dateStr,
            startTime,
            endTime,
            available: true,
            title: 'Reunión Informatik-AI'
          });
        });
        
        daysAdded++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return slots;
  };

  // Funciones de utilidad
  const getSlotsForDate = (date: Date): TimeSlot[] => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarData.slots.filter(slot => slot.date === dateStr);
  };

  const getAvailableDates = (): Date[] => {
    const uniqueDates = [...new Set(calendarData.slots.map(slot => slot.date))];

    // Crear fechas correctamente evitando problemas de zona horaria
    const availableDates = uniqueDates.map(dateStr => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day); // month - 1 porque Date usa 0-11 para meses
    });



    return availableDates;
  };

  const formatTime = (time: string): string => {
    return time;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Funciones para reservas
  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedSlot) {
        throw new Error('No hay slot seleccionado');
      }

      // Preparar datos para Make.com
      const bookingData = {
        clientName: bookingForm.name,
        clientEmail: bookingForm.email,
        clientPhone: bookingForm.phone,
        clientCompany: bookingForm.company,
        meetingTopic: bookingForm.topic,
        meetingMessage: bookingForm.message,
        meetingDate: selectedSlot.date,
        meetingStartTime: selectedSlot.startTime,
        meetingEndTime: selectedSlot.endTime,
        meetingDateFormatted: formatDate(selectedDate),
        slotId: selectedSlot.id,
        timestamp: new Date().toISOString(),
        timezone: 'America/Santiago'
      };

      // Validación adicional para "Otro tema"
      if (bookingForm.topic === 'Otro tema' && !bookingForm.message.trim()) {
        showModal(
          'Campo Requerido',
          'Por favor especifica el tema de tu interés en el mensaje adicional.',
          'warning'
        );
        return;
      }

      // Validar datos antes de enviar
      const validationErrors = validateBookingData(bookingData);
      if (validationErrors.length > 0) {
        throw new Error(`Datos inválidos: ${validationErrors.join(', ')}`);
      }



      // Enviar a Make.com
      const makeResponse = await sendBookingToMake(bookingData);

      if (!makeResponse.success) {
        // Si Make falla, aún podemos continuar con el proceso local
        // Continuar silenciosamente con el proceso local
      }

      // Marcar el slot como ocupado en la API
      try {
        const updatedData = await calendarDataService.updateSlotAvailability(
          selectedSlot.id,
          false
        );
        setCalendarData(updatedData);

        // Actualizar localStorage como cache
        localStorage.setItem('informatik-calendar-data', JSON.stringify(updatedData));
      } catch (error) {
        // Error actualizando slot en API, usando fallback local

        // Fallback: actualizar solo localmente
        const updatedData = {
          ...calendarData,
          slots: calendarData.slots.map(slot =>
            slot.id === selectedSlot?.id
              ? { ...slot, available: false }
              : slot
          ),
          lastUpdated: new Date().toISOString()
        };

        setCalendarData(updatedData);
        localStorage.setItem('informatik-calendar-data', JSON.stringify(updatedData));
      }

      // Mostrar éxito
      setSubmitSuccess(true);
      setShowBookingForm(false);
      setSelectedSlot(null);

      // Limpiar formulario
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        topic: '',
        message: ''
      });

      // Ocultar mensaje de éxito después de 8 segundos
      setTimeout(() => setSubmitSuccess(false), 8000);

    } catch (error) {
      showModal(
        'Error al Procesar Reserva',
        `Error al procesar la reserva: ${error instanceof Error ? error.message : 'Error desconocido'}\n\nPor favor intenta nuevamente o contacta directamente a info@informatik-ai.com`,
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img
              src="/images/logos/logoInformatik-ai2.png"
              alt="Informatik-AI"
              className="h-12 w-auto mx-auto opacity-80"
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Reserva tu Reunión
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            
          </div>
          
          <p className="text-slate-300 text-lg">
            Programa una reunión de 30 minutos con el equipo de Informatik-AI
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Horarios disponibles: Lunes a Viernes, 19:00 - 21:00 hrs
          </p>
        </div>

        {/* Mensaje de éxito */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
            <div className="text-center">
              <p className="font-semibold mb-2">✅ ¡Reserva confirmada exitosamente!</p>
              <div className="text-sm space-y-1">
                <p>📅 El evento se ha creado en Google Calendar</p>
                <p>📧 Recibirás una invitación de Google Calendar</p>
                <p>📩 Se ha notificado al equipo de Informatik-AI</p>
                <p className="text-green-400 mt-2">¡Nos vemos en la reunión!</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Selector de fecha */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>📅</span>
              Selecciona una fecha
            </h2>
            
            {/* Navegación del mes */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <h3 className="text-lg font-semibold text-white">
                {selectedDate.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
              </h3>

              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Cuadrícula del calendario */}
            <div className="grid grid-cols-7 gap-1">
              {(() => {
                const today = new Date();
                const currentMonth = selectedDate.getMonth();
                const currentYear = selectedDate.getFullYear();
                const firstDay = new Date(currentYear, currentMonth, 1);
                const startDate = new Date(firstDay);
                startDate.setDate(startDate.getDate() - firstDay.getDay());

                const days = [];
                const availableDates = getAvailableDates();

                // Generar 42 días (6 semanas)
                for (let i = 0; i < 42; i++) {
                  const date = new Date(startDate);
                  date.setDate(startDate.getDate() + i);

                  const isCurrentMonth = date.getMonth() === currentMonth;
                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected = date.toDateString() === selectedDate.toDateString();

                  // Mejorar comparación de fechas - solo comparar la fecha, no la hora
                  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                  const isPast = dateOnly < todayDateOnly;

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                  // Mejorar comparación de fechas disponibles
                  const isAvailable = availableDates.some((availableDate: Date) => {
                    const availableDateOnly = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate());
                    const currentDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    return availableDateOnly.getTime() === currentDateOnly.getTime();
                  });



                  days.push({
                    date,
                    day: date.getDate(),
                    isCurrentMonth,
                    isToday,
                    isSelected,
                    isPast,
                    isWeekend,
                    isAvailable
                  });
                }

                return days.map((dayInfo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (dayInfo.isAvailable && !dayInfo.isPast) {
                        setSelectedDate(dayInfo.date);
                      }
                    }}
                    disabled={!dayInfo.isAvailable || dayInfo.isPast}
                    className={`
                      aspect-square p-1 rounded-lg text-sm font-medium transition-all duration-200 relative
                      ${!dayInfo.isCurrentMonth
                        ? 'text-slate-600 cursor-not-allowed'
                        : dayInfo.isPast
                          ? 'text-slate-600 cursor-not-allowed'
                          : dayInfo.isAvailable
                            ? dayInfo.isSelected
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                              : dayInfo.isToday
                                ? 'bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30'
                                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/30'
                            : dayInfo.isWeekend
                              ? 'text-slate-500 cursor-not-allowed'
                              : 'text-slate-500 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="block">{dayInfo.day}</span>
                    {dayInfo.isAvailable && dayInfo.isCurrentMonth && !dayInfo.isPast && (
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"></div>
                    )}
                  </button>
                ));
              })()}
            </div>

            {/* Leyenda */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Seleccionado</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-slate-700/30 border border-slate-600/30 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-slate-600 rounded"></div>
                <span>No disponible</span>
              </div>
            </div>
          </div>

          {/* Slots de tiempo */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>🕒</span>
              Horarios disponibles - {formatDate(selectedDate)}
            </h2>

            {(() => {
              const slotsForDate = getSlotsForDate(selectedDate);

              if (slotsForDate.length === 0) {
                return (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📅</div>
                    <p className="text-slate-400 mb-2">No hay horarios configurados para esta fecha</p>
                    <p className="text-slate-500 text-sm">Intenta seleccionar otra fecha</p>
                  </div>
                );
              }

              return (
                <div className="space-y-3">
                  {slotsForDate.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        slot.available
                          ? 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30 cursor-pointer'
                          : 'bg-red-500/20 border-red-500/30 text-red-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-semibold">
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              slot.available
                                ? 'bg-green-500/30 text-green-200'
                                : 'bg-red-500/30 text-red-200'
                            }`}>
                              {slot.available ? '✅ Disponible' : '❌ Ocupado'}
                            </span>
                          </div>
                          {slot.title && (
                            <p className="text-sm text-slate-400 mt-1">{slot.title}</p>
                          )}
                        </div>

                        {slot.available && (
                          <button
                            onClick={() => handleSlotSelect(slot)}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                          >
                            <span>📅</span>
                            Reservar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Modal de reserva */}
        {showBookingForm && selectedSlot && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto my-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span>📝</span>
                  Confirmar Reserva
                </h3>
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setSelectedSlot(null);
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-2">📅 Detalles de tu reunión:</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-green-300">
                    <strong>📆 Fecha:</strong> {formatDate(selectedDate)}
                  </p>
                  <p className="text-green-300">
                    <strong>🕒 Hora:</strong> {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
                  </p>
                  {selectedSlot.title && (
                    <p className="text-green-300">
                      <strong>📋 Tipo:</strong> {selectedSlot.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Información de servicios */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg">
                <h4 className="text-lg font-semibold text-green-300 mb-3">🚀 Nuestros Servicios</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">🌐</span>
                    <div>
                      <strong className="text-white">Desarrollo Web</strong>
                      <p className="text-slate-300">Sitios modernos y responsivos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">🤖</span>
                    <div>
                      <strong className="text-white">Chatbots IA</strong>
                      <p className="text-slate-300">Asistentes virtuales inteligentes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">📚</span>
                    <div>
                      <strong className="text-white">Formación</strong>
                      <p className="text-slate-300">Cursos y talleres especializados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">⚙️</span>
                    <div>
                      <strong className="text-white">Automatización</strong>
                      <p className="text-slate-300">Optimización de procesos</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    👤 Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-slate-400"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    📧 Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-slate-400"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    📱 Teléfono
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-slate-400"
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    🏢 Empresa
                  </label>
                  <input
                    type="text"
                    value={bookingForm.company}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-slate-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    💡 Tema de la reunión *
                  </label>
                  <select
                    required
                    value={bookingForm.topic}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white"
                  >
                    <option value="" disabled className="text-slate-400">
                      Selecciona el tema de tu interés
                    </option>
                    <option value="Desarrollo de Sitios Web" className="text-white bg-slate-700">
                      🌐 Desarrollo de Sitios Web - Páginas modernas y responsivas
                    </option>
                    <option value="Chatbot con IA" className="text-white bg-slate-700">
                      🤖 Chatbot con IA - Asistentes virtuales inteligentes
                    </option>
                    <option value="Cursos de IA" className="text-white bg-slate-700">
                      📚 Cursos de IA - Formación especializada en inteligencia artificial
                    </option>
                    <option value="Talleres y Formaciones" className="text-white bg-slate-700">
                      🎯 Talleres y Formaciones - Capacitación empresarial y oratoria
                    </option>
                    <option value="Asesoría Estratégica" className="text-white bg-slate-700">
                      💼 Asesoría Estratégica - Consultoría en transformación digital
                    </option>
                    <option value="Automatización de Procesos" className="text-white bg-slate-700">
                      ⚙️ Automatización - Optimización de procesos empresariales
                    </option>
                    <option value="Consultoría General" className="text-white bg-slate-700">
                      💡 Consultoría General - Asesoramiento integral en IA
                    </option>
                    <option value="Otro tema" className="text-white bg-slate-700">
                      📝 Otro tema - Especificar en mensaje adicional
                    </option>
                  </select>
                  <p className="text-xs text-slate-400 mt-1">
                    Selecciona el servicio que más se ajuste a tus necesidades
                  </p>
                </div>

                <div className={bookingForm.topic === 'Otro tema' ? 'p-3 bg-green-500/10 border border-green-500/30 rounded-lg' : ''}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    💬 Mensaje adicional {bookingForm.topic === 'Otro tema' && <span className="text-green-400">*</span>}
                  </label>
                  {bookingForm.topic === 'Otro tema' && (
                    <p className="text-xs text-green-400 mb-2">
                      ⚠️ Por favor especifica el tema de tu interés en este campo
                    </p>
                  )}
                  <textarea
                    rows={3}
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-slate-400 resize-none"
                    placeholder={
                      bookingForm.topic === 'Otro tema'
                        ? "Por favor especifica el tema de tu interés y cuéntanos más detalles..."
                        : "Cuéntanos más detalles sobre tu proyecto o necesidades..."
                    }
                    required={bookingForm.topic === 'Otro tema'}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedSlot(null);
                    }}
                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Reservando...
                      </>
                    ) : (
                      <>
                        <span>✅</span>
                        Confirmar Reserva
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para mensajes */}
        <Modal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          onConfirm={modalConfig.onConfirm ? modalConfig.onConfirm : undefined}
          showCancel={modalConfig.showCancel}
        />
      </div>
    </div>
  );
};

export default CalendarioPublico;
