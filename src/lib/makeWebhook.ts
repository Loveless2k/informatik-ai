// Servicio para integración con Make.com
interface BookingData {
  // Datos del cliente
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  
  // Datos de la reunión
  meetingTopic: string;
  meetingMessage: string;
  meetingDate: string; // YYYY-MM-DD
  meetingStartTime: string; // HH:MM
  meetingEndTime: string; // HH:MM
  meetingDateFormatted: string; // "viernes, 25 de julio de 2025"
  
  // Datos técnicos
  slotId: string;
  timestamp: string;
  timezone: string;
}

interface MakeWebhookResponse {
  success: boolean;
  message: string;
  eventId?: string;
  error?: string;
}

// URL del webhook de Make.com (se configurará después)
const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || '';

// Función helper para categorizar temas
const getTopicCategory = (topic: string): string => {
  const categories: { [key: string]: string } = {
    'Desarrollo de Sitios Web': 'Desarrollo TI',
    'Chatbot con IA': 'Automatización',
    'Cursos de IA': 'Formación',
    'Talleres y Formaciones': 'Formación',
    'Asesoría Estratégica': 'Consultoría',
    'Automatización de Procesos': 'Automatización',
    'Consultoría General': 'Consultoría',
    'Otro tema': 'Consultoría General'
  };

  return categories[topic] || 'Consultoría General';
};

export const sendBookingToMake = async (bookingData: BookingData): Promise<MakeWebhookResponse> => {
  try {
    console.log('🚀 Enviando reserva a Make.com...', bookingData);

    // Verificar que tenemos la URL del webhook
    if (!MAKE_WEBHOOK_URL) {
      throw new Error('URL del webhook de Make.com no configurada');
    }

    // Preparar datos para Make
    const payload = {
      // Información del cliente
      client: {
        name: bookingData.clientName,
        email: bookingData.clientEmail,
        phone: bookingData.clientPhone || 'No proporcionado',
        company: bookingData.clientCompany || 'No especificada'
      },
      
      // Información de la reunión
      meeting: {
        topic: bookingData.meetingTopic,
        topicCategory: getTopicCategory(bookingData.meetingTopic),
        message: bookingData.meetingMessage || 'Sin mensaje adicional',
        date: bookingData.meetingDate,
        startTime: bookingData.meetingStartTime,
        endTime: bookingData.meetingEndTime,
        dateFormatted: bookingData.meetingDateFormatted,
        
        // Formato ISO para Google Calendar
        startDateTime: `${bookingData.meetingDate}T${bookingData.meetingStartTime}:00`,
        endDateTime: `${bookingData.meetingDate}T${bookingData.meetingEndTime}:00`,
        timezone: bookingData.timezone
      },
      
      // Metadatos
      meta: {
        slotId: bookingData.slotId,
        timestamp: bookingData.timestamp,
        source: 'informatik-ai-calendar',
        version: '1.0'
      }
    };

    console.log('📤 Payload para Make:', payload);

    // Enviar a Make.com
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    // Make.com puede responder con texto plano "Accepted" o JSON
    let result;
    const responseText = await response.text();

    try {
      // Intentar parsear como JSON
      result = JSON.parse(responseText);
      console.log('✅ Respuesta JSON de Make:', result);
    } catch (jsonError) {
      // Si no es JSON, usar el texto como respuesta
      result = { message: responseText, status: 'accepted' };
      console.log('✅ Respuesta de texto de Make:', responseText);
    }

    return {
      success: true,
      message: 'Reserva enviada exitosamente a Make.com',
      eventId: result.eventId || undefined,
      makeResponse: result
    };

  } catch (error) {
    console.error('❌ Error enviando a Make:', error);
    
    return {
      success: false,
      message: 'Error al procesar la reserva',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Función para validar datos antes de enviar
export const validateBookingData = (data: Partial<BookingData>): string[] => {
  const errors: string[] = [];

  if (!data.clientName?.trim()) {
    errors.push('Nombre del cliente es requerido');
  }

  if (!data.clientEmail?.trim()) {
    errors.push('Email del cliente es requerido');
  }

  if (!data.meetingTopic?.trim()) {
    errors.push('Tema de la reunión es requerido');
  }

  if (!data.meetingDate) {
    errors.push('Fecha de la reunión es requerida');
  }

  if (!data.meetingStartTime) {
    errors.push('Hora de inicio es requerida');
  }

  if (!data.meetingEndTime) {
    errors.push('Hora de fin es requerida');
  }

  // Validar formato de email
  if (data.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail)) {
    errors.push('Formato de email inválido');
  }

  return errors;
};

// Función para crear datos de prueba
export const createTestBooking = (): BookingData => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 1); // Mañana
  
  return {
    clientName: 'Cliente de Prueba',
    clientEmail: 'test@example.com',
    clientPhone: '+56912345678',
    clientCompany: 'Empresa Test',
    meetingTopic: 'Reunión de prueba',
    meetingMessage: 'Esta es una reunión de prueba para validar la integración',
    meetingDate: testDate.toISOString().split('T')[0],
    meetingStartTime: '19:00',
    meetingEndTime: '19:30',
    meetingDateFormatted: testDate.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slotId: `test-${Date.now()}`,
    timestamp: new Date().toISOString(),
    timezone: 'America/Santiago'
  };
};
