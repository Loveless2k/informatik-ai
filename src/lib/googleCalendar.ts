// Configuración de Google Calendar API para el cliente
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Esta es la versión del cliente - no importamos googleapis aquí
// para evitar problemas de compatibilidad con Next.js

export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// Función para obtener la URL de autorización
export const getAuthUrl = (): string => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  const params = new URLSearchParams({
    client_id: clientId || '',
    redirect_uri: redirectUri || '',
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent'
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// Función para intercambiar el código por tokens (ahora usa API route)
export const getTokens = async (code: string) => {
  try {
    // Construir URL absoluta para evitar problemas de protocolo
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3006';

    const url = `${baseUrl}/api/auth/google`;

    console.log('Fetching tokens from:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Tokens received successfully');
    return data.tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw error;
  }
};

// Función para establecer las credenciales (solo guarda en localStorage)
export const setCredentials = (tokens: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('google_calendar_tokens', JSON.stringify(tokens));
  }
};

// Función para crear un evento en Google Calendar
export const createCalendarEvent = async (event: CalendarEvent): Promise<string> => {
  try {
    const tokens = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('google_calendar_tokens') || '{}')
      : {};

    if (!tokens.access_token) {
      throw new Error('No access token available');
    }

    // Construir URL absoluta
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3006';

    const response = await fetch(`${baseUrl}/api/calendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        accessToken: tokens.access_token
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create event');
    }

    const data = await response.json();
    return data.eventId || '';
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

// Función para obtener eventos existentes en un rango de fechas
export const getCalendarEvents = async (timeMin: string, timeMax: string) => {
  try {
    const tokens = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('google_calendar_tokens') || '{}')
      : {};

    if (!tokens.access_token) {
      throw new Error('No access token available');
    }

    const params = new URLSearchParams({
      timeMin,
      timeMax,
      accessToken: tokens.access_token
    });

    // Construir URL absoluta
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3006';

    const response = await fetch(`${baseUrl}/api/calendar?${params}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch events');
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error getting calendar events:', error);
    throw error;
  }
};

// Función para generar slots de tiempo disponibles
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 19; // 7:00 PM
  const endHour = 21; // 9:00 PM
  const slotDuration = 30; // 30 minutos

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const start = new Date(date);
      start.setHours(hour, minute, 0, 0);
      
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + slotDuration);

      // No agregar slots que excedan las 21:00
      if (end.getHours() <= endHour) {
        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
          available: true // Se verificará contra eventos existentes
        });
      }
    }
  }

  return slots;
};

// Función para verificar disponibilidad de slots
export const checkSlotAvailability = async (date: Date): Promise<TimeSlot[]> => {
  try {
    // Verificar si hay tokens disponibles
    const tokens = typeof window !== 'undefined'
      ? localStorage.getItem('google_calendar_tokens')
      : null;

    if (!tokens) {
      // Si no hay tokens, devolver slots como disponibles para mostrar la UI
      return generateTimeSlots(date);
    }

    let parsedTokens;
    try {
      parsedTokens = JSON.parse(tokens);
    } catch (error) {
      console.error('Error parsing tokens:', error);
      return generateTimeSlots(date);
    }

    if (!parsedTokens.access_token) {
      return generateTimeSlots(date);
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Obtener eventos existentes
    const events = await getCalendarEvents(
      startOfDay.toISOString(),
      endOfDay.toISOString()
    );

    // Generar slots base
    const slots = generateTimeSlots(date);

    // Marcar slots ocupados
    return slots.map(slot => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);

      const isOccupied = events.some((event: any) => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false;

        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);

        // Verificar si hay solapamiento
        return (slotStart < eventEnd && slotEnd > eventStart);
      });

      return {
        ...slot,
        available: !isOccupied
      };
    });
  } catch (error) {
    console.error('Error checking slot availability:', error);
    // En caso de error, devolver slots como disponibles para mostrar la UI
    return generateTimeSlots(date);
  }
};

export default {
  getAuthUrl,
  getTokens,
  setCredentials,
  createCalendarEvent,
  getCalendarEvents,
  generateTimeSlots,
  checkSlotAvailability
};
