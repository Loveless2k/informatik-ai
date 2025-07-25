// Servicio centralizado para manejo de datos del calendario
// Reemplaza el uso de localStorage con API calls

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  title: string;
}

interface CalendarData {
  slots: TimeSlot[];
  lastUpdated: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class CalendarDataService {
  private baseUrl = '/api/calendar-data';

  /**
   * Obtener todos los datos del calendario
   */
  async getCalendarData(): Promise<CalendarData> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<CalendarData> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Error obteniendo datos del calendario');
      }

      return result.data;

    } catch (error) {
      console.error('❌ Error obteniendo datos del calendario:', error);
      
      // Fallback: devolver datos vacíos
      return {
        slots: [],
        lastUpdated: new Date().toISOString()
      };
    }
  }

  /**
   * Guardar datos del calendario (solo para admins)
   */
  async saveCalendarData(calendarData: CalendarData, userEmail: string): Promise<boolean> {
    try {

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calendarData,
          userEmail
        }),
      });

      const result: ApiResponse<CalendarData> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error guardando datos del calendario');
      }

      return true;

    } catch (error) {
      console.error('❌ Error guardando datos del calendario:', error);
      throw error;
    }
  }

  /**
   * Actualizar disponibilidad de un slot específico (para reservas)
   */
  async updateSlotAvailability(slotId: string, available: boolean): Promise<CalendarData> {
    try {
      console.log(`🔄 Actualizando slot ${slotId}: available = ${available}`);

      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slotId,
          available
        }),
      });

      const result: ApiResponse<CalendarData> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Error actualizando slot');
      }

      console.log('✅ Slot actualizado exitosamente');
      return result.data;

    } catch (error) {
      console.error('❌ Error actualizando slot:', error);
      throw error;
    }
  }

  /**
   * Migrar datos existentes de localStorage a la API
   */
  async migrateFromLocalStorage(userEmail: string): Promise<boolean> {
    try {
      console.log('🔄 Iniciando migración desde localStorage...');

      // Verificar si hay datos en localStorage
      const localData = localStorage.getItem('informatik-calendar-data');
      if (!localData) {
        console.log('ℹ️ No hay datos en localStorage para migrar');
        return true;
      }

      // Parsear datos locales
      const parsedData: CalendarData = JSON.parse(localData);
      console.log('📦 Datos encontrados en localStorage:', parsedData.slots.length, 'slots');

      // Obtener datos actuales de la API
      const apiData = await this.getCalendarData();
      
      // Si la API ya tiene datos más recientes, no migrar
      if (apiData.slots.length > 0 && apiData.lastUpdated > parsedData.lastUpdated) {
        console.log('ℹ️ La API ya tiene datos más recientes, no se migra');
        return true;
      }

      // Migrar datos a la API
      await this.saveCalendarData(parsedData, userEmail);

      // Limpiar localStorage después de migración exitosa
      localStorage.removeItem('informatik-calendar-data');
      console.log('✅ Migración completada y localStorage limpiado');

      return true;

    } catch (error) {
      console.error('❌ Error en migración:', error);
      return false;
    }
  }

  /**
   * Sincronizar datos: obtener de API y actualizar localStorage como cache
   */
  async syncData(): Promise<CalendarData> {
    try {
      const apiData = await this.getCalendarData();
      
      // Actualizar localStorage como cache
      localStorage.setItem('informatik-calendar-data', JSON.stringify(apiData));
      
      return apiData;
    } catch (error) {
      console.error('❌ Error sincronizando datos:', error);
      
      // Fallback: usar localStorage si la API falla
      const localData = localStorage.getItem('informatik-calendar-data');
      if (localData) {
        console.log('⚠️ Usando datos de localStorage como fallback');
        return JSON.parse(localData);
      }
      
      // Último fallback: datos vacíos
      return {
        slots: [],
        lastUpdated: new Date().toISOString()
      };
    }
  }
}

// Exportar instancia singleton
export const calendarDataService = new CalendarDataService();

// Exportar tipos para uso en componentes
export type { TimeSlot, CalendarData };
