import { useState, useCallback } from 'react';
import { TimeSlot, CalendarEvent, checkSlotAvailability, createCalendarEvent } from '@/lib/googleCalendar';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
}

interface UseCalendarBookingReturn {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedSlot: TimeSlot | null;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  availableSlots: TimeSlot[];
  loading: boolean;
  bookingForm: BookingForm;
  setBookingForm: React.Dispatch<React.SetStateAction<BookingForm>>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  showBookingForm: boolean;
  setShowBookingForm: (show: boolean) => void;
  handleSlotSelect: (slot: TimeSlot) => void;
  handleBookingSubmit: (e: React.FormEvent) => Promise<void>;
  loadAvailableSlots: () => Promise<void>;
  resetForm: () => void;
}

export const useCalendarBooking = (): UseCalendarBookingReturn => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    topic: '',
    message: ''
  });

  // Cargar slots disponibles cuando cambie la fecha
  const loadAvailableSlots = useCallback(async () => {
    try {
      setLoading(true);
      const slots = await checkSlotAvailability(selectedDate);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // No cargar automáticamente - se manejará desde el componente principal

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setShowBookingForm(true);
    }
  };

  const resetForm = () => {
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      topic: '',
      message: ''
    });
    setSelectedSlot(null);
    setShowBookingForm(false);
    setSubmitSuccess(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    try {
      setIsSubmitting(true);

      // Validaciones básicas
      if (!bookingForm.name.trim() || !bookingForm.email.trim() || !bookingForm.topic.trim()) {
        throw new Error('Por favor completa todos los campos obligatorios');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(bookingForm.email)) {
        throw new Error('Por favor ingresa un email válido');
      }

      const event: CalendarEvent = {
        summary: `Reunión Informatik-AI - ${bookingForm.name}`,
        description: `
Reunión programada con Informatik-AI

Participante: ${bookingForm.name}
Email: ${bookingForm.email}
Teléfono: ${bookingForm.phone || 'No proporcionado'}
Empresa: ${bookingForm.company || 'No especificada'}
Tema: ${bookingForm.topic}

Mensaje adicional:
${bookingForm.message || 'Sin mensaje adicional'}
        `.trim(),
        start: {
          dateTime: selectedSlot.start,
          timeZone: 'America/Santiago'
        },
        end: {
          dateTime: selectedSlot.end,
          timeZone: 'America/Santiago'
        },
        attendees: [
          {
            email: bookingForm.email,
            displayName: bookingForm.name
          }
        ]
      };

      await createCalendarEvent(event);
      setSubmitSuccess(true);
      setShowBookingForm(false);
      
      // Recargar slots disponibles
      await loadAvailableSlots();
      
      // Reset form después de un delay para mostrar el mensaje de éxito
      setTimeout(() => {
        resetForm();
      }, 3000);

    } catch (error) {
      console.error('Error creating booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al crear la reserva. Por favor intenta nuevamente.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    loadAvailableSlots,
    resetForm
  };
};

// Utilidad para obtener fechas disponibles (días laborales)
export const getNextAvailableDates = (daysAhead: number = 14): Date[] => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < daysAhead * 2; i++) { // Multiplicar por 2 para asegurar suficientes días laborales
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Solo días laborales (lunes a viernes)
    if (date.getDay() >= 1 && date.getDay() <= 5) {
      dates.push(date);
    }
    
    // Parar cuando tengamos suficientes fechas
    if (dates.length >= daysAhead) {
      break;
    }
  }
  
  return dates;
};

// Utilidades de formato
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('es-CL', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};
