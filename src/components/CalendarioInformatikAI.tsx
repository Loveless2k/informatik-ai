'use client';

import React, { useState, useEffect } from 'react';
import { getAuthUrl, getTokens, setCredentials } from '@/lib/googleCalendar';
import { useCalendarBooking, getNextAvailableDates, formatTime, formatDate } from '@/hooks/useCalendarBooking';

const CalendarioInformatikAI: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const {
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    availableSlots,
    loading,
    bookingForm,
    setBookingForm,
    isSubmitting,
    submitSuccess,
    showBookingForm,
    setShowBookingForm,
    handleSlotSelect,
    handleBookingSubmit,
    loadAvailableSlots
  } = useCalendarBooking();

  // Verificar autenticación al cargar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleAuthCallback(code);
    } else {
      // Verificar si ya hay tokens guardados
      const savedTokens = localStorage.getItem('google_calendar_tokens');
      if (savedTokens) {
        try {
          const tokens = JSON.parse(savedTokens);
          if (tokens.access_token) {
            setCredentials(tokens);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error parsing saved tokens:', error);
          localStorage.removeItem('google_calendar_tokens');
        }
      }
    }
  }, []);

  // Cargar slots cuando el usuario se autentique
  useEffect(() => {
    if (isAuthenticated) {
      loadAvailableSlots();
    }
  }, [isAuthenticated, selectedDate, loadAvailableSlots]);

  const handleAuthCallback = async (code: string) => {
    try {
      setAuthLoading(true);
      console.log('Starting authentication with code:', code);

      const tokens = await getTokens(code);
      console.log('Tokens received, setting credentials...');

      setCredentials(tokens);
      setIsAuthenticated(true);

      console.log('Authentication successful!');

      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Error during authentication:', error);

      // Mostrar error más específico
      const errorMessage = error instanceof Error
        ? `Error de autenticación: ${error.message}`
        : 'Error durante la autenticación. Por favor intenta nuevamente.';

      alert(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
          <div className="mb-6">
            <img
              src="/images/logos/logoInformatik-ai2.png"
              alt="Informatik-AI"
              className="h-12 w-auto mx-auto opacity-80"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            Calendario Informatik-AI
          </h1>
          
          <p className="text-slate-300 mb-6">
            Para acceder al calendario y programar reuniones, necesitas autorizar el acceso a Google Calendar.
          </p>
          
          <button
            onClick={handleGoogleAuth}
            disabled={authLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {authLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Conectar con Google Calendar
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
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
            Calendario de Reuniones
          </h1>
          
          <p className="text-slate-300 text-lg">
            Programa una reunión de 30 minutos entre las 19:00 y 21:00 hrs
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center">
            ¡Reunión programada exitosamente! Recibirás una confirmación por email.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Selector de fecha */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Selecciona una fecha
            </h2>
            
            {/* Calendario visual */}
            <div className="space-y-4">
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

                  // Primer día del mes
                  const firstDay = new Date(currentYear, currentMonth, 1);

                  // Días a mostrar (incluyendo días del mes anterior para completar la semana)
                  const startDate = new Date(firstDay);
                  startDate.setDate(startDate.getDate() - firstDay.getDay());

                  const days = [];
                  const availableDates = getNextAvailableDates();

                  // Generar 42 días (6 semanas)
                  for (let i = 0; i < 42; i++) {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + i);

                    const isCurrentMonth = date.getMonth() === currentMonth;
                    const isToday = date.toDateString() === today.toDateString();
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const isPast = date < today && !isToday;
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    const isAvailable = availableDates.some(availableDate =>
                      availableDate.toDateString() === date.toDateString()
                    );

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
                                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                                : dayInfo.isToday
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30'
                                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/30'
                              : dayInfo.isWeekend
                                ? 'text-slate-500 cursor-not-allowed'
                                : 'text-slate-500 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="block">{dayInfo.day}</span>
                      {dayInfo.isAvailable && dayInfo.isCurrentMonth && !dayInfo.isPast && (
                        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                      )}
                    </button>
                  ));
                })()}
              </div>

              {/* Leyenda */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-cyan-500 rounded"></div>
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
          </div>

          {/* Slots de tiempo */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Horarios disponibles - {formatDate(selectedDate)}
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      slot.available
                        ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50'
                        : 'bg-slate-700/20 text-slate-500 border border-slate-600/20 cursor-not-allowed'
                    }`}
                  >
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                  </button>
                ))}
              </div>
            )}
            
            {availableSlots.length === 0 && !loading && (
              <p className="text-slate-400 text-center py-8">
                No hay horarios disponibles para esta fecha
              </p>
            )}
          </div>
        </div>

        {/* Modal de formulario de reserva */}
        {showBookingForm && selectedSlot && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
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

              <div className="mb-4 p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                <p className="text-cyan-300 text-sm">
                  <strong>Fecha:</strong> {formatDate(selectedDate)}
                </p>
                <p className="text-cyan-300 text-sm">
                  <strong>Hora:</strong> {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={bookingForm.company}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tema de la reunión *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.topic}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="¿De qué quieres hablar?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mensaje adicional
                  </label>
                  <textarea
                    rows={3}
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400 resize-none"
                    placeholder="Información adicional sobre la reunión..."
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
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Reservando...
                      </>
                    ) : (
                      'Confirmar Reserva'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarioInformatikAI;
