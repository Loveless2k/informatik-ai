'use client';

import React, { useState, useEffect } from 'react';
import { calendarDataService, type TimeSlot, type CalendarData } from '@/lib/calendarDataService';
import Modal from './Modal';

interface AdminUser {
  email: string;
  name: string;
  picture: string;
}

const CalendarioAdmin: React.FC = () => {
  // Estados de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  
  // Estados del calendario
  const [calendarData, setCalendarData] = useState<CalendarData>({ slots: [], lastUpdated: '' });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editMode, setEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Estados para crear/editar slots
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '19:00',
    endTime: '19:30',
    title: 'Reunión Informatik-AI'
  });

  // Estados para modales
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    onConfirm: null as (() => void) | null,
    showCancel: false
  });

  const isAdmin = user?.email === 'camidevai@gmail.com';

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

  // Función para validar y ajustar horas
  const handleStartTimeChange = (startTime: string) => {
    setNewSlot(prev => {
      const newSlot = { ...prev, startTime };

      // Si la hora de fin es menor o igual a la hora de inicio, ajustarla
      if (newSlot.endTime <= startTime) {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);

        // Agregar 30 minutos por defecto
        let endHour = startHour;
        let endMinute = startMinute + 30;

        if (endMinute >= 60) {
          endHour += 1;
          endMinute -= 60;
        }

        // Asegurar que no pase de 23:59
        if (endHour > 23) {
          endHour = 23;
          endMinute = 59;
        }

        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        return { ...newSlot, endTime };
      }

      return newSlot;
    });
  };

  const handleEndTimeChange = (endTime: string) => {
    // Validar que la hora de fin no sea menor que la hora de inicio
    if (endTime <= newSlot.startTime) {
      showModal(
        'Hora Inválida',
        'La hora de fin debe ser posterior a la hora de inicio.',
        'warning'
      );
      return;
    }

    setNewSlot(prev => ({ ...prev, endTime }));
  };

  // Función para calcular la duración en minutos
  const calculateDuration = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;

    const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

    return endMinutes - startMinutes;
  };

  // Función para formatear la duración
  const formatDuration = (minutes: number): string => {
    if (minutes <= 0) return '';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}min`;
    } else {
      return `${mins}min`;
    }
  };

  // Función para limpiar horarios pasados manualmente
  const cleanPastSlots = async () => {
    if (!isAdmin || !user?.email) return;

    const today = new Date().toISOString().split('T')[0];
    const pastSlots = calendarData.slots.filter(slot => slot.date < today);

    if (pastSlots.length === 0) {
      showModal(
        'Sin Horarios Pasados',
        'No hay horarios de fechas pasadas para limpiar.',
        'info'
      );
      return;
    }

    showModal(
      'Confirmar Limpieza',
      `¿Estás seguro de que quieres eliminar ${pastSlots.length} horario(s) de fechas pasadas?`,
      'warning',
      async () => {
        const filteredSlots = calendarData.slots.filter(slot => slot.date >= today);
        const cleanedData = { ...calendarData, slots: filteredSlots, lastUpdated: new Date().toISOString() };

        try {
          await calendarDataService.saveCalendarData(cleanedData, user.email);
          setCalendarData(cleanedData);
          setHasUnsavedChanges(false);

          showModal(
            'Limpieza Completada',
            `Se eliminaron ${pastSlots.length} horario(s) de fechas pasadas.`,
            'success'
          );
        } catch (error) {
          showModal(
            'Error',
            'Error al limpiar los horarios pasados.',
            'error'
          );
        }
      },
      true
    );
  };

  // Cargar datos del calendario desde API
  useEffect(() => {
    loadCalendarData();
  }, []);

  // Manejar código de autorización de Google OAuth
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code && !user) {
        setAuthLoading(true);

        try {
          // Intercambiar código por tokens
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            throw new Error('Error en autenticación');
          }

          const { tokens } = await response.json();

          // Obtener información del usuario
          const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`);
          const userData = await userResponse.json();

          // Verificar que sea el admin autorizado
          if (userData.email === 'camidevai@gmail.com') {
            const adminUser = {
              email: userData.email,
              name: userData.name,
              picture: userData.picture
            };

            setUser(adminUser);
            setIsAuthenticated(true);
            localStorage.setItem('informatik-admin-user', JSON.stringify(adminUser));

            // Limpiar URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            showModal(
              'Acceso Denegado',
              'Solo camidevai@gmail.com puede administrar este calendario.',
              'error'
            );
          }

        } catch (error) {
          showModal(
            'Error de Autenticación',
            'Error en la autenticación. Por favor intenta nuevamente.',
            'error'
          );
        } finally {
          setAuthLoading(false);
        }
      }
    };

    handleGoogleCallback();
  }, [user]);

  const loadCalendarData = async () => {
    try {
      const data = await calendarDataService.getCalendarData();

      // Limpiar slots de fechas pasadas automáticamente
      const today = new Date().toISOString().split('T')[0];
      const filteredSlots = data.slots.filter(slot => slot.date >= today);

      // Si se eliminaron slots, actualizar los datos
      if (filteredSlots.length !== data.slots.length && isAdmin && user?.email) {
        const cleanedData = { ...data, slots: filteredSlots, lastUpdated: new Date().toISOString() };
        await calendarDataService.saveCalendarData(cleanedData, user.email);
        setCalendarData(cleanedData);
        setHasUnsavedChanges(false);
      } else {
        setCalendarData(data);
      }

      // Si es admin y hay datos en localStorage, intentar migrar
      if (isAdmin && user?.email) {
        await calendarDataService.migrateFromLocalStorage(user.email);
      }
    } catch (error) {
      // Fallback: inicializar datos por defecto
      initializeDefaultData();
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

  // Verificar autenticación al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('informatik-admin-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('informatik-admin-user');
      }
    }
  }, []);

  // Autenticación real con Google OAuth
  const handleGoogleAuth = () => {
    setAuthLoading(true);

    // Crear URL de autenticación de Google
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(window.location.origin + '/admin-calendario');
    const scope = encodeURIComponent('openid email profile');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `scope=${scope}&` +
      `access_type=offline&` +
      `prompt=consent`;

    // Redirigir a Google para autenticación
    window.location.href = authUrl;
  };

  // Cerrar sesión
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setEditMode(false);
    setHasUnsavedChanges(false);
    localStorage.removeItem('informatik-admin-user');
  };

  // Funciones de utilidad
  const getSlotsForDate = (date: Date): TimeSlot[] => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarData.slots.filter(slot => slot.date === dateStr);
  };

  const getAvailableDates = (): Date[] => {
    const uniqueDates = [...new Set(calendarData.slots.map(slot => slot.date))];
    return uniqueDates.map(dateStr => new Date(dateStr));
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

  // Funciones de administración
  const toggleEditMode = () => {
    if (!isAdmin) return;
    setEditMode(!editMode);
    if (editMode && hasUnsavedChanges) {
      const confirm = window.confirm('Tienes cambios sin guardar. ¿Deseas descartarlos?');
      if (!confirm) {
        setEditMode(true);
        return;
      }
      // Recargar datos originales
      const savedData = localStorage.getItem('informatik-calendar-data');
      if (savedData) {
        setCalendarData(JSON.parse(savedData));
        setHasUnsavedChanges(false);
      }
    }
  };

  const saveChanges = async () => {
    if (!isAdmin || !hasUnsavedChanges || !user?.email) {
      if (!user?.email) {
        showModal(
          'Error de Permisos',
          'No tienes permisos para guardar cambios.',
          'error'
        );
      }
      return;
    }

    try {
      const updatedData = {
        ...calendarData,
        lastUpdated: new Date().toISOString()
      };

      await calendarDataService.saveCalendarData(updatedData, user.email);
      setCalendarData(updatedData);
      setHasUnsavedChanges(false);
      showModal(
        'Cambios Guardados',
        'Los cambios se han guardado exitosamente.',
        'success'
      );

    } catch (error) {
      showModal(
        'Error al Guardar',
        'Error guardando cambios. Por favor intenta nuevamente.',
        'error'
      );
    }
  };

  const addNewSlot = () => {
    if (!isAdmin) return;

    // Validar que no sea una fecha pasada
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (newSlot.date < todayStr) {
      showModal(
        'Fecha Inválida',
        'No se pueden crear horarios en fechas pasadas.',
        'error'
      );
      return;
    }

    // Validar que la hora de fin sea posterior a la hora de inicio
    if (newSlot.endTime <= newSlot.startTime) {
      showModal(
        'Error de Validación',
        'La hora de fin debe ser posterior a la hora de inicio.',
        'error'
      );
      return;
    }

    // Validar que la duración sea al menos de 15 minutos
    const startMinutes = parseInt(newSlot.startTime.split(':')[0]) * 60 + parseInt(newSlot.startTime.split(':')[1]);
    const endMinutes = parseInt(newSlot.endTime.split(':')[0]) * 60 + parseInt(newSlot.endTime.split(':')[1]);
    const duration = endMinutes - startMinutes;

    if (duration < 15) {
      showModal(
        'Duración Mínima',
        'La duración mínima de un slot debe ser de 15 minutos.',
        'warning'
      );
      return;
    }

    const newSlotData: TimeSlot = {
      id: `${newSlot.date}-${newSlot.startTime}`,
      date: newSlot.date,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      available: true,
      title: newSlot.title
    };

    setCalendarData(prev => ({
      ...prev,
      slots: [...prev.slots, newSlotData]
    }));
    
    setHasUnsavedChanges(true);
    setShowSlotForm(false);
    setNewSlot({
      date: '',
      startTime: '19:00',
      endTime: '19:30',
      title: 'Reunión Informatik-AI'
    });
  };

  const editSlot = (slot: TimeSlot) => {
    if (!isAdmin) return;
    setEditingSlot(slot);
    setNewSlot({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      title: slot.title || 'Reunión Informatik-AI'
    });
    setShowSlotForm(true);
  };

  const updateSlot = () => {
    if (!isAdmin || !editingSlot) return;

    // Validar que no sea una fecha pasada
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (newSlot.date < todayStr) {
      showModal(
        'Fecha Inválida',
        'No se pueden modificar horarios en fechas pasadas.',
        'error'
      );
      return;
    }

    // Validar que la hora de fin sea posterior a la hora de inicio
    if (newSlot.endTime <= newSlot.startTime) {
      showModal(
        'Error de Validación',
        'La hora de fin debe ser posterior a la hora de inicio.',
        'error'
      );
      return;
    }

    // Validar que la duración sea al menos de 15 minutos
    const startMinutes = parseInt(newSlot.startTime.split(':')[0]) * 60 + parseInt(newSlot.startTime.split(':')[1]);
    const endMinutes = parseInt(newSlot.endTime.split(':')[0]) * 60 + parseInt(newSlot.endTime.split(':')[1]);
    const duration = endMinutes - startMinutes;

    if (duration < 15) {
      showModal(
        'Duración Mínima',
        'La duración mínima de un slot debe ser de 15 minutos.',
        'warning'
      );
      return;
    }

    setCalendarData(prev => ({
      ...prev,
      slots: prev.slots.map(slot => 
        slot.id === editingSlot.id 
          ? {
              ...slot,
              date: newSlot.date,
              startTime: newSlot.startTime,
              endTime: newSlot.endTime,
              title: newSlot.title
            }
          : slot
      )
    }));
    
    setHasUnsavedChanges(true);
    setShowSlotForm(false);
    setEditingSlot(null);
    setNewSlot({
      date: '',
      startTime: '19:00',
      endTime: '19:30',
      title: 'Reunión Informatik-AI'
    });
  };

  const deleteSlot = (slotId: string) => {
    if (!isAdmin) return;
    
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este horario?');
    if (!confirm) return;
    
    setCalendarData(prev => ({
      ...prev,
      slots: prev.slots.filter(slot => slot.id !== slotId)
    }));
    
    setHasUnsavedChanges(true);
  };

  const toggleSlotAvailability = (slotId: string) => {
    if (!isAdmin) return;
    
    setCalendarData(prev => ({
      ...prev,
      slots: prev.slots.map(slot => 
        slot.id === slotId 
          ? { ...slot, available: !slot.available }
          : slot
      )
    }));
    
    setHasUnsavedChanges(true);
  };

  // Pantalla de autenticación
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
            Panel de Administración
          </h1>

          <p className="text-slate-300 mb-6">
            Acceso restringido. 
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
                Iniciar Sesión como Admin
              </>
            )}
          </button>

        
        </div>
      </div>
    );
  }

  // Verificar si es admin
  if (!isAdmin) {
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
            Acceso Denegado
          </h1>

          <p className="text-red-300 mb-6">
            ❌ Tu cuenta no tiene permisos de administrador.
          </p>

          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">
              Solo <strong>camidevai@gmail.com</strong> puede administrar este calendario.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Interfaz principal de administración
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con información del usuario */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="mb-4">
              <img
                src="/images/logos/logoInformatik-ai2.png"
                alt="Informatik-AI"
                className="h-12 w-auto mx-auto opacity-80"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Panel de Administración
            </h1>

            <p className="text-cyan-300 text-lg">
              👑 Gestión del Calendario Informatik-AI
            </p>
          </div>

          {/* Info del usuario y controles */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">{user.name}</p>
                  <span className="text-cyan-400 text-xs">👑</span>
                </div>
                <p className="text-cyan-300 text-xs">{user.email}</p>
                <p className="text-cyan-400 text-xs">Administrador</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors ml-2"
                title="Cerrar sesión"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Controles de administración */}
        <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleEditMode}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  editMode
                    ? 'bg-orange-500 text-white'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                }`}
              >
                {editMode ? '📝 Modo Edición' : '✏️ Activar Edición'}
              </button>

              {editMode && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSlotForm(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    ➕ Nuevo Horario
                  </button>

                  <button
                    onClick={cleanPastSlots}
                    className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                    title="Limpiar horarios de fechas pasadas"
                  >
                    🧹 Limpiar
                  </button>
                </div>
              )}
            </div>

            {hasUnsavedChanges && (
              <div className="flex items-center gap-3">
                <span className="text-orange-300 text-sm">⚠️ Cambios sin guardar</span>
                <button
                  onClick={saveChanges}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  💾 Guardar Cambios
                </button>
              </div>
            )}
          </div>

          {calendarData.lastUpdated && (
            <p className="text-slate-400 text-xs mt-2">
              Última actualización: {new Date(calendarData.lastUpdated).toLocaleString('es-CL')}
            </p>
          )}
        </div>

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
                  const isAvailable = availableDates.some((availableDate: Date) =>
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
                      if (!dayInfo.isPast) {
                        setSelectedDate(dayInfo.date);
                      }
                    }}
                    disabled={dayInfo.isPast}
                    className={`
                      aspect-square p-1 rounded-lg text-sm font-medium transition-all duration-200 relative
                      ${!dayInfo.isCurrentMonth
                        ? 'text-slate-600 cursor-pointer hover:text-slate-500'
                        : dayInfo.isPast
                          ? 'text-slate-600 cursor-not-allowed opacity-50 bg-slate-800/50'
                          : dayInfo.isSelected
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                            : dayInfo.isToday
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30'
                              : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/30'
                      }
                    `}
                  >
                    <span className="block">{dayInfo.day}</span>
                    {dayInfo.isAvailable && dayInfo.isCurrentMonth && (
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
                <span>Con horarios</span>
              </div>
            </div>
          </div>

          {/* Slots de tiempo */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>🕒</span>
              Horarios para {formatDate(selectedDate)}
            </h2>

            {(() => {
              const slotsForDate = getSlotsForDate(selectedDate);

              if (slotsForDate.length === 0) {
                return (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📅</div>
                    <p className="text-slate-400 mb-4">No hay horarios configurados para esta fecha</p>
                    {editMode && (
                      <button
                        onClick={() => {
                          const dateStr = selectedDate.toISOString().split('T')[0];
                          setNewSlot({
                            date: dateStr,
                            startTime: '19:00',
                            endTime: '19:30',
                            title: 'Reunión Informatik-AI'
                          });
                          setEditingSlot(null); // Asegurar que no estamos editando
                          setShowSlotForm(true);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        ➕ Crear Primer Horario
                      </button>
                    )}
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
                          ? 'bg-green-500/20 border-green-500/30 text-green-300'
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

                        {/* Controles de administración */}
                        {editMode && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSlotAvailability(slot.id)}
                              className={`p-2 rounded transition-colors ${
                                slot.available
                                  ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                                  : 'text-green-400 hover:text-green-300 hover:bg-green-500/10'
                              }`}
                              title={slot.available ? 'Marcar como ocupado' : 'Marcar como disponible'}
                            >
                              {slot.available ? '🚫' : '✅'}
                            </button>
                            <button
                              onClick={() => editSlot(slot)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
                              title="Editar horario"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteSlot(slot.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                              title="Eliminar horario"
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Modal para crear/editar slots */}
        {showSlotForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md my-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {editingSlot ? '✏️ Editar Horario' : '➕ Nuevo Horario'}
                </h3>
                <button
                  onClick={() => {
                    setShowSlotForm(false);
                    setEditingSlot(null);
                    setNewSlot({
                      date: '',
                      startTime: '19:00',
                      endTime: '19:30',
                      title: 'Reunión Informatik-AI'
                    });
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                editingSlot ? updateSlot() : addNewSlot();
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    📅 Fecha *
                  </label>
                  <input
                    type="date"
                    required
                    value={newSlot.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Solo se pueden crear horarios para fechas futuras
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      🕒 Hora inicio *
                    </label>
                    <input
                      type="time"
                      required
                      value={newSlot.startTime}
                      onChange={(e) => handleStartTimeChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      🕒 Hora fin *
                    </label>
                    <input
                      type="time"
                      required
                      value={newSlot.endTime}
                      onChange={(e) => handleEndTimeChange(e.target.value)}
                      min={newSlot.startTime}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white"
                    />
                  </div>
                </div>

                {/* Mostrar duración calculada */}
                {newSlot.startTime && newSlot.endTime && (
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">⏱️</span>
                      <span className="text-cyan-300 text-sm">
                        <strong>Duración:</strong> {formatDuration(calculateDuration(newSlot.startTime, newSlot.endTime))}
                      </span>
                      {calculateDuration(newSlot.startTime, newSlot.endTime) < 15 && (
                        <span className="text-red-400 text-xs ml-2">
                          ⚠️ Mínimo 15 minutos
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    📝 Título
                  </label>
                  <input
                    type="text"
                    value={newSlot.title}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="Título del horario"
                  />
                </div>

                {/* Sugerencias de horarios comunes */}
                <div className="p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
                  <p className="text-slate-300 text-sm mb-2">💡 Horarios sugeridos:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { start: '19:00', end: '19:30', label: '19:00-19:30' },
                      { start: '19:30', end: '20:00', label: '19:30-20:00' },
                      { start: '20:00', end: '20:30', label: '20:00-20:30' },
                      { start: '20:30', end: '21:00', label: '20:30-21:00' }
                    ].map((suggestion) => (
                      <button
                        key={suggestion.label}
                        type="button"
                        onClick={() => {
                          setNewSlot(prev => ({
                            ...prev,
                            startTime: suggestion.start,
                            endTime: suggestion.end
                          }));
                        }}
                        className="px-3 py-1 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-md transition-colors"
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSlotForm(false);
                      setEditingSlot(null);
                      setNewSlot({
                        date: '',
                        startTime: '19:00',
                        endTime: '19:30',
                        title: 'Reunión Informatik-AI'
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    {editingSlot ? '💾 Actualizar' : '➕ Crear'}
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

export default CalendarioAdmin;
