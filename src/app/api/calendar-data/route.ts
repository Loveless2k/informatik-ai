import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Ruta del archivo JSON donde se guardan los datos del calendario
const CALENDAR_DATA_PATH = path.join(process.cwd(), 'data', 'calendar.json');

// Estructura de datos del calendario
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

// Función para asegurar que existe el directorio y archivo
async function ensureDataFile(): Promise<void> {
  try {
    const dataDir = path.dirname(CALENDAR_DATA_PATH);
    
    // Crear directorio si no existe
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Crear archivo si no existe
    try {
      await fs.access(CALENDAR_DATA_PATH);
    } catch {
      const initialData: CalendarData = {
        slots: [],
        lastUpdated: new Date().toISOString()
      };
      await fs.writeFile(CALENDAR_DATA_PATH, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    throw error;
  }
}

// GET - Obtener datos del calendario
export async function GET() {
  try {
    await ensureDataFile();
    
    const fileContent = await fs.readFile(CALENDAR_DATA_PATH, 'utf-8');
    const calendarData: CalendarData = JSON.parse(fileContent);
    
    return NextResponse.json({
      success: true,
      data: calendarData
    });
  } catch (error) {
    
    // Si hay error, devolver datos por defecto
    const defaultData: CalendarData = {
      slots: [],
      lastUpdated: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: defaultData
    });
  }
}

// POST - Guardar datos del calendario (solo para admins)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { calendarData, userEmail } = body;

    // Verificar que el usuario sea admin
    if (userEmail !== 'camidevai@gmail.com') {
      return NextResponse.json({
        success: false,
        error: 'Acceso denegado. Solo administradores pueden modificar el calendario.'
      }, { status: 403 });
    }

    // Validar estructura de datos
    if (!calendarData || !Array.isArray(calendarData.slots)) {
      return NextResponse.json({
        success: false,
        error: 'Datos de calendario inválidos'
      }, { status: 400 });
    }

    // Agregar timestamp de actualización
    const dataToSave: CalendarData = {
      ...calendarData,
      lastUpdated: new Date().toISOString()
    };

    await ensureDataFile();
    await fs.writeFile(CALENDAR_DATA_PATH, JSON.stringify(dataToSave, null, 2));



    return NextResponse.json({
      success: true,
      message: 'Calendario actualizado exitosamente',
      data: dataToSave
    });
  } catch (error) {
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}

// PUT - Actualizar un slot específico (para reservas)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slotId, available } = body;

    if (!slotId || typeof available !== 'boolean') {
      return NextResponse.json({
        success: false,
        error: 'Datos inválidos. Se requiere slotId y available.'
      }, { status: 400 });
    }

    await ensureDataFile();
    
    const fileContent = await fs.readFile(CALENDAR_DATA_PATH, 'utf-8');
    const calendarData: CalendarData = JSON.parse(fileContent);

    // Buscar y actualizar el slot
    const slotIndex = calendarData.slots.findIndex(slot => slot.id === slotId);
    
    if (slotIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Slot no encontrado'
      }, { status: 404 });
    }

    // Actualizar disponibilidad
    calendarData.slots[slotIndex].available = available;
    calendarData.lastUpdated = new Date().toISOString();

    // Guardar cambios
    await fs.writeFile(CALENDAR_DATA_PATH, JSON.stringify(calendarData, null, 2));



    return NextResponse.json({
      success: true,
      message: 'Slot actualizado exitosamente',
      data: calendarData
    });
  } catch (error) {
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}
